"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  TrendingUp,
  Calendar,
  Check,
  X,
  Mountain,
  Star,
  Phone,
  Mail,
  ChevronLeft,
  MessageCircle,
  Send,
} from "lucide-react";
import { formatDuration, formatSeason, type Tour } from "@/lib/types";
import { getCardImage, getHeroImage } from "@/lib/cloudinary";
import ReviewSection from "@/components/reviews/review-section";
import FaqSection from "@/components/faq-section";
import JsonLd from "@/components/json-ld";
import { tripJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import type { ReviewView } from "@/lib/review-helpers";

export default function TrekDetailClient({
  trek,
  similarTreks,
  initialReviews,
  initialTotalReviews,
  initialAvgRating,
}: {
  trek: Tour;
  similarTreks?: Tour[];
  initialReviews?: ReviewView[];
  initialTotalReviews?: number;
  initialAvgRating?: number;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);

  const images =
    trek.images && trek.images.length > 0
      ? trek.images
      : [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
        ];

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in booking the ${trek.title} trek.\n\n` +
      `Duration: ${trek.durationDays} days\n` +
      `Price: $${trek.price?.toLocaleString("en-US")} per person\n\n` +
      `Can you help me with the booking process?`
  );

  const statFacts = [
    {
      label: "Max Altitude",
      value: trek.maxAltitude || "N/A",
      icon: TrendingUp,
    },
    {
      label: "Duration",
      value: formatDuration(trek.durationDays, trek.durationText),
      icon: Clock,
    },
    {
      label: "Difficulty",
      value: trek.difficulty || "Easy",
      icon: Mountain,
    },
    {
      label: "Best Season",
      value: formatSeason(trek.bestSeason),
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <JsonLd
        data={tripJsonLd({
          title: trek.title,
          description: trek.shortOverview,
          image: getHeroImage(images[0]),
          url: `/treks/${trek.slug}`,
          price: trek.price,
          durationText: trek.durationText,
          durationDays: trek.durationDays,
          location: trek.location,
          category: "trek",
          itineraryCount: trek.itinerary?.length,
          faqs: trek.faqs,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Trek Packages", url: "/trek-packages" },
          { name: trek.title, url: `/treks/${trek.slug}` },
        ])}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">
              Home
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <Link href="/trek-packages" className="hover:text-orange-600">
              Trek Packages
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="text-gray-800 font-medium">{trek.title}</span>
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
                {trek.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span>{trek.location || "Nepal"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span>
                    {formatDuration(trek.durationDays, trek.durationText)}
                  </span>
                </div>
                {trek.rating !== undefined && trek.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{trek.rating}</span>
                    <span className="text-sm">
                      ({trek.reviewsCount} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {statFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-white rounded-lg p-2 sm:p-3 shadow text-center"
                >
                  <fact.icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mx-auto mb-1" />
                  <p className="text-[11px] text-gray-500 mb-0.5">
                    {fact.label}
                  </p>
                  <p className="text-sm font-bold text-gray-800 break-words">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="relative h-56 sm:h-80 lg:h-[400px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[selectedImage]}
                  alt={trek.title}
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  {[
                    "overview",
                    "itinerary",
                    "included",
                    "excluded",
                    "guide",
                  ].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 sm:px-5 py-4 text-sm sm:text-base font-semibold whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === tab
                            ? "border-orange-600 text-orange-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        {tab === "guide"
                          ? "Trek Guide"
                          : tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    )
                  )}
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
                        {trek.shortOverview}
                      </p>
                      {trek.fullOverview?.intro && (
                        <p className="text-gray-700 leading-relaxed">
                          {trek.fullOverview.intro}
                        </p>
                      )}
                    </div>
                    {trek.highlights && trek.highlights.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          Trek Highlights
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-3">
                          {trek.highlights.map((highlight, idx) => (
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
                      Detailed Itinerary
                    </h2>
                    <div className="space-y-6">
                      {trek.itinerary?.map((day, idx) => (
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
                      {trek.included && trek.included.length > 0 ? (
                        trek.included.map((item, idx) => (
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
                      {trek.excluded && trek.excluded.length > 0 ? (
                        trek.excluded.map((item, idx) => (
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

                {activeTab === "guide" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Meet Your Trek Guide
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Guide 1 */}
                      <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100 shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-200 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
                              alt="Guide"
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                              Mingma Sherpa
                            </h3>
                            <p className="text-orange-600 font-semibold mb-2">
                              Senior Trek Guide
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                              Licensed by Nepal Tourism Board | 18+ years
                              experience
                            </p>
                            <div className="flex gap-3">
                              <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              </a>
                              <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              </a>
                              <a
                                href="mailto:guide@hamroyatraadventure.com"
                                className="w-8 h-8 bg-gray-700 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong className="text-gray-800">
                              Specialization:
                            </strong>{" "}
                            High altitude trekking, Everest region
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Languages:
                            </strong>{" "}
                            English, Nepali, Sherpa
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Certifications:
                            </strong>{" "}
                            Mountain Guide License, Wilderness First Responder
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm mt-4 italic">
                          &quot;Growing up in the mountains, I&apos;ve been
                          trekking since childhood. Let me share my home with
                          you!&quot;
                        </p>
                      </div>

                      {/* Guide 2 */}
                      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300"
                              alt="Guide"
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                              Pemba Tamang
                            </h3>
                            <p className="text-blue-600 font-semibold mb-2">
                              Certified Trekking Guide
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                              Licensed by Nepal Tourism Board | 12+ years
                              experience
                            </p>
                            <div className="flex gap-3">
                              <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              </a>
                              <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              </a>
                              <a
                                href="mailto:guide@hamroyatraadventure.com"
                                className="w-8 h-8 bg-gray-700 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong className="text-gray-800">
                              Specialization:
                            </strong>{" "}
                            Annapurna circuit, Langtang region
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Languages:
                            </strong>{" "}
                            English, Nepali, French
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Certifications:
                            </strong>{" "}
                            Advanced First Aid, Eco-tourism Guide
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm mt-4 italic">
                          &quot;I love introducing travelers to Nepal&apos;s
                          stunning trails and warm hospitality. Every trek is
                          unforgettable!&quot;
                        </p>
                      </div>
                    </div>
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
                  <p className="text-sm text-gray-600 mb-2">Starting from</p>
                  <div className="flex items-baseline justify-center gap-2 flex-wrap">
                    <span className="text-4xl sm:text-5xl font-bold text-orange-600 break-all">
                      $ {trek.price?.toLocaleString("en-US")}
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
                    href="mailto:info@hamroyatraadventure.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Email us</div>
                      <div className="font-semibold text-sm">
                        info@hamroyatraadventure.com
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Trek Facts */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Trek Facts
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-800">
                      {formatDuration(trek.durationDays, trek.durationText)}
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
                      {trek.difficulty || "Easy"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Similar Treks */}
              {similarTreks && similarTreks.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Similar Trek Packages
                  </h3>
                  <div className="space-y-4">
                    {similarTreks.slice(0, 3).map((item) => (
                      <Link
                        key={item._id}
                        href={`/treks/${item.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={getCardImage(item.images?.[0])}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDuration(
                              item.durationDays,
                              item.durationText
                            )}
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

        {trek.faqs && trek.faqs.length > 0 && (
          <div className="mt-12 mx-auto max-w-3xl">
            <FaqSection
              title="Frequently Asked Questions"
              subtitle="Everything you need to know before booking this trek"
              items={trek.faqs}
            />
          </div>
        )}

        <div className="mt-10">
          <ReviewSection
            key={`trek-${trek._id}`}
            entityType="tour"
            entityId={trek._id}
            entityTitle={trek.title}
            noun="trek"
            initialReviews={initialReviews}
            initialTotal={initialTotalReviews}
            initialAvgRating={initialAvgRating}
          />
        </div>
      </div>
    </div>
  );
}