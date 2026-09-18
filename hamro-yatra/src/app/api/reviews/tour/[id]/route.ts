import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Review } from "@/models/review";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const sp = request.nextUrl.searchParams;
    const page = Number(sp.get("page") || 1);
    const limit = Number(sp.get("limit") || 10);
    const query: Record<string, unknown> = {
      tour: id,
      status: "approved",
    };

    const reviews = await Review.find(
      query as unknown as Parameters<typeof Review.find>[0]
    )
      .select("-email -user")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Review.countDocuments(
      query as unknown as Parameters<typeof Review.countDocuments>[0]
    );
    const ratingAgg = await Review.aggregate([
      { $match: query },
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);

    return NextResponse.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      avgRating: ratingAgg[0] ? Math.round(ratingAgg[0].avg * 10) / 10 : 0,
      data: reviews,
    });
  } catch (error) {
    console.error("Get tour reviews error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}