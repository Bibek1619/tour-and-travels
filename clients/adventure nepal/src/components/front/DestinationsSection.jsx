import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Check, ArrowRight, Clock } from "lucide-react";

export const DestinationsSection = () => {
  const destinations = [
    {
      id: 1,
      name: " Muktinath temple Tour",
      location: "Mustang, Nepal",
      image: "https://muktinathtempletour.com/wp-content/uploads/2019/08/Muktinath-yatra.jpg",
      description: "Explore the forbidden kingdom with ancient monasteries and unique Tibetan culture.",
      rating: 4.8,
      reviews: 128,
      startingPrice:6000,
      duration: "2 days",
      highlights: ["muktinath temple", "baglung kalika", "rupse","dumba lake"],
    },
    {
      id: 2,
      name: "Rara Lake",
      location: "Mugu, Nepal",
      image: "https://wildernessexcursion.com/_next/image?url=https%3A%2F%2Fmedia.app.wildernessexcursion.com%2Fuploads%2Ffullbanner%2Frara-lake.webp&w=3840&q=75&dpl=dpl_CcHazofUWtxxcPG7rXgNGJzBcmvR",
      description: "Nepal's largest lake surrounded by pristine forests and snow-capped peaks.",
      rating: 4.7,
      reviews: 98,
      startingPrice: 25000,
      duration: "5-7 days",
      highlights: ["Pristine Lake", "Wildlife Viewing", "Peaceful Environment"],
    },
    {
      id: 3,
      name: "Dhorpatan",
      location: "Baglung, Nepal",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwmaJ4hDGI501M71P6mNB50JkFoZdqEze39w&s",
      description: "Nepal's only hunting reserve with diverse wildlife and beautiful landscapes.",
      rating: 4.6,
      reviews: 65,
      startingPrice: 18000,
      duration: "3-5 days",
      highlights: ["Wildlife Reserve", "Hunting Permits", "Mountain Views"],
    },
    {
      id: 4,
      name: "upper mustang",
      location: "mustang, Nepal",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvdd3-Yz2eLkAFHezn1SZHfTUtxnnjVsCUQ&s",
      description: "Beautiful lake city with stunning mountain views and adventure activities.",
      rating: 4.9,
      reviews: 210,
      startingPrice: 10000,
      duration: "5-6 days",
      highlights: ["kalika temple", "muktinath", "hidden cave","nepal-china border"],
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Popular Destinations</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover Nepal's most breathtaking destinations with our expertly crafted tour packages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-[(--color-card)] rounded-lg md:rounded-xl overflow-hidden shadow-elevation-2 hover:shadow-elevation-4 transition-smooth"
            >
              <div className="relative h-40 md:h-48 lg:h-52 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-[(--color-foreground)] mb-1">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm">
                    <MapPin size={14} color="white" />
                    <span>{dest.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-4 lg:p-5">
                <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-3">
                  {dest.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={14} color="var(--color-accent)" />
                      <span className="text-[(--color-foreground)]">{dest.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({dest.reviews} reviews)</span>
                  </div>
                  <div className="text-right text-xs md:text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock size={12} /> <span>{dest.duration}</span>
                    </div>
                    <div className="font-semibold text-green-500">
                      NPR {dest.startingPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 md:gap-2 mb-3">
                  {dest.highlights.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs md:text-sm text-[var(--color-foreground)]"
                    >
                      <Check size={12} color="green" />
                      {highlight}
                    </span>
                  ))}
                </div>

                <Button
                  variant="default"
                  className="flex items-center justify-center gap-2 text-xs md:text-sm bg-green-500 text-white hover:bg-green-600"
                >
                  Explore Destination <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Centered View All Destinations Button */}
        <div className="text-center mt-8 md:mt-12">
          <Button
            variant="default"
            className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 text-sm md:text-base"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};
