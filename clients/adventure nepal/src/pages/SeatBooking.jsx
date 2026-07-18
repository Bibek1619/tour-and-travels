import React, { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import MustangPackages from "@/components/seatbooking/MustangPackages";
import SeatSelector from "@/components/seatbooking/SeatSelector";
import TripDetails from "@/components/seatbooking/TripDetails";
import BookingModal from "@/components/seatbooking/BookingModal";
import { toast } from 'react-hot-toast';
import { Bus, Landmark, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SeatBooking = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedSeats([]);
    toast.success(`Selected ${vehicle.name} - ${vehicle.departureDate}`);
  };

  const handleToggleSeat = (seatNum, isSelected) => {
    if (isSelected) {
      setSelectedSeats(prev => prev.filter(s => s !== seatNum));
    } else {
      setSelectedSeats(prev => [...prev, seatNum]);
    }
  };

  const handleBook = (bookingId) => {
    toast.success(`Booking confirmed! ID: ${bookingId}`);
    // Reset
    setSelectedVehicle(null);
    setSelectedSeats([]);
    setShowBookingModal(false);
  };

  const handleBookClick = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    setShowBookingModal(true);
  };

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

        {!selectedVehicle ? (
          <MustangPackages 
            vehicles={mockVehicles}
            onSelectVehicle={handleSelectVehicle} 
          />
        ) : (
          <>
            <div className="max-w-7xl mx-auto mb-8">
              <Button 
                variant="outline" 
                onClick={() => setSelectedVehicle(null)}
                className="mb-4"
              >
                ← Back to Vehicles
              </Button>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
              <SeatSelector 
                vehicle={selectedVehicle} 
                selectedSeats={selectedSeats} 
                onToggleSeat={handleToggleSeat} 
              />
              <TripDetails 
                vehicle={selectedVehicle} 
                selectedSeats={selectedSeats} 
              />
            </div>
            <div className="text-center">
              <Button 
                size="lg" 
                className="text-lg px-12 bg-orange-600 hover:bg-orange-700" 
                onClick={handleBookClick}
              >
                Book {selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''} Now
              </Button>
            </div>
          </>
        )}

        <BookingModal
          vehicle={selectedVehicle}
          selectedSeats={selectedSeats}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          onBook={handleBook}
        />
      </div>
    </MainLayout>
  );
};

export default SeatBooking;

