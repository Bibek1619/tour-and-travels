import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { HomepageContent } from "@/models/homepageContent";
import { mergeWithDefaults } from "@/lib/homepage-content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const content = await HomepageContent.findOne();

    return NextResponse.json({ success: true, data: content ?? mergeWithDefaults(null) });
  } catch (error) {
    console.error("Get homepage content error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}