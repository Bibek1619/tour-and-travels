import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, Route as RouteIcon } from "lucide-react";
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
  const heroImage = route.heroImage ?? route.image ?? "/carhero1 (1).jpg";
  const h1 = `${route.route} Scorpio Hire | Best Scorpio Jeep Rental Service in Nepal`;

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
        {h1}
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

        {/* Quick facts */}
        <dl className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {route.highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="rounded-xl border border-orange-100 bg-orange-50/60 px-4 py-3"
            >
              <dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-orange-700/80">
                {highlight.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-gray-800">
                {highlight.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            {route.overview.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {route.detailTitle && route.detailBody ? (
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {route.detailTitle}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {route.detailBody}
              </p>
            </div>
          ) : null}

          {route.relatedLinks.length > 0 ? (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Combine this drive with
              </h3>
              <ul className="flex flex-wrap gap-2">
                {route.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-orange-700 transition-colors hover:bg-orange-600 hover:text-white"
                    >
                      {link.href.includes("trek") ? (
                        <RouteIcon className="h-4 w-4" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="mt-6 flex items-start gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-600">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            Distances and travel times are approximate and can vary with road
            and weather conditions, especially during the monsoon.
          </p>

          <div className="clear-both" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default ScorpioRouteHero;
