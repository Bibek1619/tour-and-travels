"use client";

import { useState } from "react";
import { Phone, Mail, CalendarDays, Send } from "lucide-react";
import VehicleBookingModal from "@/components/vehicle-booking/vehicle-booking-modal";

interface VehicleBookingSidebarProps {
  vehicleName: string;
  vehicleId: string;
}

export default function VehicleBookingSidebar({
  vehicleName,
  vehicleId,
}: VehicleBookingSidebarProps) {
  const [modal, setModal] = useState<"booking" | "enquiry" | null>(null);

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">
            Available for Booking
          </span>
        </div>

        <div className="p-5 space-y-2.5">
          <button
            onClick={() => setModal("booking")}
            className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            <CalendarDays className="w-4 h-4" />
            Book Vehicle
          </button>
          <button
            onClick={() => setModal("enquiry")}
            className="w-full inline-flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm font-medium py-2.5 rounded-lg border border-orange-200 transition-colors"
          >
            <Send className="w-4 h-4" />
            Make Enquiry
          </button>

          <div className="space-y-2.5 text-sm pt-3 border-t border-gray-100">
            <a
              href="tel:+9779856006671"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600"
            >
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              +977 9856006671
            </a>
            <a
              href="mailto:info@hamroyatraadventure.com"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600"
            >
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
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