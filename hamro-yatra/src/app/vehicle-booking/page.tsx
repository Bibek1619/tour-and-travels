import { connectDB } from "@/lib/db";
import { Vehicle } from "@/models/vehicle";
import type { Vehicle as VehicleType } from "@/lib/types";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import VehicleBookingFlow from "@/components/vehicle-booking/vehicle-booking-flow";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Book Car Rental Pokhara – Scorpio Jeep, Hiace & SUV Hire Online",
  description:
    "Instant online booking for Scorpio jeep, Hiace van, SUV & 4WD vehicle hire in Pokhara. Experienced drivers, airport transfers, Pokhara to Kathmandu trips. Best rates guaranteed.",
  path: "/vehicle-booking",
  keywords: [
    "Scorpio jeep hire in Pokhara",
    "Scorpio jeep with driver Pokhara",
    "Scorpio booking Pokhara",
    "jeep rental Pokhara",
    "4WD jeep hire Pokhara",
    "Mahindra Scorpio rental Nepal",
    "car rental in Pokhara",
    "Hiace van rent Pokhara",
    "SUV rental Pokhara",
    "jeep rental for Muktinath",
    "Pokhara to Kathmandu private car",
    "Pokhara airport car rental",
    "wedding car rental Pokhara",
    "monthly car rental Pokhara",
    "tourist vehicle rental Pokhara",
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

export default async function VehicleBookingPage() {
  const [vehicles, content] = await Promise.all([
    getVehicles(),
    getPageContent("vehicle-booking"),
  ]);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{content.hero.title}</h1>
        <VehicleBookingFlow vehicles={vehicles} />
      </div>
      <Footer />
    </div>
  );
}
