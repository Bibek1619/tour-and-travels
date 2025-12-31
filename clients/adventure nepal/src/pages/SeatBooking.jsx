// pages/SeatBooking.jsx
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Loader2 } from "lucide-react"; // spinner icon

const SeatBooking = () => {
  return (
    <MainLayout>
      {/* Full page background */}
      <div className="w-full min-h-screen flex items-center justify-center bg-white flex-col">
      
          <Loader2 className="w-16 h-16 text-green-700 animate-spin" />
          <h1 className="text-2xl font-semibold text-gray-800">
            Seat Booking
          </h1>
          <p className="text-gray-500 text-center">
            We are currently working on this feature. Stay tuned!
          </p>
        </div>
    </MainLayout>
  );
};

export default SeatBooking;
