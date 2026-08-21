const mongoose = require("mongoose");
require("dotenv").config();
const TourPackage = require("../models/tourPackage");
const Region = require("../models/Region");

const treks = [
  // ── EVEREST REGION ─────────────────────────────────────────────
  {
    title: "Everest Base Camp Trek",
    slug: "everest-base-camp-trek",
    regionKey: "Everest Region Trekking",
    category: "trek",
    location: "Everest Region, Nepal",
    difficulty: "Challenging",
    durationDays: 14,
    price: 1250,
    maxAltitude: "5364m",
    bestSeason: "March to May, September to November",
    shortOverview:
      "Trek to the base of the world's highest mountain. Experience Sherpa culture, stunning Himalayan views, and the iconic Everest Base Camp.",
    fullOverview: {
      intro:
        "The Everest Base Camp Trek is one of the most iconic trekking adventures in the world. This challenging journey takes you through the heart of the Khumbu region, home to the legendary Sherpa people and gateway to Mount Everest.",
      geography:
        "Located in the Solukhumbu district, the trek reaches a maximum altitude of 5,364 meters at Kala Patthar, offering unparalleled views of Everest, Lhotse, Nuptse, and Ama Dablam.",
      culture:
        "Immerse yourself in Sherpa culture, visit ancient Buddhist monasteries, and witness the warm hospitality of mountain communities.",
      specialPlaces:
        "Namche Bazaar, Tengboche Monastery, Everest Base Camp, Kala Patthar viewpoint, and Sagarmatha National Park.",
      bestTime:
        "Pre-monsoon (March-May) and post-monsoon (September-November) offer the best weather and mountain visibility.",
      permits:
        "Sagarmatha National Park Permit and Khumbu Pasang Lhamu Rural Municipality Permit required (included in package).",
      conservation:
        "Trek through UNESCO World Heritage Site - Sagarmatha National Park, home to rare wildlife including snow leopards and red pandas.",
    },
    highlights: [
      "Stand at Everest Base Camp at 5,364m",
      "Sunrise view from Kala Patthar with Mt. Everest panorama",
      "Visit Tengboche Monastery, spiritual heart of the Khumbu",
      "Experience authentic Sherpa culture and hospitality",
      "Thrilling flight to Lukla airport",
      "Cross suspension bridges over roaring rivers",
      "Wildlife spotting in Sagarmatha National Park",
      "Breathtaking views of Everest, Lhotse, Nuptse, and Ama Dablam",
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
      { day: 14, title: "Departure", desc: "Transfer to airport for international departure or continue Nepal exploration." },
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
      "Farewell dinner in Kathmandu",
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
      "Emergency evacuation costs",
    ],
    images: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    ],
    status: "published",
    rating: 4.9,
    reviewsCount: 342,
  },
  {
    title: "Gokyo Lakes Trek",
    slug: "gokyo-lakes-trek",
    regionKey: "Everest Region Trekking",
    category: "trek",
    location: "Everest Region, Nepal",
    difficulty: "Challenging",
    durationDays: 13,
    price: 1150,
    maxAltitude: "5357m",
    bestSeason: "March to May, September to November",
    shortOverview:
      "Trek to the stunning turquoise Gokyo Lakes and ascend Gokyo Ri for a panoramic view of four 8,000-meter peaks including Everest, Cho Oyu, Makalu, and Lhotse.",
    fullOverview: {
      intro:
        "The Gokyo Lakes Trek is a breathtaking alternative to the classic Everest Base Camp route, offering equally stunning mountain scenery with fewer crowds. The turquoise Gokyo Lakes, the world's highest freshwater lake system, are the jewel of this trek.",
      geography:
        "The trek reaches Gokyo Ri (5,357m) in the Khumbu region, offering panoramic views of Everest, Cho Oyu, Makalu, and Lhotse from a single viewpoint.",
      culture:
        "Pass through Sherpa villages including Namche Bazaar, Dole, and Machhermo, experiencing the rich Buddhist culture of the Khumbu region.",
      specialPlaces:
        "Gokyo Lakes, Gokyo Ri viewpoint, Ngozumpa Glacier (Nepal's largest glacier), Scoundrel's View, and Renjo La Pass.",
      bestTime:
        "Autumn (September-November) provides the clearest mountain views; Spring (March-May) offers blooming rhododendrons at lower elevations.",
      permits:
        "Sagarmatha National Park Permit and TIMS card included.",
      conservation:
        "Protected within Sagarmatha National Park, a UNESCO World Heritage Site.",
    },
    highlights: [
      "Panoramic view of 4 eight-thousanders from Gokyo Ri",
      "Stunning turquoise Gokyo Lakes",
      "Walk alongside Ngozumpa Glacier",
      "Less crowded than EBC route",
      "Authentic Sherpa culture and teahouses",
      "Optional Three Passes route extension",
      "Thrilling Lukla flight",
    ],
    itinerary: [
      { day: 1, title: "Fly Kathmandu to Lukla, Trek to Phakding", desc: "Morning flight to Lukla (2,840m). Trek through pine forests to Phakding (2,610m). 3-4 hours walk." },
      { day: 2, title: "Phakding to Namche Bazaar", desc: "Enter Sagarmatha National Park. Steep climb to Namche Bazaar (3,440m). 5-6 hours." },
      { day: 3, title: "Acclimatization in Namche", desc: "Rest day in Namche. Hike to Everest View Hotel. Explore local markets." },
      { day: 4, title: "Namche to Dole", desc: "Trek above the Bhote Koshi valley with stunning views. Reach Dole (4,200m). 5-6 hours." },
      { day: 5, title: "Dole to Machhermo", desc: "Trek through yak pastures to Machhermo (4,470m). Acclimatization walk. 4-5 hours." },
      { day: 6, title: "Machhermo to Gokyo", desc: "Trek alongside Ngozumpa Glacier to Gokyo (4,790m). First views of the lakes. 5-6 hours." },
      { day: 7, title: "Gokyo Ri and Lakes Exploration", desc: "Pre-dawn ascent to Gokyo Ri (5,357m) for sunrise views of Everest and three other 8,000m peaks. Afternoon explore upper Gokyo Lakes. Full day." },
      { day: 8, title: "Acclimatization / 5th Lake Hike", desc: "Optional hike to the 5th lake and Scoundrel's View. Rest and acclimatize." },
      { day: 9, title: "Gokyo to Namche Bazaar", desc: "Long descent back through Dole to Namche (3,440m). 7-8 hours." },
      { day: 10, title: "Namche to Lukla", desc: "Descend through Phakding and Monjo back to Lukla. Farewell dinner. 6-7 hours." },
      { day: 11, title: "Fly to Kathmandu", desc: "Morning flight back to Kathmandu. Rest and evening at leisure." },
      { day: 12, title: "Reserve Day", desc: "Buffer day for weather or flight delays." },
      { day: 13, title: "Departure", desc: "Transfer to airport for onward journey." },
    ],
    included: [
      "Kathmandu-Lukla-Kathmandu flights",
      "All tea house accommodation",
      "All meals on trek",
      "English-speaking guide and porter",
      "Sagarmatha National Park permit",
      "TIMS card",
      "First aid kit",
      "Farewell dinner",
    ],
    excluded: [
      "International flights",
      "Nepal visa",
      "Hotel in Kathmandu",
      "Travel insurance",
      "Personal gear",
      "Tips",
      "Extra charges on trek",
    ],
    images: [
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=1200&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    ],
    status: "published",
    rating: 4.8,
    reviewsCount: 189,
  },

  // ── ANNAPURNA REGION ────────────────────────────────────────────
  {
    title: "Annapurna Base Camp Trek",
    slug: "annapurna-base-camp-trek",
    regionKey: "Annapurna Region Trekking",
    category: "trek",
    location: "Annapurna Region, Nepal",
    difficulty: "Moderate",
    durationDays: 10,
    price: 850,
    maxAltitude: "4130m",
    bestSeason: "March to May, September to November",
    shortOverview:
      "Journey to the heart of the Annapurna Sanctuary. Experience diverse landscapes from subtropical forests to alpine glaciers with 360-degree mountain views.",
    fullOverview: {
      intro:
        "The Annapurna Base Camp Trek is a spectacular journey into the heart of the Annapurna Sanctuary, surrounded by some of the world's highest peaks.",
      geography:
        "Trek through the Modi Khola valley to reach Annapurna Base Camp at 4,130 meters, surrounded by Annapurna I (8,091m), Machapuchare (6,993m), and Hiunchuli.",
      culture:
        "Experience the rich cultural diversity of Gurung and Magar communities, staying in traditional villages.",
      specialPlaces:
        "Annapurna Base Camp, Machapuchare Base Camp, Poon Hill, Hot Springs at Jhinu Danda, and traditional Gurung villages.",
      bestTime:
        "Spring (March-May) offers blooming rhododendrons; Autumn (September-November) provides crystal clear mountain views.",
      permits:
        "ACAP (Annapurna Conservation Area Permit) and TIMS card required (included in package).",
      conservation:
        "Protected under Annapurna Conservation Area Project, Nepal's largest protected area.",
    },
    highlights: [
      "360-degree amphitheater of peaks at ABC",
      "Close-up views of Annapurna I and Machapuchare",
      "Trek through lush rhododendron and bamboo forests",
      "Natural hot springs at Jhinu Danda",
      "Sunrise from Poon Hill (optional)",
      "Experience Gurung culture and hospitality",
      "Diverse landscapes from rice terraces to glaciers",
      "Less crowded alternative to Everest region",
    ],
    itinerary: [
      { day: 1, title: "Drive to Nayapul, Trek to Tikhedhunga", desc: "Drive from Pokhara to Nayapul (1-1.5 hours). Begin trek to Tikhedhunga (1,540m). 4-5 hours walking." },
      { day: 2, title: "Tikhedhunga to Ghorepani", desc: "Climb the famous 3,300 stone steps to Ulleri. Continue through rhododendron forests to Ghorepani (2,850m). 5-6 hours trek." },
      { day: 3, title: "Poon Hill Sunrise, Trek to Tadapani", desc: "Pre-dawn hike to Poon Hill (3,210m) for spectacular sunrise. Return for breakfast, trek to Tadapani (2,630m). 6-7 hours total." },
      { day: 4, title: "Tadapani to Chhomrong", desc: "Descend through forests to Kimrong Khola, then climb to Chhomrong (2,170m), gateway to the Sanctuary. 5-6 hours." },
      { day: 5, title: "Chhomrong to Bamboo", desc: "Descend to Chhomrong Khola, trek through dense bamboo forests to Bamboo (2,310m). 5-6 hours walking." },
      { day: 6, title: "Bamboo to Deurali", desc: "Trek through pristine forests and avalanche zones to Deurali (3,230m). 4-5 hours." },
      { day: 7, title: "Deurali to Annapurna Base Camp", desc: "Trek to Machapuchare Base Camp (3,700m), then continue to Annapurna Base Camp (4,130m). 5-6 hours." },
      { day: 8, title: "ABC Sunrise, Descend to Bamboo", desc: "Wake up to sunrise over Annapurna. Long descent to Bamboo (2,310m). 7-8 hours walking." },
      { day: 9, title: "Bamboo to Jhinu Danda", desc: "Trek to Jhinu Danda (1,780m). Afternoon relaxation in natural hot springs. 5-6 hours trek." },
      { day: 10, title: "Jhinu to Nayapul, Drive to Pokhara", desc: "Final trek to Nayapul. Drive back to Pokhara. Celebration dinner. 5 hours trek + 1.5 hours drive." },
    ],
    included: [
      "Pokhara-Nayapul-Pokhara transportation",
      "All tea house accommodation during trek",
      "All meals during trek",
      "Experienced English-speaking trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "ACAP and TIMS permits",
      "First aid kit",
      "Poon Hill entrance fee",
      "Farewell dinner in Pokhara",
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
      "Emergency evacuation",
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=1200&q=80",
    ],
    status: "published",
    rating: 4.8,
    reviewsCount: 267,
  },
  {
    title: "Ghorepani Poon Hill Trek",
    slug: "ghorepani-poon-hill-trek",
    regionKey: "Annapurna Region Trekking",
    category: "trek",
    location: "Annapurna Region, Nepal",
    difficulty: "Easy",
    durationDays: 4,
    price: 450,
    maxAltitude: "3210m",
    bestSeason: "March to May, September to November",
    shortOverview:
      "One of Nepal's most popular short treks. Witness a breathtaking sunrise over the Annapurna and Dhaulagiri ranges from the famous Poon Hill viewpoint.",
    fullOverview: {
      intro:
        "The Ghorepani Poon Hill Trek is Nepal's most popular short trek, accessible to almost all fitness levels. The trail passes through charming Gurung and Magar villages, dense rhododendron forests, and culminates in the iconic sunrise view from Poon Hill.",
      geography:
        "Located in the Annapurna Conservation Area, the highest point is Poon Hill at 3,210 meters, offering panoramic views of Dhaulagiri, Annapurna South, Hiunchuli, and Machapuchare.",
      culture:
        "Trek through Gurung and Magar villages, experience traditional mountain culture, and witness centuries-old customs.",
      specialPlaces:
        "Poon Hill, Ghorepani village, Ulleri stone staircase, Nayapul trailhead, and rhododendron forests.",
      bestTime:
        "March and April are best for blooming rhododendrons; autumn offers clear skies.",
      permits:
        "ACAP and TIMS card required (included).",
      conservation:
        "Within the Annapurna Conservation Area, home to red pandas and diverse bird species.",
    },
    highlights: [
      "Iconic sunrise view from Poon Hill at 3,210m",
      "Close views of Dhaulagiri, Annapurna, and Machapuchare",
      "Trek through blooming rhododendron forests",
      "Authentic Gurung village experience",
      "Short and accessible for beginners",
      "Famous stone staircase of Ulleri",
    ],
    itinerary: [
      { day: 1, title: "Drive to Nayapul, Trek to Ulleri", desc: "Drive from Pokhara to Nayapul (1.5 hours). Trek through Birethanti along Modi Khola to Ulleri (2,080m) via the famous stone steps. 5-6 hours." },
      { day: 2, title: "Ulleri to Ghorepani", desc: "Trek through magnificent rhododendron and oak forests to Ghorepani (2,850m). Panoramic mountain views throughout. 4-5 hours." },
      { day: 3, title: "Poon Hill Sunrise, Trek to Tadapani", desc: "Pre-dawn hike to Poon Hill (3,210m) for spectacular sunrise. Return to Ghorepani for breakfast, then trek through forests to Tadapani (2,630m). 6-7 hours." },
      { day: 4, title: "Tadapani to Nayapul, Drive to Pokhara", desc: "Descend through Chhomrong and Kimche to Nayapul. Drive back to Pokhara. 5-6 hours trek." },
    ],
    included: [
      "Pokhara-Nayapul-Pokhara transport",
      "All tea house accommodation",
      "All meals on trek",
      "English-speaking guide and porter",
      "ACAP and TIMS permits",
      "First aid kit",
    ],
    excluded: [
      "Hotel in Pokhara",
      "Meals in Pokhara",
      "Travel insurance",
      "Personal gear",
      "Tips",
      "Extra drinks",
    ],
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
    ],
    status: "published",
    rating: 4.9,
    reviewsCount: 312,
  },

  // ── LANGTANG REGION ─────────────────────────────────────────────
  {
    title: "Langtang Valley Trek",
    slug: "langtang-valley-trek",
    regionKey: "Langtang Region Trekking",
    category: "trek",
    location: "Langtang Region, Nepal",
    difficulty: "Moderate",
    durationDays: 8,
    price: 650,
    maxAltitude: "3870m",
    bestSeason: "March to May, September to November",
    shortOverview:
      "Discover the hidden valley north of Kathmandu. Trek through pristine forests, Tamang villages, and experience spectacular mountain views close to Tibet.",
    fullOverview: {
      intro:
        "The Langtang Valley Trek is often called the 'valley of glaciers' and offers stunning beauty close to Kathmandu. This trek showcases unique Tamang culture, diverse landscapes, and impressive mountain scenery.",
      geography:
        "Located just north of Kathmandu, the Langtang Valley sits between the main Himalayan range and a peak in Tibet. The trek reaches Kyanjin Gompa at 3,870 meters.",
      culture:
        "Experience authentic Tamang culture influenced by Tibetan Buddhism. Visit ancient monasteries and interact with friendly local communities.",
      specialPlaces:
        "Langtang National Park, Kyanjin Gompa monastery, cheese factories, Tserko Ri viewpoint, and traditional Tamang villages.",
      bestTime:
        "Spring offers blooming rhododendrons and clear views; Autumn provides stable weather and excellent visibility.",
      permits:
        "Langtang National Park Permit and TIMS card required (included in package).",
      conservation:
        "Protected under Langtang National Park, home to red pandas, Himalayan black bears, and snow leopards.",
    },
    highlights: [
      "Close-up views of Langtang Lirung (7,227m)",
      "Trek through Langtang National Park",
      "Visit ancient Kyanjin Gompa monastery",
      "Optional climb to Tserko Ri (5,000m)",
      "Taste local yak cheese",
      "Experience Tamang culture and hospitality",
      "Less crowded than Everest and Annapurna",
      "Convenient access from Kathmandu",
    ],
    itinerary: [
      { day: 1, title: "Drive to Syabrubesi", desc: "Scenic 7-8 hour drive from Kathmandu to Syabrubesi (1,550m) through terraced hills and along Trishuli River. Overnight in lodge." },
      { day: 2, title: "Syabrubesi to Lama Hotel", desc: "Trek through subtropical forests alongside Langtang Khola. Cross suspension bridges. Reach Lama Hotel (2,380m). 6-7 hours walking." },
      { day: 3, title: "Lama Hotel to Langtang Village", desc: "Continue through forests into the widening valley. Pass through Ghoda Tabela. Reach Langtang Village (3,430m). 5-6 hours." },
      { day: 4, title: "Langtang to Kyanjin Gompa", desc: "Trek through yak pastures with increasingly spectacular mountain views. Arrive at Kyanjin Gompa (3,870m). Visit monastery and cheese factory. 3-4 hours." },
      { day: 5, title: "Acclimatization and Exploration", desc: "Optional hike to Tserko Ri (5,000m) for panoramic views or Kyanjin Ri (4,773m). Explore the valley and glaciers. Rest day." },
      { day: 6, title: "Kyanjin Gompa to Lama Hotel", desc: "Descend through Langtang village back to Lama Hotel. Enjoy the changing perspectives of the valley. 6-7 hours walking." },
      { day: 7, title: "Lama Hotel to Syabrubesi", desc: "Final trek day descending to Syabrubesi. Celebrate completion with trekking team. 5-6 hours trek." },
      { day: 8, title: "Drive Back to Kathmandu", desc: "Morning drive back to Kathmandu (7-8 hours). Farewell dinner in evening. Transfer to hotel." },
    ],
    included: [
      "Kathmandu-Syabrubesi-Kathmandu transportation",
      "All tea house accommodation during trek",
      "All meals during trek",
      "Experienced English-speaking trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "Langtang National Park permit",
      "TIMS card",
      "First aid kit",
      "Farewell dinner in Kathmandu",
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
      "Emergency evacuation costs",
    ],
    images: [
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
    ],
    status: "published",
    rating: 4.7,
    reviewsCount: 198,
  },

  // ── MANASLU REGION ──────────────────────────────────────────────
  {
    title: "Manaslu Circuit Trek",
    slug: "manaslu-circuit-trek",
    regionKey: "Manaslu Region Trekking",
    category: "trek",
    location: "Manaslu Region, Nepal",
    difficulty: "Hard",
    durationDays: 16,
    price: 1450,
    maxAltitude: "5160m",
    bestSeason: "March to May, September to November",
    shortOverview:
      "Circle the world's eighth highest mountain through remote valleys and high passes. Experience authentic mountain culture on this less-traveled classic trek.",
    fullOverview: {
      intro:
        "The Manaslu Circuit Trek is one of Nepal's best-kept secrets, offering spectacular mountain scenery and authentic cultural experiences away from crowded trails.",
      geography:
        "Located in west-central Nepal, the trek crosses Larkya La Pass at 5,160 meters, offering stunning views of Manaslu, Himlung Himal, and Cheo Himal.",
      culture:
        "Experience the rich cultural blend of Hindu lowlands transitioning to Tibetan Buddhist highlands. Visit ancient gompas and interact with remote communities.",
      specialPlaces:
        "Manaslu Conservation Area, Larkya La Pass, Samagaon village, Pungyen Gompa, Rui La viewpoint, and pristine mountain valleys.",
      bestTime:
        "Spring and autumn offer stable weather and clear mountain views.",
      permits:
        "Restricted Area Permit, Manaslu Conservation Area Permit, and ACAP required (included). Minimum 2 trekkers required.",
      conservation:
        "Protected under Manaslu Conservation Area Project, home to endangered species including snow leopards.",
    },
    highlights: [
      "Circle the eighth highest mountain in the world",
      "Cross challenging Larkya La Pass (5,160m)",
      "Remote and less crowded alternative to Annapurna",
      "Rich cultural diversity from Hindu to Tibetan Buddhist",
      "Stunning views of Manaslu, Himlung, and Ganesh Himal",
      "Ancient monasteries and traditional villages",
      "Diverse landscapes from rice terraces to glaciers",
      "Authentic tea house experience",
    ],
    itinerary: [
      { day: 1, title: "Drive to Soti Khola", desc: "8-9 hour scenic drive from Kathmandu through terraced hills to Soti Khola (710m). Overnight in lodge." },
      { day: 2, title: "Soti Khola to Machha Khola", desc: "Trek along Budhi Gandaki gorge, crossing suspension bridges. Reach Machha Khola (930m). 6-7 hours." },
      { day: 3, title: "Machha Khola to Jagat", desc: "Continue through narrow gorges and villages. Reach Jagat (1,410m). 6-7 hours trek." },
      { day: 4, title: "Jagat to Deng", desc: "Enter Manaslu Conservation Area. Trek through villages. Reach Deng (1,804m). 7-8 hours." },
      { day: 5, title: "Deng to Namrung", desc: "Trek through forests and past waterfalls. Enter Tibetan Buddhist cultural zone. Reach Namrung (2,630m). 6-7 hours." },
      { day: 6, title: "Namrung to Samagaon", desc: "Spectacular views of Manaslu begin. Reach Samagaon (3,530m). 6-7 hours walking." },
      { day: 7, title: "Acclimatization in Samagaon", desc: "Rest day with options to visit Pungyen Gompa, Manaslu Base Camp, or Birendra Lake." },
      { day: 8, title: "Samagaon to Samdo", desc: "Short trek to Samdo (3,860m) near Tibetan border. 3-4 hours walking." },
      { day: 9, title: "Acclimatization in Samdo", desc: "Optional hike to Tibet border viewpoint. Important acclimatization day before the pass." },
      { day: 10, title: "Samdo to Dharmasala", desc: "Trek to Dharmasala/Larkya Phedi (4,460m). Short but steep day. 4-5 hours." },
      { day: 11, title: "Cross Larkya La to Bimthang", desc: "Early start (3-4am) to cross Larkya La Pass (5,160m). Long descent to Bimthang (3,720m). 8-10 hours." },
      { day: 12, title: "Bimthang to Tilije", desc: "Descend through rhododendron forests. Reach Tilije (2,300m). 6-7 hours trek." },
      { day: 13, title: "Tilije to Tal", desc: "Continue descent through Dharapani. Reach Tal (1,700m). 5-6 hours." },
      { day: 14, title: "Tal to Syange", desc: "Trek through villages and along the river. Reach Syange (1,100m). 6-7 hours." },
      { day: 15, title: "Drive to Kathmandu", desc: "Drive back to Kathmandu (8-9 hours) via Besisahar. Farewell dinner in evening." },
      { day: 16, title: "Departure Day", desc: "Buffer day for flight delays or extra rest. Transfer to airport." },
    ],
    included: [
      "Kathmandu-Soti Khola jeep transport",
      "Syange-Kathmandu bus/jeep transport",
      "All tea house accommodation during trek",
      "All meals during trek",
      "Experienced English-speaking guide",
      "Porter service",
      "Manaslu Restricted Area Permit",
      "Manaslu Conservation Area Permit (MCAP)",
      "Annapurna Conservation Area Permit (ACAP)",
      "TIMS card",
      "First aid kit and oxygen meter",
      "Farewell dinner in Kathmandu",
    ],
    excluded: [
      "Hotel in Kathmandu",
      "Meals in Kathmandu",
      "International flights and Nepal visa",
      "Travel and rescue insurance (mandatory)",
      "Personal trekking equipment",
      "Hot showers and WiFi on trek",
      "Soft drinks and alcoholic beverages",
      "Tips for guide and porter",
      "Emergency evacuation costs",
    ],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=1200&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
    ],
    status: "published",
    rating: 4.9,
    reviewsCount: 145,
  },

  // ── UPPER MUSTANG ───────────────────────────────────────────────
  {
    title: "Upper Mustang Trek",
    slug: "upper-mustang-trek",
    regionKey: "Upper Mustang Trekking",
    category: "trek",
    location: "Mustang, Nepal",
    difficulty: "Moderate",
    durationDays: 14,
    price: 1900,
    maxAltitude: "4200m",
    bestSeason: "May to October",
    shortOverview:
      "Journey into the forbidden kingdom of Lo Manthang. Trek through surreal desert landscapes, ancient cave monasteries, and a living Tibetan culture in a restricted Himalayan kingdom.",
    fullOverview: {
      intro:
        "Upper Mustang is one of Nepal's last restricted trekking regions, preserving an ancient Tibetan way of life untouched by modernity. The walled city of Lo Manthang is the crown jewel of this extraordinary journey.",
      geography:
        "Located in the rain shadow of the Himalayas, Upper Mustang receives very little rainfall, creating a dramatic arid landscape with eroded cliffs, deep gorges, and surreal rock formations.",
      culture:
        "Home to the Lo-ba people, Upper Mustang retains centuries-old Tibetan Buddhist traditions, with ancient monasteries, mani walls, and a living king.",
      specialPlaces:
        "Lo Manthang walled city, Kagbeni, Chhoser Cave Monastery, Drakmar Red Cliffs, Syangmochen, and ancient gompas.",
      bestTime:
        "May to October is the best time, when most of Nepal is in monsoon but Mustang stays dry.",
      permits:
        "Special Restricted Area Permit (USD 500 for 10 days) required — included in package.",
      conservation:
        "Protected by Nepal government as a restricted zone to preserve cultural heritage.",
    },
    highlights: [
      "Enter the forbidden walled city of Lo Manthang",
      "Explore ancient cave monasteries",
      "Dramatic desert and cliff landscapes unique in Nepal",
      "Living Tibetan Buddhist culture and traditions",
      "Trek in the dry season when other regions are in monsoon",
      "Ancient cliff-dwellings and Bon temples",
    ],
    itinerary: [
      { day: 1, title: "Fly Pokhara to Jomsom, Trek to Kagbeni", desc: "Morning flight to Jomsom (2,720m). Trek through dramatic Kali Gandaki valley to Kagbeni (2,810m), gateway to Upper Mustang. 3-4 hours." },
      { day: 2, title: "Kagbeni to Chele", desc: "Enter restricted Upper Mustang area. Trek through barren landscapes and cross Nyi La pass. Reach Chele (3,050m). 5-6 hours." },
      { day: 3, title: "Chele to Syangboche", desc: "Trek across ridges with views of Nilgiri and Tilicho Peak. Reach Syangboche (3,800m). 5-6 hours." },
      { day: 4, title: "Syangboche to Ghami", desc: "Pass the famous Drakmar Red Cliffs. Reach Ghami (3,520m) with its long mani wall. 5-6 hours." },
      { day: 5, title: "Ghami to Tsarang", desc: "Trek through Charang village with ancient fort and monastery. Reach Tsarang (3,560m). 5-6 hours." },
      { day: 6, title: "Tsarang to Lo Manthang", desc: "Arrive at Lo Manthang (3,840m), the walled capital of the Kingdom of Lo. 5-6 hours. Afternoon exploration of the ancient city." },
      { day: 7, title: "Lo Manthang Exploration", desc: "Full day to explore Lo Manthang: Jampa Lhakhang, Thubchen Gompa, Champa Lhakhang, and the former royal palace. Optional day trip to Lo Gekar." },
      { day: 8, title: "Lo Manthang to Drakmar", desc: "Begin return journey. Visit Chhoser Cave Monastery. Trek to Drakmar (3,810m). 5-6 hours." },
      { day: 9, title: "Drakmar to Ghami", desc: "Trek through the dramatic landscape back to Ghami (3,520m). 5-6 hours." },
      { day: 10, title: "Ghami to Chhusang", desc: "Descend through varied terrain to Chhusang (2,980m). 6-7 hours." },
      { day: 11, title: "Chhusang to Kagbeni", desc: "Return to Kagbeni through the Kali Gandaki valley. 5-6 hours." },
      { day: 12, title: "Kagbeni to Jomsom", desc: "Short trek back to Jomsom. Afternoon at leisure. 3-4 hours." },
      { day: 13, title: "Fly Jomsom to Pokhara", desc: "Morning flight back to Pokhara. Farewell dinner." },
      { day: 14, title: "Departure", desc: "Transfer to your next destination or return to Kathmandu." },
    ],
    included: [
      "Pokhara-Jomsom-Pokhara flights",
      "Special Restricted Area Permit (USD 500 for 10 days)",
      "ACAP permit",
      "TIMS card",
      "All tea house accommodation",
      "All meals on trek",
      "Experienced guide and porter",
      "First aid kit",
    ],
    excluded: [
      "Hotel in Pokhara/Kathmandu",
      "Meals outside trek",
      "Travel insurance",
      "Personal gear",
      "Tips",
      "Emergency evacuation",
    ],
    images: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    ],
    status: "published",
    rating: 4.9,
    reviewsCount: 87,
  },

  // ── DOLPO REGION ────────────────────────────────────────────────
  {
    title: "Lower Dolpo Trek",
    slug: "lower-dolpo-trek",
    regionKey: "Dolpo Region Trekking",
    category: "trek",
    location: "Dolpo, Nepal",
    difficulty: "Hard",
    durationDays: 18,
    price: 2100,
    maxAltitude: "5360m",
    bestSeason: "May to October",
    shortOverview:
      "Explore the remote and wild Dolpo region with its crystal Phoksundo Lake, ancient Bon Po culture, and dramatic Himalayan landscapes featured in the award-winning film 'Caravan'.",
    fullOverview: {
      intro:
        "The Lower Dolpo Trek is one of Nepal's most remote and rewarding journeys, taking you deep into a landscape that seems untouched by time. The stunning Phoksundo Lake, with its turquoise-blue waters, is the highlight of this extraordinary trek.",
      geography:
        "Located in the northwest of Nepal bordering Tibet, Dolpo sits in the rain shadow of the Dhaulagiri and Kanjiroba ranges, creating a dramatic high-altitude landscape.",
      culture:
        "Dolpo preserves the ancient Bon Po religion, the pre-Buddhist faith of Tibet, alongside Tibetan Buddhism. The lifestyle here has changed little over centuries.",
      specialPlaces:
        "Phoksundo Lake, Phoksundo Waterfall, Ringmo village, Shey Phoksundo National Park, ancient Bon monasteries, and yak caravans.",
      bestTime:
        "May to October when the region is accessible. The rest of the year, high passes are snow-blocked.",
      permits:
        "Lower Dolpo Restricted Area Permit (USD 10/day) and Shey Phoksundo National Park permit included.",
      conservation:
        "Protected within Shey Phoksundo National Park, Nepal's largest national park.",
    },
    highlights: [
      "Stunning Phoksundo Lake with its turquoise waters",
      "Ancient Bon Po monasteries and culture",
      "Nepal's largest national park - Shey Phoksundo",
      "Remote and wild landscape with few tourists",
      "Dramatic Phoksundo Waterfall (167m)",
      "Authentic yak caravan encounters",
      "Film location of 'Caravan' (1999)",
    ],
    itinerary: [
      { day: 1, title: "Fly Nepalgunj to Juphal, Trek to Dunai", desc: "Early flight to Nepalgunj, connect to Juphal (2,475m). Trek to Dunai, district headquarters. 3-4 hours." },
      { day: 2, title: "Dunai to Tarakot", desc: "Trek through Bheri River valley to Tarakot. 6-7 hours." },
      { day: 3, title: "Tarakot to Laina Odar", desc: "Continue through remote villages. 6-7 hours." },
      { day: 4, title: "Laina Odar to Chhepka", desc: "Enter Shey Phoksundo National Park. 5-6 hours." },
      { day: 5, title: "Chhepka to Phoksundo Lake (Ringmo)", desc: "Arrive at the stunning Phoksundo Lake and Ringmo village (3,660m). 6-7 hours. Afternoon explore village." },
      { day: 6, title: "Ringmo Rest Day", desc: "Explore Phoksundo Lake shores, visit ancient monastery, and waterfall. Full day rest and acclimatization." },
      { day: 7, title: "Ringmo to Phoksundo Khola", desc: "Trek above the lake through dramatic landscapes. 5-6 hours." },
      { day: 8, title: "Phoksundo Khola to Shey Gompa direction", desc: "Continue deeper into Dolpo toward high passes. 6-7 hours." },
      { day: 9, title: "High Pass Crossing (5,360m)", desc: "Cross the highest pass of the trek with panoramic Himalayan views. 8-9 hours." },
      { day: 10, title: "Descent and Camp", desc: "Long descent into the valley below. 7-8 hours." },
      { day: 11, title: "Valley Trek", desc: "Trek through remote valley with ancient villages. 6-7 hours." },
      { day: 12, title: "Return Route Begins", desc: "Start return journey through different valleys. 6-7 hours." },
      { day: 13, title: "Trek Back", desc: "Continue return through diverse landscape. 6-7 hours." },
      { day: 14, title: "Trek Back", desc: "Continue return toward Phoksundo area. 6-7 hours." },
      { day: 15, title: "Ringmo to Chhepka", desc: "Pass Phoksundo Lake one last time. 5-6 hours." },
      { day: 16, title: "Chhepka to Dunai", desc: "Final descent to Dunai. 7-8 hours." },
      { day: 17, title: "Fly Juphal to Nepalgunj to Kathmandu", desc: "Drive to Juphal, fly to Nepalgunj, connect to Kathmandu. Full day travel." },
      { day: 18, title: "Departure", desc: "Rest or depart from Kathmandu." },
    ],
    included: [
      "Kathmandu-Nepalgunj-Juphal-Nepalgunj-Kathmandu flights",
      "Restricted Area Permit",
      "National Park entry fees",
      "TIMS card",
      "All camping/lodge accommodation",
      "All meals",
      "Experienced guide and porter",
      "Camping equipment",
      "First aid and emergency kit",
    ],
    excluded: [
      "Hotel in Kathmandu/Nepalgunj",
      "Travel insurance (mandatory)",
      "Personal gear",
      "Tips",
      "Emergency evacuation",
    ],
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=1200&q=80",
    ],
    status: "published",
    rating: 4.8,
    reviewsCount: 42,
  },
];

async function seedTreks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Load all regions into a lookup map  { "Everest Region Trekking" -> ObjectId }
    const regions = await Region.find({});
    const regionMap = {};
    regions.forEach((r) => {
      regionMap[r.name] = r._id;
    });
    console.log(`📍 Found ${regions.length} regions in DB`);

    // Delete existing treks
    const deleteResult = await TourPackage.deleteMany({ category: "trek" });
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing trek packages`);

    // Attach region _id and remove temporary regionKey field
    const treksWithRegion = treks.map((t) => {
      const { regionKey, ...rest } = t;
      const regionId = regionMap[regionKey];
      if (regionId) {
        return { ...rest, region: regionId };
      }
      console.warn(`⚠️  No region found for key: "${regionKey}" — inserting without region`);
      return rest;
    });

    const inserted = await TourPackage.insertMany(treksWithRegion);
    console.log(`✅ Successfully seeded ${inserted.length} trek packages\n`);
    console.log("📦 Seeded Treks:");
    inserted.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.title} | $${t.price} | ${t.durationDays}d | ${t.difficulty} | region: ${t.region || "none"}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding treks:", error);
    process.exit(1);
  }
}

seedTreks();
