import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";

// Real sample data - replace with API/CMS integration
const lastMinuteTripsData = [
  {
    id: 1,
    tripName: "Lobuche East Peak Climbing with EBC Trek - 20 Days",
    tripUrl: "/lobuche-east-peak-climbing-with-ebc-trek",
    startDate: "2026-09-16",
    endDate: "2026-10-05",
    status: "Guaranteed",
    priceCurrent: 2800,
    priceWas: 2950,
    currency: "US$",
    bookingUrl: "/lminute-booking?trip_id=129&departure_id=34&start_date=2026-09-16&booktype=last_minute"
  },
  {
    id: 2,
    tripName: "Annapurna Circuit With ABC Trek - 22 Days",
    tripUrl: "/annapurna-circuit-with-base-camp-trek",
    startDate: "2026-09-23",
    endDate: "2026-10-14",
    status: "Guaranteed",
    priceCurrent: 1550,
    priceWas: 1650,
    currency: "US$",
    bookingUrl: "/lminute-booking?trip_id=47&departure_id=30&start_date=2026-09-23&booktype=last_minute"
  },
  {
    id: 3,
    tripName: "Everest Base Camp Trek - 14 Days",
    tripUrl: "/everest-base-camp-trek",
    startDate: "2026-09-23",
    endDate: "2026-10-06",
    status: "Guaranteed",
    priceCurrent: 1280,
    priceWas: 1325,
    currency: "US$",
    bookingUrl: "/lminute-booking?trip_id=1&departure_id=32&start_date=2026-09-23&booktype=last_minute"
  },
  {
    id: 4,
    tripName: "Everest Luxury Trek with Helicopter Return - 11 Days",
    tripUrl: "/everest-luxury-trek-with-helicopter-return",
    startDate: "2026-09-25",
    endDate: "2026-10-05",
    status: "Guaranteed",
    priceCurrent: 3100,
    priceWas: 3197,
    currency: "US$",
    bookingUrl: "/lminute-booking?trip_id=14&departure_id=33&start_date=2026-09-25&booktype=last_minute"
  }
];

// Utility function to format ISO date strings
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
};

const LastMinuteTrips = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Save on Last-minute Trips
              </h2>
              <p className="text-gray-600 text-base max-w-3xl">
                Here you have the upcoming dates for your dream adventure. Join the trips today before they get sold out. Contact us for private or custom trips.
              </p>
            </div>
            {/* See all Dates button - desktop position */}
            <Link
              to="/last-minute-departures"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 rounded-lg font-semibold transition-colors whitespace-nowrap"
            >
              See all Dates
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* See all Dates button - mobile position */}
          <Link
            to="/last-minute-departures"
            className="md:hidden inline-flex items-center gap-2 px-6 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 rounded-lg font-semibold transition-colors w-full justify-center"
          >
            See all Dates
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm uppercase tracking-wide">
                  Trip Name
                </th>
                <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm uppercase tracking-wide">
                  Departure Dates
                </th>
                <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm uppercase tracking-wide">
                  Price
                </th>
                <th className="py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {lastMinuteTripsData.map((trip, index) => (
                <tr
                  key={trip.id}
                  className={`border-b border-gray-200 hover:bg-orange-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {/* Trip Name */}
                  <td className="py-5 px-4">
                    <Link
                      to={trip.tripUrl}
                      className="font-bold text-gray-800 hover:text-orange-600 hover:underline transition-colors"
                    >
                      {trip.tripName}
                    </Link>
                  </td>

                  {/* Departure Dates */}
                  <td className="py-5 px-4">
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="font-semibold">Starts:</span>
                        <span>{formatDate(trip.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="font-semibold">Ends:</span>
                        <span>{formatDate(trip.endDate)}</span>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-5 px-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {trip.status}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-5 px-4">
                    <div>
                      <div className="text-xl font-bold text-gray-800">
                        {trip.currency} {trip.priceCurrent}
                      </div>
                      <div className="text-sm text-gray-400 line-through">
                        was {trip.currency} {trip.priceWas}
                      </div>
                    </div>
                  </td>

                  {/* CTA Button */}
                  <td className="py-5 px-4">
                    <a
                      href={trip.bookingUrl}
                      aria-label={`Join ${trip.tripName}`}
                      className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 whitespace-nowrap"
                    >
                      Join this trip
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {lastMinuteTripsData.map((trip) => (
            <div
              key={trip.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition-shadow"
            >
              {/* Trip Name */}
              <Link
                to={trip.tripUrl}
                className="block font-bold text-lg text-gray-800 hover:text-orange-600 mb-4"
              >
                {trip.tripName}
              </Link>

              {/* Departure Dates */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  <span className="font-semibold">Starts:</span>
                  <span>{formatDate(trip.startDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  <span className="font-semibold">Ends:</span>
                  <span>{formatDate(trip.endDate)}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {trip.status}
                </span>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b">
                <div className="text-2xl font-bold text-gray-800">
                  {trip.currency} {trip.priceCurrent}
                </div>
                <div className="text-sm text-gray-400 line-through">
                  was {trip.currency} {trip.priceWas}
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={trip.bookingUrl}
                aria-label={`Join ${trip.tripName}`}
                className="block text-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Join this trip
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LastMinuteTrips;
