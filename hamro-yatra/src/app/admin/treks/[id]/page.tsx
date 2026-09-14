import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import TourPackageView from "@/components/admin/tour-package-view";
import { fetchEntity } from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminTrekDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchEntity("treks", id);
  if (!data) notFound();

  return (
    <AdminLayout>
      <TourPackageView
        data={data}
        trek
        editHref={`/admin/treks/${id}/edit`}
        deleteEndpoint={`/api/tours/${id}`}
        listHref="/admin/treks"
      />
    </AdminLayout>
  );
}