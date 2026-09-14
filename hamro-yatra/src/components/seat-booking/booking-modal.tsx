"use client";

import { useState, useRef, useEffect } from "react";
import { User, X } from "lucide-react";

interface BookingModalProps {
  pricePerSeat: number;
  selectedSeats: number[];
  departure: string;
  arrival: string;
  isOpen: boolean;
  onClose: () => void;
  onBook: (bookingId: string) => void;
}

export default function BookingModal({
  pricePerSeat,
  selectedSeats,
  departure,
  arrival,
  isOpen,
  onClose,
  onBook,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const totalPrice = selectedSeats.length * pricePerSeat;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone || selectedSeats.length === 0) {
      return;
    }
    setLoading(true);
    try {
      await Promise.allSettled([
        fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.customerName,
            phone: formData.customerPhone,
            email: formData.customerEmail || undefined,
            packageName: `${departure} to ${arrival}`,
            packageType: "seat",
            seats: selectedSeats.join(", "),
            numberOfPeople: selectedSeats.length,
            totalPrice,
          }),
        }),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
      const bookingId = "YNP" + Date.now().toString().slice(-6);
      onBook(bookingId);
      setFormData({ customerName: "", customerPhone: "", customerEmail: "" });
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  if (!isOpen || selectedSeats.length === 0) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Confirm Booking</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData((p) => ({ ...p, customerName: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.customerPhone}
              onChange={(e) => setFormData((p) => ({ ...p, customerPhone: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="+977 98XXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email (optional)</label>
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData((p) => ({ ...p, customerEmail: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Route</span>
              <span className="font-medium">
                {departure} → {arrival}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Seats</span>
              <span className="font-medium">{selectedSeats.join(", ")}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span className="text-orange-600">NPR {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
