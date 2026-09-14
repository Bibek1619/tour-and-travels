import { connectDB } from "@/lib/db";
import { Review } from "@/models/review";
import AdminLayout from "@/components/admin/admin-layout";
import RowActions from "@/components/admin/row-actions";
import type { Review as ReviewType } from "@/lib/types";

export const dynamic = "force-dynamic";

function formatDate(date: Date | string | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
}

export default async function AdminReviewsPage() {
  await connectDB();
  const reviews = JSON.parse(
    JSON.stringify(await Review.find().sort({ createdAt: -1 }).lean())
  ) as ReviewType[];

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Reviews
          </h1>
          <p className="text-gray-600">{reviews.length} reviews</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Review</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No reviews found.
                  </td>
                </tr>
              )}
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {review.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-md">
                    <p className="line-clamp-2">{review.review}</p>
                    {review.title && (
                      <p className="text-xs text-gray-400 mt-1">{review.title}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {review.rating}/5
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(review.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        review.status === "approved"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <RowActions
                      baseHref={`/admin/reviews/${review._id}`}
                      endpoint={`/api/reviews/${review._id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}