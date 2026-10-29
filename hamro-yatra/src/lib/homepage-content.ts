import type { HomepageContent } from "./types";

export const defaultContent: HomepageContent = {
  hero: {
    title: "Scorpio Jeep Rental Pokhara | Nepal Tours & Treks",
    subtitle:
      "Rent Scorpio 4WD jeep with experienced driver. Pokhara's trusted vehicle rental for tours, treks & mountain trips across Nepal.",
    mediaType: "video",
    videoSrc: "/hero%20video.mp4",
    imageSrc: "/images-5.jpg",
    ctaText: "Plan Your Trip",
    tourLink: "/tour-packages",
    tourLinkText: "Tour Packages",
    trekLink: "/trek-packages",
    trekLinkText: "Trek Packages",
  },
  intro: {
    welcomeTitle: "Dear Travelers, Namaste and Welcome",
    welcomeHighlight: "Namaste",
    subtitle: "Your Gateway to the Majestic Himalayas",
    description1:
      "Hamro Yatra Adventure is a Nepal-based travel agency offering memorable tours, trekking experiences, and Scorpio jeep rentals in Pokhara. Explore Nepal's beautiful Himalayas, the cultural heritage of Kathmandu Valley, the peaceful lakes of Pokhara, and the wildlife of Chitwan with services tailored to your travel needs.",
    description2:
      "From Manang jeep tours and mountain trekking to cultural tours, jungle safaris, paragliding, and river rafting, we help you discover Nepal your way. Whether you need a guided adventure or a reliable Scorpio jeep rental in Pokhara, we make planning your Nepal trip simple and convenient.",
    description3: "",
    ctaText: "Discover Our Story",
    ctaLink: "/about",
    whyChooseTitle: "Why Choose Us?",
    highlights: [
      { icon: "Mountain", text: "Expert Local Guides" },
      { icon: "Compass", text: "Customizable Itineraries" },
      { icon: "Heart", text: "100% Customer Satisfaction" },
    ],
    stats: [
      { value: "10,000+", label: "Happy Travelers", icon: "Users" },
      { value: "26+ Years", label: "Experience", icon: "Award" },
    ],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80",
  },
  whyUs: {
    sectionTitle: "Why Hamro Yatra Adventure",
    sectionHeading: "Why Choose Hamro Yatra Adventure?",
    headingHighlight: "Hamro Yatra Adventure?",
    subheading: "Travel with confidence, every step of the way",
    subheadingHighlight: "every step of the way",
    description:
      "We provide comprehensive travel solutions with the highest standards of safety, comfort, and customer service in Nepal - from planning to the road, we have got you covered.",
    ctaText: "Explore Tours",
    ctaLink: "/tours",
    slides: [
      {
        type: "video",
        src: "https://res.cloudinary.com/djded5kbg/video/upload/v1786779670/tour-travels/homepage/videos/ofzrs8x9rurlewujjyas.mp4",
        title: "Adventure Awaits",
        subtitle: "Experience the very best of Nepal",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
        title: "Majestic Himalayas",
        subtitle: "Trek the world's highest peaks",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=80",
        title: "Ancient Kathmandu",
        subtitle: "Culture, heritage & timeless temples",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=1200&q=80",
        title: "Uncharted Trails",
        subtitle: "Remote valleys & hidden mountain lakes",
      },
    ],
    features: [
      {
        icon: "MapPin",
        title: "Popular Destinations",
        badge: "20+",
        description: "Mustang, Rara Lake, Dhorpatan, Pokhara and more",
      },
      {
        icon: "Clock",
        title: "Real-time Booking",
        badge: "24/7",
        description: "Live seat availability and instant confirmation",
      },
      {
        icon: "Shield",
        title: "Safe & Reliable",
        badge: "100%",
        description: "Licensed vehicles and experienced drivers",
      },
      {
        icon: "Star",
        title: "Rated Experience",
        badge: "4.8/5",
        description: "Verified reviews and ratings for every service",
      },
      {
        icon: "Headphones",
        title: "Live Support",
        badge: "Always Here",
        description: "24/7 support in Nepali and English",
      },
      {
        icon: "CreditCard",
        title: "Easy Payment",
        badge: "Secure",
        description: "Khalti, eSewa, cards and bank transfers accepted",
      },
    ],
  },
};

export const mergeWithDefaults = (
  stored: Partial<HomepageContent> | null | undefined
): HomepageContent => ({
  hero: { ...defaultContent.hero, ...(stored?.hero || {}) },
  intro: { ...defaultContent.intro, ...(stored?.intro || {}) },
  whyUs: { ...defaultContent.whyUs, ...(stored?.whyUs || {}) },
});