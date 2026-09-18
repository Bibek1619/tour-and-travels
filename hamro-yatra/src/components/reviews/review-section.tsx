"use client";

import { useState, useEffect, useRef } from "react";
import {
  Star,
  X,
  User,
  Send,
  CheckCircle2,
  MessageSquare,
  MapPin,
} from "lucide-react";

type ReviewItem = {
  _id: string;
  name?: string;
  rating?: number;
  review?: string;
  createdAt?: string;
};

export default function ReviewSection({
  entityType,
  entityId,
  entityTitle,
  noun = "experience",
  initialReviews,
  initialTotal,
  initialAvgRating,
}: {
  entityType: "tour" | "vehicle" | "adventure";
  entityId: string;
  entityTitle: string;
  noun?: string;
  initialReviews?: ReviewItem[];
  initialTotal?: number;
  initialAvgRating?: number;
}) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews ?? []);
  const [totalReviews, setTotalReviews] = useState(initialTotal ?? 0);
  const [avgRating, setAvgRating] = useState(initialAvgRating ?? 0);
  const [loadingReviews, setLoadingReviews] = useState(
    initialReviews === undefined
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const hasInitial = useRef(initialReviews !== undefined);

  const [showReview, setShowReview] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!entityId) return;

    if (hasInitial.current) {
      hasInitial.current = false;
      return;
    }

    (async () => {
      try {
        const res = await fetch(`/api/reviews/${entityType}/${entityId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (!cancelled && data.success) {
          setReviews(data.data || []);
          setTotalReviews(data.total || 0);
          setAvgRating(data.avgRating || 0);
        }
      } catch (err) {
        if (!cancelled) console.error("Error fetching reviews:", err);
      } finally {
        if (!cancelled) setLoadingReviews(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [entityType, entityId, refreshKey]);

  const openReview = () => {
    setError("");
    setShowReview(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (!review.trim()) {
      setError("Please write your review.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [entityType]: entityId,
          name: name.trim(),
          email: email.trim(),
          location: location.trim(),
          rating,
          review: review.trim(),
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }
      setName("");
      setEmail("");
      setLocation("");
      setRating(0);
      setReview("");
      setThanks(true);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowReview(false);
    setThanks(false);
    setName("");
    setEmail("");
    setRating(0);
    setReview("");
    setError("");
  };

  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* ── REVIEW SECTION (list + summary + "Write a Review" button) ── */}
      <div className="bg-white rounded-xl shadow p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {entityTitle ? `Enjoyed "${entityTitle}"?` : "Enjoyed your trip?"}
            </h2>
            <p className="text-gray-600">
              Share your {noun} with us and help others plan their trip.
            </p>
          </div>
          <button
            onClick={openReview}
            className="flex items-center gap-3 font-semibold px-8 py-4 rounded-full transition-all shadow-lg group bg-orange-600 text-white hover:bg-orange-700"
          >
            <Star className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
            Write a Review
          </button>
        </div>

        {/* Rating Summary */}
        {totalReviews > 0 && (
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(avgRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-gray-800">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">
              Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Reviews List */}
        {loadingReviews ? (
          <p className="text-gray-500 py-6 text-center">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <div className="space-y-5">
            {reviews.map((r) => (
              <div key={r._id} className="bg-gray-50 rounded-lg p-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                      {r.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{r.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(r.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= (r.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{r.review}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>

      {/* ── REVIEW POPUP (modal form) ── */}
      {showReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Give Your Review</h3>
                {entityTitle && (
                  <p className="text-orange-100 text-sm mt-0.5 line-clamp-1">
                    Share your experience with &quot;{entityTitle}&quot;
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {thanks ? (
              /* Thank You State */
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  Thanks for reviewing us!
                </h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We appreciate you taking the time to share your experience
                  with us.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Review Form */
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125"
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 text-sm font-semibold text-gray-600">
                      {rating > 0 ? `${rating}/5` : "Select a rating"}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Location <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. USA, Australia, Nepal"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Review */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows={4}
                      placeholder="Tell us about your experience..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Submit Review
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}