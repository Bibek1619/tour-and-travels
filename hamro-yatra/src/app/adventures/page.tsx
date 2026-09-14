import { connectDB } from "@/lib/db";
import { Adventure } from "@/models/adventure";
import type { AdventureCategory } from "@/lib/adventure-categories";
import { getAdventureCategories } from "@/lib/adventure-categories";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Adventure Activities in Nepal - Rafting, Paragliding, Bungee & More",
  description:
    "Explore thrilling adventure activities in Nepal: white water rafting, kayaking, paragliding, bungee jumping, ziplining and canyoning with Hamro Yatra Adventure's expert guides.",
  path: "/adventures",
  keywords: [
    "adventure activities Nepal",
    "rafting in Nepal",
    "paragliding in Pokhara",
    "bungee jumping Nepal",
    "ziplining Nepal",
    "kayaking Nepal",
    "canyoning Nepal",
  ],
});

async function getPackageCounts(
  categories: AdventureCategory[]
): Promise<Record<string, number>> {
  await connectDB();
  const counts: Record<string, number> = {};
  for (const category of categories) {
    counts[category.id] = await Adventure.countDocuments(
      {
        category: category.id,
        status: "published",
      } as unknown as Parameters<typeof Adventure.countDocuments>[0]
    );
  }
  return counts;
}

export default async function AdventuresPage() {
  const adventureCategories = await getAdventureCategories();
  const counts = await getPackageCounts(adventureCategories);
  const content = await getPageContent("adventures");
  const hero = content.hero;
  const cta = content.cta;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-emerald-700 text-white px-6 md:px-16 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="overflow-hidden rounded-2xl shadow-lg md:max-w-md lg:max-w-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.image}
                alt={hero.title}
                className="w-full h-auto block"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5 max-w-xl">
                {hero.title}
              </h1>
              <p className="text-emerald-100 text-lg max-w-md leading-relaxed">
                {hero.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Choose Your Adventure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventureCategories.map((adventure) => {
              const packages = counts[adventure.id] || 0;
              return (
                <Link
                  key={adventure.id}
                  href={`/adventures/${adventure.id}`}
                  className="group relative block h-96 rounded-3xl overflow-hidden"
                >
                  <img
                    src={adventure.image}
                    alt={adventure.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform group-hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-[2px] bg-orange-500" />
                      <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">
                        {packages} {packages === 1 ? "Package" : "Packages"}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                      {adventure.name}
                    </h3>
                    <div className="flex items-center text-white font-medium group-hover:text-orange-400 transition-colors duration-300">
                      Explore Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {cta.title}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={cta.primaryLink}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              {cta.primaryText}
            </Link>
            <a
              href={cta.secondaryLink}
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 transition-colors"
            >
              {cta.secondaryText}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}