import { notFound } from "next/navigation";
import Link from "next/link";
import RowActions from "@/components/admin/row-actions";
import AdminLayout from "@/components/admin/admin-layout";
import { connectDB } from "@/lib/db";
import { Adventure } from "@/models/adventure";
import { AdventureCategory } from "@/models/adventureCategory";
import type { Adventure as AdventureType } from "@/lib/types";
import { Rocket, ChevronLeft, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCategoryAdventuresPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  await connectDB();

  const category = await AdventureCategory.findOne({ slug: categoryId }).lean();
  if (!category) notFound();

  const adventures = JSON.parse(
    JSON.stringify(
      await Adventure.find({
        category: categoryId,
      } as unknown as Parameters<typeof Adventure.find>[0])
        .sort({ createdAt: -1 })
        .lean()
    )
  ) as AdventureType[];

  return (
    <AdminLayout>
      <div className="mb-8">
        <Link
          href="/admin/adventures"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Categories
        </Link>

        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {category.name}
            </h1>
            <p className="text-gray-600 mt-1">
              {category.description}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {adventures.length} adventure{" "}
              {adventures.length !== 1 ? "packages" : "package"} in this
              category
            </p>
          </div>
          <Link
            href={`/admin/adventures/new?category=${categoryId}`}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add {category.name}
          </Link>
        </div>
      </div>

      {adventures.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Rocket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No adventures in this category yet
          </h3>
          <p className="text-gray-600 mb-6">
            Add adventure packages to this category
          </p>
          <Link
            href={`/admin/adventures/new?category=${categoryId}`}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add First Adventure
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Duration</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adventures.map((adventure) => (
                  <tr key={adventure._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        {adventure.images?.[0] && (
                          <img
                            src={adventure.images[0]}
                            alt=""
                            className="h-10 w-14 rounded object-cover flex-shrink-0"
                          />
                        )}
                        <span className="line-clamp-1">{adventure.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {adventure.location || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {adventure.duration || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      NPR {adventure.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          adventure.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {adventure.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <RowActions
                        baseHref={`/admin/adventures/${adventure._id}`}
                        endpoint={`/api/adventures/${adventure._id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}