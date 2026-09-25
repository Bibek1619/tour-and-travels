import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { Vehicle } from "@/models/vehicle";
import type { Vehicle as VehicleType } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Users,
  Luggage,
  Star,
  Fuel,
  Check,
  Car,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import VehicleBookingSidebar from "@/components/vehicle-booking/vehicle-booking-sidebar";
import ReviewSection from "@/components/reviews/review-section";
import FaqSection from "@/components/faq-section";
import { buildMetadata } from "@/lib/seo";
import { getHeroImage } from "@/lib/cloudinary";
import { slugify } from "@/lib/slugify";
import JsonLd from "@/components/json-ld";
import { vehicleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { getEntityReviews } from "@/lib/review-helpers";
import VehicleRoutes from "@/components/vehicle-routes";
import ScorpioDetail from "@/components/vehicles/scorpio-detail";
import ScorpioSimilarRoutes from "@/components/vehicles/scorpio-similar-routes";
import ScorpioRouteHero from "@/components/vehicles/scorpio-route-hero";
import {
  scorpioRoutes,
  scorpioBaseSlug,
  findScorpioRoute,
} from "@/lib/scorpio-routes";

export const revalidate = 3600;

export async function generateStaticParams() {
  await connectDB();
  const vehicles = await Vehicle.find({}).select("_id slug").lean();
  return [
    ...vehicles.map((v) => ({ id: String(v.slug || v._id) })),
    ...scorpioRoutes.map((route) => ({ id: route.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const scorpioRoute = findScorpioRoute(id);
  const vehicle = await getVehicle(scorpioRoute ? scorpioBaseSlug : id);
  if (!vehicle) return { title: "Vehicle Not Found" };
  const name = vehicle.name ?? "Vehicle";
  const canonicalSlug = scorpioRoute ? id : vehicle.slug ?? id;

  if (scorpioRoute) {
    return buildMetadata({
      title: `${scorpioRoute.route} Scorpio Hire | Prices & Booking | Hamro Yatra`,
      description: `Scorpio jeep hire in Pokhara for ${scorpioRoute.route}. Rates from NPR ${scorpioRoute.price.toLocaleString(
        "en-US"
      )} (USD ${scorpioRoute.usd}), professional driver included. Book your ${scorpioRoute.route} Scorpio rental with Hamro Yatra Adventure.`,
      path: `/vehicles/${id}`,
      keywords: [
        "scorpio hire Pokhara",
        `${scorpioRoute.route.toLowerCase()} scorpio hire`,
        `${scorpioRoute.route.toLowerCase()} scorpio price`,
        "scorpio with driver Pokhara",
        "jeep rental Pokhara",
      ],
    });
  }

  const isScorpio =
    canonicalSlug === "scorpio-rent-in-pokhara" ||
    canonicalSlug === "mahindra-scorpio-7-seater";

  if (isScorpio) {
    return buildMetadata({
      title: "Scorpio Rent in Pokhara | Scorpio Jeep Rental Hire Prices in Nepal",
      description: `Rent ${name} in Pokhara & Nepal with experienced driver. ${name} jeep hire prices from Pokhara to Kathmandu, Chitwan, Lumbini & more. Book online for tours, trekking trips, airport transfers & long-distance travel.`,
      path: `/vehicles/${canonicalSlug}`,
      keywords: [
        "scorpio rent in Pokhara",
        "scorpio jeep rental hire prices in Pokhara",
        "scorpio hire Pokhara",
        "jeep rental Pokhara",
        "scorpio with driver Pokhara",
        "Mahindra Scorpio rental Nepal",
        "car rental price in Nepal",
        "private jeep hire Pokhara",
        "tourist vehicle Pokhara",
      ],
    });
  }
  return buildMetadata({
    title: `${name} Hire in Pokhara & Nepal – Rent with Driver | Hamro Yatra`,
    description: `Rent a ${name} in Pokhara & Nepal with experienced driver. NPR ${(vehicle.dailyRate ?? 0).toLocaleString()} per day, ${vehicle.capacity ?? ""} seats. Book online for tours, trekking trips, airport transfers & long-distance travel.`,
    path: `/vehicles/${canonicalSlug}`,
    keywords: [
      name,
      `${name} hire Pokhara`,
      `${name} jeep hire Pokhara`,
      `${name} rent Nepal`,
      `${name} with driver Nepal`,
      `rent ${name} Pokhara`,
      `private ${name} hire`,
      "car rental Pokhara",
      "jeep rental Pokhara",
      "tourist vehicle Pokhara",
    ],
  });
}

async function getVehicle(id: string): Promise<VehicleType | null> {
  await connectDB();
  const lookupId = mongoose.isValidObjectId(id) ? id : null;
  let vehicle = await Vehicle.findOne({
    $or: [
      { slug: id },
      ...(lookupId ? [{ _id: lookupId }] : []),
    ],
  }).lean();
  if (!vehicle) {
    const computed = slugify(id);
    if (computed && computed !== id) {
      vehicle = await Vehicle.findOne({ slug: computed }).lean();
    }
  }
  if (!vehicle) return null;
  return JSON.parse(JSON.stringify(vehicle)) as VehicleType;
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scorpioRoute = findScorpioRoute(id);
  const vehicle = await getVehicle(scorpioRoute ? scorpioBaseSlug : id);

  if (!vehicle) notFound();

  const canonicalSlug = scorpioRoute ? id : vehicle.slug ?? id;
  const isScorpio =
    !!scorpioRoute ||
    canonicalSlug === "scorpio-rent-in-pokhara" ||
    canonicalSlug === "mahindra-scorpio-7-seater";

  const scorpioPriceRow = scorpioRoute
    ? [
        {
          route: scorpioRoute.route,
          price: scorpioRoute.price,
          usd: scorpioRoute.usd,
          distance: scorpioRoute.distance,
          time: scorpioRoute.time,
        },
      ]
    : undefined;

  const heroImage = vehicle.images?.[0]
    ? getHeroImage(vehicle.images[0])
    : "/mahendra-scarpio.png";

  const reviewData = await getEntityReviews("vehicle", vehicle._id);

  const categoryLabel =
    vehicle.category === "jeep"
      ? "SUV / Jeep"
      : vehicle.category === "bike"
        ? "Bike"
        : vehicle.category === "van"
          ? "Van"
          : vehicle.category === "bus"
            ? "Bus"
            : (vehicle.category ?? "Vehicle").toUpperCase();

  const benefits = [
    "A powerful vehicle that can easily take you to the mountainous roads of Nepal",
    `It has the capacity of ${vehicle.capacity ?? 7} people at a time - more than a regular car`,
    "It has both 2WD and 4WD options while travelling",
    "Scorpio has better comfort seats that will help you during long distance travel",
  ];

  const costParagraphs = [
    "The price depends on where you want to go and the size of your group. Anywhere in Nepal, we will give you the best minimal price that we can afford.",
    "Tell us your destination and the number of people travelling, and we will share the lowest fare as soon as possible.",
  ];

  const goodToKnow = [
    "Professional driver service can be added at NPR 2,000 per day",
    "Fuel costs are charged additionally as per your route",
    "Pickup and drop-off available from anywhere in Pokhara",
    "Pre-trip inspection and clean vehicle guaranteed",
    "Driver is an expert on mountain roads and local routes",
  ];

  const specs = [
    {
      label: "Vehicle Type",
      value: categoryLabel,
      icon: Car,
      color: "text-orange-600",
    },
    {
      label: "Seating Capacity",
      value: `${vehicle.capacity ?? "-"} passengers`,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Luggage Space",
      value: vehicle.luggage ?? "-",
      icon: Luggage,
      color: "text-green-600",
    },
    {
      label: "Fuel Type",
      value: vehicle.fuelType ?? "-",
      icon: Fuel,
      color: "text-purple-600",
    },
  ];

  return (
    <div>
      <JsonLd
        data={vehicleJsonLd({
          name: vehicle.name,
          description: `Rent a ${vehicle.name ?? "vehicle"} in Nepal with Hamro Yatra Adventure.`,
          image: getHeroImage(vehicle.images?.[0]),
          url: `/vehicles/${canonicalSlug}`,
          brand: vehicle.brand,
          model: vehicle.model,
          category: vehicle.category,
          fuelType: vehicle.fuelType,
          capacity: vehicle.capacity,
          price: vehicle.dailyRate,
          rating: vehicle.rating,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          {
            name: scorpioRoute?.route ?? vehicle.name ?? "Vehicle",
            url: `/vehicles/${canonicalSlug}`,
          },
        ])}
      />
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-4 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-orange-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            {scorpioRoute ? (
              <>
                <Link
                  href="/vehicles/scorpio-rent-in-pokhara"
                  className="hover:text-orange-600"
                >
                  Scorpio Rent in Pokhara
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            ) : null}
            <span className="text-gray-800 font-medium">
              {scorpioRoute?.route ?? vehicle.name}
            </span>
          </div>

          {scorpioRoute ? (
            <ScorpioRouteHero
              route={scorpioRoute}
              rating={vehicle.rating}
              totalReviews={vehicle.totalReviews}
              vehicleName={vehicle.name ?? "Vehicle"}
              vehicleId={vehicle._id.toString()}
            />
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left column: details */}
            <div
              className={`min-w-0 space-y-8 ${
                scorpioRoute
                  ? "lg:col-span-5"
                  : isScorpio
                    ? "lg:col-span-4"
                    : "lg:col-span-3"
              }`}
            >
              {isScorpio ? (
                <ScorpioDetail
                  vehicle={vehicle}
                  destinationTitle={
                    scorpioRoute
                      ? `${scorpioRoute.route} Scorpio Hire | Best Scorpio Jeep Rental Service in Nepal`
                      : undefined
                  }
                  priceRows={scorpioPriceRow}
                  hideExtras={!!scorpioRoute}
                  hideDestinations={!!scorpioRoute}
                  hideHero={!!scorpioRoute}
                  hideIntro={!!scorpioRoute}
                />
              ) : (
                <>
              {/* Hero image */}
              <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 shadow-lg">
                {vehicle.images?.[0] ? (
                  <Image
                    src={getHeroImage(vehicle.images[0])}
                    alt={`${vehicle.name} for Hire in Pokhara Nepal - Car & Jeep Rental`}
                    fill
                    sizes="(max-width: 900px) 100vw, 80vw"
                    className="object-cover"
                    fetchPriority="high"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                    <Car className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {categoryLabel}
                </div>
                {vehicle.availableCount ? (
                  <div className="absolute bottom-4 left-4 bg-green-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    Available for Booking
                  </div>
                ) : null}
              </div>

              {/* Title + rating */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  {vehicle.name} Rental in Pokhara
                </h1>
                {vehicle.bestFor && (
                  <p className="text-gray-500 mt-2">
                    Best for{" "}
                    {vehicle.bestFor.charAt(0).toLowerCase() +
                      vehicle.bestFor.slice(1)}
                  </p>
                )}
                {vehicle.rating ? (
                  <p className="flex items-center gap-1 text-sm text-gray-600 mt-3">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {vehicle.rating} ({vehicle.totalReviews} reviews)
                  </p>
                ) : null}
              </div>

              {/* Specs */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-5">
                  Vehicle Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                    >
                      <spec.icon className={`w-6 h-6 ${spec.color} shrink-0`} />
                      <div>
                        <p className="text-xs text-gray-500">{spec.label}</p>
                        <p className="font-semibold text-gray-800 text-sm mt-0.5">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular routes */}
              <VehicleRoutes
                vehicleName={vehicle.name ?? "Vehicle"}
                vehicleId={vehicle._id}
              />

              {/* Overview */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Overview And Highlights
                </h2>
                <div className="prose prose-gray space-y-4 text-gray-700">
                  <p>
                    Welcome to Hamro Yatra Adventure, your ultimate destination
                    for {vehicle.name} hire in Pokhara! We take immense pride in
                    offering you the finest Mahindra Scorpio Jeep rental service
                    in the region, ensuring an unparalleled travel experience for
                    you and your companions.
                  </p>
                  <p>
                    Scorpio has become the most dominant vehicle for the means of
                    travelling for a small group of travelers. It is the best
                    vehicle that can take you both on the good roads and bad
                    off-roads.
                  </p>
                  <p>
                    If you are a group of six-seven people then hiring a Scorpio
                    is the best option during any kinds of travel. Similarly,
                    Hamro Yatra Adventure provides the best and affordable
                    rental service for you.
                  </p>
                  <p>
                    Scorpio provides the best comfort with a high power delivery.
                    There are two types of Scorpio available which is 4WD and
                    2WD. Hamro Yatra Adventure provides both the types of
                    Scorpio. Generally 2WD is suitable for the short drive while
                    4WD is suitable for off-roading and long tours.
                  </p>
                  <p>
                    Although it can carry up to {vehicle.capacity ?? 7} people,
                    if you wish to have a comfortable travel without carrying
                    your luggage on your lap then it is better to have a group of
                    five people.
                  </p>
                  <p>
                    Hamro Yatra Adventure provides a fresh and well-conditioned
                    Scorpio so that you don&apos;t face any break down during
                    your travel.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                    {[
                      "Best for both good roads and tough off-roads",
                      `Seats up to ${vehicle.capacity ?? 7} people comfortably`,
                      "2WD and 4WD options available",
                      "Fresh, well-conditioned and breakdown-free vehicles",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-orange-600" />
                        </span>
                        <span className="text-sm text-gray-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {vehicle.features.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                      >
                        <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-orange-600" />
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefit */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Benefit of {vehicle.name} Hiring in Pokhara
                </h2>
                <ul className="space-y-4">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-orange-600" />
                      </span>
                      <span className="text-sm text-gray-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Good to know */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Good To Know
                </h2>
                <ul className="space-y-3">
                  {goodToKnow.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

{/* Cost */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Cost of {vehicle.name} Hiring in Pokhara
                </h2>
                <div className="prose prose-gray space-y-4 text-gray-700">
                  {costParagraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              {vehicle.faqs && vehicle.faqs.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                  <FaqSection
                    title="Frequently Asked Questions"
                    items={vehicle.faqs}
                  />
                </div>
              )}
                </>
              )}
            </div>

            {/* Right column: fixed booking bar */}
            {!scorpioRoute ? (
              <div className={isScorpio ? "lg:col-span-1" : "lg:col-span-2"}>
                <VehicleBookingSidebar
                  vehicleName={vehicle.name ?? "Vehicle"}
                  vehicleId={vehicle._id.toString()}
                />
              </div>
            ) : null}
          </div>

          <div className="mt-10 space-y-10">
            {scorpioRoute ? (
              <ScorpioSimilarRoutes
                currentSlug={scorpioRoute.slug}
                heroImage={heroImage}
              />
            ) : null}
            <ReviewSection
              key={`vehicle-${vehicle._id}`}
              entityType="vehicle"
              entityId={vehicle._id}
              entityTitle={vehicle.name ?? "Vehicle"}
              noun="vehicle"
              initialReviews={reviewData.data}
              initialTotal={reviewData.total}
              initialAvgRating={reviewData.avgRating}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}