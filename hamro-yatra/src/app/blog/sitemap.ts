import { connectDB } from "@/lib/db";
import { Blog } from "@/models/blog";
import type { MetadataRoute } from "next";

export const revalidate = 3600; // Regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();
  
  const blogs = await Blog.find({ status: "published" })
    .select("slug updatedAt createdAt")
    .lean();

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `https://hamroyatraadventure.com/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://hamroyatraadventure.com/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
