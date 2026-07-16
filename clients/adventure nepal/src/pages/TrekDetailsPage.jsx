import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";
import {
  MapPin,
  Clock,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Check,
  X,
  Mountain,
  Star,
  Phone,
  Mail,
  Share2,
  Heart,
  ChevronLeft,
  Award,
  Shield
} from "lucide-react";
import { getAllToursApi } from "@/api/tourApi";
import toast from "react-hot-toast";

const TrekDetailsPage = () => {
  const { slug } = useParams();
  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchTrekDetails();
  }, [slug]);

  const fetchTrekDetails = async () => {
    try {
      setLoading(true);
      const response = await getAllToursApi({ 
        category: "trek",
        status: "published" 
      });
      const trekData = response.data?.find(t => t.slug === slug);
      if (trekData) {
        setTrek(trekData);
      } else {
        toast.error("Trek not found");
      }
    } catch (error) {
      console.error("Error fetching trek:", error);
      toast.error("Failed to load trek details");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "bg-green-100 text-green-700 border-green-300",
      moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
      hard: "bg-red-100 text-red-700 border-red-300",
      challenging: "bg-orange-100 text-orange-700 border-orange-300"
    };
    return colors[difficulty?.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (!trek) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Mountain className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Trek Not Found</h2>
          <Link to="/trek-packages" className="mt-4 text-orange-600 hover:underline">
            ← Back to Trek Packages
          </Link>
        </div>
      </MainLayout>
    );
  }

  const images = trek.images?.length > 0 
    ? trek.images 
    : ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-orange-600">Home</Link>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <Link to="/trek-packages" className="hover:text-orange-600">Trek Packages</Link>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span className="text-gray-800 font-medium">{trek.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Section with Images */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg overflow-hidden shadow"
              >
                <div className="relative h-[400px]">
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
                          selectedImage === idx ? "border-orange-600" : "border-gray-200"
                        }`}
                      >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Right Column - Trek Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">{trek.title}</h1>
                  <p className="text-gray-600 text-lg">{trek.shortOverview}</p>
                </div>

                {/* Quick Facts */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="text-xl font-bold text-gray-800">{trek.durationDays} Days</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Max Altitude</p>
                        <p className="text-xl font-bold text-gray-800">{trek.maxAltitude || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="text-lg font-bold text-gray-800">{trek.location || "Nepal"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Best Season</p>
                        <p className="text-lg font-bold text-gray-800">{trek.bestSeason || "All Year"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Booking */}
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-xl text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-orange-100 text-sm">Starting From</p>
                      <div className="flex items-baseline gap-2">
                        <DollarSign className="w-8 h-8" />
                        <span className="text-5xl font-bold">{trek.price}</span>
                        <span className="text-xl text-orange-100">/person</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-white text-orange-600 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-all duration-300 shadow-lg">
                    Book Now
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                    <button className="flex items-center gap-2 hover:text-orange-200 transition-colors">
                      <Heart className="w-5 h-5" />
                      Save
                    </button>
                    <button className="flex items-center gap-2 hover:text-orange-200 transition-colors">
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Contact Options */}
                <div className="grid grid-cols-2 gap-4">
                  <a href="tel:+9779841480794" className="flex items-center gap-2 justify-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                    <Phone className="w-5 h-5" />
                    Call Us
                  </a>
                  <a href="mailto:info@adventurenepal.com" className="flex items-center gap-2 justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <Mail className="w-5 h-5" />
                    Email Us
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="bg-white border-y sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8 overflow-x-auto">
              {["overview", "itinerary", "included", "excluded", "guide"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab === "guide" ? "Trek Guide" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-8 shadow-lg"
                  >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {trek.shortOverview}
                      </p>
                      {trek.fullOverview?.intro && (
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-3">Introduction</h3>
                          <p className="text-gray-700">{trek.fullOverview.intro}</p>
                        </div>
                      )}
                      {trek.highlights?.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-4">Trek Highlights</h3>
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
                  </motion.div>
                )}

                {activeTab === "itinerary" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-8 shadow-lg"
                  >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Detailed Itinerary</h2>
                    <div className="space-y-6">
                      {trek.itinerary?.map((day, idx) => (
                        <div key={idx} className="relative pl-8 pb-8 border-l-2 border-orange-200 last:border-l-0 last:pb-0">
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
                  </motion.div>
                )}

                {activeTab === "included" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-8 shadow-lg"
                  >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">What's Included</h2>
                    <ul className="space-y-4">
                      {trek.included?.length > 0 ? (
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
                  </motion.div>
                )}

                {activeTab === "excluded" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-8 shadow-lg"
                  >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">What's Not Included</h2>
                    <ul className="space-y-4">
                      {trek.excluded?.length > 0 ? (
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
                  </motion.div>
                )}

                {activeTab === "guide" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-8 shadow-lg"
                  >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Your Trek Guide</h2>
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
                            <h3 className="text-xl font-bold text-gray-800 mb-1">Mingma Sherpa</h3>
                            <p className="text-orange-600 font-semibold mb-2">Senior Trek Guide</p>
                            <p className="text-sm text-gray-600 mb-3">
                              Licensed by Nepal Tourism Board | 18+ years experience
                            </p>
                            <div className="flex gap-3">
                              <a 
                                href="https://www.facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                                title="Facebook"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                              </a>
                              <a 
                                href="https://www.instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-colors"
                                title="Instagram"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                              </a>
                              <a 
                                href="mailto:guide@adventurenepal.com"
                                className="w-8 h-8 bg-gray-700 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
                                title="Email"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong className="text-gray-800">Specialization:</strong> High altitude trekking, Everest region
                          </p>
                          <p>
                            <strong className="text-gray-800">Languages:</strong> English, Nepali, Sherpa
                          </p>
                          <p>
                            <strong className="text-gray-800">Certifications:</strong> Mountain Guide License, Wilderness First Responder
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm mt-4 italic">
                          "Growing up in the mountains, I've been trekking since childhood. Let me share my home with you!"
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
                            <h3 className="text-xl font-bold text-gray-800 mb-1">Pemba Tamang</h3>
                            <p className="text-blue-600 font-semibold mb-2">Certified Trekking Guide</p>
                            <p className="text-sm text-gray-600 mb-3">
                              Licensed by Nepal Tourism Board | 12+ years experience
                            </p>
                            <div className="flex gap-3">
                              <a 
                                href="https://www.facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                                title="Facebook"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                              </a>
                              <a 
                                href="https://www.instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-colors"
                                title="Instagram"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                              </a>
                              <a 
                                href="mailto:guide@adventurenepal.com"
                                className="w-8 h-8 bg-gray-700 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
                                title="Email"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong className="text-gray-800">Specialization:</strong> Annapurna circuit, Langtang region
                          </p>
                          <p>
                            <strong className="text-gray-800">Languages:</strong> English, Nepali, French
                          </p>
                          <p>
                            <strong className="text-gray-800">Certifications:</strong> Advanced First Aid, Eco-tourism Guide
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm mt-4 italic">
                          "I love introducing travelers to Nepal's stunning trails and warm hospitality. Every trek is unforgettable!"
                        </p>
                      </div>
                    </div>

                    {/* Guide Info Section */}
                    <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">About Our Trek Guides</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>All guides are licensed by Nepal Tourism Board</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>High altitude training and mountain rescue certified</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Deep knowledge of mountain ecology and culture</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Fluent in multiple languages for better communication</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Committed to sustainable trekking practices</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Trust Badges */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">Certified Guides</p>
                        <p className="text-sm text-gray-600">Experienced and licensed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">Safety First</p>
                        <p className="text-sm text-gray-600">Full insurance coverage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">Small Groups</p>
                        <p className="text-sm text-gray-600">Max 12 trekkers</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Need Help */}
                <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-6 shadow-lg text-white">
                  <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                  <p className="text-orange-100 mb-4">Have questions about this trek? Our experts are here to help!</p>
                  <div className="space-y-3">
                    <a href="tel:+9779841480794" className="flex items-center gap-3 bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors">
                      <Phone className="w-5 h-5" />
                      <span>+977 984-1480794</span>
                    </a>
                    <a href="mailto:info@adventurenepal.com" className="flex items-center gap-3 bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors">
                      <Mail className="w-5 h-5" />
                      <span>info@adventurenepal.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default TrekDetailsPage;
