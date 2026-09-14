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
  title: "Car Rental in Pokhara - Scorpio, SUV & Vehicle Hire",
  description:
    "Rent a Mahindra Scorpio, SUV, car, van or bus in Pokhara and across Nepal. Best car rental rates, long & short term hire, Hiace van, bike and jeep rental with Hamro Yatra Adventure.",
  path: "/vehicle-booking",
  keywords: [
    "Scorpio rent in Pokhara",
    "Scorpio booking in Pokhara",
    "Scorpio hire Pokhara",
    "Mahindra Scorpio Nepal rent",
    "car rent in Pokhara",
    "car rental Pokhara",
    "luxury car rent Pokhara",
    "SUV hire Nepal",
    "van rental Nepal",
    "Hiace van rent Pokhara",
    "jeep hire Nepal",
    "bike rental Pokhara",
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
