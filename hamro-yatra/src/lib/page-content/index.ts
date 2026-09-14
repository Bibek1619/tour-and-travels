import { connectDB } from "@/lib/db";
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

export async function getPageContent<S extends PageContentSlug>(
  slug: S
): Promise<PageContentMap[S]> {
  await connectDB();
  const doc = await PageContent.findOne({ slug }).select("content").lean();
  const defaults = DEFAULT_PAGE_CONTENT[slug];
  const stored = (doc?.content ?? {}) as Partial<PageContentMap[S]>;
  return deepMerge(
    defaults as unknown as Record<string, unknown>,
    stored as unknown as Record<string, unknown>
  ) as unknown as PageContentMap[S];
}

export { pageContentSlugs };
export type { PageContentSlug };