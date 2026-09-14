import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import { AdminEditForm } from "@/components/admin/admin-edit-form";
import { getEntityInfo, fetchEntityOptions } from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminNewDailyRoutePage() {
  const config = getEntityInfo("daily-routes");
  const dynamicOptions = (await fetchEntityOptions("daily-routes")) as Record<
    string,
    { value: string; label: string }[]
  >;

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href="/admin/daily-routes"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to daily routes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Create New Daily Route
        </h1>
      </div>

      <AdminEditForm
        entity="daily route"
        groups={config!.groups}
        initial={{ status: "active", featured: false }}
        endpoint="/api/daily-routes"
        listHref="/admin/daily-routes"
        method="POST"
        dynamicOptions={dynamicOptions}
      />
    </AdminLayout>
  );
}