import { connectDB } from "@/lib/db";
import { Region } from "@/models/region";

export type TrekRegion = {
  id: string;
  name: string;
  description: string;
  image: string;
  keyword: string;
};

const STATIC_FALLBACK: Omit<TrekRegion, "id" | "keyword">[] = [
  {
    name: "Everest Region Trekking",
    description:
      "Home to the world's highest peak Mount Everest (8,848m), the Everest region offers iconic treks through Sherpa villages, Buddhist monasteries, and stunning Himalayan panoramas.",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1920",
  },
  {
    name: "Annapurna Region Trekking",
    description:
      "The Annapurna region features diverse landscapes from subtropical forests to alpine meadows, offering spectacular views of the Annapurna massif and rich cultural experiences.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920",
  },
  {
    name: "Langtang Region Trekking",
    description:
      "Close to Kathmandu, the Langtang region offers beautiful valleys, Tamang culture, cheese factories, and stunning mountain scenery near the Tibetan border.",
    image: "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=1920",
  },
  {
    name: "Manaslu Region Trekking",
    description:
      "Remote and less crowded, the Manaslu region circles the eighth highest mountain in the world, offering authentic cultural experiences and pristine mountain landscapes.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
  },
];

const FALLBACK_IMAGES: Record<string, string> = {
  everest: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1920",
  annapurna: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920",
  langtang: "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=1920",
  manaslu: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
};

export function regionKeyword(name: string): string {
  const words = name.trim().split(/\s+/);
  return (words[0] || "").toLowerCase();
}

function toTrekRegion(fields: {
  name: string;
  description?: string;
  image?: string;
}): TrekRegion {
  const keyword = regionKeyword(fields.name);
  return {
    id: keyword,
    name: fields.name,
    description: fields.description || "",
    image: fields.image || FALLBACK_IMAGES[keyword] || FALLBACK_IMAGES.everest,
    keyword,
  };
}

export async function getTrekRegions(): Promise<TrekRegion[]> {
  try {
    await connectDB();
    const docs = await Region.find().sort({ name: 1 }).lean();
    if (docs.length > 0) {
      return docs.map((d) => toTrekRegion(d));
    }
  } catch {
    // fall through to static list
  }
  return STATIC_FALLBACK.map((r) => toTrekRegion(r));
}

export async function getTrekRegion(
  regionId: string
): Promise<TrekRegion | null> {
  const id = regionId.toLowerCase();
  const staticMatch = STATIC_FALLBACK.find(
    (r) => regionKeyword(r.name) === id
  );
  try {
    await connectDB();
    const docs = await Region.find().lean();
    const doc = docs.find(
      (d) =>
        regionKeyword(d.name) === id ||
        d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === id
    );
    if (doc) return toTrekRegion(doc);
  } catch {
    // fall through
  }
  return staticMatch ? toTrekRegion(staticMatch) : null;
}