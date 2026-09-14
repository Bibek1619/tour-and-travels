"use client";

import Link from "next/link";
import { Truck, Calendar, Users, Clock, MapPin } from "lucide-react";
import type { DailyRoute } from "@/lib/types";

function getVehicleType(seats: number) {
  if (seats <= 7) return "suv";
  if (seats <= 12) return "van";
  return "bus";
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    weekday: "short",
  }).format(new Date(date));
}

interface RouteCardProps {
  route: DailyRoute;
}

export default function RouteCard({ route }: RouteCardProps) {
  const vehicleType = getVehicleType(route.totalSeats ?? 20);
  const from = route.departure?.location ?? "";
  const to = route.arrival?.location ?? "";

  return (
    <div className="bg-white rounded-xl border overflow-hidden hover:shadow-xl transition-all group">
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-2" />
          <p className="text-lg font-bold text-gray-800">
            {from} → {to}
          </p>
        </div>
        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {route.availableSeats} Seats Left
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Truck size={12} /> {vehicleType.toUpperCase()}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Users size={12} /> {route.totalSeats} Total
          </span>
        </div>

        <h3 className="font-bold text-lg mb-2">{route.routeName}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {route.description ||
            `Comfortable journey from ${from} to ${to}`}
        </p>

        <div className="space-y-2 text-sm text-gray-700 border-t pt-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-orange-600 flex-shrink-0" />
            <span className="font-medium">
              {from} → {to}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-600 flex-shrink-0" />
            <span>
              <strong>Departs:</strong>{" "}
              {route.departureDate ? formatDate(route.departureDate) : "TBA"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-green-600 flex-shrink-0" />
            <span>
              <strong>Time:</strong> {route.departure?.time ?? "TBA"}{" "}
              ({route.duration ?? "N/A"})
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 bg-gray-50 flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-orange-600">
            NPR {(route.price ?? 0).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">per seat</p>
        </div>
        <Link
          href={`/seat-booking/${route._id}`}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          View Seats
        </Link>
      </div>
    </div>
  );
}
