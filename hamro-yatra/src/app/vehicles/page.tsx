import { connectDB } from "@/lib/db";
import { Vehicle } from "@/models/vehicle";
import type { Vehicle as VehicleType } from "@/lib/types";
import Link from "next/link";
import { Star, ArrowRight, Car } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";
import { getCardImage } from "@/lib/cloudinary";
import JsonLd from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Car Rental Pokhara – Scorpio Jeep, Hiace & SUV Hire Nepal | Best Rates",
  description:
    "Hire Scorpio jeep, Toyota Hiace, SUV or 4WD vehicle in Pokhara with experienced driver. Best rates for tourist vehicle rental, airport transfers & long-distance trips across Nepal.",
  path: "/vehicles",
  keywords: [
    "Scorpio jeep hire in Pokhara",
    "Scorpio rental Pokhara",
    "Scorpio jeep with driver Pokhara",
    "jeep rental Pokhara",
    "4WD jeep hire Pokhara",
    "private jeep hire Pokhara",
    "Mahindra Scorpio rental Nepal",
    "car rental in Pokhara",
    "tourist vehicle rental Pokhara",
    "SUV rental Pokhara",
    "Hiace rental Pokhara",
    "off-road vehicle rental Nepal",
    "Pokhara airport car rental",
    "Pokhara to Kathmandu private car",
    "vehicle booking Nepal",
  ],
});

async function getVehicles(): Promise<VehicleType[]> {
  await connectDB();
  const vehicles = await Vehicle.find({
    isAvailable: true,
    availableCount: { $gt: 0 },
  })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(vehicles)) as VehicleType[];
}

export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Vehicles", url: "/vehicles" },
        ])}
      />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <main>
          <section className="relative h-[320px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100" />
            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,gray_1px,transparent_0)] bg-[length:24px_24px]" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
              <span className="inline-flex items-center gap-2 bg-white border border-orange-200 text-orange-600 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-4 shadow-sm">
                <Car className="w-4 h-4" />
                Pokhara &amp; Throughout Nepal
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Car Rental & Jeep Hire in Pokhara
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Comfortable Mahindra Scorpio and SUVs with experienced drivers,
                available for city tours, mountain trips and long-distance hire
                across Nepal.
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Our Vehicles
                  </h2>
                  <p className="text-gray-600">
                    Select a vehicle to view full details or book it directly.
                  </p>
                </div>
                </div>

              {vehicles.length === 0 ? (
                <p className="text-center text-gray-500 py-20">
                  No vehicles available at the moment. Please check back soon.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {vehicles.map((vehicle) => (
                    <Link
                      key={vehicle._id}
                      href={`/vehicles/${vehicle.slug || vehicle._id}`}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                    >
                      <div className="relative h-56 overflow-hidden">
                        {vehicle.images?.[0] ? (
                          <img
                            src={getCardImage(vehicle.images[0])}
                            alt={`${vehicle.name} - Vehicle Hire in Pokhara`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                            <Car className="w-12 h-12" />
                          </div>
                        )}
                        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase">
                          {vehicle.category === "jeep"
                            ? "SUV / Jeep"
                            : vehicle.category ?? "Vehicle"}
                        </span>
                        {vehicle.rating ? (
                          <span className="absolute top-3 right-3 bg-white/95 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            {vehicle.rating} ({vehicle.totalReviews})
                          </span>
                        ) : null}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                          {vehicle.name}
                        </h3>

                        <span className="mt-auto inline-flex items-center justify-center gap-2 bg-orange-600 group-hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors">
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <section className="mt-16 bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                  Why Hire a Vehicle with Hamro Yatra Adventure?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Experienced Drivers",
                      desc: "Well-trained local drivers who know the mountain roads inside out.",
                    },
                    {
                      title: "Well-Maintained Vehicles",
                      desc: "Clean, comfortable and regularly serviced SUVs checked before every trip.",
                    },
                    {
                      title: "Flexible Hire Options",
                      desc: "Daily, weekly or long-term hire for tours, office work and family trips.",
                    },
                    {
                      title: "Best Price Guarantee",
                      desc: "Transparent pricing with no hidden charges.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Car className="w-6 h-6 text-orange-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}