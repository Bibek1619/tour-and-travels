import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";
import { 
  Mountain, 
  TrendingUp, 
  MapPin, 
  Clock,
  Star,
  ArrowLeft
} from "lucide-react";
import { getAllToursApi } from "@/api/tourApi";
import toast from "react-hot-toast";

const TrekRegionPage = () => {
  const { regionId } = useParams();
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Region configuration
  const regionConfig = {
    everest: {
      name: "Everest Region Trekking",
      description: "Home to the world's highest peak Mount Everest (8,848m), the Everest region offers iconic treks through Sherpa villages, Buddhist monasteries, and stunning Himalayan panoramas.",
      image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1920",
      keyword: "everest"
    },
    annapurna: {
      name: "Annapurna Region Trekking",
      description: "The Annapurna region features diverse landscapes from subtropical forests to alpine meadows, offering spectacular views of the Annapurna massif and rich cultural experiences.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920",
      keyword: "annapurna"
    },
    langtang: {
      name: "Langtang Region Trekking",
      description: "Close to Kathmandu, the Langtang region offers beautiful valleys, Tamang culture, cheese factories, and stunning mountain scenery near the Tibetan border.",
      image: "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=1920",
      keyword: "langtang"
    },
    manaslu: {
      name: "Manaslu Region Trekking",
      description: "Remote and less crowded, the Manaslu region circles the eighth highest mountain in the world, offering authentic cultural experiences and pristine mountain landscapes.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
      keyword: "manaslu"
    }
  };

  const currentRegion = regionConfig[regionId] || regionConfig.everest;

  useEffect(() => {
    fetchTreks();
  }, [regionId]);

  const fetchTreks = async () => {
    try {
      setLoading(true);
      const response = await getAllToursApi({ 
        category: "trek",
        status: "published" 
      });
      
      // Filter treks by region
      const filtered = response.data?.filter(trek => 
        trek.title?.toLowerCase().includes(currentRegion.keyword) || 
        trek.location?.toLowerCase().includes(currentRegion.keyword) ||
        trek.slug?.toLowerCase().includes(currentRegion.keyword)
      ) || [];
      
      setTreks(filtered);
    } catch (error) {
      console.error("Error fetching treks:", error);
      toast.error("Failed to load trek packages");
    } finally {
      setLoading(false);
    }
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
          className="relative h-[400px] bg-cover bg-center"
          style={{
            backgroundImage: `url('${currentRegion.image}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {currentRegion.name}
              </h1>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                {currentRegion.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Back Button */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link 
              to="/trek-packages"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Regions</span>
            </Link>
          </div>
        </section>

        {/* Trek Cards Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Available Treks
              </h2>
              <p className="text-gray-600">
                {treks.length} trek{treks.length !== 1 ? 's' : ''} in {currentRegion.name}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
                    <div className="h-56 bg-gray-300"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-6 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : treks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {treks.map((trek, index) => (
                  <motion.div
                    key={trek._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link to={`/treks/${trek.slug}`} className="block group">
                      <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300">
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden rounded-t-lg">
                          <img
                            src={
                              trek.images?.[0] ||
                              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                            }
                            alt={trek.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                                trek.difficulty
                              )}`}
                            >
                              {trek.difficulty || "Moderate"}
                            </span>
                          </div>
                          {trek.rating > 0 && (
                            <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1 shadow">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-semibold">{trek.rating}</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                            {trek.title}
                          </h3>

                          <div className="space-y-1.5 mb-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                              <span className="truncate">{trek.location || "Nepal"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4 text-orange-600 flex-shrink-0" />
                              <span>{trek.durationDays} Days</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <TrendingUp className="w-4 h-4 text-orange-600 flex-shrink-0" />
                              <span className="truncate">Max Altitude: {trek.maxAltitude || "N/A"}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {trek.shortOverview || "Experience the beauty of the Himalayas"}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t">
                            <div>
                              <span className="text-2xl font-bold text-orange-600">
                                ${trek.price}
                              </span>
                              <span className="text-sm text-gray-500">/person</span>
                            </div>
                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
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
                <Mountain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No Treks Available
                </h3>
                <p className="text-gray-500 mb-4">
                  We're currently updating trek packages for this region.
                </p>
                <Link
                  to="/trek-packages"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Browse All Regions
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default TrekRegionPage;
