import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import { pageContentSlugs } from "@/lib/page-content";
import { PAGE_CONTENT_LABELS } from "@/lib/page-content/admin-fields";

export const dynamic = "force-dynamic";

export default function AdminPageContentIndex() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Page Content</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edit the text and content of public pages.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pageContentSlugs.map((slug) => (
          <Link
            key={slug}
            href={`/admin/page-content/${slug}`}
            className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-orange-300 hover:shadow-md transition-all"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {PAGE_CONTENT_LABELS[slug]}
            </h2>
            <p className="text-sm text-gray-500 mt-1 capitalize">
              /{slug}
            </p>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}