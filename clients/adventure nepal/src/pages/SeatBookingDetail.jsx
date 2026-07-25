import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import SeatSelector from "@/components/seatbooking/SeatSelector";
import TripDetails from "@/components/seatbooking/TripDetails";
import BookingModal from "@/components/seatbooking/BookingModal";
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageCircle, MapPin, Calendar, Clock, Info } from 'lucide-react';

const SeatBookingDetail = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock vehicles data (same as in SeatBooking page)
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
      bookedSeats: [1, 5, 9, 13, 15, 17],
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
      bookedSeats: [2, 5, 6],
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
      bookedSeats: [3, 7, 10, 11],
    },
  ];

  const vehicle = mockVehicles.find(v => v.id === parseInt(vehicleId));

  const handleToggleSeat = (seatNum, isSelected) => {
    if (isSelected) {
      setSelectedSeats(prev => prev.filter(s => s !== seatNum));
    } else {
      setSelectedSeats(prev => [...prev, seatNum]);
    }
  };

  const handleBook = (bookingId) => {
    toast.success(`Booking confirmed! ID: ${bookingId}`);
    setSelectedSeats([]);
    setShowBookingModal(false);
    setTimeout(() => {
      navigate('/seat-booking');
    }, 2000);
  };

  const handleBookClick = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    setShowBookingModal(true);
  };

  const handleWhatsAppInquiry = () => {
    const phoneNumber = '9779841480794';
    const message = encodeURIComponent(
      `Hi! I'm interested in booking seats for:\n\n` +
      `Vehicle: ${vehicle.name}\n` +
      `Route: ${vehicle.route}\n` +
      `Departure: ${vehicle.departureDate} at ${vehicle.departureTime}\n` +
      `Price: NPR ${vehicle.pricePerSeat.toLocaleString()} per seat\n\n` +
      `Can you please provide more information?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!vehicle) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
            <Link to="/seat-booking">
              <Button className="bg-orange-600 hover:bg-orange-700">
                ← Back to Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link to="/seat-booking">
            <Button 
              variant="ghost" 
              className="mb-6 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Vehicles
            </Button>
          </Link>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Book Your Seats
            </h1>
            <p className="text-gray-600">Select your preferred seats and complete your booking</p>
          </div>

          {/* Trip Info Card - Compact */}
          <Card className="mb-8 overflow-hidden">
            <div className="grid md:grid-cols-[280px_1fr] gap-0">
              {/* Vehicle Image */}
              <div className="relative h-40 md:h-full">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-600 text-white px-2.5 py-1 text-xs">
                    {vehicle.availableSeats} Available
                  </Badge>
                </div>
              </div>
              
              {/* Trip Information - Compact */}
              <div className="p-5 space-y-4">
                {/* Header */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {vehicle.name} <span className="text-sm font-normal text-gray-500">({vehicle.seats} seats)</span>
                  </h2>
                  <p className="text-sm text-gray-600">{vehicle.description}</p>
                </div>

                {/* Route & Travel Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-1 text-gray-500 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-medium">Route</span>
                    </div>
                    <div className="font-semibold text-gray-900">Kathmandu → Mustang</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-gray-500 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium">Departure</span>
                    </div>
                    <div className="font-semibold text-gray-900">{vehicle.departureTime}</div>
                    <div className="text-xs text-gray-500">Daily (~14 hrs)</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-gray-500 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-medium">Date</span>
                    </div>
                    <div className="font-semibold text-gray-900">{new Date(vehicle.departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                </div>

                {/* Features & Price */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t">
                  <div className="flex flex-wrap gap-1.5 text-xs text-gray-600">
                    <span>✓ AC</span>
                    <span>•</span>
                    <span>✓ Driver</span>
                    <span>•</span>
                    <span>✓ Permits</span>
                    <span>•</span>
                    <span>✓ Water</span>
                    <span>•</span>
                    <span>✓ 24/7 Support</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-orange-600">NPR {vehicle.pricePerSeat.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">/seat</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 mb-8">
            {/* Seat Selector */}
            <div>
              <SeatSelector 
                vehicle={vehicle} 
                selectedSeats={selectedSeats} 
                onToggleSeat={handleToggleSeat} 
              />
            </div>

            {/* Sidebar - Trip Details & Actions */}
            <div className="space-y-6 lg:sticky lg:top-4">
              <TripDetails 
                vehicle={vehicle} 
                selectedSeats={selectedSeats} 
              />
              
              {/* WhatsApp Inquiry - Compact */}
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Have Questions?</h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Chat with us for instant support
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleWhatsAppInquiry}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Inquiry
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom Sticky Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div>
                <div className="text-sm text-gray-500">Total Amount</div>
                <div className="text-2xl font-bold text-orange-600">
                  NPR {(selectedSeats.length * vehicle.pricePerSeat).toLocaleString()}
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700" 
                onClick={handleBookClick}
                disabled={selectedSeats.length === 0}
              >
                Book {selectedSeats.length > 0 ? `${selectedSeats.length} Seat${selectedSeats.length !== 1 ? 's' : ''}` : 'Seats'}
              </Button>
            </div>
          </div>

          {/* Desktop Book Button */}
          <div className="hidden lg:flex justify-center">
            <Button 
              size="lg" 
              className="text-lg px-16 py-6 bg-orange-600 hover:bg-orange-700 shadow-lg" 
              onClick={handleBookClick}
              disabled={selectedSeats.length === 0}
            >
              {selectedSeats.length === 0 ? (
                'Select Seats to Continue'
              ) : (
                `Book ${selectedSeats.length} Seat${selectedSeats.length !== 1 ? 's' : ''} - NPR ${(selectedSeats.length * vehicle.pricePerSeat).toLocaleString()}`
              )}
            </Button>
          </div>
        </div>

        <BookingModal
          vehicle={vehicle}
          selectedSeats={selectedSeats}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          onBook={handleBook}
        />
      </div>
    </MainLayout>
  );
};

export default SeatBookingDetail;
