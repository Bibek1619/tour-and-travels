import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";
import { 
  Mountain, 
  Calendar, 
  TrendingUp, 
  Users, 
  MapPin, 
  Clock,
  DollarSign,
  Star
} from "lucide-react";
import { getAllToursApi } from "@/api/tourApi";
import toast from "react-hot-toast";

const TrekPackagesPage = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTreks();
  }, []);

  const fetchTreks = async () => {
    try {
      setLoading(true);
      const response = await getAllToursApi({ 
        category: "trek",
        status: "published" 
      });
      setTreks(response.data || []);
    } catch (error) {
      console.error("Error fetching treks:", error);
      toast.error("Failed to load trek packages");
    } finally {
      setLoading(false);
    }
  };

  const filterTreks = () => {
    if (filter === "all") return treks;
    return treks.filter(trek => trek.difficulty?.toLowerCase() === filter);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "bg-green-100 text-green-700",
      moderate: "bg-yellow-100 text-yellow-700",
      hard: "bg-red-100 text-red-700",
      challenging: "bg-orange-100 text-orange-700"
    };
    return colors[difficulty?.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section
          className="relative h-[450px] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Nepal Trek Packages
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mb-4">
                Experience the majestic Himalayas with our carefully curated trekking adventures
              </p>
              <div className="flex items-center justify-center gap-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Mountain className="w-5 h-5" />
                  <span>Expert Guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Small Groups</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span>Best Routes</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Browse Trek Packages
              </h2>
              <div className="flex gap-2">
                {["all", "easy", "moderate", "hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilter(level)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      filter === level
                        ? "bg-orange-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trek Cards Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-64 bg-gray-300"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filterTreks().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterTreks().map((trek, index) => (
                  <motion.div
                    key={trek._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/treks/${trek.slug}`}>
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={
                              trek.images?.[0] ||
                              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                            }
                            alt={trek.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                                trek.difficulty
                              )}`}
                            >
                              {trek.difficulty || "Moderate"}
                            </span>
                          </div>
                          {trek.rating > 0 && (
                            <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-semibold">{trek.rating}</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-orange-600 transition-colors">
                            {trek.title}
                          </h3>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <MapPin className="w-4 h-4 text-orange-600" />
                              <span>{trek.location || "Nepal"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <Clock className="w-4 h-4 text-orange-600" />
                              <span>{trek.durationDays} Days</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <TrendingUp className="w-4 h-4 text-orange-600" />
                              <span>Max Altitude: {trek.maxAltitude || "N/A"}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {trek.shortOverview || "Experience the beauty of the Himalayas"}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-green-600" />
                              <span className="text-2xl font-bold text-gray-800">
                                ${trek.price}
                              </span>
                              <span className="text-sm text-gray-500">/person</span>
                            </div>
                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Mountain className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No Trek Packages Found
                </h3>
                <p className="text-gray-500">
                  Try changing the filter or check back later for new treks.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Why Trek with Us Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Why Trek with Adventure Nepal?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: <Mountain className="w-10 h-10" />,
                  title: "Expert Guides",
                  desc: "Certified and experienced mountain guides"
                },
                {
                  icon: <Users className="w-10 h-10" />,
                  title: "Small Groups",
                  desc: "Maximum 12 trekkers per group"
                },
                {
                  icon: <Star className="w-10 h-10" />,
                  title: "Quality Service",
                  desc: "Best accommodations and meals"
                },
                {
                  icon: <Calendar className="w-10 h-10" />,
                  title: "Flexible Dates",
                  desc: "Custom departure dates available"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-6 rounded-xl hover:bg-orange-50 transition-all duration-300"
                >
                  <div className="text-orange-600 flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default TrekPackagesPage;
