"use client";

import { useState, useEffect } from "react";
import VehicleSelection from "./vehicle-selection";
import TripDetails from "./trip-details";
import CustomerInfoForm from "./customer-info-form";
import VehicleBookingConfirmation from "./vehicle-booking-confirmation";
import type { Vehicle } from "@/lib/types";

interface VehicleBookingFlowProps {
  vehicles: Vehicle[];
}

export default function VehicleBookingFlow({
  vehicles,
}: VehicleBookingFlowProps) {
  const [currentStep, setCurrentStep] = useState("vehicle");
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [bookingData, setBookingData] = useState({
    vehicleId: "",
    vehicleType: "",
    vehicleName: "",
    startDate: "",
    endDate: "",
    destination: "",
    pickupLocation: "",
    includeDriver: true,
    days: 0,
    dailyRate: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const updateBookingData = (data: Record<string, unknown>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="space-y-8 relative">
      {loading && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto" />
            <p className="mt-3 text-sm text-gray-600">Processing...</p>
          </div>
        </div>
      )}

      {currentStep === "vehicle" && (
        <VehicleSelection
          vehicles={vehicles}
          initialData={bookingData}
          onNext={(data) => {
            setLoading(true);
            setTimeout(() => {
              updateBookingData(data);
              setCurrentStep("details");
              setLoading(false);
            }, 500);
          }}
        />
      )}

      {currentStep === "details" && (
        <TripDetails
          bookingData={bookingData}
          onBack={() => setCurrentStep("vehicle")}
          onNext={(data) => {
            setLoading(true);
            setTimeout(() => {
              updateBookingData(data);
              setCurrentStep("customer");
              setLoading(false);
            }, 500);
          }}
        />
      )}

      {currentStep === "customer" && (
        <CustomerInfoForm
          onBack={() => setCurrentStep("details")}
          onSubmit={async (customerData) => {
            setLoading(true);
            await Promise.allSettled([
              fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: customerData.name,
                  email: customerData.email,
                  phone: customerData.phone,
                  packageName: bookingData.vehicleName,
                  packageType: "vehicle",
                  packageId: bookingData.vehicleId,
                  startDate: bookingData.startDate
                    ? new Date(bookingData.startDate)
                    : undefined,
                  endDate: bookingData.endDate
                    ? new Date(bookingData.endDate)
                    : undefined,
                  destination: bookingData.destination,
                  pickupLocation: bookingData.pickupLocation,
                  days: bookingData.days,
                  dailyRate: bookingData.dailyRate,
                  totalPrice: bookingData.totalPrice,
                }),
              }),
              new Promise((resolve) => setTimeout(resolve, 800)),
            ]);
            updateBookingData(customerData);
            setBookingId("VNPL" + Date.now().toString().slice(-6));
            setCurrentStep("confirmation");
            setLoading(false);
          }}
        />
      )}

      {currentStep === "confirmation" && (
        <VehicleBookingConfirmation
          bookingData={bookingData}
          bookingId={bookingId}
        />
      )}
    </div>
  );
}
