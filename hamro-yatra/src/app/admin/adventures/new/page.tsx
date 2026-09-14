import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import AdventureForm from "@/components/admin/adventure-form";

export const dynamic = "force-dynamic";

export default async function AdminNewAdventurePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href="/admin/adventures"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to adventures
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Create New Adventure
        </h1>
        <p className="text-gray-600 mt-1">
          Enter the details of the new adventure
        </p>
      </div>

      <AdventureForm
        endpoint="/api/adventures"
        listHref="/admin/adventures"
        defaultCategory={category}
      />
    </AdminLayout>
  );
}