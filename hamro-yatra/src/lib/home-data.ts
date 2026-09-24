import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/db";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { HomepageContent as HomepageContentModel } from "@/models/homepageContent";
import { PageContent as PageContentModel } from "@/models/pageContent";
import { TourPackage } from "@/models/tourPackage";
import { Region } from "@/models/region";
import { Review } from "@/models/review";
import { getPageContent } from "@/lib/page-content";
import type { HomePageContent } from "@/lib/page-content/types";

export type HomePageData = {
  storedContent: Record<string, unknown> | null;
  allPublished: Record<string, unknown>[];
  popularTours: Record<string, unknown>[];
  reviews: Record<string, unknown>[];
  homePageContent: HomePageContent;
  homePageContentRaw: { content?: Record<string, unknown> } | null;
};

async function fetchHomePageData(): Promise<HomePageData> {
  await connectDB();

  const regions = await Region.find().select("_id").lean();
  const regionIds = regions.map((r) => r._id);
  const activeRegionFilter = { $in: [null, ...regionIds] };

  const [
    storedContent,
    allPublished,
    popularTours,
    reviews,
    homePageContent,
    homePageContentRaw,
  ] = await Promise.all([
    HomepageContentModel.findOne().lean(),
    TourPackage.find({
      category: "trek",
      status: "published",
      region: activeRegionFilter,
    } as unknown as Parameters<typeof TourPackage.find>[0])
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(6)
      .lean(),
    TourPackage.find({ category: "tour", status: "published" })
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(6)
      .lean(),
    Review.find({ status: "approved", featuredOnHomepage: true })
      .populate([
        { path: "tour", select: "title", strictPopulate: false },
        { path: "vehicle", select: "name", strictPopulate: false },
        { path: "adventure", select: "name", strictPopulate: false },
      ])
      .sort({ createdAt: -1 })
      .limit(6)
      .lean(),
    getPageContent("home"),
    PageContentModel.findOne({ slug: "home" }).select("content").lean(),
  ]);

  const data: HomePageData = {
    storedContent: storedContent as Record<string, unknown> | null,
    allPublished: allPublished as Record<string, unknown>[],
    popularTours: popularTours as Record<string, unknown>[],
    reviews: reviews as Record<string, unknown>[],
    homePageContent: homePageContent as HomePageContent,
    homePageContentRaw:
      homePageContentRaw as { content?: Record<string, unknown> } | null,
  };

  return JSON.parse(JSON.stringify(data)) as HomePageData;
}

export const getHomePageData = unstable_cache(fetchHomePageData, ["home-page"], {
  revalidate: 3600,
  tags: [CACHE_TAGS.tours, CACHE_TAGS.reviews],
});