import { connectDB } from "@/lib/db";
import { DailyRoute } from "@/models/dailyRoute";
import type { DailyRoute as DailyRouteType } from "@/lib/types";
import { Bus } from "lucide-react";
import RouteCard from "@/components/seat-booking/route-card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/page-content";
import { getIcon } from "@/lib/icon-map";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Daily Route Seat Booking - Bus & Van Tickets in Nepal",
  description:
    "Book daily route bus and van seats online in Nepal. Check routes, departure times, prices and book your seat for popular destinations with Hamro Yatra Adventure.",
  path: "/seat-booking",
  keywords: [
    "daily route seat booking Nepal",
    "Nepal bus booking online",
    "van seat booking",
    "bus tickets Nepal",
    "Pokhara to Kathmandu bus booking",
    "Nepal travel transport",
  ],
});

async function getRoutes(): Promise<DailyRouteType[]> {
  await connectDB();
  const routes = await DailyRoute.find({ status: "active" })
    .sort({ departureDate: 1 })
    .limit(20)
    .lean();
  return JSON.parse(JSON.stringify(routes)) as DailyRouteType[];
}

export default async function SeatBookingPage() {
  const routes = await getRoutes();
  const content = await getPageContent("seat-booking");
  const hero = content.hero;
  const section = content.section;
  const empty = content.empty;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 px-4">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {hero.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {(hero.badges ?? []).map((rawBadge, index) => {
              const badge = rawBadge as { icon: string; label: string };
              const BadgeIcon = getIcon(String(badge.icon ?? "Bus"));
              const badgeColors: Record<string, string> = {
                Bus: "text-orange-600",
                CalendarCheck: "text-blue-600",
                Armchair: "text-green-600",
              };
              return (
                <span
                  key={index}
                  className="flex items-center gap-2 bg-white border px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                >
                  <BadgeIcon
                    className={`w-4 h-4 ${badgeColors[String(badge.icon)] ?? "text-orange-600"}`}
                  />{" "}
                  {badge.label}
                </span>
              );
            })}
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {hero.subtitle}
          </p>
        </div>

        {routes.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16">
            <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {empty.title}
            </h3>
            <p className="text-gray-500">{empty.message}</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route) => (
                <RouteCard key={route._id} route={route} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
