"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
  Check,
  X,
  Star,
  StarOff,
  Loader2,
} from "lucide-react";

interface AdminReviewItem {
  _id: string;
  name?: string;
  title?: string;
  review?: string;
  rating?: number;
  status?: string;
  featuredOnHomepage?: boolean;
  createdAt?: string;
  entityLabel?: string;
}

type Filter = "all" | "pending" | "approved";

function formatDate(date: string | Date | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
}

export default function ReviewsManager({
  initialReviews,
}: {
  initialReviews: AdminReviewItem[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [reviews, setReviews] = useState(initialReviews);
  const [busyId, setBusyId] = useState<string | null>(null);

  const pendingCount = initialReviews.filter(
    (r) => r.status === "pending"
  ).length;

  const filtered =
    filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  const updateReview = async (id: string, patch: Record<string, unknown>) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        alert(json?.message || "Update failed");
        return;
      }
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, ...patch } : r))
      );
    } catch (error) {
      alert("Update failed: " + (error as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  const deleteReview = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        alert(json?.message || "Delete failed");
        return;
      }
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      alert("Delete failed: " + (error as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  const filterTabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
  ];

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Reviews
          </h1>
          <p className="text-gray-600">
            {initialReviews.length} reviews
            {pendingCount > 0 && (
              <span className="text-orange-600 font-medium">
                {" "}
                · {pendingCount} pending
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.key
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
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
                <th className="px-6 py-3">Featured</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    No reviews found.
                  </td>
                </tr>
              )}
              {filtered.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {review.name}
                    {review.entityLabel && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {review.entityLabel}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-md">
                    <p className="line-clamp-2">{review.review}</p>
                    {review.title && (
                      <p className="text-xs text-gray-400 mt-1">
                        {review.title}
                      </p>
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
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        updateReview(review._id, {
                          featuredOnHomepage: !review.featuredOnHomepage,
                        })
                      }
                      disabled={busyId === review._id}
                      title={
                        review.featuredOnHomepage
                          ? "Unfeature from homepage"
                          : "Feature on homepage"
                      }
                      className={`inline-flex items-center gap-1.5 border rounded-lg text-xs font-medium px-2.5 py-1.5 transition-colors disabled:opacity-50 ${
                        review.featuredOnHomepage
                          ? "border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {review.featuredOnHomepage ? (
                        <Star className="h-3.5 w-3.5" />
                      ) : (
                        <StarOff className="h-3.5 w-3.5" />
                      )}
                      {review.featuredOnHomepage ? "Featured" : "Feature"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {busyId === review._id && (
                        <Loader2 className="h-4 w-4 text-orange-500 animate-spin" />
                      )}
                      {review.status === "pending" ? (
                        <button
                          onClick={() =>
                            updateReview(review._id, { status: "approved" })
                          }
                          disabled={busyId === review._id}
                          className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors disabled:opacity-50"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updateReview(review._id, { status: "pending" })
                          }
                          disabled={busyId === review._id}
                          className="inline-flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors disabled:opacity-50"
                        >
                          <X className="h-3.5 w-3.5" />
                          Decline
                        </button>
                      )}
                      <Link
                        href={`/admin/reviews/${review._id}`}
                        className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs font-medium px-2.5 py-1.5 rounded transition-colors"
                        title="View"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>
                      <Link
                        href={`/admin/reviews/${review._id}/edit`}
                        className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:bg-orange-50 text-xs font-medium px-2.5 py-1.5 rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteReview(review._id)}
                        disabled={busyId === review._id}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-medium px-2.5 py-1.5 rounded transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}