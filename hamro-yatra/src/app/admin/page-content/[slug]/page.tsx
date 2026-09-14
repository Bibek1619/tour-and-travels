import { notFound } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import { AdminEditForm } from "@/components/admin/admin-edit-form";
import { getPageContent } from "@/lib/page-content";
import {
  PAGE_CONTENT_LABELS,
  PAGE_CONTENT_GROUPS,
} from "@/lib/page-content/admin-fields";
import type { PageContentSlug } from "@/lib/page-content/defaults";

export const dynamic = "force-dynamic";

const validSlugs = new Set<string>(
  Object.keys(PAGE_CONTENT_LABELS) as string[]
);

export default async function AdminPageContentEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!validSlugs.has(slug)) notFound();

  const typedSlug = slug as PageContentSlug;

  const [content] = await Promise.all([getPageContent(typedSlug)]);

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href="/admin/page-content"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to page content
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Edit {PAGE_CONTENT_LABELS[typedSlug]}
        </h1>
      </div>

      <AdminEditForm
        entity={PAGE_CONTENT_LABELS[typedSlug].toLowerCase()}
        groups={PAGE_CONTENT_GROUPS[typedSlug]}
        initial={content as unknown as Record<string, unknown>}
        endpoint={`/api/page-content/${slug}`}
        listHref="/admin/page-content"
        method="PUT"
        tabs
      />
    </AdminLayout>
  );
}