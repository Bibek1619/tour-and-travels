import {
  Star,
  Check,
  Car,
  ShieldCheck,
} from "lucide-react";
import type { Vehicle as VehicleType } from "@/lib/types";
import Image from "next/image";
import { getHeroImage } from "@/lib/cloudinary";
import FaqSection from "@/components/faq-section";
import ScorpioPriceTable from "@/components/vehicles/scorpio-price-table";

const rentalPrices = [
  {
    route: "Pokhara to Kathmandu",
    type: "Drop Only",
    price: 12000,
  },
  {
    route: "Pokhara to Chitwan",
    type: "Drop Only",
    price: 9000,
  },
  {
    route: "Pokhara to Birgunj",
    type: "Drop Only",
    price: 18000,
  },
  {
    route: "Pokhara to Nepalgunj",
    type: "Drop Only",
    price: 28000,
  },
  {
    route: "Pokhara to Muktinath",
    type: "Sameday Return",
    price: 15000,
  },
];

const fleet = [
  {
    name: "Mahindra Scorpio",
    specs: "8 Seater | 2WD or 4WD | AC",
    image: "/mahendra-scarpio.png",
  },
  {
    name: "Land Cruiser Prado",
    specs: "7 Seater | 4WD | AC",
    image: "/land-cruiser-prado.png",
  },
  {
    name: "Mahindra Bolero",
    specs: "8 Seater | 2WD or 4WD",
    image: "/mahendra-bolero.png",
  },
];

const fleetIntro = [
  "When it comes to renting a jeep in Pokhara, we offer a diverse selection of reliable and rugged Jeeps to suit various preferences and travel needs. Our fleet includes popular models like the Mahindra Scorpio, Land Cruiser Prado, and Mahindra Bolero.",
];

const fleetDescriptions = [
  {
    name: "Mahindra Scorpio",
    desc: "Ideal for both urban exploration and off-road adventures, the Scorpio is known for its powerful performance, comfort, and safety features.",
  },
  {
    name: "Land Cruiser Prado",
    desc: "For those seeking a higher level of luxury and sophistication, the Toyota Prado offers a premium travel experience with advanced features and a comfortable interior.",
  },
  {
    name: "Mahindra Bolero",
    desc: "A robust and durable SUV, the Bolero is well-suited for rough terrain, providing a comfortable and spacious ride for your journeys.",
  },
];

const fleetClosing = [
  "Renting any of these jeeps with a driver ensures not only reliable and efficient transportation but also the convenience of having a knowledgeable local guide behind the wheel. Whether you're exploring the city, venturing into the mountains, or embarking on a cultural journey, our diverse fleet provides options to match your specific preferences and the demands of your itinerary.",
];

const whyUs = [
  {
    title: "Diverse Fleet",
    desc: "We maintain a fleet of well-serviced Scorpios and jeeps to suit solo travellers, families, and small groups alike.",
  },
  {
    title: "Local Expertise",
    desc: "Our drivers are local experts who know the region, its scenic routes, and the stories behind every hidden gem.",
  },
  {
    title: "Transparent Pricing",
    desc: "Clear rates with no hidden costs. You receive a full breakdown of rental charges, driver fees, and taxes up front.",
  },
  {
    title: "Safety & Comfort",
    desc: "Every Scorpio is regularly serviced and inspected before each trip so you can travel with peace of mind.",
  },
  {
    title: "24/7 Customer Support",
    desc: "Our team is available round-the-clock to help with bookings, itinerary changes, or any concern on the road.",
  },
  {
    title: "Hassle-Free Booking",
    desc: "Reserve directly online, by phone, or through the enquiry form — quick confirmation within 24 hours.",
  },
];

const goodToKnow = [
  "Professional driver service is included with every booking",
  "Fuel costs are charged additionally as per your route",
  "Pickup and drop-off available from anywhere in Pokhara",
  "Pre-trip inspection and clean vehicle guaranteed",
  "Driver is an expert on mountain roads and local routes",
];

interface ScorpioDetailProps {
  vehicle: VehicleType;
}

export default function ScorpioDetail({ vehicle }: ScorpioDetailProps) {
  return (
    <>
      <div className="space-y-8">
      {/* Title + rating */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#E67E23] leading-snug">
          Scorpio Rent in Pokhara | Scorpio Jeep Rental Hire Prices in Pokhara
        </h1>
        {vehicle.rating ? (
          <p className="flex items-center gap-1 text-sm text-gray-600 mt-3">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            {vehicle.rating} ({vehicle.totalReviews} reviews)
          </p>
        ) : null}
      </div>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-72 md:h-[400px] shadow-lg">
        {vehicle.images?.[0] ? (
          <Image
            src={getHeroImage(vehicle.images[0])}
            alt="Scorpio Rent in Pokhara | Scorpio Jeep Rental Hire Prices in Pokhara"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            fetchPriority="high"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
            <Car className="w-16 h-16" />
          </div>
        )}
      </div>

      {/* Section 1 — Service intro */}
      <section>
        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <p>
            We can provide a{" "}
            <strong className="font-semibold text-gray-900">
              Scorpio or Jeep rental service
            </strong>{" "}
            from Pokhara to{" "}
            <strong className="font-semibold text-gray-900">
              all over Nepal
            </strong>
            . These versatile vehicles offer comfort, reliability, and the
            ability to navigate various terrains, making them ideal for both
            city driving and off-road adventures. And we provide{" "}
            <strong className="font-semibold text-gray-900">
              different vehicles
            </strong>{" "}
            as per your requirements and travel needs.
          </p>
          <p>
            <strong className="font-semibold text-gray-900">
              Hiring a driver
            </strong>{" "}
            eliminates the stress of navigating unfamiliar roads, allowing you
            to relax and enjoy the scenery. Experienced drivers are
            knowledgeable about the local routes and can provide valuable
            insights into the region&apos;s history and culture. By choosing to
            rent a Scorpio with a driver in Pokhara, you can enjoy a{" "}
            <strong className="font-semibold text-gray-900">
              safe and comfortable journey
            </strong>{" "}
            while discovering the beauty of this stunning region, with a group
            of up to 7 people travelling together in comfort.
          </p>
        </div>
      </section>

      {/* Fleet */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Types of Scorpio or Jeep For Rent in Pokhara
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {fleet.map((item) => (
            <div
              key={item.name}
              className="group flex flex-col rounded-xl border border-gray-200 overflow-hidden hover:border-orange-300 hover:shadow-md transition-all"
            >
              <div className="relative h-44 bg-gray-50 overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.name} for Rent in Pokhara Nepal`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm font-semibold text-gray-700">
                  {item.specs}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
          {fleetIntro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {fleetDescriptions.map((item) => (
            <p key={item.name}>
              <strong className="font-semibold text-gray-900">
                {item.name}:
              </strong>{" "}
              {item.desc}
            </p>
          ))}
          {fleetClosing.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      {/* Section 2 — Pricing */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Scorpio Jeep Rental Price in Nepal
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Scorpio jeep rental prices in Nepal vary depending on your route,
          distance, and duration of travel. From Pokhara, we offer flexible
          rates whether you need a drop-only service to Kathmandu, Chitwan, or
          Birgunj, or a same-day return to Muktinath. Every price includes a
          professional driver, and we keep our rates clear and transparent with
          no hidden fees so you can plan your journey with confidence.
        </p>

        <ScorpioPriceTable rows={rentalPrices} />

        <p className="mt-6 flex items-center gap-2 text-lg text-gray-600">
          <CurrencyIcon />
          Transparent pricing with no hidden fees. Final cost depends on your
          route, duration, and number of days. Contact us for an exact quote.
        </p>
      </section>

      {/* Section 3 — Why us + Good to know + FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why Rent a Scorpio in Pokhara From Hamro Yatra Adventure
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-white/70 hover:bg-white transition-colors"
            >
              <span className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <Check className="w-4 h-4 text-orange-600" />
              </span>
              <h3 className="font-semibold text-gray-800 mb-1.5 text-xl">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Good To Know</h2>
        <ul className="space-y-3">
          {goodToKnow.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <span className="text-lg text-gray-700">{item}</span>
            </li>
          ))}
        </ul>

        {vehicle.faqs && vehicle.faqs.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-orange-50/70 to-amber-50/40 border border-orange-200/70 rounded-2xl p-6 md:p-8">
            <FaqSection
              title="Frequently Asked Questions"
              items={vehicle.faqs}
            />
          </div>
        )}
      </section>
    </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/9779826689739"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-4 bottom-4 z-50 group"
      >
        <Image src="/whatapplogo.webp" alt="WhatsApp" width={48} height={48} className="w-12 h-12" />
        <span className="absolute left-full bottom-1/2 ml-3 -translate-y-1/2 px-3 py-1 rounded bg-green-600 text-white text-sm opacity-100 whitespace-nowrap">
          Message on WhatsApp!
        </span>
      </a>
    </>
  );
}

function CurrencyIcon() {
  return (
    <svg
      className="w-5 h-5 text-orange-600 shrink-0 mt-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}