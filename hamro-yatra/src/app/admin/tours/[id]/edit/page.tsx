import { notFound } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import CreateTourWizard from "@/components/admin/create-tour-wizard";
import { fetchEntity } from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminTourEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchEntity("tours", id);
  if (!data) notFound();

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href={`/admin/tours/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to tour
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Tour</h1>
      </div>

      <CreateTourWizard
        defaultCategory="tour"
        listHref="/admin/tours"
        initial={data}
      />
    </AdminLayout>
  );
}