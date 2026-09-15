import { connectDB } from "@/lib/db";
import { Review } from "@/models/review";
import { TourPackage } from "@/models/tourPackage";
import { Vehicle } from "@/models/vehicle";
import { Adventure } from "@/models/adventure";
import { Types } from "mongoose";

export type ReviewTargetType = "tour" | "vehicle" | "adventure";

export type ReviewTarget = {
  type: ReviewTargetType;
  id: string | Types.ObjectId;
};

const TARGET_FIELD: Record<ReviewTargetType, string> = {
  tour: "tour",
  vehicle: "vehicle",
  adventure: "adventure",
};

const COUNT_FIELD: Record<ReviewTargetType, "reviewsCount" | "totalReviews"> = {
  tour: "reviewsCount",
  vehicle: "totalReviews",
  adventure: "reviewsCount",
};

export async function recomputeRating(target: ReviewTarget): Promise<void> {
  await connectDB();
  const field = TARGET_FIELD[target.type];

  const result = await Review.aggregate([
    { $match: { [field]: target.id, status: "approved" } },
    {
      $group: {
        _id: null,
        avg: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  const agg = result[0] || { avg: 0, count: 0 };
  const rating = Math.round(agg.avg * 10) / 10;
  const count = agg.count;
  const update: Record<string, unknown> = {
    rating,
    [COUNT_FIELD[target.type]]: count,
  };

  if (target.type === "tour") {
    await TourPackage.findByIdAndUpdate(target.id, update);
  } else if (target.type === "vehicle") {
    await Vehicle.findByIdAndUpdate(target.id, update);
  } else if (target.type === "adventure") {
    await Adventure.findByIdAndUpdate(target.id, update);
  }
}