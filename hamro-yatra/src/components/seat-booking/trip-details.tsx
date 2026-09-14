"use client";

import { Receipt, Armchair } from "lucide-react";

interface TripDetailsProps {
  pricePerSeat: number;
  selectedSeats: number[];
  departure: string;
  arrival: string;
  departureTime: string;
  departureDate: string;
  duration: string;
}

export default function TripDetails({
  pricePerSeat,
  selectedSeats,
  departure,
  arrival,
  departureTime,
  departureDate,
  duration,
}: TripDetailsProps) {
  const totalPrice = selectedSeats.length * pricePerSeat;

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
        <Receipt className="w-5 h-5" />
        Booking Summary
      </h3>

      <div className="space-y-4">
        <div className="border-b pb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Route</span>
            <span className="font-medium">{departure} → {arrival}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Departure</span>
            <span className="font-medium">{departureTime}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{departureDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium">{duration}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Selected Seats</p>
          {selectedSeats.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  <Armchair className="w-3 h-3" />
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select your preferred seats from the seat map
            </p>
          )}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Price per seat</span>
            <span className="font-medium">NPR {pricePerSeat.toLocaleString()}</span>
          </div>
          {selectedSeats.length > 0 && (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  × {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""}
                </span>
                <span className="font-medium">
                  NPR {(selectedSeats.length * pricePerSeat).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-orange-600">NPR {totalPrice.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
