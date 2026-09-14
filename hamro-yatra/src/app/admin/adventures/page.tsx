import { connectDB } from "@/lib/db";
import { Adventure } from "@/models/adventure";
import { AdventureCategory as Category } from "@/models/adventureCategory";
import { adventureCategories } from "@/lib/adventure-categories";
import AdminLayout from "@/components/admin/admin-layout";
import AdventureCategoryManager, {
  type CategoryItem,
} from "@/components/admin/adventure-categories-manager";

export const dynamic = "force-dynamic";

export default async function AdminAdventuresPage() {
  await connectDB();

  const existing = await Category.countDocuments();
  if (existing === 0) {
    await Category.insertMany(
      adventureCategories.map((c, index) => ({
        slug: c.id,
        name: c.name,
        image: c.image,
        description: c.description,
        sortOrder: index,
      }))
    );
  }
  const countDocs = await Adventure.aggregate<{
    _id: string;
    count: number;
  }>([
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]).exec();
  const counts: Record<string, number> = {};
  for (const doc of countDocs) {
    counts[doc._id] = doc.count;
  }

  const categories = JSON.parse(
    JSON.stringify(
      await Category.find().sort({ sortOrder: 1 }).lean()
    )
  ) as {
    _id: string;
    slug: string;
    name: string;
    description: string;
    image: string;
  }[];

  const items: CategoryItem[] = categories.map((c) => ({
    _id: c._id,
    id: c.slug,
    name: c.name,
    description: c.description,
    image: c.image,
  }));

  return (
    <AdminLayout>
      <AdventureCategoryManager categories={items} counts={counts} />
    </AdminLayout>
  );
}