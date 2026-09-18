"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Check,
  X,
  Star,
  Phone,
  Mail,
  ChevronLeft,
  MessageCircle,
  Send,
} from "lucide-react";
import { Tour, formatDuration } from "@/lib/types";
import { getCardImage, getHeroImage } from "@/lib/cloudinary";
import ReviewSection from "@/components/reviews/review-section";
import FaqSection from "@/components/faq-section";
import JsonLd from "@/components/json-ld";
import { tripJsonLd } from "@/lib/jsonld";
import type { ReviewView } from "@/lib/review-helpers";

export default function TourDetailClient({
  tour,
  similarTours,
  initialReviews,
  initialTotalReviews,
  initialAvgRating,
}: {
  tour: Tour;
  similarTours?: Tour[];
  initialReviews?: ReviewView[];
  initialTotalReviews?: number;
  initialAvgRating?: number;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);

  const images =
    tour.images && tour.images.length > 0
      ? tour.images
      : [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
        ];

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in booking the ${tour.title} tour.\n\n` +
      `Duration: ${tour.durationDays} days\n` +
      `Price: Rs ${tour.price?.toLocaleString("en-IN")} per person\n\n` +
      `Can you help me with the booking process?`
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <JsonLd
        data={tripJsonLd({
          title: tour.title,
          description: tour.shortOverview,
          image: getHeroImage(images[0]),
          url: `/tours/${tour.slug}`,
          price: tour.price,
          durationText: tour.durationText,
          durationDays: tour.durationDays,
          location: tour.location,
          category: tour.category,
          itineraryCount: tour.itinerary?.length,
          faqs: tour.faqs,
        })}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">
              Home
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <Link href="/tours" className="hover:text-orange-600">
              Tour Packages
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="text-gray-800 font-medium">{tour.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 min-w-0">
            {/* Header */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 break-words">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span>
                    {formatDuration(tour.durationDays, tour.durationText)}
                  </span>
                </div>
                {tour.rating !== undefined && tour.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{tour.rating}</span>
                    <span className="text-sm">
                      ({tour.reviewsCount} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="relative h-56 sm:h-80 lg:h-[400px]">
                <img
                  src={images[selectedImage]}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              {images.length > 1 && (
                <div className="p-4 flex gap-3 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? "border-orange-600"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {["overview", "itinerary", "included", "excluded"].map(
                    (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 sm:px-6 py-4 text-sm sm:text-base font-semibold whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab
                          ? "border-orange-600 text-orange-600"
                          : "border-transparent text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                        Overview
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {tour.shortOverview}
                      </p>
                      {tour.fullOverview?.intro && (
                        <p className="text-gray-700 leading-relaxed">
                          {tour.fullOverview.intro}
                        </p>
                      )}
                    </div>
                    {tour.highlights && tour.highlights.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          Highlights
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-3">
                          {tour.highlights.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2"
                            >
                              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "itinerary" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Itinerary
                    </h2>
                    <div className="space-y-6">
                      {tour.itinerary?.map((day, idx) => (
                        <div
                          key={idx}
                          className="border-l-4 border-orange-600 pl-6 pb-6 last:pb-0"
                        >
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            Day {day.day}: {day.title}
                          </h3>
                          <p className="text-gray-600">{day.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "included" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      What&apos;s Included
                    </h2>
                    <ul className="space-y-3">
                      {tour.included && tour.included.length > 0 ? (
                        tour.included.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3"
                          >
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          No inclusions specified
                        </p>
                      )}
                    </ul>
                  </div>
                )}

                {activeTab === "excluded" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      What&apos;s Not Included
                    </h2>
                    <ul className="space-y-3">
                      {tour.excluded && tour.excluded.length > 0 ? (
                        tour.excluded.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3"
                          >
                            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          No exclusions specified
                        </p>
                      )}
                    </ul>
                  </div>
                )}

              </div>
              </div>
            </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 min-w-0">
            <div className="lg:sticky lg:top-4 space-y-4">
              {/* Booking Card */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="text-center mb-6 pb-6 border-b border-orange-200">
                  <p className="text-xs text-gray-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                    Price varies with group size – contact us for a quote
                  </p>
                  <p className="text-sm text-gray-600 mb-2">Starting from</p>
                  <div className="flex items-baseline justify-center gap-2 flex-wrap">
                    <span className="text-4xl sm:text-5xl font-bold text-orange-600 break-all">
                      Rs {tour.price?.toLocaleString("en-IN")}
                    </span>
                    <span className="text-gray-500">/person</span>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Ready to Book?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Contact us for instant booking
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <a
                    href="/contact"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-3 group"
                  >
                    <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Send Enquiry</span>
                  </a>
                  <a
                    href={`https://wa.me/9779841480794?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-3 group"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Book via WhatsApp</span>
                  </a>
                </div>

                <div className="bg-white rounded-lg p-4 space-y-3">
                  <div className="text-center text-xs text-gray-500 mb-3">
                    Or reach us directly
                  </div>
                  <a
                    href="tel:+9779841480794"
                    className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Call us</div>
                      <div className="font-semibold">+977 984-1480794</div>
                    </div>
                  </a>
                  <a
                    href="mailto:info@hamroyatra.com.np"
                    className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Email us</div>
                      <div className="font-semibold text-sm">
                        info@hamroyatra.com.np
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Tour Facts */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Tour Facts
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-800">
                      {formatDuration(tour.durationDays, tour.durationText)}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b">
                    <span className="text-gray-600">Group Size</span>
                    <span className="font-semibold text-gray-800">
                      2-12 People
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b">
                    <span className="text-gray-600">Difficulty</span>
                    <span className="font-semibold text-gray-800">
                      {tour.difficulty || "Easy"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Similar Tours */}
              {similarTours && similarTours.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Similar Tour Packages
                  </h3>
                  <div className="space-y-4">
                    {similarTours.slice(0, 3).map((item) => (
                      <Link
                        key={item._id}
                        href={`/tours/${item.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={getCardImage(item.images?.[0])}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDuration(item.durationDays, item.durationText)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {tour.faqs && tour.faqs.length > 0 && (
          <div className="mt-12 mx-auto max-w-3xl">
            <FaqSection
              title="Frequently Asked Questions"
              subtitle="Everything you need to know before booking this tour"
              items={tour.faqs}
            />
          </div>
        )}

        <div className="mt-10">
          <ReviewSection
            key={`tour-${tour._id}`}
            entityType="tour"
            entityId={tour._id}
            entityTitle={tour.title}
            initialReviews={initialReviews}
            initialTotal={initialTotalReviews}
            initialAvgRating={initialAvgRating}
          />
        </div>
      </div>
    </div>
  );
}
