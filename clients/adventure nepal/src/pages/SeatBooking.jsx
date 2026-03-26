import React, { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import MustangPackages from "@/components/seatbooking/MustangPackages";
import SeatSelector from "@/components/seatbooking/SeatSelector";
import TripDetails from "@/components/seatbooking/TripDetails";
import BookingModal from "@/components/seatbooking/BookingModal";
import { toast } from 'react-hot-toast';
import { Bus, Landmark, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SeatBooking = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock vehicles data (Mustang daily packages)
  const mockVehicles = [
    {
      id: 1,
      name: 'Scorpio',
      type: 'SUV',
      seats: 7,
      pricePerSeat: 5000,
      route: 'Kathmandu to Upper Mustang (Daily)',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      description: 'Comfortable 7-seater Scorpio for adventure to Mustang. AC, experienced driver.',
    },
    {
      id: 2,
      name: 'EV Van',
      type: 'Electric Van',
      seats: 12,
      pricePerSeat: 4500,
      route: 'Kathmandu to Upper Mustang (Daily Eco)',
      image: 'https://images.unsplash.com/photo-1606698175636-678f6ad18088?w=400',
      description: 'Eco-friendly EV Van, 12 seats. Silent ride, charging stops included.',
    },
  ];

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedSeats([]);
    toast.success(`Selected ${vehicle.name}`);
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Mustang Seat Booking
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Bus className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold">Daily Departures</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Landmark className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold">Upper Mustang</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="font-semibold">Kathmandu Start</span>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Book seats for daily vehicle packages to the forbidden kingdom of Mustang. Secure your adventure now!
          </p>
        </div>

        {!selectedVehicle ? (
          <MustangPackages onSelectVehicle={handleSelectVehicle} />
        ) : (
          <>
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
                className="text-lg px-12" 
                onClick={handleBookClick}
              >
                Book {selectedSeats.length || 'Seats'} Now
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

