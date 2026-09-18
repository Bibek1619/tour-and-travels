export interface FaqItem {
  q: string;
  a: string;
}

export interface Vehicle {
  _id: string;
  category?: string;
  fuelType?: string;
  brand?: string;
  model?: string;
name?: string;
  slug?: string;
  images?: string[];
  dailyRate?: number;
  capacity?: number;
  luggage?: string;
  features?: string[];
  bestFor?: string;
  availableCount?: number;
  rating?: number;
  totalReviews?: number;
  isAvailable?: boolean;
  faqs?: FaqItem[];
}

export interface Tour {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  location?: string;
  difficulty?: string;
  durationDays?: number;
  durationText?: string;
  region?: { _id?: string; name?: string; description?: string } | null;
  price?: number;
  maxAltitude?: string;
  bestSeason?: string;
  shortOverview?: string;
  fullOverview?: {
    intro?: string;
    geography?: string;
    culture?: string;
    specialPlaces?: string;
    trekking?: string;
    bestTime?: string;
    permits?: string;
    conservation?: string;
  };
  highlights?: string[];
  itinerary?: { day?: number; title?: string; desc?: string }[];
  included?: string[];
  excluded?: string[];
  images?: string[];
  status?: string;
  rating?: number;
  reviewsCount?: number;
  faqs?: FaqItem[];
}

export function formatDuration(days?: number, text?: string): string {
  if (text?.trim()) return text.trim();
  if (days) return `${days} Days`;
  return "—";
}

export function formatSeason(season?: string): string {
  if (!season?.trim()) return "All Year";
  const shortMonths: Record<string, string> = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };
  let result = season.replace(/\s+to\s+/gi, "–");
  for (const [full, short] of Object.entries(shortMonths)) {
    result = result.replace(new RegExp(full, "gi"), short);
  }
  return result;
}

export interface Adventure {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
  shortDescription?: string;
  location?: string;
  duration?: string;
  difficulty?: "Easy" | "Moderate" | "Hard" | "Expert";
  minAge?: number;
  price?: number;
  groupSize?: { min?: number; max?: number };
  included?: string[];
  excluded?: string[];
  requirements?: string[];
  safetyInfo?: string;
  bestSeason?: string;
  images?: string[];
  featured?: boolean;
  status?: string;
  rating?: number;
  reviewsCount?: number;
  faqs?: FaqItem[];
}

export interface DailyRoute {
  _id: string;
  routeName?: string;
  vehicle?: { name?: string; images?: string[] };
  departure?: { location?: string; time?: string };
  arrival?: { location?: string; time?: string };
  departureDate?: string;
  returnDate?: string;
  duration?: string;
  price?: number;
  availableSeats?: number;
  totalSeats?: number;
  bookedSeats?: number[];
  stops?: string[];
  amenities?: string[];
  description?: string;
  status?: "active" | "completed" | "cancelled";
  featured?: boolean;
}

export interface Review {
  _id: string;
  review: string;
  name: string;
  title?: string;
  location?: string;
  tour?: { title?: string };
  vehicle?: { name?: string };
  adventure?: { name?: string };
  videoThumbnail?: string;
  rating?: number;
  status?: string;
  createdAt?: string;
  featuredOnHomepage?: boolean;
}

export interface Highlight {
  icon: string;
  text: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
}

export interface Slide {
  type: "video" | "image";
  src: string;
  title: string;
  subtitle: string;
}

export interface Feature {
  icon: string;
  title: string;
  badge: string;
  description: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  mediaType: "video" | "image";
  videoSrc: string;
  imageSrc: string;
  ctaText: string;
  tourLink: string;
  tourLinkText: string;
  trekLink: string;
  trekLinkText: string;
}

export interface IntroContent {
  welcomeTitle: string;
  welcomeHighlight: string;
  subtitle: string;
  description1: string;
  description2: string;
  description3: string;
  ctaText: string;
  ctaLink: string;
  whyChooseTitle: string;
  highlights: Highlight[];
  stats: Stat[];
  image: string;
}

export interface WhyUsContent {
  sectionTitle: string;
  sectionHeading: string;
  headingHighlight: string;
  subheading: string;
  subheadingHighlight: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  slides: Slide[];
  features: Feature[];
}

export interface HomepageContent {
  hero: HeroContent;
  intro: IntroContent;
  whyUs: WhyUsContent;
}