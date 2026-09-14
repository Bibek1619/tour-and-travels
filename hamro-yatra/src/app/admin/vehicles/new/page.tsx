import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import VehicleForm from "@/components/admin/vehicle-form";

export const dynamic = "force-dynamic";

export default async function AdminNewVehiclePage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href="/admin/vehicles"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to vehicles
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Create New Vehicle
        </h1>
        <p className="text-gray-600 mt-1">
          Enter the details of the new vehicle
        </p>
      </div>

      <VehicleForm endpoint="/api/vehicles" listHref="/admin/vehicles" />
    </AdminLayout>
  );
}