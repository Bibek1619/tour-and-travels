import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Adventure } from "@/models/adventure";
import { revalidateAdventures } from "@/lib/revalidation";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const adventure = await Adventure.findOne({
      _id: id,
      status: "published",
    }).lean();

    if (!adventure) {
      return NextResponse.json(
        { success: false, message: "Adventure not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: adventure });
  } catch (error) {
    console.error("Get adventure by id error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const adventure = await Adventure.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!adventure) {
      return NextResponse.json(
        { success: false, message: "Adventure not found" },
        { status: 404 }
      );
    }
    revalidateAdventures();
    return NextResponse.json({
      success: true,
      message: "Adventure updated successfully",
      data: adventure,
    });
  } catch (error) {
    console.error("Update adventure error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const { id } = await params;
    const adventure = await Adventure.findById(id);
    if (!adventure) {
      return NextResponse.json(
        { success: false, message: "Adventure not found" },
        { status: 404 }
      );
    }
    await adventure.deleteOne();
    revalidateAdventures();
    return NextResponse.json({
      success: true,
      message: "Adventure deleted successfully",
    });
  } catch (error) {
    console.error("Delete adventure error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}