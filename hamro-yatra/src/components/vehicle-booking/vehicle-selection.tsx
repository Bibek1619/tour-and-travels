"use client";

import { useState, useEffect } from "react";
import { Users, Luggage, Check } from "lucide-react";
import type { Vehicle } from "@/lib/types";

interface VehicleSelectionProps {
  vehicles: Vehicle[];
  initialData: { vehicleId?: string };
  onNext: (data: {
    vehicleId: string;
    vehicleType: string;
    vehicleName: string;
    dailyRate: number;
  }) => void;
}

export default function VehicleSelection({
  vehicles,
  initialData,
  onNext,
}: VehicleSelectionProps) {
  const [selectedId, setSelectedId] = useState(initialData.vehicleId || "");

  const available = vehicles.filter(
    (v) => v.isAvailable && (v.availableCount ?? 0) > 0
  );

  const handleNext = () => {
    const vehicle = available.find((v) => v._id === selectedId);
    if (vehicle) {
      onNext({
        vehicleId: vehicle._id,
        vehicleType: vehicle.category ?? "",
        vehicleName: vehicle.name ?? "",
        dailyRate: vehicle.dailyRate ?? 0,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-xl font-bold mb-6">Select Your Vehicle</h2>

        {available.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No vehicles available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {available.map((vehicle) => (
              <div
                key={vehicle._id}
                onClick={() => setSelectedId(vehicle._id)}
                className={`cursor-pointer rounded-xl border-2 transition-all hover:shadow-lg bg-blue-50 ${
                  selectedId === vehicle._id
                    ? "border-green-500"
                    : "border-gray-200"
                }`}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-lg">
                  {vehicle.images?.[0] ? (
                    <img
                      src={vehicle.images[0]}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  {selectedId === vehicle._id && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                      {vehicle.bestFor && (
                        <span className="inline-block mt-1 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                          {vehicle.bestFor}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        NPR {(vehicle.dailyRate ?? 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">per day</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <span>{vehicle.capacity} passengers</span>
                    </div>
                    {vehicle.luggage && (
                      <div className="flex items-center gap-2">
                        <Luggage className="h-4 w-4 text-green-500" />
                        <span>{vehicle.luggage}</span>
                      </div>
                    )}
                  </div>
                  {vehicle.features && vehicle.features.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Features:</p>
                      <ul className="grid grid-cols-2 gap-1">
                        {vehicle.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-1 text-xs text-gray-600"
                          >
                            <Check className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleNext}
            disabled={!selectedId}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-all min-w-[200px]"
          >
            Continue to Trip Details
          </button>
        </div>
      </div>
    </div>
  );
}
