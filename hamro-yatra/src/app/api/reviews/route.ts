import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Review } from "@/models/review";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const sp = request.nextUrl.searchParams;
    const status = sp.get("status");
    const page = Number(sp.get("page") || 1);
    const limit = Number(sp.get("limit") || 50);

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const reviews = await Review.find(
      query as unknown as Parameters<typeof Review.find>[0]
    )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Review.countDocuments(
      query as unknown as Parameters<typeof Review.countDocuments>[0]
    );

    return NextResponse.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: reviews,
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}