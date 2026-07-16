import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
  MapPin,
  Clock,
  Check,
  X,
  Mountain,
  Star,
  Phone,
  Mail,
  ChevronLeft
} from "lucide-react";
import { getAllToursApi } from "@/api/tourApi";
import toast from "react-hot-toast";

const PakagesDetailsPage = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTourDetails();
  }, [slug]);

  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      const response = await getAllToursApi({ 
        category: "tour",
        status: "published" 
      });
      const tourData = response.data?.find(t => t.slug === slug);
      if (tourData) {
        setTour(tourData);
      } else {
        toast.error("Tour not found");
      }
    } catch (error) {
      console.error("Error fetching tour:", error);
      toast.error("Failed to load tour details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tour details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!tour) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <Mountain className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Tour Not Found</h2>
          <Link to="/tours" className="mt-4 text-orange-600 hover:underline flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Tour Packages
          </Link>
        </div>
      </MainLayout>
    );
  }

  const images = tour.images?.length > 0 
    ? tour.images 
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
              <Link to="/tours" className="hover:text-orange-600">Tour Packages</Link>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span className="text-gray-800 font-medium">{tour.title}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{tour.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span>{tour.durationDays} Days</span>
                  </div>
                  {tour.rating > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-sm">({tour.reviewsCount} reviews)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Gallery */}
              <div className="bg-white rounded-lg overflow-hidden shadow">
                <div className="relative h-[400px]">
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
                          selectedImage === idx ? "border-orange-600" : "border-gray-200"
                        }`}
                      >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b">
                  <div className="flex overflow-x-auto">
                    {["overview", "itinerary", "included", "excluded", "guide"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === tab
                            ? "border-orange-600 text-orange-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        {tab === "guide" ? "Tour Guide" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">{tour.shortOverview}</p>
                        {tour.fullOverview?.intro && (
                          <p className="text-gray-700 leading-relaxed">{tour.fullOverview.intro}</p>
                        )}
                      </div>

                      {tour.highlights?.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-4">Highlights</h3>
                          <ul className="grid md:grid-cols-2 gap-3">
                            {tour.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "itinerary" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Itinerary</h2>
                      <div className="space-y-6">
                        {tour.itinerary?.map((day, idx) => (
                          <div key={idx} className="border-l-4 border-orange-600 pl-6 pb-6 last:pb-0">
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
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Included</h2>
                      <ul className="space-y-3">
                        {tour.included?.length > 0 ? (
                          tour.included.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-500">No inclusions specified</p>
                        )}
                      </ul>
                    </div>
                  )}

                  {activeTab === "excluded" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Not Included</h2>
                      <ul className="space-y-3">
                        {tour.excluded?.length > 0 ? (
                          tour.excluded.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-500">No exclusions specified</p>
                        )}
                      </ul>
                    </div>
                  )}

                  {activeTab === "guide" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Meet Your Tour Guide</h2>
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
                              <h3 className="text-xl font-bold text-gray-800 mb-1">Rajesh Sharma</h3>
                              <p className="text-orange-600 font-semibold mb-2">Senior Mountain Guide</p>
                              <p className="text-sm text-gray-600 mb-3">
                                Licensed by Nepal Tourism Board | 15+ years experience
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
                              <strong className="text-gray-800">Specialization:</strong> High altitude trekking, Cultural tours
                            </p>
                            <p>
                              <strong className="text-gray-800">Languages:</strong> English, Hindi, Nepali
                            </p>
                            <p>
                              <strong className="text-gray-800">Certifications:</strong> Wilderness First Aid, Mountain Guide License
                            </p>
                          </div>
                          <p className="text-gray-600 text-sm mt-4 italic">
                            "I love sharing the beauty of Nepal with travelers from around the world. Every trek is a new adventure!"
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
                              <h3 className="text-xl font-bold text-gray-800 mb-1">Suresh Gurung</h3>
                              <p className="text-blue-600 font-semibold mb-2">Certified Trekking Guide</p>
                              <p className="text-sm text-gray-600 mb-3">
                                Licensed by Nepal Tourism Board | 10+ years experience
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
                              <strong className="text-gray-800">Specialization:</strong> Wildlife tours, Jungle safaris
                            </p>
                            <p>
                              <strong className="text-gray-800">Languages:</strong> English, Nepali, Japanese
                            </p>
                            <p>
                              <strong className="text-gray-800">Certifications:</strong> Eco-tourism Guide, First Aid Certified
                            </p>
                          </div>
                          <p className="text-gray-600 text-sm mt-4 italic">
                            "Born and raised in the mountains, I'm passionate about showing you the hidden gems of Nepal."
                          </p>
                        </div>
                      </div>

                      {/* Guide Info Section */}
                      <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">About Our Guides</h3>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>All guides are licensed by Nepal Tourism Board</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Wilderness First Aid and CPR certified</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Extensive knowledge of local culture, history, and geography</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Fluent in multiple languages including English</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Committed to responsible and sustainable tourism</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* Booking Card */}
                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="mb-6">
                    <p className="text-gray-600 mb-2">Starting from</p>
                    <p className="text-4xl font-bold text-orange-600">${tour.price}</p>
                    <p className="text-gray-500 text-sm">per person</p>
                  </div>

                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition-colors mb-4">
                    Book Now
                  </button>

                  <div className="space-y-3 pt-4 border-t">
                    <a href="tel:+9779841480794" className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors">
                      <Phone className="w-5 h-5" />
                      <span>+977 984-1480794</span>
                    </a>
                    <a href="mailto:info@adventurenepal.com" className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors">
                      <Mail className="w-5 h-5" />
                      <span>info@adventurenepal.com</span>
                    </a>
                  </div>
                </div>

                {/* Tour Facts */}
                <div className="bg-white rounded-lg p-6 shadow">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Tour Facts</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold text-gray-800">{tour.durationDays} Days</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-gray-600">Group Size</span>
                      <span className="font-semibold text-gray-800">2-12 People</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-gray-600">Difficulty</span>
                      <span className="font-semibold text-gray-800">{tour.difficulty || "Easy"}</span>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-lg p-6 shadow">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Why Choose Us</h3>
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
    </MainLayout>
  );
};

export default PakagesDetailsPage;
