import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import TourPackageView from "@/components/admin/tour-package-view";
import { fetchEntity } from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminTourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchEntity("tours", id);
  if (!data) notFound();

  return (
    <AdminLayout>
      <TourPackageView
        data={data}
        editHref={`/admin/tours/${id}/edit`}
        deleteEndpoint={`/api/tours/${id}`}
        listHref="/admin/tours"
      />
    </AdminLayout>
  );
}