import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";
import { 
  Mountain, 
  MapPin,
  ArrowRight
} from "lucide-react";
import { getAllToursApi } from "@/api/tourApi";
import toast from "react-hot-toast";

const TrekPackagesPage = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Trekking regions with images and descriptions
  const trekRegions = [
    {
      id: "everest",
      name: "Everest Region Trekking",
      description: "Home to the world's highest peak, the Everest region offers iconic treks with stunning mountain views.",
      image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
      keyword: "everest"
    },
    {
      id: "annapurna",
      name: "Annapurna Region Trekking",
      description: "Diverse landscapes from subtropical forests to alpine meadows with spectacular Annapurna range views.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      keyword: "annapurna"
    },
    {
      id: "langtang",
      name: "Langtang Region Trekking",
      description: "Close to Kathmandu, offers beautiful valleys, Tamang culture, and stunning mountain scenery.",
      image: "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=800",
      keyword: "langtang"
    },
    {
      id: "manaslu",
      name: "Manaslu Region Trekking",
      description: "Remote and less crowded, circling the eighth highest mountain with authentic cultural experiences.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      keyword: "manaslu"
    }
  ];

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

  // Count treks per region
  const getRegionTrekCount = (keyword) => {
    return treks.filter(trek => 
      trek.title?.toLowerCase().includes(keyword) || 
      trek.location?.toLowerCase().includes(keyword) ||
      trek.slug?.toLowerCase().includes(keyword)
    ).length;
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section
          className="relative h-[400px] bg-cover bg-center"
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Nepal Trekking Regions
              </h1>
              <p className="text-lg text-white/90 max-w-3xl">
                Explore Nepal's diverse trekking regions, each offering unique landscapes and cultural experiences
              </p>
            </motion.div>
          </div>
        </section>

        {/* Trekking Regions Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Choose Your Trekking Region
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select a region to explore available trekking packages. Each region offers unique mountain views, cultural experiences, and adventure levels.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-6 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trekRegions.map((region, index) => {
                  const trekCount = getRegionTrekCount(region.keyword);
                  
                  return (
                    <motion.div
                      key={region.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link 
                        to={`/trek-packages/${region.id}`}
                        className="block group"
                      >
                        <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden">
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={region.image}
                              alt={region.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            
                            {/* Trek count badge */}
                            {trekCount > 0 && (
                              <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {trekCount} Trek{trekCount !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                              {region.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {region.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-orange-600 font-semibold">
                              <span className="text-sm">Explore Treks</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-white py-12 border-t">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Mountain className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">Multiple Regions</h3>
                <p className="text-gray-600 text-sm">Choose from 4 major trekking regions in Nepal</p>
              </div>
              <div>
                <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">Diverse Routes</h3>
                <p className="text-gray-600 text-sm">From easy valley treks to challenging high-altitude adventures</p>
              </div>
              <div>
                <Mountain className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">Expert Guidance</h3>
                <p className="text-gray-600 text-sm">Licensed guides with extensive mountain experience</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default TrekPackagesPage;
