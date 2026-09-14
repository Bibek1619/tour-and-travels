import { notFound } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import AdventureForm from "@/components/admin/adventure-form";
import { fetchEntity } from "@/lib/admin-entities";

export const dynamic = "force-dynamic";

export default async function AdminAdventureEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchEntity("adventures", id);
  if (!data) notFound();

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href={`/admin/adventures/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to adventure
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Adventure</h1>
        <p className="text-gray-600 mt-1">
          Update the details, descriptions and images of this adventure
        </p>
      </div>

      <AdventureForm
        initial={data}
        endpoint={`/api/adventures/${id}`}
        listHref="/admin/adventures"
      />
    </AdminLayout>
  );
}