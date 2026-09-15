import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Review } from "@/models/review";
import { recomputeRating } from "@/lib/review-helpers";

function toReviewTarget(review: {
  tour?: unknown;
  vehicle?: unknown;
  adventure?: unknown;
}) {
  if (review.tour) return { type: "tour" as const, id: String(review.tour) };
  if (review.vehicle) return { type: "vehicle" as const, id: String(review.vehicle) };
  if (review.adventure) return { type: "adventure" as const, id: String(review.adventure) };
  return null;
}

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const review = await Review.findById(id).lean();
    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: review });
  } catch (error) {
    console.error("Get review error:", error);
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
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }
    const previousStatus = review.status;
    const target = toReviewTarget(review);
    const updated = await Review.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }
    const statusChanged =
      previousStatus !== updated.status ||
      (body.status && body.status !== previousStatus);
    if (target && statusChanged) {
      await recomputeRating(target);
    }
    return NextResponse.json({
      success: true,
      message: "Review updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update review error:", error);
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
  try {
    await connectDB();
    const { id } = await params;
    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }
    const target = toReviewTarget(review);
    await review.deleteOne();
    if (target) {
      await recomputeRating(target);
    }
    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}