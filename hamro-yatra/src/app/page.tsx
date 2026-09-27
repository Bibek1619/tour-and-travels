import { getHomePageData } from "@/lib/home-data";
import { mergeWithDefaults } from "@/lib/homepage-content";
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
import DestinationAccordion from "@/components/destination-accordion";
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
  title: "Scorpio Jeep Rental Pokhara | Nepal Tours & Trekking 2026",
  description:
    "Rent Scorpio jeep in Pokhara with driver. 26+ years Nepal tour operator — vehicle rental Pokhara to Kathmandu, trekking packages, paragliding & bungee. Book now!",
  path: "/",
  keywords: [
    // PRIMARY: Scorpio & Vehicle Rental (Main Business)
    "Scorpio rental Pokhara",
    "Scorpio jeep hire Pokhara",
    "Scorpio rental Nepal",
    "4WD Scorpio rental Pokhara",
    "jeep rental Pokhara with driver",
    "car rental Pokhara",
    "vehicle rental Pokhara",
    "SUV rental Nepal",
    "private car hire Pokhara",
    "Pokhara to Kathmandu car",
    "Kathmandu to Pokhara private vehicle",
    "tourist vehicle rental Nepal",
    "off-road jeep rental Nepal",
    "Pokhara airport pickup",
    
    // SECONDARY: Nepal Tours & Packages
    "Nepal tour packages",
    "Nepal tour operator",
    "Pokhara tour packages",
    "Kathmandu Pokhara tour",
    "Nepal holiday packages 2026",
    "cultural tours Nepal",
    "Nepal sightseeing tour",
    "best tour company Nepal",
    
    // TERTIARY: Trekking
    "trekking in Nepal",
    "Nepal trekking packages",
    "Everest Base Camp trek",
    "Annapurna Circuit trek",
    "best trekking company Nepal",
    "guided treks Nepal",
    
    // QUATERNARY: Adventure Activities
    "paragliding Pokhara",
    "bungee jumping Nepal",
    "white water rafting Nepal",
    "adventure activities Nepal",
    "Nepal adventure tourism",
    
    // Brand & Location
    "Hamro Yatra Adventure Pokhara",
    "Visit Nepal 2026",
  ],
  images: ["/images-5.jpg"],
  geo: {
    region: "NP-GA",
    placename: "Pokhara",
    position: "28.2096;83.9856",
  },
});

export default async function Home() {
  const homeData = await getHomePageData();
  const {
    storedContent,
    allPublished,
    popularTours,
    reviews,
    homePageContent,
    homePageContentRaw,
  } = homeData;

  const pcRaw: Record<string, unknown> = homePageContentRaw?.content ?? {};
  const hasBlock = (k: string) =>
    typeof pcRaw[k] === "object" && pcRaw[k] !== null && Object.keys(pcRaw[k] as Record<string, unknown>).length > 0;

  const content: HomepageContent = mergeWithDefaults(
    storedContent as Partial<HomepageContent>
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
  const bestSellingTours = allPublished as unknown as Tour[];
  const popularTourPackages = popularTours as unknown as Tour[];
  const featuredReviews = reviews as unknown as ReviewType[];
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

      <Section>
        <DestinationAccordion />
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