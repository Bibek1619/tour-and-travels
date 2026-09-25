"use client";

import { useState } from "react";
import { CalendarDays, Mail, Phone, Send } from "lucide-react";
import VehicleBookingModal from "@/components/vehicle-booking/vehicle-booking-modal";

interface VehicleEnquiryBoxProps {
  vehicleName: string;
  vehicleId: string;
}

export default function VehicleEnquiryBox({
  vehicleName,
  vehicleId,
}: VehicleEnquiryBoxProps) {
  const [modal, setModal] = useState<"booking" | "enquiry" | null>(null);

  return (
    <div className="flex max-w-2xl flex-wrap gap-2">
      <button
        onClick={() => setModal("booking")}
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-700"
      >
        <CalendarDays className="h-4 w-4" />
        Book Vehicle
      </button>
      <button
        onClick={() => setModal("enquiry")}
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-700"
      >
        <Send className="h-4 w-4" />
        Make Enquiry
      </button>
      <a
        href="tel:+9779856006671"
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-orange-50 px-4 text-sm text-gray-700 transition-colors hover:bg-orange-100"
      >
        <Phone className="h-4 w-4 text-[#E67E23]" />
        +977 9856006671
      </a>
      <a
        href="mailto:info@hamroyatraadventure.com"
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-orange-50 px-4 text-sm text-gray-700 transition-colors hover:bg-orange-100"
      >
        <Mail className="h-4 w-4 text-[#E67E23]" />
        info@hamroyatraadventure.com
      </a>

      {modal === "booking" ? (
        <VehicleBookingModal
          mode="booking"
          vehicleName={vehicleName}
          vehicleId={vehicleId}
          onClose={() => setModal(null)}
        />
      ) : null}
      {modal === "enquiry" ? (
        <VehicleBookingModal
          mode="enquiry"
          vehicleName={vehicleName}
          vehicleId={vehicleId}
          onClose={() => setModal(null)}
        />
      ) : null}
    </div>
  );
}