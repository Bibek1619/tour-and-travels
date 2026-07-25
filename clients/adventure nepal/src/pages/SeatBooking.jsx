import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import MustangPackages from "@/components/seatbooking/MustangPackages";
import { Bus, Landmark, MapPin } from 'lucide-react';

const SeatBooking = () => {
  // Mock vehicles data (Pokhara to Mustang daily packages)
  const mockVehicles = [
    {
      id: 1,
      name: 'Hiace Bus',
      type: 'bus',
      seats: 18,
      pricePerSeat: 3500,
      route: 'Pokhara to Mustang',
      departureDate: '2026-08-15',
      departureTime: '06:00 AM',
      availableSeats: 12,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
      description: 'Comfortable 18-seater Hiace bus for Upper Mustang. AC, experienced driver, mountain views.',
      duration: '8-10 hours',
      bookedSeats: [1, 5, 9, 13, 15, 17], // Pre-booked seats
    },
    {
      id: 2,
      name: 'Scorpio SUV',
      type: 'suv',
      seats: 7,
      pricePerSeat: 5000,
      route: 'Pokhara to Mustang',
      departureDate: '2026-08-15',
      departureTime: '07:00 AM',
      availableSeats: 4,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      description: 'Comfortable 7-seater Scorpio SUV. AC, experienced driver, faster journey.',
      duration: '7-9 hours',
      bookedSeats: [2, 5, 6], // Pre-booked seats
    },
    {
      id: 3,
      name: 'Hiace Van',
      type: 'van',
      seats: 12,
      pricePerSeat: 4000,
      route: 'Pokhara to Mustang',
      departureDate: '2026-08-16',
      departureTime: '06:30 AM',
      availableSeats: 8,
      image: 'https://images.unsplash.com/photo-1606698175636-678f6ad18088?w=400',
      description: '12-seater Hiace Van, comfortable seating, scenic mountain route.',
      duration: '8-10 hours',
      bookedSeats: [3, 7, 10, 11], // Pre-booked seats
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Pokhara to Mustang Seat Booking
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="font-semibold">Pokhara → Mustang</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Bus className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Daily Departures</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Landmark className="w-5 h-5 text-orange-600" />
              <span className="font-semibold">Upper Mustang</span>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book your seat for a comfortable journey to the forbidden kingdom of Mustang. Choose your vehicle and departure date.
          </p>
        </div>

        <MustangPackages vehicles={mockVehicles} />
      </div>
    </MainLayout>
  );
};

export default SeatBooking;

