import { notFound } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import CreateTourWizard from "@/components/admin/create-tour-wizard";
import { fetchEntity } from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminTrekEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchEntity("treks", id);
  if (!data) notFound();

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href={`/admin/treks/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to trek
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Trek</h1>
      </div>

      <CreateTourWizard
        defaultCategory="trek"
        listHref="/admin/treks"
        initial={data}
      />
    </AdminLayout>
  );
}