import { revalidatePath } from "next/cache";

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
  "/vehicles",
  "/vehicles/[id]",
  "/adventures",
  "/adventures/[slug]",
  "/adventures/[slug]/[packageId]",
] as const;

export function revalidateFooter() {
  for (const path of FOOTER_PATHS) revalidatePath(path as string, "page");
}

export function revalidateTourPackages() {
  revalidatePath("/");
  revalidatePath("/tours");
  revalidatePath("/tours/[slug]", "page");
  revalidatePath("/trek-packages");
  revalidatePath("/trek-packages/[regionId]", "page");
  revalidatePath("/treks/[slug]", "page");
  revalidateFooter();
}

export function revalidateVehicles() {
  revalidatePath("/");
  revalidatePath("/vehicles");
  revalidatePath("/vehicles/[id]", "page");
  revalidateFooter();
}

export function revalidateAdventures() {
  revalidatePath("/");
  revalidatePath("/adventures");
  revalidatePath("/adventures/[slug]", "page");
  revalidatePath("/adventures/[slug]/[packageId]", "page");
  revalidateFooter();
}

export function revalidateRegion(regionId?: string) {
  revalidatePath("/");
  revalidatePath("/trek-packages");
  if (regionId) revalidatePath(`/trek-packages/${regionId}`);
}

export function revalidatePageContent(slug: string) {
  revalidatePath("/");
  revalidatePath(slug === "home" ? "/" : `/${slug}`);
  if (slug === "footer") revalidateFooter();
}

export function revalidateReviews() {
  revalidatePath("/");
}

export function revalidateEntityType(
  type: "tour" | "vehicle" | "adventure"
) {
  if (type === "tour") return revalidateTourPackages();
  if (type === "vehicle") return revalidateVehicles();
  return revalidateAdventures();
}