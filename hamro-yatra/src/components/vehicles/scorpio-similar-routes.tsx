import Link from "next/link";
import Image from "next/image";
import { scorpioRoutes } from "@/lib/scorpio-routes";

interface ScorpioSimilarRoutesProps {
  currentSlug?: string;
  heroImage: string;
}

export function ScorpioSimilarRoutes({
  currentSlug,
  heroImage,
}: ScorpioSimilarRoutesProps) {
  const routes = scorpioRoutes
    .filter((route) => route.slug !== currentSlug)
    .slice(0, 3);

  if (routes.length === 0) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Similar Routes
      </h3>
      <div className="space-y-4">
        {routes.map((route) => (
          <Link
            key={route.slug}
            href={`/vehicles/${route.slug}`}
            className="flex gap-3 group"
          >
            <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={route.image ?? heroImage}
                alt={`${route.route} scorpio hire in Pokhara`}
                fill
                sizes="80px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {route.route}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{route.meta}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ScorpioSimilarRoutes;