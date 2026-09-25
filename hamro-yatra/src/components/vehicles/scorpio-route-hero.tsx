import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { ScorpioRoute } from "@/lib/scorpio-routes";
import VehicleEnquiryBox from "@/components/vehicles/vehicle-enquiry-box";

interface ScorpioRouteHeroProps {
  route: ScorpioRoute;
  rating?: number;
  totalReviews?: number;
  vehicleName: string;
  vehicleId: string;
}

export function ScorpioRouteHero({
  route,
  rating,
  totalReviews,
  vehicleName,
  vehicleId,
}: ScorpioRouteHeroProps) {
  const destination = route.route.replace("Pokhara to ", "");
  const isKathmandu = route.slug === "pokhara-to-kathmandu-scorpio-hire";
  const isJhinu = route.slug === "pokhara-to-jhinu-danda-scorpio-hire";
  const isGhandruk = route.slug === "pokhara-to-ghandruk-scorpio-hire";
  const heroImage = isKathmandu
    ? "/carhero1 (1).jpg"
    : route.image ?? "/carhero1 (1).jpg";

  const paragraphs =
    isKathmandu
      ? [
          "Travel from Pokhara to Kathmandu in the most comfort and convenience on the road through our high-class Jeep Scorpio rental package by Hamro Yatra Adventure. Enjoy the amazing scenery of Nepal with your own eyes as you start a 210km journey from the very heart of Pokhara to the quiet city of Kathmandu.",
          "Our Jeep rental service guarantees no hassle journey so that you can enjoy the beauty of your journey rather than worrying about the small things. Having a fleet of regularly serviced Scorpios and Jeeps and competent drivers, we provide you with a safe and exciting ride alongside Prithivi Highway.",
          "Please do not hesitate to contact us to book your Pokhara to Kathmandu Jeep rental package. Now comes the time to start your unforgettable overland journey through Nepal.",
        ]
      : isGhandruk
        ? [
            "Looking for a Scorpio or Jeep rental from Pokhara to Ghandruk? Ghandruk, a beautiful Gurung village in the Annapurna region of Nepal, is one of the most popular trekking and cultural destinations in the Annapurna Himalaya, offering stunning close-up views of Annapurna South (7,219m), Machhapuchhre (Fishtail Mountain), and Hiunchuli along the Modi Khola valley.",
            "Our experienced drivers know the local routes and provide a safe and comfortable journey so you can relax and enjoy the scenery. Ghandruk is also the trailhead for the famous Ghandruk to Ghorepani–Poon Hill trek and the Annapurna Base Camp (ABC) trek, making our Scorpio Jeep rental the easiest and most convenient way to reach the trekking starting point from Pokhara.",
            "One-way Ghandruk jeep hire is perfect for travellers who want to explore the Annapurna Conservation Area, Gurung culture, traditional stone houses, and the best sunrise viewpoints around Poon Hill without the hassle of public buses.",
          ]
        : [
            `We can provide a Scorpio or Jeep rental service from Pokhara to ${destination}, all over Nepal. These versatile vehicles offer comfort, reliability, and the ability to navigate various terrains, making them ideal for city driving, scenic trips, and off-road adventures.`,
            `Our experienced drivers know the local routes and provide a safe and comfortable journey so you can relax and enjoy the scenery.`,
          ];

  return (
    <div className="mb-10">
      <div className="hidden lg:block relative h-64 md:h-[400px] lg:float-right lg:mb-6 lg:ml-8 lg:w-[44%] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={heroImage}
          alt={`${route.route} Scorpio Hire in Pokhara`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          fetchPriority="high"
        />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-[#E67E23] leading-snug">
        {route.route} Scorpio Hire | Best Scorpio Jeep Rental Service in Nepal
      </h1>
      {rating ? (
        <p className="flex items-center gap-1 text-sm text-gray-600 mt-3">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          {rating} ({totalReviews} reviews)
        </p>
      ) : null}

      <div className="mt-6">
        <div className="mb-6">
          <VehicleEnquiryBox vehicleName={vehicleName} vehicleId={vehicleId} />
        </div>

        <div className="lg:hidden relative h-64 md:h-[400px] mb-6 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={heroImage}
            alt={`${route.route} Scorpio Hire in Pokhara`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
{isJhinu ? (
              <p>
                You can also book{" "}
                <Link
                  href="/trek-packages"
                  className="font-semibold text-orange-600 underline"
                >
                  Annapurna Base Camp trek packages
                </Link>
                , which starts from Jhinu Danda.
              </p>
            ) : null}
            {isGhandruk ? (
              <p>
                You can also visit our{" "}
                <Link
                  href="/tours/pokhara-to-ghandruk-tour"
                  className="rounded bg-orange-100 px-1 font-semibold text-orange-700 underline"
                >
                  Ghandruk tour packages
                </Link>
                .
              </p>
            ) : null}
          </div>

          {isKathmandu ? (
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Pokhara to Kathmandu Scorpio Jeep Trip
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Rent a Scorpio jeep with comfortable and stylish facilities from
                Pokhara to Kathmandu for a very memorable trip. The journey is
                210km away, but it will be as pleasant as it can be, as you
                enjoy seeing the lovely landscapes of Nepal. The experienced
                drivers of our company and well-maintained jeeps ensure your
                safety and comfort during the trip, so you can unwind and take
                in the scenery of the Bhairahawa-Bardia route. The Pokhara to
                Kathmandu Jeep trip is not only designed to bring you home or
                let you continue your adventure but also to provide you with
                great convenience and flexibility, which will make your travel
                pleasant and memorable.
              </p>
            </div>
          ) : null}
          <div className="clear-both" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default ScorpioRouteHero;