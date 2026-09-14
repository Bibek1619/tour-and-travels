import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AdventureCategory } from "@/models/adventureCategory";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const categories = await AdventureCategory.find()
      .sort({ sortOrder: 1 })
      .lean();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch adventure categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const name = String(body.name || "").trim();
    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }
    let slug = String(body.slug || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (!slug) {
      slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    const maxOrder = await AdventureCategory.findOne()
      .sort({ sortOrder: -1 })
      .select("sortOrder")
      .lean();
    const category = await AdventureCategory.create({
      slug,
      name,
      description: String(body.description || "").trim(),
      image: String(body.image || ""),
      sortOrder: (maxOrder?.sortOrder ?? 0) + 1,
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if ((error as { code?: number })?.code === 11000) {
      return NextResponse.json(
        { error: "Category slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create adventure category" },
      { status: 500 }
    );
  }
}