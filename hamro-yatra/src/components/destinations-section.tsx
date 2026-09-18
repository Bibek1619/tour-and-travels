import Link from "next/link";
import { MapPin, Star, Clock, ChevronRight, Compass } from "lucide-react";
import { formatDuration, type Tour } from "@/lib/types";
import { getCardImage } from "@/lib/cloudinary";

const reviewsData = [
  { rating: 4.8, count: 128 },
  { rating: 4.7, count: 98 },
  { rating: 4.6, count: 65 },
  { rating: 4.9, count: 210 },
  { rating: 5.0, count: 85 },
  { rating: 4.8, count: 142 },
];

const getReviewData = (index: number) => reviewsData[index % reviewsData.length];

export const DestinationsSection = ({
  destinations,
  content,
}: {
  destinations: Tour[];
  content?: { eyebrow?: string; title?: string; subtitle?: string; image?: string };
}) => {
  const section = {
    eyebrow: "Explore Nepal",
    title: "Popular Tour Packages",
    subtitle:
      "Discover Nepal's most breathtaking destinations with our expertly crafted tour packages.",
    ...content,
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {section.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={section.image}
            alt={section.title}
            className="w-full max-h-64 object-cover rounded-xl mb-10"
            loading="lazy"
            decoding="async"
          />
        )}
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Compass className="w-6 h-6 text-green-600" />
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => {
            const reviewData = getReviewData(index);
            return (
              <Link
                key={dest._id}
                href={`/tours/${dest.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={getCardImage(dest.images?.[0])}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Popular Badge */}
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Popular
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-gray-900">
                      {formatDuration(dest.durationDays, dest.durationText)}
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                    {dest.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span>{dest.location || "Nepal"}</span>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-amber-600 font-medium block mb-1">
                        Price varies with group size
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                        From
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        Rs {dest.price?.toLocaleString("en-IN")}
                      </span>
                      <span className="text-gray-500 text-sm"> / person</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 font-semibold group-hover:gap-2 transition-all">
                      View Details
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Tour Packages
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;