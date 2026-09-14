import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { DailyRoute } from "@/models/dailyRoute";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const route = await DailyRoute.findById(id);

    if (!route) {
      return NextResponse.json(
        { success: false, message: "Route not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: route });
  } catch (error) {
    console.error("Get daily route error:", error);
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
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const route = await DailyRoute.findById(id);
    if (!route) {
      return NextResponse.json(
        { success: false, message: "Route not found" },
        { status: 404 }
      );
    }

    if (Array.isArray(body.bookedSeats) && body.totalSeats != null) {
      body.availableSeats = Math.max(
        0,
        body.totalSeats - body.bookedSeats.length
      );
    } else if (Array.isArray(body.bookedSeats)) {
      body.availableSeats = Math.max(
        0,
        (body.totalSeats ?? route.totalSeats) - body.bookedSeats.length
      );
    }

    const updated = await DailyRoute.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: "Route updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update daily route error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const route = await DailyRoute.findById(id);
    if (!route) {
      return NextResponse.json(
        { success: false, message: "Route not found" },
        { status: 404 }
      );
    }
    await route.deleteOne();
    return NextResponse.json({
      success: true,
      message: "Route deleted successfully",
    });
  } catch (error) {
    console.error("Delete daily route error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
