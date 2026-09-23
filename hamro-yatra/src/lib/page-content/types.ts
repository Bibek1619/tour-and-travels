export interface HomeSectionHeading {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  highlight?: string;
}

export interface BestTripContent {
  badge?: string;
  badgeSub?: string;
  title?: string;
  location?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaHref?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  stats: { icon: string; label: string; value: string }[];
  highlights: string[];
}

export interface HomeHeroContent {
  title?: string;
  subtitle?: string;
  mediaType?: string;
  videoSrc?: string;
  imageSrc?: string;
  ctaText?: string;
  tourLink?: string;
  tourLinkText?: string;
  trekLink?: string;
  trekLinkText?: string;
}

export interface HomeIntroContent {
  welcomeTitle?: string;
  welcomeHighlight?: string;
  subtitle?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  ctaText?: string;
  ctaLink?: string;
  whyChooseTitle?: string;
  image?: string;
  highlights: { icon: string; text: string }[];
  stats: { icon: string; value: string; label: string }[];
}

export interface HomeMediaSlide {
  type: string;
  src: string;
  title: string;
  subtitle: string;
}

export interface HomeWhyUsContent {
  sectionTitle?: string;
  sectionHeading?: string;
  headingHighlight?: string;
  subheading?: string;
  subheadingHighlight?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  slides: HomeMediaSlide[];
  features: { icon: string; title: string; badge: string; description: string }[];
}

export interface HomeFaqContent {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: { q: string; a: string }[];
}

export interface HomePageContent {
  hero: HomeHeroContent;
  intro: HomeIntroContent;
  sections: {
    bestSelling: HomeSectionHeading & { image?: string };
    dailyTrips: { title?: string; subtitle?: string };
    destinations: HomeSectionHeading & { image?: string };
    testimonials: HomeSectionHeading & { video?: string; videoThumbnail?: string };
    bestTrip: BestTripContent;
    faq: HomeFaqContent;
  };
  whyUs: HomeWhyUsContent;
}

export interface AboutPageContent {
  hero: { title: string; subtitle: string; ctaText: string; ctaLink: string };
  story: {
    title: string;
    paragraph: string;
    points: { icon: string; text: string }[];
    badges: { icon: string; title: string }[];
  };
  stats: {
    items: { icon: string; number: string; label: string }[];
  };
  promise: {
    title: string;
    subtitle: string;
    cards: { icon: string; title: string; description: string }[];
  };
  guides: {
    title: string;
    subtitle: string;
    features: { icon: string; title: string; description: string }[];
  };
  team: {
    title: string;
    subtitle: string;
    members: {
      name: string;
      role: string;
      image: string;
      experience?: string;
      specialization?: string;
      certifications?: string[] | string;
    }[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: { text: string; author: string; rating: number }[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryText: string;
    primaryLink: string;
    secondaryText: string;
    secondaryLink: string;
  };
}

export interface AdventuresPageContent {
  hero: { title: string; subtitle: string; image: string };
  cta: {
    title: string;
    subtitle: string;
    primaryText: string;
    primaryLink: string;
    secondaryText: string;
    secondaryLink: string;
  };
}

export interface ToursPageContent {
  hero: { title: string; subtitle: string; image: string };
  section: { title: string; subtitle: string };
  customize: {
    title: string;
    paragraph: string;
    points: { icon: string; text: string }[];
    primaryText: string;
    primaryLink: string;
    secondaryText: string;
    secondaryLink: string;
    videoSrc: string;
    helpText: string;
    email: string;
    phone: string;
  };
}

export interface TrekPackagesPageContent {
  hero: { title: string; subtitle: string; image: string };
  section: { title: string; subtitle: string };
  info: {
    cards: { icon: string; title: string; description: string }[];
  };
}

export interface SeatBookingPageContent {
  hero: {
    title: string;
    badges: { icon: string; label: string }[];
    subtitle: string;
  };
  section: { title: string };
  empty: { title: string; message: string };
}

export interface VehicleBookingPageContent {
  hero: { title: string };
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterAssociationItem {
  image: string;
  alt: string;
}

export interface FooterPageContent {
  company: {
    logo: string;
    title: string;
    description: string;
  };
  quickLinks: {
    title: string;
    items: FooterLinkItem[];
  };
  popularTours: {
    title: string;
    auto: boolean;
    limit: number;
    items: FooterLinkItem[];
  };
  popularAdventures: {
    title: string;
    auto: boolean;
    limit: number;
    items: FooterLinkItem[];
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
  };
  associations: {
    title: string;
    items: FooterAssociationItem[];
  };
  payments: {
    title: string;
    items: { label: string }[];
  };
  follow: {
    title: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
  };
  bottom: {
    copyright: string;
    privacy: { label: string; href: string };
    terms: { label: string; href: string };
  };
}

export interface ContactPageContent {
  hero: { eyebrow: string; title: string; subtitle: string };
  info: {
    items: { label: string; value: string; link: string }[];
  };
  form: { title: string; subtitle: string };
  faq: { title: string; items: { q: string; a: string }[] };
  social: {
    title: string;
    subtitle: string;
    items: { label: string; href: string }[];
  };
}

export interface PageContentMap {
  home: HomePageContent;
  about: AboutPageContent;
  adventures: AdventuresPageContent;
  tours: ToursPageContent;
  "trek-packages": TrekPackagesPageContent;
  "seat-booking": SeatBookingPageContent;
  "vehicle-booking": VehicleBookingPageContent;
  contact: ContactPageContent;
  footer: FooterPageContent;
}

export type PageContentSlug = keyof PageContentMap;