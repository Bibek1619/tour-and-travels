const mongoose = require("mongoose");
require("dotenv").config();
const TourPackage = require("../models/tourPackage");

const tours = [
  {
    title: "Kathmandu Valley Cultural Tour",
    slug: "kathmandu-valley-cultural-tour",
    category: "tour",
    location: "Kathmandu, Nepal",
    difficulty: "Easy",
    durationDays: 3,
    price: 250,
    maxAltitude: "1400m",
    bestSeason: "Year Round",
    shortOverview: "Explore the rich cultural heritage of Kathmandu Valley, visiting UNESCO World Heritage Sites including ancient temples, palaces, and monasteries.",
    fullOverview: {
      intro: "Kathmandu Valley Cultural Tour offers an immersive journey through Nepal's rich history and vibrant culture. This tour takes you to seven UNESCO World Heritage Sites, showcasing the architectural brilliance and spiritual essence of the valley.",
      geography: "Located at an altitude of 1,400 meters, Kathmandu Valley is surrounded by green hills and comprises three ancient cities: Kathmandu, Patan, and Bhaktapur.",
      culture: "Experience the living traditions of the Newar community, witness ancient festivals, and explore centuries-old temples and stupas that define Nepal's cultural landscape.",
      specialPlaces: "Swayambhunath (Monkey Temple), Pashupatinath Temple, Boudhanath Stupa, Kathmandu Durbar Square, Patan Durbar Square, Bhaktapur Durbar Square, and Changu Narayan Temple.",
      bestTime: "Year-round destination, though spring (March-May) and autumn (September-November) offer the most pleasant weather.",
      permits: "No special permits required. Entry fees for heritage sites included in the tour package.",
      conservation: "All sites are protected under UNESCO World Heritage designation and managed by the Department of Archaeology."
    },
    highlights: [
      "Visit 7 UNESCO World Heritage Sites",
      "Explore ancient Durbar Squares of Kathmandu, Patan, and Bhaktapur",
      "Witness the sacred Pashupatinath Temple ceremonies",
      "Experience panoramic valley views from Swayambhunath Stupa",
      "Discover traditional Newar architecture and culture",
      "Enjoy authentic Nepali cuisine"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathmandu Sightseeing",
        desc: "Begin your cultural journey with visits to Swayambhunath Stupa (Monkey Temple) for panoramic valley views, followed by Kathmandu Durbar Square to explore ancient palaces and temples. Afternoon visit to Pashupatinath Temple to witness Hindu rituals along the sacred Bagmati River."
      },
      {
        day: 2,
        title: "Patan and Boudhanath",
        desc: "Morning exploration of Patan Durbar Square with its exquisite Newar architecture. Visit the Patan Museum and ancient temples. Afternoon visit to Boudhanath Stupa, one of the largest stupas in the world, and experience Tibetan Buddhist culture."
      },
      {
        day: 3,
        title: "Bhaktapur and Changu Narayan",
        desc: "Full day in Bhaktapur, the medieval city that seems frozen in time. Explore Bhaktapur Durbar Square, pottery square, and traditional streets. Visit Changu Narayan Temple, the oldest temple in the valley, before returning to Kathmandu."
      }
    ],
    included: [
      "Professional English-speaking guide",
      "Private vehicle with driver",
      "All heritage site entrance fees",
      "Hotel pickup and drop-off",
      "Bottled water during tours",
      "Traditional Nepali lunch"
    ],
    excluded: [
      "International flights",
      "Nepal visa fees",
      "Hotel accommodation",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities"
    ],
    images: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200"
    ],
    status: "published",
    rating: 4.8,
    reviewsCount: 156
  },
  {
    title: "Pokhara Valley Scenic Tour",
    slug: "pokhara-valley-scenic-tour",
    category: "tour",
    location: "Pokhara, Nepal",
    difficulty: "Easy",
    durationDays: 4,
    price: 350,
    maxAltitude: "1400m",
    bestSeason: "September to May",
    shortOverview: "Discover the natural beauty of Pokhara with stunning mountain views, serene lakes, mystical caves, and adventurous activities in Nepal's tourism capital.",
    fullOverview: {
      intro: "Pokhara Valley Scenic Tour showcases the breathtaking natural beauty of Nepal's most popular tourist destination. Surrounded by majestic Annapurna ranges and dotted with pristine lakes, Pokhara offers a perfect blend of relaxation and adventure.",
      geography: "Situated at 827 meters, Pokhara Valley offers spectacular views of the Annapurna and Dhaulagiri mountain ranges, with Phewa Lake as its centerpiece.",
      culture: "Experience the warm hospitality of local communities, visit Tibetan refugee camps, and explore the unique Gurung culture.",
      specialPlaces: "Phewa Lake, Sarangkot viewpoint, Davis Falls, Gupteshwor Cave, World Peace Pagoda, International Mountain Museum, and Bindhyabasini Temple.",
      bestTime: "Autumn (September-November) and Spring (March-May) offer clear mountain views and pleasant weather.",
      permits: "No special permits required. Site entry fees included.",
      conservation: "Protected under Annapurna Conservation Area guidelines."
    },
    highlights: [
      "Sunrise view over Annapurna range from Sarangkot",
      "Boating on the serene Phewa Lake",
      "Visit the World Peace Pagoda",
      "Explore mystical caves and waterfalls",
      "Paragliding opportunity (optional)",
      "International Mountain Museum visit"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Lakeside Exploration",
        desc: "Arrive in Pokhara and check into your hotel. Afternoon leisure walk along Phewa Lake's lakeside area. Evening boat ride on Phewa Lake to visit Tal Barahi Temple. Enjoy sunset views with mountain reflections."
      },
      {
        day: 2,
        title: "Sarangkot Sunrise and Sightseeing",
        desc: "Early morning drive to Sarangkot for spectacular sunrise views over the Annapurna range. Return for breakfast. Visit Davis Falls, Gupteshwor Cave, and the International Mountain Museum. Evening at leisure."
      },
      {
        day: 3,
        title: "World Peace Pagoda and Activities",
        desc: "Morning hike or drive to World Peace Pagoda for panoramic valley and mountain views. Visit Bindhyabasini Temple and Tibetan refugee camp. Optional afternoon activities: paragliding, zip-lining, or ultralight flight."
      },
      {
        day: 4,
        title: "Leisure and Departure",
        desc: "Morning at leisure for shopping or spa. Optional visit to nearby attractions. Afternoon departure or extension to other destinations."
      }
    ],
    included: [
      "3 nights accommodation in Pokhara",
      "Daily breakfast",
      "Private vehicle for all transfers and sightseeing",
      "Professional tour guide",
      "All entrance fees",
      "Boat ride on Phewa Lake"
    ],
    excluded: [
      "International and domestic flights",
      "Lunch and dinner",
      "Travel insurance",
      "Optional activities (paragliding, zip-line)",
      "Personal expenses",
      "Tips for guide and driver"
    ],
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200",
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=1200",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200"
    ],
    status: "published",
    rating: 4.9,
    reviewsCount: 203
  },
  {
    title: "Chitwan Jungle Safari",
    slug: "chitwan-jungle-safari",
    category: "tour",
    location: "Chitwan National Park, Nepal",
    difficulty: "Easy",
    durationDays: 3,
    price: 280,
    maxAltitude: "150m",
    bestSeason: "October to March",
    shortOverview: "Experience thrilling wildlife encounters in Nepal's first national park. Spot exotic animals including rhinos, tigers, elephants, and over 500 bird species.",
    fullOverview: {
      intro: "Chitwan Jungle Safari offers an unforgettable wildlife experience in one of Asia's finest national parks. Home to the endangered one-horned rhinoceros and Royal Bengal tiger, Chitwan provides diverse ecosystems ranging from riverine forests to grasslands.",
      geography: "Located in the subtropical Inner Terai lowlands at 150 meters altitude, the park covers 932 square kilometers of pristine wilderness.",
      culture: "Experience the indigenous Tharu culture, known for their unique lifestyle adapted to the Terai region. Enjoy traditional Tharu stick dance performances.",
      specialPlaces: "Chitwan National Park, Rapti River, Elephant Breeding Center, Tharu Cultural Museum, and Twenty Thousand Lakes area.",
      bestTime: "October to March offers pleasant weather and best wildlife viewing opportunities.",
      permits: "National park entry permits and fees included in the package.",
      conservation: "UNESCO World Heritage Site since 1984, strictly protected under Nepal's National Park regulations."
    },
    highlights: [
      "Elephant-back jungle safari",
      "Jeep safari through dense forests",
      "Canoe ride on Rapti River for bird watching",
      "Visit Elephant Breeding Center",
      "Tharu cultural dance performance",
      "Nature walks with experienced naturalists",
      "Chance to spot rhinos, tigers, leopards, and sloth bears"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Orientation",
        desc: "Arrive at Chitwan and transfer to jungle resort. Welcome drink and briefing about park activities. Afternoon visit to Tharu village to experience local culture. Evening Tharu cultural dance performance. Overnight at resort."
      },
      {
        day: 2,
        title: "Full Day Safari Activities",
        desc: "Early morning canoe ride on Rapti River for bird watching. Elephant-back safari through the jungle to spot wildlife. Visit Elephant Breeding Center. Afternoon jeep safari into deep jungle areas. Nature walk at sunset. Evening wildlife documentary presentation."
      },
      {
        day: 3,
        title: "Bird Watching and Departure",
        desc: "Early morning bird watching excursion (over 500 species recorded). Visit to park headquarters and museum. Breakfast and leisure time. Depart for next destination or return to Kathmandu."
      }
    ],
    included: [
      "2 nights jungle resort accommodation",
      "All meals (breakfast, lunch, dinner)",
      "All jungle activities as per itinerary",
      "National park entry fees and permits",
      "Experienced naturalist guide",
      "Tharu cultural program",
      "All ground transportation"
    ],
    excluded: [
      "Transportation to/from Chitwan",
      "Travel insurance",
      "Alcoholic beverages",
      "Personal expenses",
      "Tips for guides and staff",
      "Optional activities"
    ],
    images: [
      "https://images.unsplash.com/photo-1534759926787-89447f8f47e7?w=1200",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1200",
      "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=1200"
    ],
    status: "published",
    rating: 4.7,
    reviewsCount: 178
  },
  {
    title: "Lumbini Pilgrimage Tour",
    slug: "lumbini-pilgrimage-tour",
    category: "tour",
    location: "Lumbini, Nepal",
    difficulty: "Easy",
    durationDays: 2,
    price: 200,
    maxAltitude: "150m",
    bestSeason: "October to April",
    shortOverview: "Visit the birthplace of Lord Buddha, a UNESCO World Heritage Site. Experience peace and spirituality at one of the most sacred Buddhist pilgrimage sites in the world.",
    fullOverview: {
      intro: "Lumbini Pilgrimage Tour takes you to the sacred birthplace of Gautama Buddha, offering a profound spiritual journey. This UNESCO World Heritage Site attracts pilgrims and peace-seekers from around the globe.",
      geography: "Located in the Terai plains of southern Nepal at 150 meters altitude, Lumbini features a serene landscape of gardens, monasteries, and monuments.",
      culture: "Experience the convergence of Buddhist traditions from around the world, with monasteries representing different countries and Buddhist schools.",
      specialPlaces: "Maya Devi Temple (birthplace of Buddha), Sacred Garden, Ashokan Pillar, Puskarini Pond, World Peace Pagoda, and international monastery zone.",
      bestTime: "October to April offers comfortable weather for pilgrimage and exploration.",
      permits: "Site entry fees included in the package.",
      conservation: "Protected as UNESCO World Heritage Site and managed by Lumbini Development Trust."
    },
    highlights: [
      "Visit Maya Devi Temple - exact birthplace of Buddha",
      "See the ancient Ashokan Pillar from 249 BCE",
      "Explore monasteries from different countries",
      "Meditation sessions in peaceful gardens",
      "Visit the sacred Puskarini Pond",
      "Lumbini Museum tour",
      "Experience international Buddhist culture"
    ],
    itinerary: [
      {
        day: 1,
        title: "Lumbini Sacred Garden",
        desc: "Arrive in Lumbini and visit the Sacred Garden. Explore Maya Devi Temple, the exact birthplace of Buddha. See the ancient Ashokan Pillar and sacred Puskarini Pond. Afternoon visit to Lumbini Museum and World Peace Pagoda. Evening meditation session."
      },
      {
        day: 2,
        title: "Monastery Zone Tour",
        desc: "Morning visit to the Monastic Zone featuring monasteries built by different countries including Myanmar, China, Thailand, Japan, and Germany. Experience diverse Buddhist architectural styles. Afternoon at leisure for personal meditation or shopping for Buddhist artifacts. Depart for next destination."
      }
    ],
    included: [
      "1 night accommodation near Lumbini",
      "Breakfast and lunch",
      "Professional guide with Buddhist knowledge",
      "All site entrance fees",
      "Private vehicle for transfers",
      "Meditation session",
      "Monastery zone tour"
    ],
    excluded: [
      "Transportation to/from Lumbini",
      "Dinner",
      "Travel insurance",
      "Personal expenses",
      "Donations to monasteries",
      "Tips for guide and driver"
    ],
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200"
    ],
    status: "published",
    rating: 4.6,
    reviewsCount: 124
  },
  {
    title: "Nagarkot Hill Station Tour",
    slug: "nagarkot-hill-station-tour",
    category: "tour",
    location: "Nagarkot, Nepal",
    difficulty: "Easy",
    durationDays: 2,
    price: 180,
    maxAltitude: "2195m",
    bestSeason: "September to May",
    shortOverview: "Escape to the peaceful hills of Nagarkot for spectacular Himalayan sunrise views. Enjoy panoramic vistas of 8 mountain ranges including Mount Everest.",
    fullOverview: {
      intro: "Nagarkot Hill Station Tour offers a tranquil mountain retreat just 32 km from Kathmandu. Perched at 2,195 meters, Nagarkot is renowned for its spectacular sunrise views over the Himalayas and fresh mountain air.",
      geography: "Located on the northeastern rim of Kathmandu Valley, Nagarkot offers 360-degree views of the Himalayan ranges stretching from Dhaulagiri in the west to Kanchenjunga in the east.",
      culture: "Experience rural Nepali life in surrounding villages, interact with local Tamang communities, and enjoy authentic mountain hospitality.",
      specialPlaces: "Nagarkot View Tower, Changu Narayan Temple, Telkot Village, and various hiking trails through pine forests.",
      bestTime: "Autumn (September-November) and Spring (March-May) offer the clearest mountain views.",
      permits: "No special permits required.",
      conservation: "Part of Shivapuri Nagarjun National Park buffer zone."
    },
    highlights: [
      "Spectacular sunrise over Himalayan ranges",
      "View of Mount Everest on clear days",
      "Panoramic views of 8 mountain ranges",
      "Peaceful hill station atmosphere",
      "Hiking through pine forests",
      "Visit ancient Changu Narayan Temple",
      "Fresh mountain air and nature"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathmandu to Nagarkot",
        desc: "Morning drive from Kathmandu to Nagarkot (2 hours). En route visit to Bhaktapur Durbar Square. Check into hilltop resort. Afternoon leisure walk or short hike. Visit Nagarkot View Tower for sunset views. Dinner with mountain views."
      },
      {
        day: 2,
        title: "Sunrise and Return via Changu Narayan",
        desc: "Early morning wake up for spectacular sunrise over the Himalayas. Breakfast with mountain views. Morning hike to Changu Narayan Temple through traditional villages and terraced fields (2-3 hours). Visit the ancient temple, oldest in the valley. Drive back to Kathmandu."
      }
    ],
    included: [
      "1 night mountain resort accommodation",
      "Daily breakfast and dinner",
      "Private vehicle for transfers",
      "Changu Narayan Temple entrance fee",
      "Professional guide for hiking",
      "Bhaktapur Durbar Square visit"
    ],
    excluded: [
      "Lunch on Day 2",
      "Bhaktapur entrance fee",
      "Travel insurance",
      "Alcoholic beverages",
      "Personal expenses",
      "Tips for guide and driver"
    ],
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=1200"
    ],
    status: "published",
    rating: 4.8,
    reviewsCount: 167
  },
  {
    title: "Bandipur Village Cultural Experience",
    slug: "bandipur-village-cultural-experience",
    category: "tour",
    location: "Bandipur, Nepal",
    difficulty: "Easy",
    durationDays: 2,
    price: 220,
    maxAltitude: "1030m",
    bestSeason: "Year Round",
    shortOverview: "Discover the charming hilltop village of Bandipur with its preserved Newari culture, traditional architecture, and stunning Himalayan panoramas.",
    fullOverview: {
      intro: "Bandipur Village Cultural Experience takes you to one of Nepal's best-preserved cultural gems. This living museum showcases authentic Newari architecture, traditional lifestyle, and breathtaking mountain views.",
      geography: "Perched on a hilltop at 1,030 meters between Kathmandu and Pokhara, Bandipur offers views of the Himalayan ranges and Marsyangdi Valley.",
      culture: "Experience authentic Newari culture in this 18th-century trading town. The bazaar street remains largely unchanged, with traditional architecture and lifestyle preserved.",
      specialPlaces: "Bandipur Bazaar, Tundikhel viewpoint, Siddha Cave, Padma Library, Thani Mai Temple, and silk weaving center.",
      bestTime: "Year-round destination, though autumn and spring offer the best mountain views.",
      permits: "No special permits required.",
      conservation: "Protected as heritage site under local conservation initiatives."
    },
    highlights: [
      "Walk through preserved 18th-century bazaar",
      "Traditional Newari architecture and culture",
      "Stunning Himalayan panoramas from Tundikhel",
      "Visit Siddha Cave, one of Nepal's largest caves",
      "Interact with local silk weavers",
      "Peaceful mountain village atmosphere",
      "Sunrise views over the Himalayas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Journey to Bandipur",
        desc: "Drive from Kathmandu or Pokhara to Bandipur (approximately 4-5 hours from Kathmandu). Check into heritage guesthouse. Afternoon exploration of Bandipur Bazaar with its traditional Newari buildings. Visit Padma Library and local silk weaving center. Evening walk to Tundikhel for sunset views. Traditional Newari dinner."
      },
      {
        day: 2,
        title: "Village Exploration and Cave Visit",
        desc: "Early morning walk to Tundikhel viewpoint for sunrise over the Himalayas. Breakfast at guesthouse. Visit Siddha Cave (30 minutes drive), one of the largest caves in Nepal. Explore Thani Mai Temple. Lunch in village. Afternoon at leisure to explore narrow alleys, interact with locals, or relax at a café. Depart for next destination."
      }
    ],
    included: [
      "1 night heritage guesthouse accommodation",
      "Daily breakfast and dinner",
      "Private vehicle for transfers",
      "Village walking tour with local guide",
      "Siddha Cave entrance fee",
      "Traditional Newari cultural experience"
    ],
    excluded: [
      "Lunch",
      "Travel insurance",
      "Alcoholic beverages",
      "Personal expenses",
      "Shopping",
      "Tips for guide and driver"
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200"
    ],
    status: "published",
    rating: 4.7,
    reviewsCount: 89
  }
];

async function seedTours() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Delete existing tour packages (category: "tour" only, keep treks)
    const deleteResult = await TourPackage.deleteMany({ category: "tour" });
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing tour packages`);

    // Insert new tours
    const insertedTours = await TourPackage.insertMany(tours);
    console.log(`✅ Successfully seeded ${insertedTours.length} tour packages`);

    console.log("\n📦 Seeded Tours:");
    insertedTours.forEach((tour, index) => {
      console.log(`${index + 1}. ${tour.title} - $${tour.price} - ${tour.durationDays} days`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding tours:", error);
    process.exit(1);
  }
}

// Run seeder
seedTours();
