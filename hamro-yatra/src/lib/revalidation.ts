import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";

const FOOTER_PATHS = [
  "/",
  "/about",
  "/contact",
  "/tours",
  "/tours/[slug]",
  "/trek-packages",
  "/trek-packages/[regionId]",
  "/treks/[slug]",
  "/vehicle-booking",
  "/vehicles/[id]",
  "/adventures",
  "/adventures/[slug]",
  "/adventures/[slug]/[packageId]",
] as const;

export function revalidateFooter() {
  for (const path of FOOTER_PATHS) revalidatePath(path as string, "page");
}

export function revalidateTourPackages() {
  revalidateTag(CACHE_TAGS.tours, "max");
  revalidatePath("/");
  revalidatePath("/tours");
  revalidatePath("/tours/[slug]", "page");
  revalidatePath("/trek-packages");
  revalidatePath("/trek-packages/[regionId]", "page");
  revalidatePath("/treks/[slug]", "page");
  revalidateFooter();
}

export function revalidateVehicles() {
  revalidateTag(CACHE_TAGS.reviews, "max");
  revalidatePath("/");
  revalidatePath("/vehicles/[id]", "page");
  revalidateFooter();
}

export function revalidateAdventures() {
  revalidateTag(CACHE_TAGS.adventures, "max");
  revalidatePath("/");
  revalidatePath("/adventures");
  revalidatePath("/adventures/[slug]", "page");
  revalidatePath("/adventures/[slug]/[packageId]", "page");
  revalidateFooter();
}

export function revalidateRegion(regionId?: string) {
  revalidateTag(CACHE_TAGS.tours, "max");
  revalidatePath("/");
  revalidatePath("/trek-packages");
  if (regionId) revalidatePath(`/trek-packages/${regionId}`);
}

export function revalidatePageContent(slug: string) {
  revalidateTag(CACHE_TAGS.pageContent, "max");
  revalidatePath("/");
  revalidatePath(slug === "home" ? "/" : `/${slug}`);
  if (slug === "footer") revalidateFooter();
}

export function revalidateReviews() {
  revalidateTag(CACHE_TAGS.reviews, "max");
  revalidatePath("/");
}

export function revalidateEntityType(
  type: "tour" | "vehicle" | "adventure"
) {
  if (type === "tour") return revalidateTourPackages();
  if (type === "vehicle") return revalidateVehicles();
  return revalidateAdventures();
}