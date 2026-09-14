import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AdventureCategory } from "@/models/adventureCategory";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const name = String(body.name || "").trim();
    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }
    const category = await AdventureCategory.findByIdAndUpdate(
      id,
      {
        name,
        description: String(body.description || "").trim(),
        image: String(body.image || ""),
      },
      { new: true }
    ).lean();
    if (!category) {
      return NextResponse.json(
        { error: "Adventure category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update adventure category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const category = await AdventureCategory.findByIdAndDelete(id).lean();
    if (!category) {
      return NextResponse.json(
        { error: "Adventure category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete adventure category" },
      { status: 500 }
    );
  }
}