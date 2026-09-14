import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import CreateTourWizard from "@/components/admin/create-tour-wizard";

export const dynamic = "force-dynamic";

export default async function AdminNewTourPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href="/admin/tours"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to tours
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Create New Tour
        </h1>
      </div>

      <CreateTourWizard defaultCategory="tour" listHref="/admin/tours" />
    </AdminLayout>
  );
}