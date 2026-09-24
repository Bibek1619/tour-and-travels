import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/db";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { PageContent } from "@/models/pageContent";
import {
  DEFAULT_PAGE_CONTENT,
  pageContentSlugs,
  type PageContentSlug,
} from "./defaults";
import type { PageContentMap } from "./types";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function deepMerge<T extends Record<string, unknown>>(
  defaults: T,
  stored: Partial<T> | null | undefined
): T {
  const result: Record<string, unknown> = { ...defaults };

  if (stored && typeof stored === "object") {
    for (const [key, value] of Object.entries(stored)) {
      if (value === undefined || value === null) continue;
      const defValue = defaults[key];
      if (isPlainObject(value) && isPlainObject(defValue)) {
        result[key] = deepMerge(defValue, value);
      } else if (Array.isArray(value) && value.length === 0 && isPlainObject(defValue)) {
        result[key] = defValue;
      } else {
        result[key] = value;
      }
    }
  }

  return result as T;
}

const getCachedPageContent = unstable_cache(
  async (slug: string) => {
    await connectDB();
    const doc = await PageContent.findOne({ slug }).select("content").lean();
    const defaults = DEFAULT_PAGE_CONTENT[slug as PageContentSlug];
    const stored = (doc?.content ?? {}) as Record<string, unknown>;
    const merged = deepMerge(
      defaults as unknown as Record<string, unknown>,
      stored
    );
    return JSON.parse(
      JSON.stringify(merged)
    ) as unknown as PageContentMap[PageContentSlug];
  },
  ["page-content"],
  { revalidate: 3600, tags: [CACHE_TAGS.pageContent] }
);

export async function getPageContent<S extends PageContentSlug>(
  slug: S
): Promise<PageContentMap[S]> {
  return (await getCachedPageContent(slug)) as PageContentMap[S];
}

export { pageContentSlugs };
export type { PageContentSlug };