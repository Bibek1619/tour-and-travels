import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import type { TrekRegion } from "@/lib/regions";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/page-content";
import { getHeroImage } from "@/lib/cloudinary";
import { getIcon } from "@/lib/icon-map";
import { getTrekRegions } from "@/lib/regions";
import JsonLd from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Nepal Trekking Packages 2026 – Everest, Annapurna, Langtang & Manaslu",
  description:
    "Book Nepal trekking packages with the best trekking company: Everest Base Camp, Annapurna Circuit, Langtang Valley & Manaslu treks. Expert guides, permits included, 26+ years experience.",
  path: "/trek-packages",
  keywords: [
    "trekking packages Nepal",
    "Nepal trekking packages 2026",
    "Everest Base Camp trek package",
    "Everest Base Camp trek cost",
    "Annapurna Circuit trekking",
    "Langtang Valley trek",
    "Manaslu Circuit trek",
    "Himalaya treks",
    "best trekking company in Nepal",
    "Nepal trekking agency",
    "Nepal trekking cost",
    "trekking with guide Nepal",
    "Nepal trekking permits",
    "Visit Nepal 2026",
  ],
});

async function getTrekCount(keyword: string): Promise<number> {
  await connectDB();
  const regex = new RegExp(keyword, "i");
  const count = await TourPackage.countDocuments({
    category: "trek",
    status: "published",
    $or: [
      { title: { $regex: regex } },
      { location: { $regex: regex } },
      { slug: { $regex: regex } },
    ],
  });
  return count;
}

export default async function TrekPackagesPage() {
  const trekRegions: TrekRegion[] = await getTrekRegions();
  const counts = await Promise.all(
    trekRegions.map((r) => getTrekCount(r.keyword))
  );
  const content = await getPageContent("trek-packages");
  const hero = content.hero;
  const section = content.section;
  const info = content.info;

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Trek Packages", url: "/trek-packages" },
        ])}
      />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section
          className="relative h-[400px] bg-cover bg-center"
          style={{
            backgroundImage: `url('${getHeroImage(hero.image)}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-white/90 max-w-3xl">
              {hero.subtitle}
            </p>
          </div>
        </section>

        {/* Trekking Regions Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {section.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trekRegions.map((region, index) => {
                const trekCount = counts[index];
                return (
                  <Link
                    key={region.id}
                    href={`/trek-packages/${region.id}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={region.image}
                          alt={region.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {trekCount > 0 && (
                          <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {trekCount} Trek
                            {trekCount !== 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                          {region.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {region.description}
                        </p>
                        <div className="flex items-center justify-between text-orange-600 font-semibold">
                          <span className="text-sm">Explore Treks</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-white py-12 border-t">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {(info.cards ?? []).map((rawCard, index) => {
                const card = rawCard as { icon: string; title: string; description: string };
                const CardIcon = getIcon(String(card.icon ?? "Mountain"));
                return (
                  <div key={index}>
                    <CardIcon className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}