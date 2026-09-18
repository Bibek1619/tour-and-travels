import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CustomTrip } from "@/models/customTrip";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const { id } = await params;
    const trip = await CustomTrip.findById(id).lean();

    if (!trip) {
      return NextResponse.json(
        { success: false, message: "Custom trip not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: trip });
  } catch (error) {
    console.error("Get custom trip by id error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const trip = await CustomTrip.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!trip) {
      return NextResponse.json(
        { success: false, message: "Custom trip not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Custom trip updated successfully",
      data: trip,
    });
  } catch (error) {
    console.error("Update custom trip error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const { id } = await params;
    const trip = await CustomTrip.findById(id);
    if (!trip) {
      return NextResponse.json(
        { success: false, message: "Custom trip not found" },
        { status: 404 }
      );
    }
    await trip.deleteOne();
    return NextResponse.json({
      success: true,
      message: "Custom trip deleted successfully",
    });
  } catch (error) {
    console.error("Delete custom trip error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}