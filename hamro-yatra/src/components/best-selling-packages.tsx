"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Star, Clock, MapPin, TrendingUp, ChevronRight, ChevronLeft } from "lucide-react";
import type { Tour } from "@/lib/types";
import { formatDuration } from "@/lib/types";
import { getCardImage } from "@/lib/cloudinary";

export function BestSellingPackages({
  tours,
  content,
}: {
  tours: Tour[];
  content?: { eyebrow?: string; title?: string; subtitle?: string; image?: string };
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(el.scrollLeft + dir * 320, max));
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const section = {
    eyebrow: "Most Popular",
    title: "Best Selling Trekking Packages",
    subtitle: "Walk along the best selling trekking routes in the Himalayas of Nepal",
    ...content,
  };

  const packages = [...tours]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {section.image && (
          <Image
            src={section.image}
            alt={section.title}
            width={1600}
            height={400}
            className="w-full max-h-64 object-cover rounded-xl mb-10"
          />
        )}
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
              {section.eyebrow}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        {/* Empty State */}
        {packages.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">
              No packages available at the moment. Check back soon!
            </p>
          </div>
        )}

        {/* Packages Grid */}
        {packages.length > 0 && (
          <div className="relative group">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 pb-2 touch-pan-x scrollbar-orange"
            >
            {packages.map((pkg) => {
              const rating = pkg.rating ?? 0;
              const reviewCount = pkg.reviewsCount ?? 0;
              return (
                <Link
                  key={pkg._id}
                  href={
                    pkg.category === "trek"
                      ? `/treks/${pkg.slug}`
                      : `/tours/${pkg.slug}`
                  }
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-64 sm:w-72 shrink-0"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={getCardImage(pkg.images?.[0])}
                      alt={pkg.title}
                      fill
                      sizes="288px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Best Seller Badge */}
                    <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Best Selling
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
                      <Clock className="w-3.5 h-3.5 text-orange-600" />
                      <span className="text-xs font-bold text-gray-900">
                        {formatDuration(pkg.durationDays, pkg.durationText)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Rating */}
                    {(rating > 0 || reviewCount > 0) && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-gray-900 text-sm">{rating}</span>
                        {reviewCount > 0 && (
                          <span className="text-xs text-gray-500">
                            ({reviewCount})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                      {pkg.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span>{pkg.location || "Nepal"}</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                          From
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          ${pkg.price}
                        </span>
                        <span className="text-gray-500 text-xs"> / person</span>
                      </div>
                      <div className="flex items-center gap-1 text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            </div>

            {/* Scroll arrows (appear on hover) */}
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByAmount(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByAmount(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/trek-packages"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Trekking Packages
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BestSellingPackages;