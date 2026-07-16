const mongoose = require("mongoose");
require("dotenv").config();
const TourPackage = require("../models/tourPackage");

const treks = [
  {
    title: "Everest Base Camp Trek",
    slug: "everest-base-camp-trek",
    category: "trek",
    location: "Everest Region, Nepal",
    difficulty: "Challenging",
    durationDays: 14,
    price: 1250,
    maxAltitude: "5364m",
    bestSeason: "March to May, September to November",
    shortOverview: "Trek to the base of the world's highest mountain. Experience Sherpa culture, stunning Himalayan views, and the iconic Everest Base Camp.",
    fullOverview: {
      intro: "The Everest Base Camp Trek is one of the most iconic trekking adventures in the world. This challenging journey takes you through the heart of the Khumbu region, home to the legendary Sherpa people and gateway to Mount Everest.",
      geography: "Located in the Solukhumbu district, the trek reaches a maximum altitude of 5,364 meters at Kala Patthar, offering unparalleled views of Everest, Lhotse, Nuptse, and Ama Dablam.",
      culture: "Immerse yourself in Sherpa culture, visit ancient Buddhist monasteries, and witness the warm hospitality of mountain communities.",
      specialPlaces: "Namche Bazaar, Tengboche Monastery, Everest Base Camp, Kala Patthar viewpoint, and Sagarmatha National Park.",
      bestTime: "Pre-monsoon (March-May) and post-monsoon (September-November) offer the best weather and mountain visibility.",
      permits: "Sagarmatha National Park Permit and Khumbu Pasang Lhamu Rural Municipality Permit required (included in package).",
      conservation: "Trek through UNESCO World Heritage Site - Sagarmatha National Park, home to rare wildlife including snow leopards and red pandas."
    },
    highlights: [
      "Stand at Everest Base Camp at 5,364m",
      "Sunrise view from Kala Patthar with Mt. Everest panorama",
      "Visit Tengboche Monastery, spiritual heart of the Khumbu",
      "Experience authentic Sherpa culture and hospitality",
      "Thrilling flight to Lukla airport",
      "Cross suspension bridges over roaring rivers",
      "Wildlife spotting in Sagarmatha National Park",
      "Breathtaking views of Everest, Lhotse, Nuptse, and Ama Dablam"
    ],
    itinerary: [
      { day: 1, title: "Fly to Lukla, Trek to Phakding", desc: "Thrilling scenic flight to Lukla (2,840m). Begin trek descending to Phakding (2,610m) through pine forests and alongside the Dudh Koshi River. Approximately 3-4 hours walking." },
      { day: 2, title: "Phakding to Namche Bazaar", desc: "Cross suspension bridges and enter Sagarmatha National Park. Steep climb to Namche Bazaar (3,440m), the Sherpa capital. First views of Everest. 5-6 hours trek." },
      { day: 3, title: "Acclimatization Day in Namche", desc: "Rest day for altitude acclimatization. Hike to Everest View Hotel or Khumjung village. Explore Namche's markets, museums, and bakeries." },
      { day: 4, title: "Namche to Tengboche", desc: "Trek through rhododendron forests to Tengboche (3,860m). Visit the famous Tengboche Monastery with stunning Everest and Ama Dablam views. 5-6 hours." },
      { day: 5, title: "Tengboche to Dingboche", desc: "Descend to Deboche, cross the Imja River, and climb to Dingboche (4,410m). Views of Lhotse and Island Peak. 5-6 hours trek." },
      { day: 6, title: "Acclimatization in Dingboche", desc: "Another acclimatization day. Hike to Nagarjun Hill (5,100m) for panoramic views or explore the village. Rest and prepare for higher altitudes." },
      { day: 7, title: "Dingboche to Lobuche", desc: "Trek past memorials to climbers. Reach Lobuche (4,910m) with close views of Khumbu Glacier. 5-6 hours walking." },
      { day: 8, title: "Lobuche to Gorak Shep to EBC", desc: "Trek to Gorak Shep (5,140m), then continue to Everest Base Camp (5,364m). Experience the iconic site where expeditions begin. Return to Gorak Shep. 7-8 hours." },
      { day: 9, title: "Kala Patthar to Pheriche", desc: "Pre-dawn hike to Kala Patthar (5,545m) for spectacular sunrise over Everest. Descend to Pheriche (4,240m). 7-8 hours total." },
      { day: 10, title: "Pheriche to Namche Bazaar", desc: "Long descent through Tengboche back to Namche Bazaar. Celebrate completion with hot showers and comfort. 6-7 hours." },
      { day: 11, title: "Namche to Lukla", desc: "Final trek day descending to Lukla. Celebration dinner with trekking team. 6-7 hours walking." },
      { day: 12, title: "Fly Back to Kathmandu", desc: "Morning flight from Lukla to Kathmandu. Rest and explore the capital. Farewell dinner in evening." },
      { day: 13, title: "Reserve Day", desc: "Buffer day for weather delays or extra rest." },
      { day: 14, title: "Departure", desc: "Transfer to airport for international departure or continue Nepal exploration." }
    ],
    included: [
      "Kathmandu-Lukla-Kathmandu flights",
      "All accommodation during trek (tea houses)",
      "All meals during trek (breakfast, lunch, dinner)",
      "Experienced English-speaking trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "All necessary trekking permits and fees",
      "Sagarmatha National Park entry fee",
      "TIMS card (Trekkers' Information Management System)",
      "First aid kit and oxygen cylinder",
      "Farewell dinner in Kathmandu"
    ],
    excluded: [
      "International flights to/from Nepal",
      "Nepal entry visa fee",
      "Hotel accommodation in Kathmandu",
      "Meals in Kathmandu",
      "Travel and rescue insurance",
      "Personal trekking equipment",
      "Hot showers and battery charging on trek",
      "WiFi and phone calls",
      "Alcoholic beverages and soft drinks",
      "Tips for guides and porters",
      "Emergency evacuation costs"
    ],
    images: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
      "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=1200"
    ],
    status: "published",
    rating: 4.9,
    reviewsCount: 342
  },
  {
    title: "Annapurna Base Camp Trek",
    slug: "annapurna-base-camp-trek",
    category: "trek",
    location: "Annapurna Region, Nepal",
    difficulty: "Moderate",
    durationDays: 10,
    price: 850,
    maxAltitude: "4130m",
    bestSeason: "March to May, September to November",
    shortOverview: "Journey to the heart of the Annapurna Sanctuary. Experience diverse landscapes from subtropical forests to alpine glaciers with 360-degree mountain views.",
    fullOverview: {
      intro: "The Annapurna Base Camp Trek is a spectacular journey into the heart of the Annapurna Sanctuary, surrounded by some of the world's highest peaks. This moderate trek offers incredible diversity in landscapes and cultures.",
      geography: "Trek through the Modi Khola valley to reach Annapurna Base Camp at 4,130 meters, surrounded by Annapurna I (8,091m), Machapuchare (6,993m), and Hiunchuli.",
      culture: "Experience the rich cultural diversity of Gurung and Magar communities, with opportunities to stay in traditional villages.",
      specialPlaces: "Annapurna Base Camp, Machapuchare Base Camp, Poon Hill, Hot Springs at Jhinu Danda, and traditional Gurung villages.",
      bestTime: "Spring (March-May) offers blooming rhododendrons; Autumn (September-November) provides crystal clear mountain views.",
      permits: "ACAP (Annapurna Conservation Area Permit) and TIMS card required (included in package).",
      conservation: "Protected under Annapurna Conservation Area Project, Nepal's largest protected area."
    },
    highlights: [
      "360-degree amphitheater of peaks at ABC",
      "Close-up views of Annapurna I and Machapuchare",
      "Trek through lush rhododendron and bamboo forests",
      "Natural hot springs at Jhinu Danda",
      "Sunrise from Poon Hill (optional)",
      "Experience Gurung culture and hospitality",
      "Diverse landscapes from rice terraces to glaciers",
      "Less crowded alternative to Everest region"
    ],
    itinerary: [
      { day: 1, title: "Drive to Nayapul, Trek to Tikhedhunga", desc: "Drive from Pokhara to Nayapul (1-1.5 hours). Begin trek to Tikhedhunga (1,540m) through beautiful countryside. 4-5 hours walking." },
      { day: 2, title: "Tikhedhunga to Ghorepani", desc: "Climb the famous 3,300 stone steps to Ulleri. Continue through rhododendron forests to Ghorepani (2,850m). 5-6 hours trek." },
      { day: 3, title: "Poon Hill Sunrise, Trek to Tadapani", desc: "Pre-dawn hike to Poon Hill (3,210m) for spectacular sunrise. Return for breakfast, trek to Tadapani (2,630m). 6-7 hours total." },
      { day: 4, title: "Tadapani to Chhomrong", desc: "Descend through forests to Kimrong Khola, then climb to Chhomrong (2,170m), gateway to the Sanctuary. 5-6 hours." },
      { day: 5, title: "Chhomrong to Bamboo", desc: "Descend to Chhomrong Khola, trek through dense bamboo forests to Bamboo (2,310m). 5-6 hours walking." },
      { day: 6, title: "Bamboo to Deurali", desc: "Trek through pristine forests and avalanche zones to Deurali (3,230m). Entering the high mountain zone. 4-5 hours." },
      { day: 7, title: "Deurali to Annapurna Base Camp", desc: "Trek to Machapuchare Base Camp (3,700m), then continue to Annapurna Base Camp (4,130m). Surrounded by towering peaks. 5-6 hours." },
      { day: 8, title: "ABC Sunrise, Descend to Bamboo", desc: "Wake up to sunrise over Annapurna. After breakfast, long descent to Bamboo (2,310m). 7-8 hours walking." },
      { day: 9, title: "Bamboo to Jhinu Danda", desc: "Trek to Jhinu Danda (1,780m). Afternoon relaxation in natural hot springs. 5-6 hours trek." },
      { day: 10, title: "Jhinu to Nayapul, Drive to Pokhara", desc: "Final trek to Nayapul. Drive back to Pokhara. Celebration dinner. 5 hours trek + 1.5 hours drive." }
    ],
    included: [
      "Pokhara-Nayapul-Pokhara transportation",
      "All tea house accommodation during trek",
      "All meals during trek (breakfast, lunch, dinner)",
      "Experienced English-speaking trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "ACAP and TIMS permits",
      "First aid kit",
      "Poon Hill entrance fee",
      "Farewell dinner in Pokhara"
    ],
    excluded: [
      "Kathmandu-Pokhara-Kathmandu transport",
      "Hotel in Pokhara",
      "Meals in Pokhara",
      "Travel insurance",
      "Personal trekking equipment",
      "Hot showers on trek",
      "WiFi and battery charging",
      "Soft drinks and alcohol",
      "Tips for guide and porter",
      "Emergency evacuation"
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200",
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=1200"
    ],
    status: "published",
    rating: 4.8,
    reviewsCount: 267
  },
  {
    title: "Langtang Valley Trek",
    slug: "langtang-valley-trek",
    category: "trek",
    location: "Langtang Region, Nepal",
    difficulty: "Moderate",
    durationDays: 8,
    price: 650,
    maxAltitude: "3870m",
    bestSeason: "March to May, September to November",
    shortOverview: "Discover the hidden valley north of Kathmandu. Trek through pristine forests, Tamang villages, and experience spectacular mountain views close to Tibet.",
    fullOverview: {
      intro: "The Langtang Valley Trek is often called the 'valley of glaciers' and offers stunning beauty close to Kathmandu. This trek showcases unique Tamang culture, diverse landscapes, and impressive mountain scenery.",
      geography: "Located just north of Kathmandu, the Langtang Valley sits between the main Himalayan range and a peak in Tibet. The trek reaches Kyanjin Gompa at 3,870 meters.",
      culture: "Experience authentic Tamang culture influenced by Tibetan Buddhism. Visit ancient monasteries and interact with friendly local communities.",
      specialPlaces: "Langtang National Park, Kyanjin Gompa monastery, cheese factories, Tserko Ri viewpoint, and traditional Tamang villages.",
      bestTime: "Spring offers blooming rhododendrons and clear views; Autumn provides stable weather and excellent visibility.",
      permits: "Langtang National Park Permit and TIMS card required (included in package).",
      conservation: "Protected under Langtang National Park, home to red pandas, Himalayan black bears, and snow leopards."
    },
    highlights: [
      "Close-up views of Langtang Lirung (7,227m)",
      "Trek through Langtang National Park",
      "Visit ancient Kyanjin Gompa monastery",
      "Optional climb to Tserko Ri (5,000m)",
      "Taste local yak cheese",
      "Experience Tamang culture and hospitality",
      "Less crowded than Everest and Annapurna",
      "Convenient access from Kathmandu"
    ],
    itinerary: [
      { day: 1, title: "Drive to Syabrubesi", desc: "Scenic 7-8 hour drive from Kathmandu to Syabrubesi (1,550m) through terraced hills and along Trishuli River. Overnight in lodge." },
      { day: 2, title: "Syabrubesi to Lama Hotel", desc: "Trek through subtropical forests alongside Langtang Khola. Cross suspension bridges. Reach Lama Hotel (2,380m). 6-7 hours walking." },
      { day: 3, title: "Lama Hotel to Langtang Village", desc: "Continue through forests into the widening valley. Pass through Ghoda Tabela. Reach Langtang Village (3,430m). 5-6 hours." },
      { day: 4, title: "Langtang to Kyanjin Gompa", desc: "Trek through yak pastures with increasingly spectacular mountain views. Arrive at Kyanjin Gompa (3,870m). Visit monastery and cheese factory. 3-4 hours." },
      { day: 5, title: "Acclimatization and Exploration", desc: "Optional hike to Tserko Ri (5,000m) for panoramic views or Kyanjin Ri (4,773m). Explore the valley and glaciers. Rest day." },
      { day: 6, title: "Kyanjin Gompa to Lama Hotel", desc: "Descend through Langtang village back to Lama Hotel. Enjoy the changing perspectives of the valley. 6-7 hours walking." },
      { day: 7, title: "Lama Hotel to Syabrubesi", desc: "Final trek day descending to Syabrubesi. Celebrate completion with trekking team. 5-6 hours trek." },
      { day: 8, title: "Drive Back to Kathmandu", desc: "Morning drive back to Kathmandu (7-8 hours). Farewell dinner in evening. Transfer to hotel." }
    ],
    included: [
      "Kathmandu-Syabrubesi-Kathmandu transportation",
      "All tea house accommodation during trek",
      "All meals during trek (breakfast, lunch, dinner)",
      "Experienced English-speaking trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "Langtang National Park permit",
      "TIMS card",
      "First aid kit",
      "Farewell dinner in Kathmandu"
    ],
    excluded: [
      "Hotel in Kathmandu",
      "Meals in Kathmandu",
      "Travel and rescue insurance",
      "Personal trekking equipment",
      "Hot showers and WiFi on trek",
      "Soft drinks and alcoholic beverages",
      "Tips for guide and porter",
      "Optional Tserko Ri climb",
      "Emergency evacuation costs"
    ],
    images: [
      "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=1200",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200"
    ],
    status: "published",
    rating: 4.7,
    reviewsCount: 198
  },
  {
    title: "Manaslu Circuit Trek",
    slug: "manaslu-circuit-trek",
    category: "trek",
    location: "Manaslu Region, Nepal",
    difficulty: "Hard",
    durationDays: 16,
    price: 1450,
    maxAltitude: "5160m",
    bestSeason: "March to May, September to November",
    shortOverview: "Circle the world's eighth highest mountain through remote valleys and high passes. Experience authentic mountain culture on this less-traveled classic trek.",
    fullOverview: {
      intro: "The Manaslu Circuit Trek is one of Nepal's best-kept secrets, offering spectacular mountain scenery and authentic cultural experiences away from crowded trails. This challenging trek circumnavigates Mount Manaslu (8,163m).",
      geography: "Located in west-central Nepal, the trek crosses Larkya La Pass at 5,160 meters, offering stunning views of Manaslu, Himlung Himal, and Cheo Himal.",
      culture: "Experience the rich cultural blend of Hindu lowlands transitioning to Tibetan Buddhist highlands. Visit ancient gompas and interact with remote communities.",
      specialPlaces: "Manaslu Conservation Area, Larkya La Pass, Samagaon village, Pungyen Gompa, Rui La viewpoint, and pristine mountain valleys.",
      bestTime: "Spring and autumn offer stable weather and clear mountain views. The pass can be snow-covered outside these seasons.",
      permits: "Restricted Area Permit, Manaslu Conservation Area Permit, and ACAP required (included). Minimum 2 trekkers required.",
      conservation: "Protected under Manaslu Conservation Area Project, home to endangered species including snow leopards."
    },
    highlights: [
      "Circle the eighth highest mountain in the world",
      "Cross challenging Larkya La Pass (5,160m)",
      "Remote and less crowded alternative to Annapurna",
      "Rich cultural diversity from Hindu to Tibetan Buddhist",
      "Stunning views of Manaslu, Himlung, and Ganesh Himal",
      "Ancient monasteries and traditional villages",
      "Diverse landscapes from rice terraces to glaciers",
      "Authentic tea house experience"
    ],
    itinerary: [
      { day: 1, title: "Drive to Soti Khola", desc: "8-9 hour scenic drive from Kathmandu through terraced hills to Soti Khola (710m). Overnight in lodge." },
      { day: 2, title: "Soti Khola to Machha Khola", desc: "Trek along Budhi Gandaki gorge, crossing suspension bridges. Reach Machha Khola (930m). 6-7 hours." },
      { day: 3, title: "Machha Khola to Jagat", desc: "Continue through narrow gorges and villages. Cross the river several times. Reach Jagat (1,410m). 6-7 hours trek." },
      { day: 4, title: "Jagat to Deng", desc: "Enter Manaslu Conservation Area. Trek through villages of Ghatta Khola and Phillim. Reach Deng (1,804m). 7-8 hours." },
      { day: 5, title: "Deng to Namrung", desc: "Trek through forests and past waterfalls. Enter Tibetan Buddhist cultural zone. Reach Namrung (2,630m). 6-7 hours." },
      { day: 6, title: "Namrung to Samagaon", desc: "Spectacular views of Manaslu begin. Pass through Lihi and Sho. Reach Samagaon (3,530m). 6-7 hours walking." },
      { day: 7, title: "Acclimatization in Samagaon", desc: "Rest day with options to visit Pungyen Gompa, Manaslu Base Camp, or Birendra Lake. Explore traditional village." },
      { day: 8, title: "Samagaon to Samdo", desc: "Short trek to Samdo (3,860m) near Tibetan border. Afternoon rest and acclimatization. 3-4 hours walking." },
      { day: 9, title: "Acclimatization in Samdo", desc: "Optional hike to Tibet border viewpoint or explore surrounding area. Important acclimatization day before the pass." },
      { day: 10, title: "Samdo to Dharmasala", desc: "Trek to Dharmasala/Larkya Phedi (4,460m), base for pass crossing. Short but steep day. 4-5 hours. Early dinner and rest." },
      { day: 11, title: "Cross Larkya La to Bimthang", desc: "Early start (3-4am) to cross Larkya La Pass (5,160m). Spectacular mountain panorama. Long descent to Bimthang (3,720m). 8-10 hours." },
      { day: 12, title: "Bimthang to Tilije", desc: "Descend through rhododendron forests. Join Annapurna Circuit trail. Reach Tilije (2,300m). 6-7 hours trek." },
      { day: 13, title: "Tilije to Tal", desc: "Continue descent through Dharapani. Cross suspension bridge to Tal (1,700m) in Marsyangdi valley. 5-6 hours." },
      { day: 14, title: "Tal to Syange", desc: "Trek through villages and along the river. Reach Syange (1,100m). 6-7 hours walking." },
      { day: 15, title: "Drive to Kathmandu", desc: "Drive back to Kathmandu (8-9 hours) via Besisahar. Farewell dinner in evening. Hotel rest." },
      { day: 16, title: "Departure Day", desc: "Buffer day for flight delays or extra rest. Transfer to airport for departure." }
    ],
    included: [
      "Kathmandu-Soti Khola jeep transport",
      "Syange-Kathmandu bus/jeep transport",
      "All tea house accommodation during trek",
      "All meals during trek (breakfast, lunch, dinner)",
      "Experienced English-speaking guide",
      "Porter service (1 porter for 2 trekkers)",
      "Manaslu Restricted Area Permit",
      "Manaslu Conservation Area Permit (MCAP)",
      "Annapurna Conservation Area Permit (ACAP)",
      "TIMS card",
      "First aid kit and oxygen meter",
      "Farewell dinner in Kathmandu"
    ],
    excluded: [
      "Hotel in Kathmandu",
      "Meals in Kathmandu",
      "International flights and Nepal visa",
      "Travel and rescue insurance (mandatory)",
      "Personal trekking equipment",
      "Hot showers and WiFi on trek",
      "Battery charging fees",
      "Soft drinks and alcoholic beverages",
      "Tips for guide and porter",
      "Emergency evacuation costs",
      "Extra expenses due to landslides or delays"
    ],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=1200",
      "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=1200",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200"
    ],
    status: "published",
    rating: 4.9,
    reviewsCount: 145
  }
];

async function seedTreks() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Delete existing trek packages
    const deleteResult = await TourPackage.deleteMany({ category: "trek" });
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing trek packages`);

    // Insert new treks
    const insertedTreks = await TourPackage.insertMany(treks);
    console.log(`✅ Successfully seeded ${insertedTreks.length} trek packages`);

    console.log("\n📦 Seeded Treks:");
    insertedTreks.forEach((trek, index) => {
      console.log(`${index + 1}. ${trek.title} - $${trek.price} - ${trek.durationDays} days - ${trek.difficulty}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding treks:", error);
    process.exit(1);
  }
}

// Run seeder
seedTreks();
