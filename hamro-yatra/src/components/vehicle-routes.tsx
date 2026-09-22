import { ArrowRight, Clock, MapPin } from "lucide-react";
import HireVehicleButton from "@/components/vehicle-booking/hire-vehicle-button";

const destinations = [
  { from: "Pokhara", to: "Kathmandu", time: "6–7 hrs" },
  { from: "Pokhara", to: "Chitwan", time: "5–6 hrs" },
  { from: "Pokhara", to: "Birgunj", time: "5–6 hrs" },
  { from: "Pokhara", to: "Lumbini", time: "8–9 hrs" },
  { from: "Pokhara", to: "Butwal", time: "4–5 hrs" },
  { from: "Pokhara", to: "Nepalgunj", time: "10–11 hrs" },
];

interface VehicleRoutesProps {
  vehicleName: string;
  vehicleId: string;
}

export default function VehicleRoutes({
  vehicleName,
  vehicleId,
}: VehicleRoutesProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Routes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.to}
            destination={destination}
            vehicleName={vehicleName}
            vehicleId={vehicleId}
          />
        ))}
      </div>
    </section>
  );
}

function DestinationCard({
  destination,
  vehicleName,
  vehicleId,
}: {
  destination: (typeof destinations)[number];
  vehicleName: string;
  vehicleId: string;
}) {
  return (
    <div className="group flex flex-col bg-white rounded-xl border border-gray-200 p-5 hover:border-orange-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <span className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span className="font-medium">{destination.from}</span>
        </span>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
      </div>

      <h3 className="font-bold text-lg text-gray-900 mt-1.5">
        {destination.to}
      </h3>

      <div className="mt-auto pt-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-gray-500">
          <Clock className="w-4 h-4 text-orange-500" />
          {destination.time}
        </span>
        <HireVehicleButton
          vehicleName={vehicleName}
          vehicleId={vehicleId}
          route={`${destination.from} to ${destination.to}`}
        />
      </div>
    </div>
  );
}