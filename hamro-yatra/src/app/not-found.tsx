import Link from "next/link";
import {
  Compass,
  Car,
  Mountain,
  Tent,
  Phone,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SITE_URL } from "@/lib/seo";

const DESTINATIONS = [
  {
    href: "/vehicles/scorpio-rent-in-pokhara",
    label: "Scorpio Rent in Pokhara",
    description: "Jeep hire prices for every route from Pokhara.",
    icon: Car,
  },
  {
    href: "/tours",
    label: "Tour Packages",
    description: "Cultural, wildlife and scenic tours across Nepal.",
    icon: Compass,
  },
  {
    href: "/trek-packages",
    label: "Trekking Packages",
    description: "Annapurna, Everest, Langtang and Manaslu treks.",
    icon: Mountain,
  },
  {
    href: "/adventures",
    label: "Adventure Activities",
    description: "Paragliding, rafting, bungee, zip line and more.",
    icon: Tent,
  },
];

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-b from-orange-50 to-gray-50 py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
              404 — Page not found
            </p>
            <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
              We could not find that page
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              The link may be outdated or the address may have a typo. Everything
              we offer is one click away below, or call us and we will point you
              in the right direction.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="tel:+9779856006671"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-700"
              >
                <Phone className="h-5 w-5" />
                Call +977 9856006671
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition-colors hover:border-orange-300 hover:bg-orange-50"
              >
                <MessageCircle className="h-5 w-5" />
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
              Popular pages
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DESTINATIONS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
                >
                  <item.icon className="h-8 w-8 text-orange-600" />
                  <h3 className="mt-4 text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              {SITE_URL.replace(/^https?:\/\//, "")}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
