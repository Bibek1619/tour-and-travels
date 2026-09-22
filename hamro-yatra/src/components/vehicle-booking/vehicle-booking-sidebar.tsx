"use client";

import { useState } from "react";
import { Star, Phone, Mail, CalendarDays, Send } from "lucide-react";
import VehicleBookingModal from "@/components/vehicle-booking/vehicle-booking-modal";

interface VehicleBookingSidebarProps {
  vehicleName: string;
  vehicleId: string;
  rating?: number;
  totalReviews?: number;
}

export default function VehicleBookingSidebar({
  vehicleName,
  vehicleId,
  rating,
  totalReviews,
}: VehicleBookingSidebarProps) {
  const [modal, setModal] = useState<"booking" | "enquiry" | null>(null);

  return (
    <aside className="lg:sticky lg:top-24 space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-50 to-amber-100 px-6 py-5 border-b border-orange-100">
          <h3 className="text-xl font-bold text-gray-900">{vehicleName}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available for Booking
            </span>
            {rating ? (
              <span className="flex items-center gap-1 text-sm font-semibold bg-white text-amber-600 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {rating} ({totalReviews})
              </span>
            ) : null}
          </div>
        </div>

        <div className="p-6 space-y-3">
          <button
            onClick={() => setModal("booking")}
            className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 rounded-lg transition-colors"
          >
            <CalendarDays className="w-5 h-5" />
            Book Vehicle
          </button>
          <button
            onClick={() => setModal("enquiry")}
            className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3.5 rounded-lg border-2 border-gray-300 transition-colors"
          >
            <Send className="w-5 h-5" />
            Make Enquiry
          </button>

          <div className="pt-4 border-t space-y-3 text-sm">
            <a
              href="tel:+9779841480794"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600"
            >
              <Phone className="w-4 h-4 text-orange-600" />
              +977 984-1480794
            </a>
            <a
              href="mailto:info@hamroyatraadventure.com"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600"
            >
              <Mail className="w-4 h-4 text-orange-600" />
              info@hamroyatraadventure.com
            </a>
          </div>
        </div>
      </div>

      {modal === "booking" && (
        <VehicleBookingModal
          mode="booking"
          vehicleName={vehicleName}
          vehicleId={vehicleId}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "enquiry" && (
        <VehicleBookingModal
          mode="enquiry"
          vehicleName={vehicleName}
          vehicleId={vehicleId}
          onClose={() => setModal(null)}
        />
      )}
    </aside>
  );
}