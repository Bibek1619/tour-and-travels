"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import VehicleBookingModal from "@/components/vehicle-booking/vehicle-booking-modal";

interface HireVehicleButtonProps {
  vehicleName: string;
  vehicleId: string;
  route: string;
}

export default function HireVehicleButton({
  vehicleName,
  vehicleId,
  route,
}: HireVehicleButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 bg-orange-50 hover:bg-orange-600 hover:text-white px-4 py-2 rounded-full transition-colors"
      >
        Hire
        <ArrowRight className="w-4 h-4" />
      </button>

      {open && (
        <VehicleBookingModal
          mode="booking"
          vehicleName={`${vehicleName} – ${route}`}
          vehicleId={vehicleId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}