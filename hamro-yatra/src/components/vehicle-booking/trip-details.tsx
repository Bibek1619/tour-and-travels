"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Calendar, MapPin, Home } from "lucide-react";

interface TripDetailsProps {
  bookingData: {
    vehicleName: string;
    dailyRate: number;
  };
  onBack: () => void;
  onNext: (data: {
    startDate: string;
    endDate: string;
    destination: string;
    pickupLocation: string;
    includeDriver: boolean;
    specialRequests: string;
    days: number;
    totalPrice: number;
  }) => void;
}

export default function TripDetails({
  bookingData,
  onBack,
  onNext,
}: TripDetailsProps) {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    destination: "",
    pickupLocation: "",
    customPickupLocation: "",
    includeDriver: true,
    specialRequests: "",
  });
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diff = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diff > 0) {
        setDays(diff);
        let total = diff * bookingData.dailyRate;
        if (formData.includeDriver) total += diff * 2000;
        setTotalPrice(total);
      } else {
        setDays(0);
        setTotalPrice(0);
      }
    }
  }, [
    formData.startDate,
    formData.endDate,
    formData.includeDriver,
    bookingData.dailyRate,
  ]);

  const destinations = ["Inside Valley", "Outside Valley"];
  const pickupLocations = [
    "Tribhuvan International Airport",
    "Hotel in Kathmandu",
    "Hotel in Pokhara",
    "Bus Station",
    "Custom Location",
  ];

  const isValid =
    formData.startDate &&
    formData.endDate &&
    formData.destination &&
    formData.pickupLocation &&
    (formData.pickupLocation !== "Custom Location" ||
      formData.customPickupLocation);

  const handleNext = () => {
    if (!isValid) return;
    onNext({
      ...formData,
      pickupLocation:
        formData.pickupLocation === "Custom Location"
          ? formData.customPickupLocation
          : formData.pickupLocation,
      days,
      totalPrice,
    });
  };

  const inputClass =
    "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border p-6">
        <h2 className="text-xl font-bold mb-6">Trip Details</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                <Calendar className="h-4 w-4 text-green-600" /> Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                min={new Date().toISOString().split("T")[0]}
                className={inputClass}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                <Calendar className="h-4 w-4 text-green-600" /> End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                min={
                  formData.startDate || new Date().toISOString().split("T")[0]
                }
                className={inputClass}
              />
            </div>
          </div>

          {days > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg text-sm">
              <span className="text-gray-500">Trip Duration: </span>
              <span className="font-semibold">{days} days</span>
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
              <MapPin className="h-4 w-4 text-green-600" /> Destination
            </label>
            <select
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              className={inputClass}
            >
              <option value="">Select destination</option>
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
              <Home className="h-4 w-4 text-green-600" /> Pickup Location
            </label>
            <select
              value={formData.pickupLocation}
              onChange={(e) =>
                setFormData({ ...formData, pickupLocation: e.target.value })
              }
              className={inputClass}
            >
              <option value="">Select pickup location</option>
              {pickupLocations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            {formData.pickupLocation === "Custom Location" && (
              <input
                type="text"
                placeholder="Enter custom pickup location"
                value={formData.customPickupLocation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customPickupLocation: e.target.value,
                  })
                }
                className={`${inputClass} mt-2`}
              />
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">
              Additional Services
            </label>
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <input
                type="checkbox"
                id="driver"
                checked={formData.includeDriver}
                onChange={(e) =>
                  setFormData({ ...formData, includeDriver: e.target.checked })
                }
                className="mt-1 h-4 w-4"
              />
              <div>
                <label htmlFor="driver" className="text-sm font-medium cursor-pointer">
                  Include Professional Driver
                </label>
                <p className="text-sm text-gray-500">NPR 2,000 per day</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Special Requests (Optional)
            </label>
            <textarea
              placeholder="Any special requirements or preferences..."
              value={formData.specialRequests}
              onChange={(e) =>
                setFormData({ ...formData, specialRequests: e.target.value })
              }
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border p-6 lg:sticky lg:top-4">
          <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Vehicle:</span>
              <span className="font-medium">{bookingData.vehicleName}</span>
            </div>
            {formData.destination && (
              <div className="flex justify-between">
                <span className="text-gray-500">Destination:</span>
                <span className="font-medium">{formData.destination}</span>
              </div>
            )}
            {days > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Duration:</span>
                <span className="font-medium">{days} days</span>
              </div>
            )}
            {formData.pickupLocation && (
              <div className="flex justify-between">
                <span className="text-gray-500">Pickup:</span>
                <span className="font-medium">{formData.pickupLocation}</span>
              </div>
            )}
          </div>
          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Vehicle rental:</span>
              <span className="font-medium">
                NPR {bookingData.dailyRate.toLocaleString()} × {days} days
              </span>
            </div>
            {formData.includeDriver && days > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Driver service:</span>
                <span className="font-medium">NPR 2,000 × {days} days</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total:</span>
              <span className="text-green-600">
                NPR {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleNext}
              disabled={!isValid}
              className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all"
            >
              Continue to Confirmation
            </button>
            <button
              onClick={onBack}
              className="w-full border hover:bg-gray-50 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
