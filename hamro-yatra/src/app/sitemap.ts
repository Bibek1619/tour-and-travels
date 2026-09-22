import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import { Adventure } from "@/models/adventure";
import { Vehicle } from "@/models/vehicle";
import { getTrekRegions } from "@/lib/regions";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/vehicles`, changeFrequency: "daily", priority: 0.95 }, // HIGHEST - Main business
    { url: `${base}/tours`, changeFrequency: "weekly", priority: 0.9 }, // Second priority
    { url: `${base}/trek-packages`, changeFrequency: "weekly", priority: 0.85 }, // Third priority
    { url: `${base}/adventures`, changeFrequency: "weekly", priority: 0.8 }, // Fourth priority
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 }, // Higher - leads to bookings
  ];

  try {
    await connectDB();
  } catch {
    return staticRoutes;
  }

  const [tours, treks, regions, adventures, vehicles] = await Promise.all([
    TourPackage.find({ category: "tour", status: "published" })
      .select("slug updatedAt")
      .lean(),
    TourPackage.find({ category: "trek", status: "published" })
      .select("slug updatedAt")
      .lean(),
    getTrekRegions(),
    Adventure.find({ status: "published" })
      .select("_id category updatedAt")
      .lean(),
    Vehicle.find({}).select("_id slug updatedAt").lean(),
  ]);

  const lastmodFor = (doc: { updatedAt?: unknown }) =>
    doc.updatedAt
      ? new Date(doc.updatedAt as string).toISOString()
      : undefined;

  const tourRoutes = tours.map((t) => ({
    url: `${base}/tours/${t.slug}`,
    lastModified: lastmodFor(t),
    changeFrequency: "monthly" as const,
    priority: 0.75, // Good for SEO but not main business
  }));

  const trekRoutes = treks.map((t) => ({
    url: `${base}/treks/${t.slug}`,
    lastModified: lastmodFor(t),
    changeFrequency: "monthly" as const,
    priority: 0.7, // Third priority
  }));

  const regionRoutes = regions.map((r) => ({
    url: `${base}/trek-packages/${r.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categorySet = new Set<string>();
  for (const a of adventures) {
    if (a.category) categorySet.add(String(a.category));
  }
  const categoryRoutes = Array.from(categorySet).map((slug) => ({
    url: `${base}/adventures/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const adventureRoutes = adventures.map((a) => ({
    url: `${base}/adventures/${a.category}/${a._id}`,
    lastModified: lastmodFor(a),
    changeFrequency: "monthly" as const,
    priority: 0.65, // Fourth priority
  }));

  const vehicleRoutes = vehicles.map((v) => ({
    url: `${base}/vehicles/${String(v.slug || v._id)}`,
    lastModified: lastmodFor(v),
    changeFrequency: "weekly" as const,
    priority: 0.9, // HIGHEST - Main business
  }));

  return [
    ...staticRoutes,
    ...tourRoutes,
    ...trekRoutes,
    ...regionRoutes,
    ...categoryRoutes,
    ...adventureRoutes,
    ...vehicleRoutes,
  ];
}