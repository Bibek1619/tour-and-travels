import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllReviewsApi, updateReviewApi, deleteReviewApi } from "@/api/reviewApi";
import toast from "react-hot-toast";
import {
  Star,
  Trash2,
  Inbox,
  Clock,
  MessageSquare,
} from "lucide-react";

const STATUS_OPTIONS = [
  { value: "approved", label: "Approved", color: "bg-green-100 text-green-700" },
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-700" },
];

const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Stars = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1.5 text-sm font-semibold text-gray-700">{rating}/5</span>
    </div>
  );
};

const ManageReviews = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", statusFilter],
    queryFn: () => getAllReviewsApi(statusFilter ? { status: statusFilter } : {}),
  });

  const reviews = data?.data || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateReviewApi(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review status updated");
    },
    onError: () => toast.error("Failed to update review"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteReviewApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review deleted");
    },
    onError: () => toast.error("Failed to delete review"),
  });

  const handleDelete = (id) => {
    if (window.confirm("Delete this review?")) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusStyle = (status) =>
    STATUS_OPTIONS.find((s) => s.value === status)?.color ||
    "bg-gray-100 text-gray-600";

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Star className="h-7 w-7 text-orange-600" />
            Reviews
          </h1>
          <p className="text-gray-600">
            Customer reviews submitted from tour pages
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === ""
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            All
          </button>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === s.value
                  ? "bg-orange-600 text-white"
                  : "bg-white text-gray-700 border hover:bg-gray-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border shadow-sm p-6 animate-pulse">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-5 bg-gray-200 rounded w-32" />
                    <div className="h-5 bg-gray-200 rounded w-16" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-48" />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-4 h-4 bg-gray-200 rounded" />
                    ))}
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-36" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 bg-gray-200 rounded w-24" />
                  <div className="h-8 bg-gray-200 rounded w-8" />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 flex gap-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && reviews.length === 0 && (
        <div className="bg-white rounded-xl border p-16 text-center">
          <Inbox className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No reviews yet
          </h3>
          <p className="text-gray-500">
            Customer reviews will appear here.
          </p>
        </div>
      )}

      {/* Reviews List */}
      {!isLoading && reviews.length > 0 && (
        <div className="grid gap-5">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow p-6"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{r.name}</h3>
                    {r.title && (
                      <span className="text-sm text-gray-500 font-normal">— {r.title}</span>
                    )}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(r.status)}`}
                    >
                      {r.status}
                    </span>
                    {r.featuredOnHomepage && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        Homepage
                      </span>
                    )}
                  </div>
                  {r.tour?.title && (
                    <p className="text-sm text-orange-600 font-medium">
                      {r.tour.title}
                    </p>
                  )}
                  <div className="mt-1">
                    <Stars rating={r.rating} />
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    Submitted {formatDate(r.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Feature on Homepage toggle */}
                  <button
                    onClick={() =>
                      updateMutation.mutate({ id: r._id, featuredOnHomepage: !r.featuredOnHomepage })
                    }
                    title={r.featuredOnHomepage ? "Remove from homepage" : "Feature on homepage"}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      r.featuredOnHomepage
                        ? "bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                        : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <Star className={`h-3.5 w-3.5 ${r.featuredOnHomepage ? "fill-yellow-400 text-yellow-400" : ""}`} />
                    {r.featuredOnHomepage ? "Featured" : "Feature"}
                  </button>

                  <select
                    value={r.status}
                    onChange={(e) =>
                      updateMutation.mutate({ id: r._id, status: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Review text */}
              <div className="bg-gray-50 rounded-lg p-3 flex gap-2">
                <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{r.review}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageReviews;
