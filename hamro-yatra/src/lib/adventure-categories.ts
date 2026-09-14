import { connectDB } from "@/lib/db";
import { AdventureCategory as AdventureCategoryModel } from "@/models/adventureCategory";

export interface AdventureCategory {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const adventureCategories: AdventureCategory[] = [
  {
    id: "rafting",
    name: "Rafting",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    description:
      "White water rafting through the thrilling rapids of Nepal's rivers.",
  },
  {
    id: "kayaking",
    name: "Kayaking",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    description:
      "Paddle through serene lakes and rivers with breathtaking mountain views.",
  },
  {
    id: "paragliding",
    name: "Paragliding",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
    description:
      "Soar above the Himalayas and experience the ultimate free-flight adventure.",
  },
  {
    id: "bungee",
    name: "Bungee Jumping",
    image: "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800",
    description:
      "Take the leap of faith from Nepal's highest bungee platforms.",
  },
  {
    id: "zipline",
    name: "Ziplining",
    image: "https://images.unsplash.com/photo-1570552626352-8b0d6f5fcf5b?w=800",
    description:
      "Fly across gorges and valleys on some of Asia's longest zip lines.",
  },
  {
    id: "canyoning",
    name: "Canyoning",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    description:
      "Descend waterfalls, slide down natural chutes, and jump into crystal pools.",
  },
];

export function getCategory(id: string): AdventureCategory {
  return (
    adventureCategories.find((c) => c.id === id) || adventureCategories[0]
  );
}

async function seedCategories(): Promise<void> {
  await connectDB();
  const count = await AdventureCategoryModel.countDocuments();
  if (count === 0) {
    await AdventureCategoryModel.insertMany(
      adventureCategories.map((c, index) => ({
        slug: c.id,
        name: c.name,
        image: c.image,
        description: c.description,
        sortOrder: index,
      }))
    );
  }
}

export async function getAdventureCategories(): Promise<
  AdventureCategory[]
> {
  try {
    await seedCategories();
    const docs = await AdventureCategoryModel.find()
      .sort({ sortOrder: 1 })
      .lean();
    if (docs.length > 0) {
      return docs.map((d) => ({
        id: d.slug,
        name: d.name,
        image: d.image || "",
        description: d.description || "",
      }));
    }
  } catch {
    // fall through to static list
  }
  return adventureCategories;
}

export async function getAdventureCategory(
  id: string
): Promise<AdventureCategory> {
  try {
    await seedCategories();
    const doc = await AdventureCategoryModel.findOne({ slug: id }).lean();
    if (doc) {
      return {
        id: doc.slug,
        name: doc.name,
        image: doc.image || "",
        description: doc.description || "",
      };
    }
  } catch {
    // fall through
  }
  return getCategory(id);
}