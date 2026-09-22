import type { PageContentMap, PageContentSlug } from "./types";

export const pageContentSlugs = [
  "home",
  "about",
  "adventures",
  "tours",
  "trek-packages",
  "seat-booking",
  "vehicle-booking",
  "contact",
  "footer",
] as const;

export type { PageContentSlug };

export const DEFAULT_PAGE_CONTENT: PageContentMap = {
  home: {
    hero: {
      title: "Nepal Tours, Treks & Vehicle Rentals",
      subtitle:
        "Your trusted travel partner in Pokhara \u2013 book with confidence, travel with ease.",
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
        "Hamro Yatra Adventure is a trusted travel agency with over 26 years of experience in crafting unforgettable journeys across Nepal. From the towering Himalayas to ancient temples, we bring you the best of this incredible land.",
      description2:
        "Explore diverse landscapes, vibrant cultures, and warm hospitality. Our expertly designed tours cover trekking, wildlife safaris, cultural tours, and adventure sports - all tailored to your preferences.",
      description3:
        "Whether you seek thrilling mountain treks, peaceful spiritual retreats, or cultural immersion, Nepal has something extraordinary waiting for you. Let us be your guide to this magical destination.",
      ctaText: "Discover Our Story",
      ctaLink: "/about",
      whyChooseTitle: "Why Choose Us?",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80",
      highlights: [
        { icon: "Mountain", text: "Expert Local Guides" },
        { icon: "Compass", text: "Customizable Itineraries" },
        { icon: "Heart", text: "100% Customer Satisfaction" },
      ],
      stats: [
        { icon: "Users", value: "10,000+", label: "Happy Travelers" },
        { icon: "Award", value: "26+ Years", label: "Experience" },
      ],
    },
    sections: {
      bestSelling: {
        eyebrow: "Most Popular",
        title: "Best Selling Trekking Packages",
        subtitle: "Walk along the best selling trekking routes in the Himalayas of Nepal",
        image: "",
      },
      dailyTrips: {
        title: "Daily Bus Services",
        subtitle: "Book your seat on our comfortable daily departures",
      },
      destinations: {
        eyebrow: "Explore Nepal",
        title: "Popular Tour Packages",
        subtitle:
          "Discover Nepal's most breathtaking destinations with our expertly crafted tour packages.",
        image: "",
      },
      testimonials: {
        badge: "Testimonials",
        title: "What Our Travelers Say",
        highlight: "Travelers",
        video: "",
        videoThumbnail: "",
      },
      faq: {
        eyebrow: "FAQs",
        title: "Frequently Asked Questions",
        subtitle:
          "Answers to the most common questions about travelling with Hamro Yatra Adventure",
        items: [
          {
            q: "How do I book a tour or trek?",
            a: "Contact us via the enquiry form, phone or WhatsApp. We'll share a detailed itinerary and confirm your booking within 24 hours.",
          },
          {
            q: "What payment methods do you accept?",
            a: "Bank transfer, Visa/Mastercard, IME Pay, Khalti and cash on arrival for smaller bookings.",
          },
          {
            q: "Can you customize my itinerary?",
            a: "Yes — every tour and trek can be tailored for private groups, couples or solo travellers, including dates, duration and destinations.",
          },
          {
            q: "Are your vehicles safe and well maintained?",
            a: "Absolutely. All vehicles are licensed, freshly serviced and driven by experienced local drivers familiar with Nepal's mountain roads.",
          },
          {
            q: "Do you offer travel insurance?",
            a: "We strongly recommend comprehensive travel insurance and can help you arrange it for your trip.",
          },
        ],
      },
      bestTrip: {
        badge: "Best Trip",
        badgeSub: "Most Loved by Travelers",
        title: "Manang Trip",
        location: "Manang, Annapurna Region, Nepal",
        description:
          "Manang Village sits at 3,519m on the legendary Annapurna Circuit. Wander through alpine valleys dotted with yak pastures, soak in the turquoise Gangapurna Lake and explore Buddhist monasteries of the ancient Manangi people — all beneath the towering Himalaya of Annapurna II and Gangapurna. This is our team's most loved journey in Nepal.",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80",
        ctaText: "View Details",
        ctaHref: "/tours",
        whatsappNumber: "9779826689739",
        whatsappMessage: "Hi, I am interested in the Manang Trip",
        stats: [
          { icon: "Mountain", label: "Altitude", value: "3,519 m" },
          { icon: "Clock", label: "Duration", value: "8 Days" },
          { icon: "Flame", label: "Difficulty", value: "Moderate" },
          { icon: "Calendar", label: "Best Season", value: "Mar–May" },
        ],
        highlights: [
          "Panoramic Annapurna II & Gangapurna views",
          "Turquoise Gangapurna Glacier Lake",
          "Ancient Braga Monastery & Manangi culture",
          "High-altitude yak pastures & trails",
        ],
      },
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
  },
  about: {
    hero: {
      title: "About Hamro Yatra Adventure",
      subtitle:
        "26+ Years Crafting Unforgettable Journeys Across the Himalayas and Beyond",
      ctaText: "Explore Our Tours",
      ctaLink: "/tours",
    },
    story: {
      title: "Our Story",
      paragraph:
        "Founded in 1998, Hamro Yatra Adventure started as a small team of passionate trekkers dreaming of sharing Nepal's majestic landscapes with the world. Today, we're Nepal's premier adventure travel company, specializing in bespoke tours, luxury vehicle rentals, and immersive cultural experiences.",
      points: [
        { icon: "Clock", text: "26+ Years of Excellence" },
        { icon: "MapPin", text: "Nepal's Most Destinations" },
        { icon: "Users", text: "Trusted by 10K+ Travelers" },
      ],
      badges: [
        { icon: "Award", title: "Award Winning" },
        { icon: "Star", title: "5-Star Rated" },
      ],
    },
    stats: {
      items: [
        { icon: "Users", number: "10K+", label: "Happy Clients" },
        { icon: "MapPin", number: "50+", label: "Destinations" },
        { icon: "Calendar", number: "26+", label: "Years Experience" },
        { icon: "Award", number: "500+", label: "Tours Completed" },
      ],
    },
    promise: {
      title: "Our Promise",
      subtitle: "Sustainable tourism, authentic experiences, and memories that last a lifetime.",
      cards: [
        {
          icon: "MapPin",
          title: "Authentic Nepal",
          description:
            "Off-the-beaten-path destinations like Rara Lake and Dhorpatan. Experience real Nepal with local guides.",
        },
        {
          icon: "Users",
          title: "Personalized Service",
          description:
            "Small groups, custom itineraries. Luxury vehicles for transfers. 24/7 support during your adventure.",
        },
      ],
    },
    guides: {
      title: "Why Choose Our Guides",
      subtitle:
        "All our guides are professionally trained, licensed, and have extensive experience in the Himalayas",
      features: [
        { icon: "Award", title: "Certified Professionals", description: "Licensed by Nepal Tourism Board" },
        { icon: "MapPin", title: "Experienced Climbers", description: "10+ years average experience" },
        { icon: "Star", title: "Safety First", description: "First Aid & Rescue trained" },
        { icon: "Users", title: "Local Experts", description: "Born and raised in the Himalayas" },
      ],
    },
    team: {
      title: "Meet Our Expert Team",
      subtitle:
        "Professional, experienced, and passionate about creating unforgettable mountain adventures",
      members: [
        {
          name: "Shiva Kumar Wagle",
          role: "Founder & Lead Guide",
          image: "",
        },
        {
          name: "Bibek Wagle",
          role: "Developer & Advisor",
          image: "",
        },
      ],
    },
    testimonials: {
      title: "What Travelers Say",
      subtitle: "Trusted by adventurers worldwide",
      items: [
        {
          text: "Hamro Yatra Adventure made our Everest Base Camp trek unforgettable! Professional guides and perfect planning.",
          author: "John Doe, USA",
          rating: 5,
        },
        {
          text: "Rara Lake tour was magical. Vehicles were comfortable, service top-notch.",
          author: "Maria Silva, Brazil",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Ready for Your Adventure?",
      subtitle:
        "Let's create memories that last a lifetime. Book your dream Nepal adventure today.",
      primaryText: "Book a Tour",
      primaryLink: "/tours",
      secondaryText: "Contact Us",
      secondaryLink: "/contact",
    },
  },
  adventures: {
    hero: {
      title: "Nepal Adventure Tours",
      subtitle:
        "Thrilling adventures across Nepal — from white water rafting and paragliding to bungee jumping and canyoning",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920",
    },
    cta: {
      title: "Need Help Planning Your Adventure?",
      subtitle:
        "Contact our adventure specialists to create a customized package or get expert advice",
      primaryText: "Contact Us",
      primaryLink: "/contact",
      secondaryText: "Call +977 984-1480794",
      secondaryLink: "tel:+9779841480794",
    },
  },
  tours: {
    hero: {
      title: "Nepal Tour Packages",
      subtitle:
        "Explore the cultural heritage, natural wonders, and spiritual destinations of Nepal",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
    },
    section: {
      title: "Our Popular Tour Packages",
      subtitle: "Choose from our carefully crafted tour packages",
    },
    customize: {
      title: "Customize Your Own Tour",
      paragraph:
        "Can't find the perfect tour package? Create a personalized itinerary tailored to your interests, budget, and schedule. Our travel experts will help you design your dream Nepal adventure.",
      points: [
        { icon: "Calendar", text: "Flexible dates and duration" },
        { icon: "MessageSquare", text: "Choose your own destinations" },
        { icon: "Phone", text: "Free consultation with travel experts" },
      ],
      primaryText: "Customize Tour",
      primaryLink: "/contact",
      secondaryText: "Call Us Now",
      secondaryLink: "tel:+9779841480794",
      videoSrc: "/hero video.mp4",
      helpText: "Need help?",
      email: "info@hamroyatraadventure.com",
      phone: "+977 984-1480794",
    },
  },
  "trek-packages": {
    hero: {
      title: "Nepal Trekking Regions",
      subtitle:
        "Explore Nepal's diverse trekking regions, each offering unique landscapes and cultural experiences",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920",
    },
    section: {
      title: "Choose Your Trekking Region",
      subtitle:
        "Select a region to explore available trekking packages. Each region offers unique mountain views, cultural experiences, and adventure levels.",
    },
    info: {
      cards: [
        { icon: "Mountain", title: "Multiple Regions", description: "Choose from 4 major trekking regions in Nepal" },
        { icon: "MapPin", title: "Diverse Routes", description: "From easy valley treks to challenging high-altitude adventures" },
        { icon: "Mountain", title: "Expert Guidance", description: "Licensed guides with extensive mountain experience" },
      ],
    },
  },
  "seat-booking": {
    hero: {
      title: "Daily Route Seat Booking",
      badges: [
        { icon: "Bus", label: "All Routes" },
        { icon: "CalendarCheck", label: "Daily Departures" },
        { icon: "Armchair", label: "Comfortable Travel" },
      ],
      subtitle:
        "Book your seat for a comfortable journey. Choose your preferred route, vehicle and departure date.",
    },
    section: { title: "Available Routes" },
    empty: {
      title: "No Routes Available",
      message: "There are currently no active routes. Please check back later.",
    },
  },
  "vehicle-booking": {
    hero: { title: "Vehicle Booking" },
  },
  contact: {
    hero: {
      eyebrow: "Contact Us",
      title: "Let's plan your Nepal adventure",
      subtitle: "Reach out and we'll get back to you within 24 hours.",
    },
    info: {
      items: [
        {
          label: "Address",
          value: "Lakeside, Pokhara 33700, Nepal",
          link: "https://maps.google.com/?q=Lakeside,Pokhara,Nepal",
        },
        { label: "Phone", value: "+977 984-1480794", link: "tel:+9779841480794" },
        { label: "Email", value: "info@hamroyatraadventure.com", link: "mailto:info@hamroyatraadventure.com" },
        { label: "Hours", value: "Mon–Fri 9AM–7PM · Sat 10AM–5PM · Sun Closed", link: "" },
      ],
    },
    form: {
      title: "Send us a message",
      subtitle: "We'll respond within 24 hours.",
    },
    faq: {
      title: "FAQs",
      items: [
        {
          q: "How do I book a tour?",
          a: "Contact us via form, phone, or email. We'll customize your itinerary within 24 hours.",
        },
        {
          q: "What payment methods do you accept?",
          a: "Bank transfer, Visa/Mastercard, IME Pay, Khalti, and cash on arrival for smaller bookings.",
        },
        { q: "Do you offer private tours?", a: "Yes — all tours can be tailored for private groups, couples, or solo travelers." },
        {
          q: "What about travel insurance?",
          a: "We strongly recommend comprehensive travel insurance and can help you arrange it.",
        },
      ],
    },
    social: {
      title: "Follow us",
      subtitle: "Stay updated with our latest tours and stories.",
      items: [
        { label: "Facebook", href: "https://www.facebook.com/share/1EyvKahGsk/" },
        { label: "Instagram", href: "https://www.instagram.com/hamro_yatra_adventure" },
        { label: "YouTube", href: "https://youtube.com/@hamroyatradventure333" },
        { label: "TikTok", href: "https://www.tiktok.com/@hamroyatraadventucher" },
      ],
    },
  },
  footer: {
    company: {
      logo: "/hamro yatra.jpeg",
      title: "Hamro Yatra Adventure",
      description:
        "26+ years of experience in organizing trekking, tours, and transportation services across Nepal.",
    },
    quickLinks: {
      title: "Quick Links",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Tour Packages", href: "/tours" },
        { label: "Seat Booking", href: "/seat-booking" },
        { label: "Vehicle Rental", href: "/vehicles" },
        { label: "Hotels", href: "/hotels" },
        { label: "Trekking packages", href: "/trek-packages" },
        { label: "Blogs", href: "/blogs" },
      ],
    },
    popularTours: {
      title: "Popular Tour Packages",
      auto: true,
      limit: 4,
      items: [
        { label: "Rara Lake Tour", href: "/tours/rara" },
        { label: "Pokhara Valley Tour", href: "/tours/pokhara" },
        {
          label: "Pokhara to Chitwan Jungle Safari",
          href: "/tours/pokhara-to-chitwan-jungle-safari",
        },
        { label: "Kathmandu Valley Tour", href: "/tours/kathmandu-valley" },
      ],
    },
    popularAdventures: {
      title: "Popular Adventures",
      auto: true,
      limit: 4,
      items: [],
    },
    contact: {
      title: "Contact Us",
      address: "Lakeside, Pokhara 33700, Nepal",
      phone: "+977 984-1480794",
      email: "info@hamroyatraadventure.com",
    },
    associations: {
      title: "We Are Associated With",
      items: [
        { image: "/nepal-tourism-board.png", alt: "Nepal Tourism Board" },
        { image: "/taan.png", alt: "TAAN" },
        { image: "/nma.png", alt: "Nepal Mountaineering Association" },
      ],
    },
    payments: {
      title: "We Accept",
      items: [{ label: "VISA" }, { label: "Mastercard" }, { label: "Bank Transfer" }],
    },
    follow: {
      title: "Find & Follow Us on",
    },
    social: {
      facebook: "https://www.facebook.com/share/1EyvKahGsk/",
      instagram: "https://www.instagram.com/hamro_yatra_adventure",
      tiktok: "https://www.tiktok.com/@hamroyatraadventucher",
      youtube: "https://youtube.com/@hamroyatradventure333",
    },
    bottom: {
      copyright: "© 2025 Hamro Yatra Adventure. All rights reserved.",
      privacy: { label: "Privacy Policy", href: "/privacy" },
      terms: { label: "Terms & Conditions", href: "/terms" },
    },
  },
};