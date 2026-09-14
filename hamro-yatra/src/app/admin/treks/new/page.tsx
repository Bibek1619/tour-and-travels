import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import CreateTourWizard from "@/components/admin/create-tour-wizard";

export const dynamic = "force-dynamic";

export default async function AdminNewTrekPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region } = await searchParams;

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href="/admin/treks"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to treks
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Create New Trek
        </h1>
      </div>

      <CreateTourWizard
        defaultCategory="trek"
        listHref="/admin/treks"
        defaultRegion={region}
      />
    </AdminLayout>
  );
}