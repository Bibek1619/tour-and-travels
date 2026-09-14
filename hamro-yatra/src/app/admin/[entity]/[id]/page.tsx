import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import { DetailView } from "@/components/admin/detail-view";
import { fetchEntity, getEntityInfo } from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminDetailPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity, id } = await params;
  const config = getEntityInfo(entity);
  if (!config) notFound();

  const data = await fetchEntity(entity, id);
  if (!data) notFound();

  return (
    <AdminLayout>
      <DetailView
        entity={entity}
        id={id}
        label={config.label}
        groups={config.groups}
        data={data}
        backHref={`/admin/${entity}`}
        editHref={`/admin/${entity}/${id}/edit`}
        deleteEndpoint={`${config.apiBase}/${id}`}
      />
    </AdminLayout>
  );
}