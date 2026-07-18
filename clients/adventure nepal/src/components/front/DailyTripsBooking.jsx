import React from 'react';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

const DailyTripsBooking = () => {
  // Popular daily trip routes
  const dailyTrips = [
    {
      id: 1,
      from: 'Pokhara',
      to: 'Mustang',
      time: '06:00 AM',
      duration: '8-10 hrs',
      seats: 12,
      price: 3500
    },
    {
      id: 2,
      from: 'Kathmandu',
      to: 'Pokhara',
      time: '07:00 AM',
      duration: '6-7 hrs',
      seats: 18,
      price: 1500
    },
    {
      id: 3,
      from: 'Pokhara',
      to: 'Kathmandu',
      time: '08:00 AM',
      duration: '6-7 hrs',
      seats: 15,
      price: 1500
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Daily Bus Services
          </h2>
          <p className="text-gray-600 text-lg">
            Book your seat on our comfortable daily departures
          </p>
        </div>

        {/* Desktop Schedule Board */}
        <div className="hidden md:block bg-slate-900 rounded-lg overflow-hidden mb-6">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 bg-slate-800 px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">
            <div className="col-span-4">Route</div>
            <div className="col-span-2 text-center">Departure</div>
            <div className="col-span-2 text-center">Duration</div>
            <div className="col-span-2 text-center">Seats</div>
            <div className="col-span-2 text-center">Fare</div>
          </div>

          {/* Table Rows */}
          {dailyTrips.map((trip, index) => (
            <div
              key={trip.id}
              className={`grid grid-cols-12 gap-4 px-6 py-5 items-center ${
                index !== dailyTrips.length - 1 ? 'border-b border-slate-800' : ''
              } hover:bg-slate-800/50 transition-colors group`}
            >
              {/* Route */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-lg">{trip.from}</span>
                  <MoveRight className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-white font-semibold text-lg">{trip.to}</span>
                </div>
              </div>

              {/* Departure Time */}
              <div className="col-span-2 text-center">
                <span className="text-green-400 font-mono text-lg font-semibold">
                  {trip.time}
                </span>
              </div>

              {/* Duration */}
              <div className="col-span-2 text-center">
                <span className="text-slate-300 font-medium">{trip.duration}</span>
              </div>

              {/* Available Seats */}
              <div className="col-span-2 text-center">
                <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold ${
                  trip.seats > 10 
                    ? 'bg-green-500/20 text-green-400' 
                    : trip.seats > 5 
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {trip.seats} left
                </span>
              </div>

              {/* Price & Book Button */}
              <div className="col-span-2 flex flex-col items-center gap-2">
                <span className="text-white font-bold text-lg">
                  NPR {trip.price.toLocaleString()}
                </span>
                <Link
                  to="/seat-booking"
                  className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Schedule Cards */}
        <div className="md:hidden space-y-4 mb-6">
          {dailyTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-slate-900 rounded-lg p-5"
            >
              {/* Route */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-white font-semibold text-xl">{trip.from}</span>
                <MoveRight className="w-5 h-5 text-orange-500" />
                <span className="text-white font-semibold text-xl">{trip.to}</span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div>
                  <div className="text-slate-400 text-xs uppercase mb-1">Departs</div>
                  <div className="text-green-400 font-mono font-semibold">{trip.time}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs uppercase mb-1">Duration</div>
                  <div className="text-slate-200 font-medium">{trip.duration}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs uppercase mb-1">Available</div>
                  <div className={`font-semibold ${
                    trip.seats > 10 ? 'text-green-400' : trip.seats > 5 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {trip.seats} seats
                  </div>
                </div>
              </div>

              {/* Price & Button */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-white font-bold text-xl">
                  NPR {trip.price.toLocaleString()}
                </span>
                <Link
                  to="/seat-booking"
                  className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-2.5 rounded transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            to="/seat-booking"
            className="inline-block text-gray-600 hover:text-gray-900 font-medium border-b-2 border-gray-300 hover:border-gray-900 transition-colors"
          >
            View complete schedule and more routes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DailyTripsBooking;
