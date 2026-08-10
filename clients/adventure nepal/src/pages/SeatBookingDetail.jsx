import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import SeatSelector from "@/components/seatbooking/SeatSelector";
import TripDetails from "@/components/seatbooking/TripDetails";
import BookingModal from "@/components/seatbooking/BookingModal";
import { getDailyRouteByIdApi, updateDailyRouteApi } from "@/api/dailyRouteApi";
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageCircle, MapPin, Calendar, Clock, Info } from 'lucide-react';

// Derive the seat-layout type from the number of seats
const getVehicleType = (seats) => {
  if (seats <= 7) return "suv";
  if (seats <= 12) return "van";
  return "bus";
};

const SeatBookingDetail = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Fetch the daily route by id
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dailyRoute", vehicleId],
    queryFn: () => getDailyRouteByIdApi(vehicleId),
    enabled: !!vehicleId,
  });

  const route = data?.data;

  // Transform the daily route into the vehicle shape the UI expects
  const vehicle = route
    ? {
        id: route._id,
        name: route.vehicle?.name || route.routeName,
        type: getVehicleType(route.totalSeats),
        seats: route.totalSeats,
        pricePerSeat: route.price,
        route: `${route.departure.location} to ${route.arrival.location}`,
        departureDate: route.departureDate,
        departureTime: route.departure.time,
        availableSeats: route.availableSeats,
        image:
          route.vehicle?.images?.[0] ||
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        description:
          route.description ||
          `Comfortable journey from ${route.departure.location} to ${route.arrival.location}`,
        duration: route.duration,
        // Use admin-controlled booked seats; fall back to first N seats
        bookedSeats:
          Array.isArray(route.bookedSeats) && route.bookedSeats.length
            ? route.bookedSeats
            : Array.from(
                { length: Math.max(0, route.totalSeats - route.availableSeats) },
                (_, i) => i + 1
              ),
        amenities: route.amenities || [],
        stops: route.stops || [],
      }
    : null;

  const handleToggleSeat = (seatNum, isSelected) => {
    if (isSelected) {
      setSelectedSeats(prev => prev.filter(s => s !== seatNum));
    } else {
      setSelectedSeats(prev => [...prev, seatNum]);
    }
  };

  const handleBook = async (bookingId) => {
    // Persist the newly booked seats so they show as booked for everyone
    try {
      const existing = Array.isArray(route?.bookedSeats) ? route.bookedSeats : [];
      const updatedBookedSeats = Array.from(new Set([...existing, ...selectedSeats]));
      await updateDailyRouteApi(vehicleId, { bookedSeats: updatedBookedSeats });
      await refetch();
    } catch (err) {
      // Booking still succeeds locally even if the seat sync fails
      console.error("Failed to sync booked seats:", err);
    }

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

  // Loading state
  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-7xl mx-auto animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-40 mb-6" />
            <div className="h-12 bg-gray-200 rounded w-80 mb-8" />
            <div className="bg-white rounded-xl overflow-hidden mb-8">
              <div className="grid md:grid-cols-[280px_1fr] gap-0">
                <div className="h-40 md:h-64 bg-gray-200" />
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-16" />
                        <div className="h-4 bg-gray-200 rounded w-24" />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <div className="h-4 bg-gray-200 rounded w-48" />
                    <div className="h-8 bg-gray-200 rounded w-32" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-[1fr_380px] gap-8">
              <div className="bg-white rounded-xl p-6 h-96" />
              <div className="bg-white rounded-xl p-6 h-64" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Not found / error state
  if (isError || !vehicle) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Route Not Found</h1>
            <p className="text-gray-600 mb-6">
              This route may no longer be available. Please choose another from the list.
            </p>
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
                    <div className="font-semibold text-gray-900">{vehicle.route}</div>
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
