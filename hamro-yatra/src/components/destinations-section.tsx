"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { MapPin, Star, Clock, ChevronRight, Compass, ChevronLeft } from "lucide-react";
import { formatDuration, type Tour } from "@/lib/types";
import { getCardImage } from "@/lib/cloudinary";

export const DestinationsSection = ({
  destinations,
  content,
}: {
  destinations: Tour[];
  content?: { eyebrow?: string; title?: string; subtitle?: string; image?: string };
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(el.scrollLeft + dir * 320, max));
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const section = {
    eyebrow: "Explore Nepal",
    title: "Popular Tour Packages",
    subtitle:
      "Discover Nepal's most breathtaking destinations with our expertly crafted tour packages.",
    ...content,
  };

  return (
    <section className="py-20 bg-gray-50">
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
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Compass className="w-6 h-6 text-green-600" />
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
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

        {/* Horizontal Scrolling Cards */}
        <div className="relative group">
          {/* Scroll Buttons */}
          <button
            onClick={() => scrollByAmount(-1)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-3 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => scrollByAmount(1)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-3 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-2 touch-pan-x scrollbar-orange"
          >
            {destinations.map((dest) => {
              const rating = dest.rating ?? 0;
              const reviewCount = dest.reviewsCount ?? 0;
              return (
                <Link
                  key={dest._id}
                  href={`/tours/${dest.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-64 sm:w-72 shrink-0"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={getCardImage(dest.images?.[0])}
                      alt={dest.title}
                      width={288}
                      height={160}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Popular Badge */}
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-2.5 py-1 rounded-full text-xs font-bold">
                      Popular
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                      <Clock className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-xs font-bold text-gray-900">
                        {formatDuration(dest.durationDays, dest.durationText)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Rating */}
                    {(rating > 0 || reviewCount > 0) && (
                      <div className="flex items-center gap-1.5 mb-2">
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
                        <span className="text-sm font-bold text-gray-900">{rating}</span>
                        {reviewCount > 0 && (
                          <span className="text-xs text-gray-500">
                            ({reviewCount})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                      {dest.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-green-500" />
                      <span>{dest.location || "Nepal"}</span>
                    </div>

                    {/* Price */}
                    <div className="pt-3 border-t border-gray-100">
                      <span className="text-[10px] text-amber-600 font-medium block mb-1">
                        Price varies with group size
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-gray-500 uppercase">From</span>
                        <span className="text-xl font-bold text-gray-900">
                          Rs {dest.price?.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs">/ person</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Tour Packages
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;