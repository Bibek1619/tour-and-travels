import { connectDB } from "@/lib/db";
import { Review } from "@/models/review";
import AdminLayout from "@/components/admin/admin-layout";
import ReviewsManager from "@/components/admin/reviews-manager";
import type { Review as ReviewType } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  await connectDB();
  const reviews = JSON.parse(
    JSON.stringify(
      await Review.find()
        .sort({ createdAt: -1 })
        .populate("tour", "title")
        .populate("vehicle", "name")
        .populate("adventure", "name")
        .lean()
    )
  ) as (ReviewType & {
    tour?: { title?: string } | string;
    vehicle?: { name?: string } | string;
    adventure?: { name?: string } | string;
  })[];
  const reviewItems = reviews.map((review) => {
    const entity =
      (typeof review.tour === "object" && review.tour?.title) ||
      (typeof review.vehicle === "object" && review.vehicle?.name) ||
      (typeof review.adventure === "object" && review.adventure?.name) ||
      "";
    return {
      _id: review._id,
      name: review.name,
      title: review.title,
      review: review.review,
      rating: review.rating,
      status: review.status,
      featuredOnHomepage: review.featuredOnHomepage,
      createdAt: review.createdAt,
      entityLabel: entity,
    };
  });

  return (
    <AdminLayout>
      <ReviewsManager initialReviews={reviewItems} />
    </AdminLayout>
  );
}