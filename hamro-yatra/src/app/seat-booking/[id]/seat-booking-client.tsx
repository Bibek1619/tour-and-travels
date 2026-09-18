"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SeatSelector from "@/components/seat-booking/seat-selector";
import TripDetails from "@/components/seat-booking/trip-details";
import BookingModal from "@/components/seat-booking/booking-modal";
import { MessageCircle } from "lucide-react";

interface SeatBookingClientProps {
  routeId: string;
  vehicleType: string;
  totalSeats: number;
  bookedSeats: number[];
  pricePerSeat: number;
  departure: string;
  arrival: string;
  departureTime: string;
  departureDate: string;
  duration: string;
  vehicleName: string;
}

export default function SeatBookingClient({
  routeId,
  vehicleType,
  totalSeats,
  bookedSeats,
  pricePerSeat,
  departure,
  arrival,
  departureTime,
  departureDate,
  duration,
  vehicleName,
}: SeatBookingClientProps) {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleToggleSeat = useCallback((seatNum: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNum)
        ? prev.filter((s) => s !== seatNum)
        : [...prev, seatNum]
    );
  }, []);

  const handleBook = useCallback(
    async (_bookingId: string) => {
      const updatedBookedSeats = Array.from(
        new Set([...bookedSeats, ...selectedSeats])
      );
      await fetch(`/api/seat-booking/${routeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookedSeats: updatedBookedSeats }),
      });
      setSelectedSeats([]);
      setShowModal(false);
      router.refresh();
    },
    [bookedSeats, selectedSeats, routeId, router]
  );

  const handleBookClick = () => {
    if (selectedSeats.length === 0) return;
    setShowModal(true);
  };

  const handleWhatsAppInquiry = () => {
    const phoneNumber = "9779841480794";
    const message = encodeURIComponent(
      `Hi! I'm interested in booking seats for:\n\n` +
        `Vehicle: ${vehicleName}\n` +
        `Route: ${departure} → ${arrival}\n` +
        `Departure: ${departureDate} at ${departureTime}\n` +
        `Price: NPR ${pricePerSeat.toLocaleString()} per seat\n\n` +
        `Can you please provide more information?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8 mb-8">
        <div>
          <SeatSelector
            vehicleType={vehicleType}
            totalSeats={totalSeats}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
            onToggleSeat={handleToggleSeat}
            vehicleName={vehicleName}
          />
        </div>

        <div className="space-y-6 lg:sticky lg:top-4 self-start">
          <TripDetails
            pricePerSeat={pricePerSeat}
            selectedSeats={selectedSeats}
            departure={departure}
            arrival={arrival}
            departureTime={departureTime}
            departureDate={departureDate}
            duration={duration}
          />

          <div className="bg-white rounded-xl border p-5">
            <h4 className="font-semibold mb-3">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              Have questions about this route? Send us a WhatsApp message.
            </p>
            <button
              onClick={handleWhatsAppInquiry}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Inquiry
            </button>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="sticky bottom-0 bg-white border-t p-4 mt-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              {selectedSeats.length > 0
                ? `${selectedSeats.length} seat${selectedSeats.length > 1 ? "s" : ""} selected`
                : "Select seats from the map above"}
            </p>
            {selectedSeats.length > 0 && (
              <p className="text-xl font-bold text-orange-600">
                NPR {(selectedSeats.length * pricePerSeat).toLocaleString()}
              </p>
            )}
          </div>
          <button
            onClick={handleBookClick}
            disabled={selectedSeats.length === 0}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            {selectedSeats.length > 0
              ? `Book ${selectedSeats.length} Seat${selectedSeats.length > 1 ? "s" : ""}`
              : "Select Seats"}
          </button>
        </div>
      </div>

      <BookingModal
        pricePerSeat={pricePerSeat}
        selectedSeats={selectedSeats}
        departure={departure}
        arrival={arrival}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onBook={handleBook}
      />
    </>
  );
}
