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
import type { Tour } from "@/lib/types";

export default function TourDetailClient({ tour }: { tour: Tour }) {
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
      `Price: $${tour.price} per person\n\n` +
      `Can you help me with the booking process?`
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
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
                  <span>{tour.durationDays} Days</span>
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

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {["overview", "itinerary", "included", "excluded", "guide"].map(
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

                {activeTab === "guide" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Meet Your Tour Guide
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-5 border border-orange-100 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-200 flex-shrink-0">
                            <img
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
                              alt="Guide"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 text-center sm:text-left min-w-0">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                              Rajesh Sharma
                            </h3>
                            <p className="text-orange-600 font-semibold text-sm mb-1">
                              Senior Mountain Guide
                            </p>
                            <p className="text-xs text-gray-500 mb-3">
                              Licensed by Nepal Tourism Board | 15+ years
                            </p>
                            <div className="flex gap-2 justify-center sm:justify-start">
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
                        <div className="space-y-1.5 text-sm text-gray-700">
                          <p>
                            <strong className="text-gray-800">
                              Specialization:
                            </strong>{" "}
                            High altitude trekking, Cultural tours
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Languages:
                            </strong>{" "}
                            English, Hindi, Nepali
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Certifications:
                            </strong>{" "}
                            Wilderness First Aid, Mountain Guide License
                          </p>
                        </div>
                        <p className="text-gray-500 text-xs mt-3 italic">
                          &quot;I love sharing the beauty of Nepal with
                          travelers from around the world.&quot;
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-100 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-200 flex-shrink-0">
                            <img
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300"
                              alt="Guide"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 text-center sm:text-left min-w-0">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                              Suresh Gurung
                            </h3>
                            <p className="text-blue-600 font-semibold text-sm mb-1">
                              Certified Trekking Guide
                            </p>
                            <p className="text-xs text-gray-500 mb-3">
                              Licensed by Nepal Tourism Board | 10+ years
                            </p>
                            <div className="flex gap-2 justify-center sm:justify-start">
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
                        <div className="space-y-1.5 text-sm text-gray-700">
                          <p>
                            <strong className="text-gray-800">
                              Specialization:
                            </strong>{" "}
                            Wildlife tours, Jungle safaris
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Languages:
                            </strong>{" "}
                            English, Nepali, Japanese
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Certifications:
                            </strong>{" "}
                            Eco-tourism Guide, First Aid Certified
                          </p>
                        </div>
                        <p className="text-gray-500 text-xs mt-3 italic">
                          &quot;Born and raised in the mountains, I&apos;m
                          passionate about showing you the hidden gems of
                          Nepal.&quot;
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        About Our Guides
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
                          <span>Wilderness First Aid and CPR certified</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>
                            Extensive knowledge of local culture, history, and
                            geography
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>
                            Fluent in multiple languages including English
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>
                            Committed to responsible and sustainable tourism
                          </span>
                        </li>
                      </ul>
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
                      ${tour.price}
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

              {/* Tour Facts */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Tour Facts
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-800">
                      {tour.durationDays} Days
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

              {/* Why Choose Us */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Why Choose Us
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>26+ Years of Experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>Best Price Guarantee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>Expert Local Guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>24/7 Customer Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
