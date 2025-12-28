import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Check, ArrowRight, Clock } from "lucide-react";

export const DestinationsSection = () => {
  const destinations = [
    {
      id: 1,
      name: "Muktinath Temple Tour",
      location: "Mustang, Nepal",
      image: "https://muktinathtempletour.com/wp-content/uploads/2019/08/Muktinath-yatra.jpg",
      description:
        "Explore the forbidden kingdom with ancient monasteries and unique Tibetan culture.",
      rating: 4.8,
      reviews: 128,
      startingPrice: 6000,
      duration: "2 days",
      highlights: ["Muktinath Temple", "Baglung Kalika", "Rupse", "Dumba Lake"],
    },
    {
      id: 2,
      name: "Rara Lake",
      location: "Mugu, Nepal",
      image:
        "https://wildernessexcursion.com/_next/image?url=https%3A%2F%2Fmedia.app.wildernessexcursion.com%2Fuploads%2Ffullbanner%2Frara-lake.webp&w=3840&q=75",
      description:
        "Nepal's largest lake surrounded by pristine forests and snow-capped peaks.",
      rating: 4.7,
      reviews: 98,
      startingPrice: 25000,
      duration: "5–7 days",
      highlights: ["Pristine Lake", "Wildlife Viewing", "Peaceful "],
    },
    {
      id: 3,
      name: "Dhorpatan",
      location: "Baglung, Nepal",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwmaJ4hDGI501M71P6mNB50JkFoZdqEze39w&s",
      description:
        "Nepal's only hunting reserve with diverse wildlife and beautiful landscapes.",
      rating: 4.6,
      reviews: 65,
      startingPrice: 18000,
      duration: "3–5 days",
      highlights: ["Wildlife Reserve", "Mountain Views", "Nature Trails"],
    },
    {
      id: 4,
      name: "Upper Mustang",
      location: "Mustang, Nepal",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvdd3-Yz2eLkAFHezn1SZHfTUtxnnjVsCUQ&s",
      description:
        "A restricted region famous for ancient caves, Tibetan culture, and dramatic landscapes.",
      rating: 4.9,
      reviews: 210,
      startingPrice: 10000,
      duration: "5–6 days",
      highlights: [
        "Kalika Temple",
        "Muktinath",
        "Hidden Caves",
        "Nepal–China Border",
      ],
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Popular Destinations
          </h2>
          <p className="text-base md:text-lg text-[(--color-muted-foreground)]d max-w-2xl mx-auto">
            Discover Nepal's most breathtaking destinations with our expertly
            crafted tour packages.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-[var(--color-card)] rounded-xl overflow-hidden shadow-elevation-2 hover:shadow-elevation-4 transition"
            >
              {/* Image */}
              <div className="h-40 md:h-48 lg:h-52 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                {/* Name */}
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                  {dest.name}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin size={14} />
                  <span>{dest.location}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                  {dest.description}
                </p>

                {/* Rating & Price */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-yellow-500" />
                    <span>{dest.rating}</span>
                    <span className="text-gray-500">
                      ({dest.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock size={12} />
                      <span>{dest.duration}</span>
                    </div>
                    <div className="font-semibold text-green-600">
                      NPR {dest.startingPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {dest.highlights.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-700"
                    >
                      <Check size={12} className="text-green-600" />
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <Button className="w-full flex items-center justify-center gap-2 bg-green-700 text-white hover:bg-green-600">
                  Explore Destination <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button className="bg-green-500 text-white hover:bg-green-600 px-6">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};
