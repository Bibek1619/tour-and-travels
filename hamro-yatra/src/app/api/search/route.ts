import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import { Adventure } from "@/models/adventure";
import { Vehicle } from "@/models/vehicle";
import { scorpioRoutes } from "@/lib/scorpio-routes";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim();
    const searchRegex = new RegExp(searchTerm, "i");

    await connectDB();

    // Search in parallel across all collections
    const [tours, treks, adventures, vehicles] = await Promise.all([
      // Tours
      TourPackage.find({
        category: "tour",
        status: "published",
        $or: [
          { title: searchRegex },
          { shortOverview: searchRegex },
          { location: searchRegex },
        ],
      })
        .select("_id title slug shortOverview images")
        .limit(5)
        .lean(),

      // Treks
      TourPackage.find({
        category: "trek",
        status: "published",
        $or: [
          { title: searchRegex },
          { shortOverview: searchRegex },
          { location: searchRegex },
        ],
      })
        .select("_id title slug shortOverview images")
        .limit(5)
        .lean(),

      // Adventures
      Adventure.find({
        status: "published",
        $or: [{ name: searchRegex }, { description: searchRegex }],
      })
        .select("_id name category description images")
        .limit(5)
        .lean(),

      // Vehicles
      Vehicle.find({
        $or: [
          { name: searchRegex },
          { bestFor: searchRegex },
          { brand: searchRegex },
          { model: searchRegex },
        ],
      })
        .select("_id name slug bestFor images brand model dailyRate")
        .limit(3)
        .lean(),
    ]);

    // Search in Scorpio routes
    const matchingRoutes = scorpioRoutes.filter(
      (route) =>
        route.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.origin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const results = [
      // Scorpio routes (highest priority)
      ...matchingRoutes.slice(0, 4).map((route) => ({
        id: `route-${route.slug}`,
        title: `${route.route} Scorpio Hire`,
        description: `NPR ${route.price.toLocaleString()} • ${route.distance} km • ${route.time} hrs`,
        category: "vehicle" as const,
        url: `/vehicles/${route.slug}`,
        image: route.image || "/carhero1 (1).jpg",
      })),

      // Regular vehicles
      ...vehicles.map((v) => ({
        id: `vehicle-${v._id}`,
        title: v.name || "Vehicle",
        description: `NPR ${v.dailyRate.toLocaleString("en-US")}/day${
          v.bestFor ? ` • ${v.bestFor}` : ""
        }`,
        category: "vehicle" as const,
        url: `/vehicles/${v.slug || v._id}`,
        image: v.images?.[0],
      })),

      // Tours
      ...tours.map((t) => ({
        id: `tour-${t._id}`,
        title: t.title || "Tour",
        description: t.shortOverview ?? "",
        category: "tour" as const,
        url: `/tours/${t.slug}`,
        image: t.images?.[0],
      })),

      // Treks
      ...treks.map((t) => ({
        id: `trek-${t._id}`,
        title: t.title || "Trek",
        description: t.shortOverview ?? "",
        category: "trek" as const,
        url: `/treks/${t.slug}`,
        image: t.images?.[0],
      })),

      // Adventures
      ...adventures.map((a) => ({
        id: `adventure-${a._id}`,
        title: a.name || "Adventure",
        description: a.description,
        category: "adventure" as const,
        url: `/adventures/${a.category}/${a._id}`,
        image: a.images?.[0],
      })),
    ];

    return NextResponse.json({
      results: results.slice(0, 15), // Limit total results
      total: results.length,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Search failed", results: [] },
      { status: 500 }
    );
  }
}
