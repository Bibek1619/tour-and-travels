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
import type { Tour } from "@/lib/types";

function getDifficultyColor(difficulty?: string) {
  const colors: Record<string, string> = {
    easy: "bg-green-100 text-green-700 border-green-300",
    moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
    hard: "bg-red-100 text-red-700 border-red-300",
    challenging: "bg-orange-100 text-orange-700 border-orange-300",
  };
  return (
    colors[difficulty?.toLowerCase() || ""] ||
    "bg-gray-100 text-gray-700 border-gray-300"
  );
}

export default function TrekDetailClient({ trek }: { trek: Tour }) {
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
      `Price: $${trek.price} per person\n\n` +
      `Can you help me with the booking process?`
  );

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Hero Section with Images */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-6">
            {/* Left Column - Image Gallery */}
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="relative h-[400px] md:h-[520px]">
                <img
                  src={images[selectedImage]}
                  alt={trek.title}
                  className="w-full h-full object-cover"
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
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Trek Info */}
            <div className="space-y-4">
              {/* Compact Trek Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h1 className="text-xl font-bold text-gray-900 mb-2">
                    {trek.title}
                  </h1>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {trek.shortOverview}
                  </p>
                </div>

                {/* Trek Details */}
                <div className="p-4 bg-gray-50 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Duration
                    </span>
                    <span className="font-semibold text-gray-900">
                      {trek.durationDays} Days
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Max Altitude
                    </span>
                    <span className="font-semibold text-gray-900">
                      {trek.maxAltitude || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location
                    </span>
                    <span className="font-semibold text-gray-900">
                      {trek.location || "Nepal"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Best Season
                    </span>
                    <span className="font-semibold text-gray-900 text-right text-xs">
                      {trek.bestSeason || "All Year"}
                    </span>
                  </div>
                </div>

                {/* Price & Booking */}
                <div className="p-4">
                  <div className="text-center mb-4">
                    <p className="text-xs text-gray-500 mb-1">Starting From</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-orange-600">
                        ${trek.price}
                      </span>
                      <span className="text-gray-500 text-xs">/person</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="/contact"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Enquiry
                    </a>
                    <a
                      href={`https://wa.me/9779841480794?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Us
                    </a>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3 mt-3">
                    <div className="text-center text-xs text-gray-500 mb-2">
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
                        <div className="font-semibold text-sm">
                          +977 984-1480794
                        </div>
                      </div>
                    </a>
                    <a
                      href="mailto:info@adventurenepal.com"
                      className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Email us</div>
                        <div className="font-semibold text-sm">
                          info@adventurenepal.com
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-white border-y sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {["overview", "itinerary", "included", "excluded", "guide"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
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
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {activeTab === "overview" && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Overview
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {trek.shortOverview}
                </p>
                {trek.fullOverview?.intro && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Introduction
                    </h3>
                    <p className="text-gray-700">{trek.fullOverview.intro}</p>
                  </div>
                )}
                {trek.highlights && trek.highlights.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Trek Highlights
                    </h3>
                    <ul className="space-y-3">
                      {trek.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "itinerary" && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Detailed Itinerary
              </h2>
              <div className="space-y-6">
                {trek.itinerary?.map((day, idx) => (
                  <div
                    key={idx}
                    className="relative pl-8 pb-8 border-l-2 border-orange-200 last:border-l-0 last:pb-0"
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {day.day}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Day {day.day}: {day.title}
                    </h3>
                    <p className="text-gray-600">{day.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "included" && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What&apos;s Included
              </h2>
              <ul className="space-y-4">
                {trek.included && trek.included.length > 0 ? (
                  trek.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-gray-700 pt-1">{item}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No inclusions specified</p>
                )}
              </ul>
            </div>
          )}

          {activeTab === "excluded" && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What&apos;s Not Included
              </h2>
              <ul className="space-y-4">
                {trek.excluded && trek.excluded.length > 0 ? (
                  trek.excluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <X className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="text-gray-700 pt-1">{item}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No exclusions specified</p>
                )}
              </ul>
            </div>
          )}

          {activeTab === "guide" && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Meet Your Trek Guide
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Guide 1 */}
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-200 flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
                        alt="Guide"
                        className="w-full h-full object-cover"
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
                        Licensed by Nepal Tourism Board | 18+ years experience
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
                          href="mailto:guide@adventurenepal.com"
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
                      <strong className="text-gray-800">Languages:</strong>{" "}
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
                    &quot;Growing up in the mountains, I&apos;ve been trekking
                    since childhood. Let me share my home with you!&quot;
                  </p>
                </div>

                {/* Guide 2 */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300"
                        alt="Guide"
                        className="w-full h-full object-cover"
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
                        Licensed by Nepal Tourism Board | 12+ years experience
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
                          href="mailto:guide@adventurenepal.com"
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
                      <strong className="text-gray-800">Languages:</strong>{" "}
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
                    &quot;I love introducing travelers to Nepal&apos;s stunning
                    trails and warm hospitality. Every trek is
                    unforgettable!&quot;
                  </p>
                </div>
              </div>

              {/* Guide Info Section */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  About Our Trek Guides
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      All guides are licensed by Nepal Tourism Board
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      High altitude training and mountain rescue certified
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Deep knowledge of mountain ecology and culture
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Fluent in multiple languages for better communication
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Committed to sustainable trekking practices
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
