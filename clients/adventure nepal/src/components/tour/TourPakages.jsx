import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllToursApi } from "@/api/tourApi";
import { motion } from "framer-motion";

export default function TourPackages() {
  // Fetch tours using React Query - filter only "tour" category
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tours", "tour"],
    queryFn: () => getAllToursApi({ category: "tour", status: "published" }),
  });
  const tours = data?.data || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
            <div className="h-64 bg-gray-300"></div>
            <div className="p-6 space-y-3">
              <div className="h-6 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading tours: {error.message}</p>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No tour packages available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour, index) => (
        <motion.div
          key={tour._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <Link to={`/tours/${tour.slug}`}>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white h-full">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={tour.images?.[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Rating Badge */}
                {tour.rating > 0 && (
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md flex items-center gap-1 shadow">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-800">{tour.rating}</span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <CardContent className="p-6">
                {/* Title as main headline */}
                <h3 className="font-bold text-xl text-gray-800 mb-4 line-clamp-2 hover:text-orange-600 transition-colors">
                  {tour.title}
                </h3>

                {/* Location and Duration in one row */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span>{tour.location || "Nepal"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="font-semibold">{tour.durationDays} Days</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {tour.shortOverview || "Explore Nepal with this amazing tour package."}
                </p>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-orange-600">${tour.price}</p>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
