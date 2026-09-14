import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import AdventureDetailView from "@/components/admin/adventure-detail-view";
import { fetchEntity } from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminAdventureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchEntity("adventures", id);
  if (!data) notFound();

  return (
    <AdminLayout>
      <AdventureDetailView
        data={data}
        editHref={`/admin/adventures/${id}/edit`}
        deleteEndpoint={`/api/adventures/${id}`}
        listHref="/admin/adventures"
      />
    </AdminLayout>
  );
}