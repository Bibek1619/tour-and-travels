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

export type ReviewView = {
  _id: string;
  name?: string;
  rating?: number;
  review?: string;
  createdAt?: string;
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

export async function getEntityReviews(
  type: ReviewTargetType,
  id: string | Types.ObjectId,
  limit = 10
): Promise<{ data: ReviewView[]; total: number; avgRating: number }> {
  await connectDB();
  const field = TARGET_FIELD[type];
  let targetId: Types.ObjectId = id as Types.ObjectId;
  if (typeof id === "string") {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid ${field} id`);
    }
    targetId = new Types.ObjectId(id);
  }

  const [reviews, agg] = await Promise.all([
    Review.find({ [field]: targetId, status: "approved" })
      .select("name rating review createdAt")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(),
    Review.aggregate([
      { $match: { [field]: targetId, status: "approved" } },
      {
        $group: {
          _id: null,
          avg: { $avg: "$rating" },
          total: { $sum: 1 },
        },
      },
    ]),
  ]);

  const row = agg[0] || { avg: 0, total: 0 };
  return {
    data: JSON.parse(JSON.stringify(reviews)) as ReviewView[],
    total: row.total,
    avgRating: Math.round(row.avg * 10) / 10,
  };
}

export async function recomputeRating(target: ReviewTarget): Promise<void> {
  await connectDB();
  const field = TARGET_FIELD[target.type];
  let id: Types.ObjectId = target.id as Types.ObjectId;
  if (typeof target.id === "string") {
    if (!Types.ObjectId.isValid(target.id)) {
      throw new Error(`Invalid ${field} id`);
    }
    id = new Types.ObjectId(target.id);
  }

  const result = await Review.aggregate([
    { $match: { [field]: id, status: "approved" } },
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
    await TourPackage.findByIdAndUpdate(id, update);
  } else if (target.type === "vehicle") {
    await Vehicle.findByIdAndUpdate(id, update);
  } else if (target.type === "adventure") {
    await Adventure.findByIdAndUpdate(id, update);
  }
}