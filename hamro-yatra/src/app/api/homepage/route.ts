import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { HomepageContent } from "@/models/homepageContent";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    let content = await HomepageContent.findOne();
    if (!content) {
      content = await HomepageContent.create({});
    }

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error("Get homepage content error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}