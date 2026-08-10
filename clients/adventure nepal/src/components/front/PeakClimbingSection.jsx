import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Mountain, TrendingUp, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllToursApi } from '@/api/tourApi';
import { getCardImage } from '@/utils/cloudinaryHelper';

const PeakClimbingSection = () => {
  // Fetch climbing/mountaineering packages
  const { data, isLoading } = useQuery({
    queryKey: ['climbingPackages'],
    queryFn: () => getAllToursApi({ category: 'climbing', limit: 6 }),
  });

  const packages = data?.data || [];

  // Mock reviews
  const getReviewData = (index) => {
    const reviews = [
      { rating: 5.0, count: 5 },
      { rating: 5.0, count: 7 },
      { rating: 4.9, count: 4 },
      { rating: 5.0, count: 6 },
      { rating: 4.8, count: 8 },
      { rating: 5.0, count: 3 },
    ];
    return reviews[index % reviews.length];
  };

  if (packages.length === 0 && !isLoading) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mountain className="w-6 h-6 text-orange-500" />
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
              High Altitude Adventures
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Mountain Climbing & Peak Expeditions
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Climb High Himalayan Peaks with Experience Mountain Climbers
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-700 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        )}

        {/* Packages Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.slice(0, 6).map((pkg, index) => {
              const reviewData = getReviewData(index);
              return (
                <Link
                  key={pkg._id}
                  to={`/tours/${pkg.slug}`}
                  className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={getCardImage(pkg.images?.[0])}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4 bg-orange-600 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-bold">{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(reviewData.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold">{reviewData.rating}</span>
                      <span className="text-sm text-slate-400">({reviewData.count})</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-4 group-hover:text-orange-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                      {pkg.title}
                    </h3>

                    {/* Price & CTA */}
                    <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                          From
                        </span>
                        <span className="text-2xl font-bold text-orange-400">
                          ${pkg.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-orange-400 font-semibold group-hover:gap-2 transition-all">
                        Details
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
          >
            View All Climbing Packages
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PeakClimbingSection;
