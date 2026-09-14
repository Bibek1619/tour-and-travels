import Link from "next/link";
import { Star, Clock, MapPin, TrendingUp, ChevronRight } from "lucide-react";
import type { Tour } from "@/lib/types";
import { getCardImage } from "@/lib/cloudinary";

const reviewsData = [
  { rating: 5.0, count: 7 },
  { rating: 4.9, count: 12 },
  { rating: 5.0, count: 5 },
  { rating: 4.8, count: 9 },
  { rating: 5.0, count: 11 },
  { rating: 4.9, count: 6 },
];

const getReviewData = (index: number) => reviewsData[index % reviewsData.length];

export function BestSellingPackages({
  tours,
  content,
}: {
  tours: Tour[];
  content?: { eyebrow?: string; title?: string; subtitle?: string; image?: string };
}) {
  const section = {
    eyebrow: "Most Popular",
    title: "Best Selling Trekking Packages",
    subtitle: "Walk along the best selling trekking routes in the Himalayas of Nepal",
    ...content,
  };

  const packages = [...tours]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {section.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={section.image}
            alt={section.title}
            className="w-full max-h-64 object-cover rounded-xl mb-10"
          />
        )}
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
              {section.eyebrow}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        {/* Empty State */}
        {packages.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">
              No packages available at the moment. Check back soon!
            </p>
          </div>
        )}

        {/* Packages Grid */}
        {packages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => {
              const reviewData = getReviewData(index);
              return (
                <Link
                  key={pkg._id}
                  href={
                    pkg.category === "trek"
                      ? `/treks/${pkg.slug}`
                      : `/tours/${pkg.slug}`
                  }
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getCardImage(pkg.images?.[0])}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Best Seller Badge */}
                    <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Best Selling
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-bold text-gray-900">
                        {pkg.durationDays} Days
                      </span>
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
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-gray-900">
                        {reviewData.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({reviewData.count} reviews)
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        <span>{pkg.location || "Nepal"}</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                          From
                        </span>
                        <span className="text-2xl font-bold text-gray-900">
                          ${pkg.price}
                        </span>
                        <span className="text-gray-500 text-sm"> / person</span>
                      </div>
                      <div className="flex items-center gap-1 text-orange-600 font-semibold group-hover:gap-2 transition-all">
                        View Details
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
            href="/trek-packages"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Trekking Packages
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BestSellingPackages;