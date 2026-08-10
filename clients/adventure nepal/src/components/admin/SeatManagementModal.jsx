import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDailyRouteApi } from "@/api/dailyRouteApi";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { X, Save, Armchair } from "lucide-react";

const SeatManagementModal = ({ route, isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [bookedSeats, setBookedSeats] = useState([]);

  // Initialize booked seats from the route when the modal opens
  useEffect(() => {
    if (route) {
      if (Array.isArray(route.bookedSeats) && route.bookedSeats.length) {
        setBookedSeats(route.bookedSeats);
      } else {
        // fall back to first N seats based on availability
        const n = Math.max(0, (route.totalSeats || 0) - (route.availableSeats || 0));
        setBookedSeats(Array.from({ length: n }, (_, i) => i + 1));
      }
    }
  }, [route, isOpen]);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => updateDailyRouteApi(route._id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyRoutes"] });
      queryClient.invalidateQueries({ queryKey: ["dailyRoute", route._id] });
      toast.success("Seat availability updated");
      onClose();
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Failed to update seats"),
  });

  if (!isOpen || !route) return null;

  const total = route.totalSeats || 0;
  const seatNumbers = Array.from({ length: total }, (_, i) => i + 1);

  const toggleSeat = (seat) => {
    setBookedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const availableCount = total - bookedSeats.length;

  const handleSave = () => {
    mutate({ bookedSeats });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Armchair className="w-5 h-5" />
              Manage Seats
            </h3>
            <p className="text-orange-100 text-sm mt-0.5">{route.routeName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Summary */}
          <div className="flex items-center justify-between mb-5 text-sm">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
              Available: {availableCount}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 font-medium">
              Booked: {bookedSeats.length}
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
              Total: {total}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Click a seat to toggle it between{" "}
            <span className="font-medium text-blue-600">available</span> and{" "}
            <span className="font-medium text-gray-600">booked</span>. Changes appear
            instantly on the customer seat map after saving.
          </p>

          {/* Seat grid */}
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 mb-6">
            {seatNumbers.map((seat) => {
              const isBooked = bookedSeats.includes(seat);
              return (
                <button
                  key={seat}
                  onClick={() => toggleSeat(seat)}
                  className={`h-12 rounded-lg border-2 font-semibold text-sm transition-all hover:scale-105 ${
                    isBooked
                      ? "bg-gray-400 border-gray-500 text-white"
                      : "bg-blue-500 border-blue-600 text-white"
                  }`}
                  title={isBooked ? "Booked (click to free)" : "Available (click to book)"}
                >
                  {seat}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 text-sm mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-blue-500 border-2 border-blue-600" />
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gray-400 border-2 border-gray-500" />
              <span className="text-gray-600">Booked</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-orange-600 hover:bg-orange-700"
              onClick={handleSave}
              disabled={isPending}
            >
              <Save className="w-4 h-4 mr-2" />
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatManagementModal;
