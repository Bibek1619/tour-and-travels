"use client";

import Link from "next/link";
import { Star, Clock, MapPin, ChevronRight } from "lucide-react";
import { formatDuration, type Tour } from "@/lib/types";

interface TourCardListProps {
  tours: Tour[];
}

export default function TourCard({ tours }: TourCardListProps) {
  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          No tour packages available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => {
        const rating = tour.rating ?? 0;
        const reviewCount = tour.reviewsCount ?? 0;
        return (
          <Link key={tour._id} href={`/tours/${tour.slug}`}>
            <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={
                    tour.images?.[0] ||
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                  }
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  Popular
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Rating */}
                {(rating > 0 || reviewCount > 0) && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">{rating}</span>
                    {reviewCount > 0 && (
                      <span className="text-sm text-gray-500">
                        ({reviewCount} reviews)
                      </span>
                    )}
                  </div>
                )}

                {/* Title */}
                <h3 className="font-bold text-xl text-gray-800 mb-4 line-clamp-2 hover:text-orange-600 transition-colors">
                  {tour.title}
                </h3>

                {/* Location and Duration */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span>{tour.location || "Nepal"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="font-semibold">
                      {formatDuration(tour.durationDays, tour.durationText)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {tour.shortOverview ||
                    "Explore Nepal with this amazing tour package."}
                </p>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-amber-600 font-medium mb-1">
                      Price varies with group size
                    </p>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-orange-600">
                      Rs {tour.price?.toLocaleString("en-IN")}
                      <span className="text-sm font-normal text-gray-500">
                        {" "}
                        / person
                      </span>
                    </p>
                  </div>
                  <span className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm">
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
