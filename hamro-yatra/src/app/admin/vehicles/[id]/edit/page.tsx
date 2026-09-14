import { notFound } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import VehicleForm from "@/components/admin/vehicle-form";
import { fetchEntity } from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminVehicleEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchEntity("vehicles", id);
  if (!data) notFound();

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href={`/admin/vehicles/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to vehicle
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Vehicle</h1>
        <p className="text-gray-600 mt-1">
          Update details for: <strong>{data.name}</strong>
        </p>
      </div>

      <VehicleForm
        initial={data}
        endpoint={`/api/vehicles/${id}`}
        listHref="/admin/vehicles"
      />
    </AdminLayout>
  );
}