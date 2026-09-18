import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Region } from "@/models/region";
import { revalidateRegion } from "@/lib/revalidation";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const region = await Region.findById(id).lean();
    if (!region) {
      return NextResponse.json({ error: "Region not found" }, { status: 404 });
    }
    return NextResponse.json(region);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch region" },
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
    const region = await Region.findByIdAndUpdate(
      id,
      { $set: { name: body.name, description: body.description, image: body.image } },
      { new: true, runValidators: true }
    );
    if (!region) {
      return NextResponse.json({ error: "Region not found" }, { status: 404 });
    }
    revalidateRegion(id);
    return NextResponse.json(region);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update region" },
      { status: 500 }
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
    const region = await Region.findByIdAndDelete(id);
    if (!region) {
      return NextResponse.json({ error: "Region not found" }, { status: 404 });
    }
    revalidateRegion(id);
    return NextResponse.json({ success: true, message: "Region deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete region" },
      { status: 500 }
    );
  }
}