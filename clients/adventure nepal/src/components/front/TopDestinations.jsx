import React from "react";
import { Link } from "react-router-dom";

// Real content data - replace image paths with actual assets
const destinationsData = [
  {
    id: 1,
    title: "Everest Region Trekking",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
    link: "/region/everest-region-trekking"
  },
  {
    id: 2,
    title: "Annapurna Region Trekking",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    link: "/region/annapurna-region-trekking"
  },
  {
    id: 3,
    title: "Manaslu Region Trekking",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    link: "/region/manaslu-region-trekking"
  },
  {
    id: 4,
    title: "Langtang Region Trekking",
    image: "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=800",
    link: "/region/langtang-region-trekking"
  }
];

const DestinationCard = ({ destination }) => {
  return (
    <Link to={destination.link} className="group block">
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        {/* Title */}
        <div className="bg-white p-5">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
            {destination.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

const TopDestinations = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-orange-600 font-semibold text-sm mb-2 uppercase tracking-wide">
            Dreaming of Nepal Treks?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Top Trekking Destinations in Nepal
          </h2>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinationsData.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
