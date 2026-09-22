import { connectDB } from "@/lib/db";
import { HomepageContent as HomepageContentModel } from "@/models/homepageContent";
import { PageContent as PageContentModel } from "@/models/pageContent";
import { TourPackage } from "@/models/tourPackage";
import { Region } from "@/models/region";
import { Review } from "@/models/review";
import { mergeWithDefaults } from "@/lib/homepage-content";
import { getPageContent } from "@/lib/page-content";
import { buildMetadata } from "@/lib/seo";
import type {
  HeroContent,
  HomepageContent,
  IntroContent,
  Review as ReviewType,
  Tour,
  WhyUsContent,
} from "@/lib/types";
import { Navbar } from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import IntroSection from "@/components/intro-section";
import BestSellingPackages from "@/components/best-selling-packages";
import BestTrip from "@/components/best-trip";
import DestinationsSection from "@/components/destinations-section";
import TestimonialsSection from "@/components/testimonials-section";
import Whyus from "@/components/whyus";
import FaqSection from "@/components/faq-section";
import Footer from "@/components/footer";
import Section from "@/components/section";
import JsonLd from "@/components/json-ld";
import { travelAgencyJsonLd } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Vehicle Rental Pokhara & Nepal Tours | Scorpio Hire, Trek & Adventure",
  description:
    "Rent Scorpio in Pokhara. 26+ years Nepal tour operator offering vehicle rental, trekking, tours & adventure activities. Book your Nepal adventure today.",
  path: "/",
  keywords: [
    "car rental Pokhara",
    "Scorpio rent in Pokhara",
    "Mahindra Scorpio rental Pokhara",
    "vehicle rental Nepal",
    "Scorpio booking Pokhara",
    "car hire Pokhara",
    "SUV rental Pokhara",
    "Pokhara to Kathmandu car",
    "Nepal vehicle booking",
    "Pokhara car service",
    "Nepal tour packages",
    "trekking in Nepal",
    "adventure activities Nepal",
    "paragliding Pokhara",
    "bungee jumping Nepal",
    "rafting Nepal",
    "Nepal adventure tourism",
    "adventure sports Nepal",
    "Hamro Yatra Adventure",
    "Everest Base Camp trek",
  ],
  images: ["/images-5.jpg"],
});

export default async function Home() {
  await connectDB();

  const regions = await Region.find().select("_id").lean();
  const regionIds = regions.map((r) => r._id);
  const activeRegionFilter = { $in: [null, ...regionIds] };

  const [
    storedContent,
    allPublished,
    popularTours,
    reviews,
    homePageContent,
    homePageContentRaw,
  ] = await Promise.all([
    HomepageContentModel.findOne().lean(),
    TourPackage.find({
      category: "trek",
      status: "published",
      region: activeRegionFilter,
    } as unknown as Parameters<typeof TourPackage.find>[0])
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(6)
      .lean(),
    TourPackage.find({ category: "tour", status: "published" })
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(6)
      .lean(),
    Review.find({ status: "approved", featuredOnHomepage: true })
      .populate([
        { path: "tour", select: "title", strictPopulate: false },
        { path: "vehicle", select: "name", strictPopulate: false },
        { path: "adventure", select: "name", strictPopulate: false },
      ])
      .sort({ createdAt: -1 })
      .limit(6)
      .lean(),
    getPageContent("home"),
    PageContentModel.findOne({ slug: "home" }).select("content").lean(),
  ]);

  const pcRaw: Record<string, unknown> = JSON.parse(
    JSON.stringify(homePageContentRaw?.content ?? {})
  );
  const hasBlock = (k: string) =>
    typeof pcRaw[k] === "object" && pcRaw[k] !== null && Object.keys(pcRaw[k] as Record<string, unknown>).length > 0;

  const content: HomepageContent = mergeWithDefaults(
    JSON.parse(JSON.stringify(storedContent)) as Partial<HomepageContent>
  );

  if (hasBlock("hero")) {
    content.hero = homePageContent.hero as HeroContent;
  }
  if (hasBlock("intro")) {
    content.intro = homePageContent.intro as IntroContent;
  }
  if (hasBlock("whyUs")) {
    content.whyUs = homePageContent.whyUs as WhyUsContent;
  }
  const bestSellingTours = JSON.parse(
    JSON.stringify(allPublished)
  ) as Tour[];
  const popularTourPackages = JSON.parse(
    JSON.stringify(popularTours)
  ) as Tour[];
  const featuredReviews = JSON.parse(JSON.stringify(reviews)) as ReviewType[];
  const homeSections = homePageContent.sections;

  return (
    <div>
      <JsonLd data={travelAgencyJsonLd()} />
      <Navbar />

      <Section>
        <HeroSection content={content.hero} />
      </Section>
      <Section>
        <IntroSection content={content.intro} />
      </Section>

      <Section>
        <DestinationsSection
          destinations={popularTourPackages}
          content={homeSections.destinations}
        />
      </Section>

      {/* Daily bus package section (daily-trips-booking) is commented out
          and replaced with the BestTrip – Manang Trip spotlight section below. */}
      <Section>
        <BestTrip content={homeSections.bestTrip} />
      </Section>
      <Section>
        <BestSellingPackages
          tours={bestSellingTours}
          content={homeSections.bestSelling}
        />
      </Section>
      <Section>
        <TestimonialsSection
          reviews={featuredReviews}
          content={homeSections.testimonials}
        />
      </Section>
      <Section>
        <Whyus content={content.whyUs} />
      </Section>
      <Section>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <FaqSection
              title={homeSections.faq.title}
              subtitle={homeSections.faq.subtitle}
              items={homeSections.faq.items}
            />
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}