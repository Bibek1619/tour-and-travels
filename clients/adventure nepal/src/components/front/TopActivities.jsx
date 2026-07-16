import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, TrendingUp, ChevronRight } from "lucide-react";

// Sample data structure - replace with real API/CMS data
const bestSellersData = [
  {
    id: 1,
    badge: "Best Selling",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
    duration: "12 Days",
    rating: { score: 5.0, reviews: 2 },
    grade: "Moderate",
    title: "Luxury Everest Base Camp Trek",
    price: null,
    link: "/treks/everest-base-camp-trek"
  },
  {
    id: 2,
    badge: "Best Selling",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    duration: "11 Days",
    rating: null,
    grade: "Moderate",
    title: "Annapurna Base Camp Trek - 11 Days",
    price: { current: 850, original: null, currency: "US$" },
    link: "/treks/annapurna-base-camp-trek"
  },
  {
    id: 3,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    duration: "13 Days",
    rating: null,
    grade: "Moderate",
    title: "Manaslu Circuit Trek",
    price: { current: 1250, original: 1350, currency: "US$" },
    link: "/treks/manaslu-circuit-trek"
  },
  {
    id: 4,
    badge: "Best Selling",
    image: "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=800",
    duration: "9 Days",
    rating: null,
    grade: "Moderate",
    title: "Langtang Valley Trek",
    price: { current: 850, original: 950, currency: "US$" },
    link: "/treks/langtang-valley-trek"
  }
];

// PLACEHOLDER DATA - Replace with real CMS/API data
const popularData = [
  {
    id: 1,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1540206395-68808572332f?w=800",
    duration: "5 Days",
    rating: { score: 4.8, reviews: 15 },
    grade: "Easy",
    title: "Everest View Trek",
    price: { current: 650, original: null, currency: "US$" },
    link: "/treks/everest-view-trek"
  },
  {
    id: 2,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    duration: "4 Days",
    rating: { score: 4.9, reviews: 28 },
    grade: "Easy",
    title: "Ghorepani Poon Hill Trek",
    price: { current: 450, original: null, currency: "US$" },
    link: "/treks/ghorepani-poon-hill-trek"
  },
  {
    id: 3,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
    duration: "7 Days",
    rating: { score: 4.7, reviews: 12 },
    grade: "Moderate",
    title: "Mardi Himal Trek",
    price: { current: 750, original: 850, currency: "US$" },
    link: "/treks/mardi-himal-trek"
  },
  {
    id: 4,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
    duration: "10 Days",
    rating: null,
    grade: "Moderate",
    title: "Upper Mustang Trek",
    price: { current: 1450, original: null, currency: "US$" },
    link: "/treks/upper-mustang-trek"
  }
];

// PLACEHOLDER DATA - Replace with real CMS/API data
const topRatedData = [
  {
    id: 1,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    duration: "14 Days",
    rating: { score: 5.0, reviews: 42 },
    grade: "Challenging",
    title: "Everest Base Camp Trek",
    price: { current: 1250, original: null, currency: "US$" },
    link: "/treks/everest-base-camp-trek"
  },
  {
    id: 2,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    duration: "11 Days",
    rating: { score: 4.9, reviews: 38 },
    grade: "Moderate",
    title: "Annapurna Base Camp Trek",
    price: { current: 850, original: null, currency: "US$" },
    link: "/treks/annapurna-base-camp-trek"
  },
  {
    id: 3,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=800",
    duration: "8 Days",
    rating: { score: 4.8, reviews: 25 },
    grade: "Moderate",
    title: "Langtang Valley Trek",
    price: { current: 650, original: null, currency: "US$" },
    link: "/treks/langtang-valley-trek"
  },
  {
    id: 4,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
    duration: "16 Days",
    rating: { score: 4.9, reviews: 18 },
    grade: "Hard",
    title: "Manaslu Circuit Trek",
    price: { current: 1450, original: 1550, currency: "US$" },
    link: "/treks/manaslu-circuit-trek"
  }
];

const TripCard = ({ trip }) => {
  return (
    <Link to={trip.link} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Badge */}
          <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {trip.badge}
          </div>
          {/* Duration Badge */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1 shadow">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-gray-800">{trip.duration}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Rating and Grade */}
          <div className="flex items-center justify-between mb-3">
            {trip.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-800">{trip.rating.score}</span>
                <span className="text-xs text-gray-500">({trip.rating.reviews})</span>
              </div>
            )}
            <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded">
              {trip.grade}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 min-h-[3.5rem]">
            {trip.title}
          </h3>

          {/* Price and Button */}
          <div className="flex items-center justify-between pt-3 border-t">
            {trip.price ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-800">{trip.price.currency} {trip.price.current}</span>
                {trip.price.original && (
                  <span className="text-sm text-gray-400 line-through">{trip.price.currency} {trip.price.original}</span>
                )}
              </div>
            ) : (
              <span className="text-sm text-gray-500">Price on request</span>
            )}
            <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-1">
              See Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const TopActivities = () => {
  const [activeTab, setActiveTab] = useState("best-sellers");

  const tabs = [
    { id: "best-sellers", label: "Best Sellers for 2026", data: bestSellersData },
    { id: "popular", label: "Popular", data: popularData },
    { id: "top-rated", label: "Top Rated", data: topRatedData }
  ];

  const currentData = tabs.find(tab => tab.id === activeTab)?.data || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <p className="text-orange-600 font-semibold text-sm mb-2 uppercase tracking-wide">Top Activities</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b overflow-x-auto">
          <div className="flex gap-8 min-w-max" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-semibold text-base whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-orange-600 text-orange-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentData.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mb-12">
          <Link
            to="/trek-packages"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Trips
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 md:p-12 text-center border border-orange-200">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Discover Last-minute Adventures
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Find incredible deals on upcoming departures. Join a group and experience the adventure of a lifetime!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/departures"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Departures
            </Link>
            <Link
              to="/customize"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 transition-colors"
            >
              Customize Own Trip
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopActivities;
