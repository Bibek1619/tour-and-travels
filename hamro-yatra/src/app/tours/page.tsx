import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import type { Tour } from "@/lib/types";
import { MessageSquare, Phone, Mail } from "lucide-react";
import TourCard from "@/components/tours/tour-card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/page-content";
import { getHeroImage } from "@/lib/cloudinary";
import { getIcon } from "@/lib/icon-map";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Nepal Tour Packages - Cultural & Sightseeing Tours",
  description:
    "Explore Nepal with curated tour packages: cultural heritage tours, city sightseeing, spiritual journeys, and scenic destination trips with Hamro Yatra Adventure's expert guides.",
  path: "/tours",
  keywords: [
    "Nepal tour packages",
    "Kathmandu tours",
    "Pokhara tours",
    "Lumbini tours",
    "cultural tours Nepal",
    "sightseeing Nepal",
  ],
});

async function getTours(): Promise<Tour[]> {
  await connectDB();
  const tours = await TourPackage.find({ category: "tour", status: "published" })
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(tours)) as Tour[];
}

export default async function TourPackagesPage() {
  const [tours, content] = await Promise.all([
    getTours(),
    getPageContent("tours"),
  ]);
  const hero = content.hero;
  const section = content.section;
  const customize = content.customize;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <main>
          {/* Hero Section */}
          <section
            className="relative h-[400px] bg-cover bg-center"
            style={{
              backgroundImage: `url('${getHeroImage(hero.image)}')`,
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {hero.title}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                {hero.subtitle}
              </p>
            </div>
          </section>

          {/* Tours Section */}
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
              <TourCard tours={tours} />
            </div>
          </section>

          {/* Customize Tour CTA Section */}
          <section className="py-16 bg-gradient-to-r from-orange-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                      {customize.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg">
                      {customize.paragraph}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {(customize.points ?? []).map((rawPoint, index) => {
                        const point = rawPoint as { icon: string; text: string };
                        const PointIcon = getIcon(String(point.icon ?? "Calendar"));
                        return (
                          <li
                            key={index}
                            className="flex items-center gap-3 text-gray-700"
                          >
                            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <PointIcon className="w-4 h-4 text-orange-600" />
                            </div>
                            <span>{point.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={customize.primaryLink}
                        className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                      >
                        <MessageSquare className="w-5 h-5" />
                        {customize.primaryText}
                      </a>
                      <a
                        href={customize.secondaryLink}
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        {customize.secondaryText}
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <video
                        className="w-full h-[400px] object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src={customize.videoSrc} type="video/mp4" />
                      </video>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl">
                      <p className="text-sm text-gray-600 mb-2">
                        {customize.helpText}
                      </p>
                      <div className="flex items-center gap-2 text-orange-600 font-semibold">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{customize.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-orange-600 font-semibold mt-1">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{customize.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}