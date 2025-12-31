import { Mountain, Bed, Utensils, Camera } from "lucide-react";

export const tours = [
  {
    /* ---------- BASIC (USED BY TourPackages) ---------- */
    id: 1,
    slug: "upper-mustang-adventure",
    title: "Upper Mustang Adventure",
    location: "Upper Mustang, Nepal",
    difficulty: "Moderate",
    duration: "12 Days",
    groupSize: "2–12 People",
    rating: 4.8,
    reviews: 48,

    images: [
      "https://risingnepaldaily.com/storage/media/90084/SKT_MUSTANG_image0.jpg",
      "https://www.acethehimalaya.com/wp-content/uploads/2024/06/why-trek-upper-mustang-nepal.jpg",
      "https://images.unsplash.com/photo-1617191519105-d07b98b9f7a3?w=1200",
    ],

    /* ---------- DETAILS PAGE DATA ---------- */
    price: 750,
    maxAltitude: "3,800m",
    bestSeason: "March – November",

    shortOverview:
      "Upper Mustang is a remote Himalayan desert with ancient Tibetan culture, monasteries, and dramatic landscapes.",
    fullOverview: {
      intro:
        "Upper Mustang, often called the 'Last Forbidden Kingdom,' is a remote and culturally preserved region in northern Nepal that remained closed to foreigners until 1992. This restricted area offers an unparalleled journey into a landscape that seems frozen in time, where ancient Tibetan Buddhist culture thrives in its purest form.",
      geography:
        "Located in the rain shadow of the Annapurna and Dhaulagiri mountain ranges, Upper Mustang presents a stunning high-altitude desert landscape characterized by dramatic eroded cliffs in shades of red, yellow, and brown. The region sits at an average elevation of 3,700 meters (12,000 feet) and receives minimal rainfall, creating a surreal, moon-like terrain punctuated by deep canyons, towering rock formations, and mysterious sky caves that date back thousands of years.",
      culture:
        "The people of Upper Mustang are ethnically Tibetan and maintain a lifestyle and culture that has remained virtually unchanged for centuries. The region was once part of the Tibetan Kingdom and served as an important trade route between Tibet and India. Today, approximately 6,000 people inhabit this remote area, living in traditional mud-brick homes, practicing Tibetan Buddhism, and speaking the Loba language. Prayer flags flutter everywhere, mani walls line the trails, and the sound of Buddhist chants echoes from ancient monasteries.",
      loManthang:
        "Lo Manthang, the walled capital city of the former Kingdom of Lo, is the crown jewel of Upper Mustang. Founded in 1380, this medieval fortress city is surrounded by six-meter-high walls and contains approximately 150 households. The city is home to four major monasteries, including Jampa Gompa (built in 1447), Thubchen Gompa, and Chhoede Gompa, which house priceless Buddhist art, ancient manuscripts, and stunning murals that have survived centuries. Until 2008, the region had its own king, and the royal palace still stands at the city's center.",
      skyeCaves:
        "One of Upper Mustang's greatest mysteries is its thousands of man-made caves carved into sheer cliff faces, some reaching heights of 150 feet above the valley floor. Archaeological research suggests these caves served various purposes: meditation chambers for monks, living quarters, burial sites, and storage facilities. Many contain ancient Buddhist murals, manuscripts, and artifacts dating back over 2,000 years. The caves of Chhoser, near Lo Manthang, form one of the most extensive cave complexes, with multiple stories connected by precarious ladders and passages.",
      trekking:
        "The trek to Upper Mustang is considered moderate, making it accessible to trekkers with good fitness levels. Unlike many Himalayan treks, this journey focuses more on cultural immersion and dramatic landscapes than extreme altitude challenges. The trail follows ancient trade routes through traditional villages, crosses windswept passes, and traverses the world's deepest gorge - Kali Gandaki. Trekkers stay in family-run tea houses, sharing meals with locals and experiencing genuine hospitality.",
      bestTime:
        "The ideal trekking seasons are spring (March to May) and autumn (September to November). However, Upper Mustang's rain-shadow location makes it one of the few regions in Nepal suitable for trekking even during monsoon season (June to August), as the area receives minimal rainfall. Spring brings wildflowers and comfortable temperatures, while autumn offers crystal-clear mountain views and harvest celebrations.",
      permits:
        "Upper Mustang is a restricted area requiring a special permit costing $500 USD for 10 days, plus $50 for each additional day. Trekkers must be accompanied by a registered guide and travel in groups of at least two people. This restriction helps preserve the fragile environment and unique culture of the region.",
      conservation:
        "The region faces challenges from increasing tourism, climate change, and the emigration of young people to cities. Organizations like the American Himalayan Foundation work to preserve ancient monasteries, while local communities balance economic development with cultural preservation. Visitors play a crucial role by respecting local customs, supporting local businesses, and practicing responsible tourism.",
    },

    highlights: [
      "Explore Lo Manthang (Walled City)",
      "Ancient Buddhist monasteries",
      "Sky caves and desert valleys",
      "Authentic Tibetan culture",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        desc: "Arrival, hotel transfer and briefing.",
      },
      {
        day: 2,
        title: "Fly to Pokhara",
        desc: "Scenic mountain flight and sightseeing.",
      },
      {
        day: 3,
        title: "Fly to Jomsom & Trek to Kagbeni",
        desc: "Short trek through Kali Gandaki valley.",
      },
    ],

    included: [
      "Airport transfers",
      "All required permits",
      "Licensed guide & porter",
      "Accommodation during trek",
    ],

    excluded: [
      "International flight",
      "Nepal visa fee",
      "Personal expenses",
      "Tips",
    ],

    facts: [
      { icon: Mountain, label: "Max Altitude", value: "4,010m" },
      { icon: Bed, label: "Accommodation", value: "Tea Houses" },
      { icon: Utensils, label: "Meals", value: "Breakfast, Lunch, Dinner" },
      { icon: Camera, label: "Photography", value: "Allowed" },
    ],
  },
  {
    id: 2,
    slug: "pokhara-sightseeing",
    title: "Pokhara Sightseeing Tour",
    location: "Pokhara, Nepal",
    difficulty: "Easy",
    duration: "3 Days",
    groupSize: "2–15 People",
    rating: 4.6,
    reviews: 30,
    images: [
      "https://admin.buddhaair.com/photos/3/PKR%20with%20Plane.jpg",
    ],
    price: 200,
    maxAltitude: "822m",
    bestSeason: "September – November",
    shortOverview:
      "Explore the scenic beauty of Pokhara including lakes, caves, and waterfalls with this easy sightseeing tour.",
    fullOverview: {
      intro:
        "Pokhara is known as the gateway to the Annapurna region, offering stunning lakes, mountains, caves, and waterfalls. This tour is perfect for travelers looking for a short, relaxing adventure with cultural experiences and natural beauty.",
      geography:
        "Situated in the Pokhara Valley, surrounded by hills and the Annapurna mountains, Pokhara provides panoramic views of snow-capped peaks and lush green landscapes. Lakes like Phewa and Begnas dot the valley.",
      culture:
        "Pokhara city is culturally rich, home to Gurung and Magar communities. Visitors can enjoy local cuisine, handicrafts, and traditional festivals.",
      loManthang: "N/A",
      skyeCaves: "Visit Gupteshwor Cave and Bat Cave.",
      trekking: "Easy sightseeing tours with optional short hikes around lakes and hills.",
      bestTime: "September to November and March to May.",
      permits: "No special permits required.",
      conservation: "Respect local culture and environment while visiting.",
    },
    highlights: ["Phewa Lake boating", "Devi's Fall", "World Peace Pagoda", "Caves exploration"],
    itinerary: [
      { day: 1, title: "Arrival & Phewa Lake", desc: "Check-in and boat ride on Phewa Lake." },
      { day: 2, title: "Caves & Waterfalls", desc: "Visit Gupteshwor Cave, Bat Cave, and Devi's Fall." },
      { day: 3, title: "World Peace Pagoda & Departure", desc: "Hike to the World Peace Pagoda and depart." },
    ],
    included: ["Accommodation", "Breakfast", "Sightseeing tour guide", "Transportation"],
    excluded: ["Flight to Pokhara", "Personal expenses", "Tips"],
    facts: [
      { icon: Mountain, label: "Max Altitude", value: "822m" },
      { icon: Bed, label: "Accommodation", value: "Hotel" },
      { icon: Utensils, label: "Meals", value: "Breakfast" },
      { icon: Camera, label: "Photography", value: "Allowed" },
    ],
  },
  
];
