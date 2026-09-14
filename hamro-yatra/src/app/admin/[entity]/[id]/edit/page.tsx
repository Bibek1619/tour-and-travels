import { notFound } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import { AdminEditForm } from "@/components/admin/admin-edit-form";
import {
  fetchEntity,
  fetchEntityOptions,
  getEntityInfo,
} from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminEditPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity, id } = await params;
  const config = getEntityInfo(entity);
  if (!config) notFound();

  const [data, dynamicOptions] = await Promise.all([
    fetchEntity(entity, id),
    fetchEntityOptions(entity),
  ]);
  if (!data) notFound();

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href={`/admin/${entity}/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {config.label.toLowerCase()}
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Edit {config.label}
        </h1>
      </div>

      <AdminEditForm
        entity={config.label.toLowerCase()}
        groups={config.groups}
        initial={data}
        endpoint={`${config.apiBase}/${id}`}
        listHref={`/admin/${entity}`}
        dynamicOptions={dynamicOptions as Record<string, { value: string; label: string }[]>}
      />
    </AdminLayout>
  );
}