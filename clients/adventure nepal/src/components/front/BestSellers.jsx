import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, MapPin, TrendingUp } from "lucide-react";
import { getAllToursApi } from "@/api/tourApi";

const BestSellers = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const response = await getAllToursApi({ status: "published" });
      // Get top rated packages (mix of tours and treks)
      const topRated = response.data
        ?.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 6);
      setPackages(topRated || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Best Sellers for 2026
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our most popular trekking and tour packages chosen by thousands of satisfied travelers
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Link
              key={pkg._id}
              to={pkg.category === "trek" ? `/treks/${pkg.slug}` : `/tours/${pkg.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pkg.images?.[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Best Seller
                  </div>
                  {/* Rating Badge */}
                  {pkg.rating > 0 && (
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-800">{pkg.rating}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {pkg.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {pkg.shortOverview}
                  </p>

                  {/* Details */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span>{pkg.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span>{pkg.durationDays} Days</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-500">Starting from</span>
                      <div className="text-2xl font-bold text-orange-600">${pkg.price}</div>
                    </div>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/trek-packages"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
