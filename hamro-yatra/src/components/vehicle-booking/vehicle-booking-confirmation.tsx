"use client";

import {
  CheckCircle2,
  Download,
  Mail,
  Car,
  Calendar,
  MapPin,
} from "lucide-react";

interface VehicleBookingConfirmationProps {
  bookingData: {
    vehicleName: string;
    destination: string;
    startDate: string;
    endDate: string;
    pickupLocation: string;
    days: number;
    includeDriver: boolean;
    totalPrice: number;
  };
  bookingId: string;
}

export default function VehicleBookingConfirmation({
  bookingData,
  bookingId,
}: VehicleBookingConfirmationProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl border p-6">
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Vehicle Booking Confirmed!</h2>
        <p className="text-gray-500 mt-1">
          Your vehicle has been successfully reserved
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center mb-6">
        <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
        <p className="text-2xl font-bold text-green-600">{bookingId}</p>
      </div>

      <h3 className="font-semibold mb-3">Booking Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <Car className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Vehicle</p>
            <p className="font-medium">{bookingData.vehicleName}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Destination</p>
            <p className="font-medium">{bookingData.destination}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium">
              {new Date(bookingData.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">End Date</p>
            <p className="font-medium">
              {new Date(bookingData.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 space-y-2 text-sm mb-6">
        <div className="flex justify-between">
          <span className="text-gray-500">Pickup Location:</span>
          <span className="font-medium">{bookingData.pickupLocation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Duration:</span>
          <span className="font-medium">{bookingData.days} days</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Driver:</span>
          <span className="font-medium">
            {bookingData.includeDriver ? "Included" : "Self-drive"}
          </span>
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between text-lg font-bold">
          <span>Total Amount:</span>
          <span className="text-green-600">
            NPR {bookingData.totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
        <h4 className="font-semibold mb-2 text-sm">Important Information</h4>
        <ul className="text-sm space-y-1 text-gray-600">
          <li>• Vehicle will be available at pickup location on the start date</li>
          <li>• Driver will contact you 24 hours before departure</li>
          <li>• Fuel costs are included in the rental price</li>
          <li>• Carry valid ID proof and driving license (if self-driving)</li>
          <li>• Cancellation available up to 48 hours before start date</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 border hover:bg-gray-50 font-medium py-2.5 rounded-lg transition-colors">
          <Download className="h-4 w-4" /> Download Booking
        </button>
        <button className="flex items-center justify-center gap-2 border hover:bg-gray-50 font-medium py-2.5 rounded-lg transition-colors">
          <Mail className="h-4 w-4" /> Email Confirmation
        </button>
      </div>
    </div>
  );
}
