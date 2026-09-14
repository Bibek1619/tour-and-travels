import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Adventure } from "@/models/adventure";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const adventure = await Adventure.findOne({ slug, status: "published" }).lean();

    if (!adventure) {
      return NextResponse.json(
        { success: false, message: "Adventure not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: adventure });
  } catch (error) {
    console.error("Get adventure by slug error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}