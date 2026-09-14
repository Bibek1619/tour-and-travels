import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Review } from "@/models/review";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const reviews = await Review.find({
      status: "approved",
      featuredOnHomepage: true,
    })
      .sort({ createdAt: -1 })
      .limit(6);

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error("Get featured homepage reviews error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}