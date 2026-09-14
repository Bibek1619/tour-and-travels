import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import VehicleDetailView from "@/components/admin/vehicle-detail-view";
import { fetchEntity } from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminVehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchEntity("vehicles", id);
  if (!data) notFound();

  return (
    <AdminLayout>
      <VehicleDetailView
        data={data}
        editHref={`/admin/vehicles/${id}/edit`}
        deleteEndpoint={`/api/vehicles/${id}`}
        listHref="/admin/vehicles"
      />
    </AdminLayout>
  );
}