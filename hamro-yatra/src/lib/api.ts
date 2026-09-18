import { mergeWithDefaults } from "./homepage-content";
import type { DailyRoute, HomepageContent, Review, Tour, Vehicle } from "./types";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`/api${path}`, { cache: "no-store" });
    if (!res.ok) {
      console.log("[api] non-ok:", path, res.status, res.statusText);
      return null;
    }
    const json = await res.json();
    return (json?.data ?? null) as T | null;
  } catch (error) {
    console.log("[api] exception for", path, "->", error);
    return null;
  }
}

function withParams(path: string, params: Record<string, string | number | boolean>) {
  const qs = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();
  return `${path}?${qs}`;
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const data = await fetchJson<Partial<HomepageContent>>("/homepage");
  return mergeWithDefaults(data);
}

export async function getTours(
  params: Record<string, string | number | boolean>
): Promise<Tour[]> {
  const data = await fetchJson<Tour[]>(withParams("/tours", params));
  return data ?? [];
}

export async function getDailyRoutes(
  params: Record<string, string | number | boolean>
): Promise<DailyRoute[]> {
  const data = await fetchJson<DailyRoute[]>(
    withParams("/daily-routes", params)
  );
  return data ?? [];
}

export async function getFeaturedReviews(): Promise<Review[]> {
  const data = await fetchJson<Review[]>("/reviews/featured/homepage");
  return data ?? [];
}

export async function getDailyRouteById(id: string): Promise<DailyRoute | null> {
  return fetchJson<DailyRoute>(`/daily-routes/${id}`);
}

export async function getVehicles(
  params?: Record<string, string | number | boolean>
): Promise<Vehicle[]> {
  const path = params ? withParams("/vehicles", params) : "/vehicles";
  const data = await fetchJson<Vehicle[]>(path);
  return data ?? [];
}