import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import MustangPackages from "@/components/seatbooking/MustangPackages";
import { Bus, Landmark, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllDailyRoutesApi } from '@/api/dailyRouteApi';

const SeatBooking = () => {
  // Fetch daily routes from API
  const { data, isLoading } = useQuery({
    queryKey: ['dailyRoutes', { status: 'active' }],
    queryFn: () => getAllDailyRoutesApi({ status: 'active' }),
  });

  // Derive the seat-layout type from the number of seats
  const getVehicleType = (seats) => {
    if (seats <= 7) return 'suv';
    if (seats <= 12) return 'van';
    return 'bus';
  };

  // Transform daily routes to vehicle format for MustangPackages component
  const mockVehicles = (data?.data || []).map(route => ({
    id: route._id,
    name: route.vehicle?.name || route.routeName,
    type: getVehicleType(route.totalSeats),
    seats: route.totalSeats,
    pricePerSeat: route.price,
    route: `${route.departure.location} to ${route.arrival.location}`,
    departureDate: new Date(route.departureDate).toISOString().split('T')[0],
    departureTime: route.departure.time,
    availableSeats: route.availableSeats,
    image: route.vehicle?.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    description: route.description || `Comfortable journey from ${route.departure.location} to ${route.arrival.location}`,
    duration: route.duration,
    bookedSeats: Array.isArray(route.bookedSeats) && route.bookedSeats.length
      ? route.bookedSeats
      : Array.from({ length: Math.max(0, route.totalSeats - route.availableSeats) }, (_, i) => i + 1),
    amenities: route.amenities || [],
    stops: route.stops || []
  }));

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Daily Route Seat Booking
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="font-semibold">All Routes</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Bus className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Daily Departures</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Landmark className="w-5 h-5 text-orange-600" />
              <span className="font-semibold">Comfortable Travel</span>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book your seat for a comfortable journey. Choose your preferred route, vehicle and departure date.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="flex justify-between items-center pt-3 border-t">
                      <div className="h-4 bg-gray-200 rounded w-20" />
                      <div className="h-8 bg-gray-200 rounded w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && mockVehicles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
            <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Routes Available
            </h3>
            <p className="text-gray-500">
              Please check back later for available daily routes
            </p>
          </div>
        )}

        {/* Routes Display */}
        {!isLoading && mockVehicles.length > 0 && (
          <MustangPackages vehicles={mockVehicles} />
        )}
      </div>
    </MainLayout>
  );
};

export default SeatBooking;

