import { connectDB } from "@/lib/db";
import { DailyRoute } from "@/models/dailyRoute";
import type { DailyRoute as DailyRouteType } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, MapPin, Calendar, Clock, Info } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SeatBookingClient from "./seat-booking-client";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const route = await getRoute(id);
  if (!route) return { title: "Route Not Found" };
  const from = route.departure?.location ?? "";
  const to = route.arrival?.location ?? "";
  const routeName =
    route.routeName || (from && to ? `${from} to ${to}` : "Daily Route");
  return buildMetadata({
    title: `${routeName} - Online Seat Booking`,
    description: `Book a seat on the ${routeName} daily route. Seats from ${route.availableSeats ?? 0}/${route.totalSeats ?? 0} available. Price $${route.price}. Safe travel with Hamro Yatra Adventure.`,
    path: `/seat-booking/${id}`,
    keywords: [
      routeName,
      `${from} to ${to} seat booking`,
      `${from} to ${to} tourist bus`,
      `${from} to ${to} ticket online`,
      `sofa seat ${from} to ${to}`,
      "online bus ticket Nepal",
      "Nepal daily route booking",
      "bus seat booking Nepal",
    ],
  });
}

function getVehicleType(seats: number) {
  if (seats <= 7) return "suv";
  if (seats <= 12) return "van";
  return "bus";
}

async function getRoute(id: string): Promise<DailyRouteType | null> {
  await connectDB();
  const route = await DailyRoute.findById(id).lean();
  if (!route) return null;
  return JSON.parse(JSON.stringify(route)) as DailyRouteType;
}

export default async function SeatBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const route = await getRoute(id);

  if (!route) notFound();

  const vehicleType = getVehicleType(route.totalSeats ?? 20);
  const from = route.departure?.location ?? "";
  const to = route.arrival?.location ?? "";
  const routeName =
    route.routeName || (from && to ? `${from} to ${to}` : "Daily Route");
  const departureDate = route.departureDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        weekday: "short",
      }).format(new Date(route.departureDate))
    : "TBA";

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Seat Booking", url: "/seat-booking" },
          { name: routeName, url: `/seat-booking/${id}` },
        ])}
      />
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/seat-booking"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Routes
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {routeName} - Online Seat Booking
          </h1>

          {/* Trip Info Card */}
          <div className="bg-white rounded-xl border p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-72 h-48 bg-gradient-to-br from-orange-100 to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-orange-500 mx-auto mb-1" />
                  <p className="font-bold text-gray-800">
                    {from} → {to}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h2 className="text-2xl font-bold">{route.routeName}</h2>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {route.availableSeats} Seats Available
                  </span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                    {vehicleType}
                  </span>
                </div>
                {route.description && (
                  <p className="text-gray-600 mb-4">{route.description}</p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-orange-600" />
                    <div>
                      <p className="text-gray-500 text-xs">Route</p>
                      <p className="font-medium">
                        {from} → {to}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <div>
                      <p className="text-gray-500 text-xs">Date</p>
                      <p className="font-medium">{departureDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-green-600" />
                    <div>
                      <p className="text-gray-500 text-xs">Time</p>
                      <p className="font-medium">
                        {route.departure?.time ?? "TBA"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info size={16} className="text-purple-600" />
                    <div>
                      <p className="text-gray-500 text-xs">Duration</p>
                      <p className="font-medium">{route.duration ?? "N/A"}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-2xl font-bold text-orange-600">
                    NPR {(route.price ?? 0).toLocaleString()}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      per seat
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Seat Selection (client component) */}
          <SeatBookingClient
            routeId={route._id}
            vehicleType={vehicleType}
            totalSeats={route.totalSeats ?? 0}
            bookedSeats={route.bookedSeats ?? []}
            pricePerSeat={route.price ?? 0}
            departure={from}
            arrival={to}
            departureTime={route.departure?.time ?? "TBA"}
            departureDate={departureDate}
            duration={route.duration ?? "N/A"}
            vehicleName={route.routeName ?? ""}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
