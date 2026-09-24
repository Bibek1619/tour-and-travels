import { connectDB } from "@/lib/db";
import { Vehicle } from "@/models/vehicle";
import AdminLayout from "@/components/admin/admin-layout";
import RowActions from "@/components/admin/row-actions";
import Link from "next/link";
import Image from "next/image";
import type { Vehicle as VehicleType } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  await connectDB();
  const vehicles = JSON.parse(
    JSON.stringify(
      await Vehicle.find().sort({ createdAt: -1 }).lean()
    )
  ) as VehicleType[];

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Vehicles</h1>
          <p className="text-gray-600">{vehicles.length} vehicles in fleet</p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="inline-flex items-center gap-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Vehicle
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Vehicle</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Capacity</th>
                <th className="px-6 py-3">Daily Rate</th>
                <th className="px-6 py-3">Fuel</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    No vehicles found.
                  </td>
                </tr>
              )}
              {vehicles.map((vehicle) => (
                <tr key={vehicle._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      {vehicle.images?.[0] && (
                        <div className="relative h-10 w-14 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={vehicle.images[0]}
                            alt=""
                            fill
                            sizes="56px"
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <span className="block leading-tight">{vehicle.name}</span>
                        <span className="text-xs text-gray-500">
                          {vehicle.brand} {vehicle.model}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 capitalize">
                    {vehicle.category}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{vehicle.capacity}</td>
                  <td className="px-6 py-4 text-gray-600">
                    ${vehicle.dailyRate?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600 capitalize">
                    {vehicle.fuelType}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        vehicle.isAvailable
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {vehicle.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <RowActions
                      baseHref={`/admin/vehicles/${vehicle._id}`}
                      endpoint={`/api/vehicles/${vehicle._id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}