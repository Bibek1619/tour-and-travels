import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const vars = {};
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m) vars[m[1]] = m[2].trim();
  }
  return vars;
}

const env = loadEnv(path.resolve(process.cwd(), ".env"));
const MONGO_URI = process.env.MONGO_URI || env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not found. Add it to .env or set the env variable.");
  process.exit(1);
}

const treks = [
  {
    title: "Annapurna Base Camp Trek - 4 Days",
    slug: "annapurna-base-camp-trek-4-days",
    category: "trek",
    location: "Annapurna Region, Kaski, Nepal",
    difficulty: "Challenging",
    durationDays: 4,
    durationText: "4 Days",
    price: 384, // USD
    maxAltitude: "4,130 m",
    bestSeason: "March - May, Sep - Nov",
    shortOverview:
      "Experience the fastest route to Annapurna Base Camp with this express 4-day trek. Perfect for travelers with limited time who want to reach the spectacular Annapurna Sanctuary at 4,130m. This challenging but rewarding trek takes you through bamboo forests, traditional villages, and directly into the heart of the Annapurna amphitheater.",
    highlights: [
      "Fastest route to Annapurna Base Camp (4,130 m)",
      "360° mountain panorama from the Annapurna Sanctuary",
      "Close-up views of Annapurna I, Machhapuchhre, and Hiunchuli",
      "Perfect for travelers with limited time",
      "Trek through bamboo forests and alpine landscapes",
      "Experience sunrise at Annapurna Base Camp",
      "Budget-friendly express trekking option",
      "No acclimatization days - fast-paced adventure",
    ],
    itinerary: [
      {
        day: 1,
        title: "Drive from Pokhara to Jhinu Danda (1,760 m) & Trek to Bamboo (2,310 m)",
        desc: "Early morning drive from Pokhara to Jhinu Danda (2-3 hours). Begin trekking through terraced fields and cross the Modi Khola on a suspension bridge. Climb steadily through rhododendron forest, pass through Chhomrong village (2,170 m), and descend to cross the Chhomrong Khola. Continue ascending through dense bamboo and rhododendron forest to reach Bamboo village. First day involves significant elevation gain. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 2,
        title: "Bamboo to Machhapuchhre Base Camp (3,700 m)",
        desc: "Trek deeper into the Annapurna Sanctuary. Pass through Dovan (2,600 m) and Himalaya Hotel (2,920 m). The trail enters the restricted conservation area with stunning mountain views emerging. Continue through Hinku Cave and Deurali (3,200 m). The landscape becomes more alpine as you gain altitude. Reach Machhapuchhre Base Camp with spectacular views of the sacred Fishtail Mountain's south face. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 3,
        title: "MBC to Annapurna Base Camp (4,130 m) & Return to Dovan (2,600 m)",
        desc: "Early morning trek to Annapurna Base Camp (2 hours). Enter the magnificent amphitheater surrounded by Annapurna I (8,091 m), Annapurna South, Hiunchuli, Gangapurna, and Machhapuchhre. Witness the incredible 360° panorama and sunrise over the peaks. Spend time exploring and taking photos at base camp. After lunch, begin the descent back through MBC to Dovan. Long but rewarding day. Trek time: 7-8 hours total. Overnight at teahouse in Dovan.",
      },
      {
        day: 4,
        title: "Dovan to Jhinu Danda (1,760 m) & Drive to Pokhara (820 m)",
        desc: "Final day of trekking. Descend through bamboo forests to Bamboo, then continue down to Chhomrong. Cross the suspension bridge and climb to Jhinu Danda. Optional visit to natural hot springs (20 minutes from village) to relax tired muscles. Meet your vehicle and drive back to Pokhara (1.5-2 hours). Arrive in Pokhara by late afternoon. Trek time: 5-6 hours. Overnight in Pokhara or onward journey.",
      },
    ],
    included: [
      "Private vehicle Pokhara-Jhinu Danda-Pokhara",
      "Teahouse accommodation during trek (3 nights)",
      "Three meals a day during trek (breakfast, lunch, dinner)",
      "Experienced English-speaking trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "Annapurna Conservation Area Permit (ACAP)",
      "TIMS Card",
      "Government taxes and official expenses",
      "First aid medical kit",
    ],
    excluded: [
      "Hotel in Pokhara before and after trek",
      "Meals in Pokhara",
      "International flights to Nepal",
      "Nepal visa fee",
      "Travel insurance (mandatory)",
      "Personal trekking equipment and clothing",
      "Hot showers, WiFi, battery charging during trek (NPR 200-500 per use)",
      "Alcoholic beverages and bottled drinks",
      "Tips for guide and porter",
      "Personal expenses and emergency costs",
      "Hot spring entrance fee at Jhinu (NPR 100)",
    ],
    images: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200",
    ],
    status: "published",
    sortOrder: 0,
  },
  {
    title: "Everest Base Camp Trek",
    slug: "everest-base-camp-trek",
    category: "trek",
    location: "Khumbu, Solukhumbu, Nepal",
    difficulty: "Challenging",
    durationDays: 14,
    durationText: "14 Days",
    price: 1076, // USD
    maxAltitude: "5,364 m",
    bestSeason: "March - May, Sep - Nov",
    shortOverview:
      "The Everest Base Camp Trek is a legendary journey to the foot of the world's highest mountain. Trek through Sherpa villages, ancient monasteries, and breathtaking Himalayan landscapes to reach the base of Mount Everest at 5,364 meters.",
    highlights: [
      "Stand at Everest Base Camp (5,364 m)",
      "Sunrise view from Kala Patthar (5,545 m)",
      "Visit Tengboche Monastery, the spiritual heart of Khumbu",
      "Experience authentic Sherpa culture and hospitality",
      "Panoramic views of Everest, Lhotse, Nuptse, and Ama Dablam",
      "Fly into the world's most dangerous airport - Lukla",
      "Trek through Sagarmatha National Park (UNESCO World Heritage)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu (1,400 m)",
        desc: "Arrive at Tribhuvan International Airport. Transfer to your hotel. Pre-trek briefing with your guide and gear check. Overnight in Kathmandu.",
      },
      {
        day: 2,
        title: "Fly to Lukla (2,840 m) & Trek to Phakding (2,610 m)",
        desc: "Early morning scenic flight to Lukla (35 minutes). Begin trek descending through pine forests to Phakding village along the Dudh Koshi River. Trek time: 3-4 hours. Overnight at teahouse.",
      },
      {
        day: 3,
        title: "Phakding to Namche Bazaar (3,440 m)",
        desc: "Cross suspension bridges decorated with prayer flags. Enter Sagarmatha National Park. Steep climb to Namche Bazaar, the Sherpa capital with stunning mountain views. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 4,
        title: "Acclimatization Day in Namche Bazaar",
        desc: "Rest day for acclimatization. Optional hike to Everest View Hotel (3,880 m) for panoramic views of Everest, Lhotse, and Ama Dablam. Explore Namche's markets, bakeries, and Sherpa Culture Museum. Overnight at teahouse.",
      },
      {
        day: 5,
        title: "Namche Bazaar to Tengboche (3,860 m)",
        desc: "Trek through rhododendron and pine forests with spectacular views. Visit the famous Tengboche Monastery, the largest in the Khumbu region. Evening prayer ceremony (if timing permits). Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 6,
        title: "Tengboche to Dingboche (4,410 m)",
        desc: "Descend to Debuche, cross the Imja River, and climb to Pangboche. Continue through alpine meadows to Dingboche with stunning views of Island Peak and Lhotse. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 7,
        title: "Acclimatization Day in Dingboche",
        desc: "Second acclimatization day. Optional hike to Nagarjun Hill (5,100 m) for breathtaking 360° views of Makalu, Lhotse, and Ama Dablam. Rest and prepare for higher altitudes. Overnight at teahouse.",
      },
      {
        day: 8,
        title: "Dingboche to Lobuche (4,910 m)",
        desc: "Trek along the lateral moraine of the Khumbu Glacier. Pass memorials to climbers at Thukla Pass. Reach Lobuche with close-up views of Nuptse and Pumori. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 9,
        title: "Lobuche to Gorak Shep (5,140 m) & Everest Base Camp (5,364 m)",
        desc: "Trek to Gorak Shep, the last settlement before Base Camp. Drop your bags and continue to Everest Base Camp on the Khumbu Glacier. Return to Gorak Shep for the night. Trek time: 7-8 hours. Overnight at teahouse.",
      },
      {
        day: 10,
        title: "Gorak Shep to Kala Patthar (5,545 m) & Descend to Pheriche (4,240 m)",
        desc: "Pre-dawn hike to Kala Patthar for the best sunrise view of Mount Everest and surrounding peaks. Descend to Gorak Shep for breakfast, then continue down to Pheriche. Trek time: 7-8 hours. Overnight at teahouse.",
      },
      {
        day: 11,
        title: "Pheriche to Namche Bazaar (3,440 m)",
        desc: "Long descent through Pangboche and Tengboche, crossing bridges and forests. Return to Namche Bazaar, celebrating your achievement. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 12,
        title: "Namche Bazaar to Lukla (2,840 m)",
        desc: "Final day of trekking, descending through Phakding and along the Dudh Koshi River back to Lukla. Celebrate with your team in the evening. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 13,
        title: "Fly from Lukla to Kathmandu",
        desc: "Morning flight back to Kathmandu (weather permitting). Transfer to hotel. Free time for shopping, rest, or exploring Thamel. Farewell dinner in the evening. Overnight in Kathmandu.",
      },
      {
        day: 14,
        title: "Final Departure",
        desc: "Transfer to Tribhuvan International Airport for your departure flight. End of the Everest Base Camp Trek adventure.",
      },
    ],
    included: [
      "Airport transfers in Kathmandu",
      "Domestic flights (Kathmandu-Lukla-Kathmandu)",
      "All accommodation during trek (teahouse)",
      "Three meals a day during trek (breakfast, lunch, dinner)",
      "Experienced English-speaking trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "All necessary permits (Sagarmatha National Park, TIMS)",
      "Government taxes and official expenses",
      "First aid medical kit",
      "Farewell dinner in Kathmandu",
    ],
    excluded: [
      "International airfare",
      "Nepal visa fee (USD 30 for 15 days, USD 50 for 30 days)",
      "Hotel accommodation in Kathmandu",
      "Meals in Kathmandu",
      "Personal trekking equipment",
      "Travel insurance (required)",
      "Emergency evacuation costs",
      "Hot showers, battery charging, WiFi during trek",
      "Alcoholic beverages and bottled drinks",
      "Personal expenses and tips",
    ],
    images: [
      "https://images.unsplash.com/photo-1608139726404-ef2fbd0c0ddc?w=1200",
    ],
    status: "published",
    sortOrder: 1,
  },
  {
    title: "Annapurna Base Camp Trek",
    slug: "annapurna-base-camp-trek",
    category: "trek",
    location: "Annapurna Region, Kaski, Nepal",
    difficulty: "Moderate",
    durationDays: 13,
    durationText: "13 Days",
    price: 768, // USD
    maxAltitude: "4,130 m",
    bestSeason: "March - May, Sep - Nov",
    shortOverview:
      "The Annapurna Base Camp Trek takes you into the heart of the Annapurna Sanctuary, surrounded by towering peaks including Annapurna I (8,091 m) and the iconic Machhapuchhre (Fishtail Mountain). Experience diverse landscapes from subtropical forests to high alpine terrain.",
    highlights: [
      "Reach Annapurna Base Camp at 4,130 m",
      "Sunrise at Poon Hill (3,210 m) with 360° mountain panorama",
      "Close-up views of Annapurna I, Machhapuchhre, and Hiunchuli",
      "Trek through diverse landscapes and climatic zones",
      "Experience Gurung and Magar culture in traditional villages",
      "Natural hot springs at Jhinu Danda",
      "Rhododendron forests (spectacular in spring)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kathmandu (1,400 m)",
        desc: "Arrive at Tribhuvan International Airport. Meet your guide and transfer to hotel. Trek briefing and preparation. Overnight in Kathmandu.",
      },
      {
        day: 2,
        title: "Drive to Pokhara (820 m) by Tourist Bus",
        desc: "Scenic 6-7 hour drive along the Prithvi Highway. Pass through villages, rivers, and terraced hillsides. Arrive in Pokhara, the gateway to the Annapurnas. Overnight in Pokhara.",
      },
      {
        day: 3,
        title: "Drive to Birethanti (1,025 m) and Trek to Ulleri (2,050 m)",
        desc: "1.5 hour drive to Birethanti. Begin trekking through villages and terraced fields. Steep stone staircase climb (over 3,000 steps) to Ulleri, a beautiful Magar village. Trek time: 4-5 hours. Overnight at teahouse.",
      },
      {
        day: 4,
        title: "Ulleri to Ghorepani (2,860 m)",
        desc: "Climb through rhododendron and oak forests. Pass through Banthanti and Nangethanti. Arrive at Ghorepani with views of Dhaulagiri and Annapurna South. Trek time: 4-5 hours. Overnight at teahouse.",
      },
      {
        day: 5,
        title: "Early Morning Hike to Poon Hill (3,210 m) & Trek to Chuile (2,890 m)",
        desc: "Pre-dawn hike to Poon Hill for spectacular sunrise over Dhaulagiri, Annapurna, and Machhapuchhre ranges. Return to Ghorepani for breakfast, then trek to Chuile through forests and meadows. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 6,
        title: "Chuile to Sinuwa (2,340 m)",
        desc: "Descend through dense forest to Chhomrong, a large Gurung village on the hillside. Cross the Chhomrong Khola and climb to Sinuwa. First views of Machhapuchhre's south face. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 7,
        title: "Sinuwa to Deurali (3,200 m)",
        desc: "Trek through bamboo and rhododendron forests. Pass Bamboo village and climb through the Hinku Cave area. Reach Deurali with improved mountain views. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 8,
        title: "Deurali to Annapurna Base Camp (4,130 m) via Machhapuchhre Base Camp",
        desc: "Trek to Machhapuchhre Base Camp (3,700 m) with stunning views of the sacred mountain's south face. Continue to Annapurna Base Camp, surrounded by a 360° amphitheater of massive peaks. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 9,
        title: "Annapurna Base Camp to Bamboo (2,310 m)",
        desc: "Watch sunrise over Annapurna I and the surrounding peaks. Descend back through Machhapuchhre Base Camp and Deurali to Bamboo. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 10,
        title: "Bamboo to Jhinu Danda (1,760 m)",
        desc: "Continue descending through forest to Chhomrong, then down to Jhinu Danda. Optional visit to natural hot springs (20-minute walk from village) to relax tired muscles. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 11,
        title: "Jhinu Danda to Syauli Bazaar and Drive to Pokhara",
        desc: "Trek downhill to Syauli Bazaar through terraced fields and villages. Meet your vehicle and drive back to Pokhara (1.5 hours). Celebrate with the team. Trek time: 3-4 hours. Overnight in Pokhara.",
      },
      {
        day: 12,
        title: "Drive Back to Kathmandu",
        desc: "Tourist bus journey back to Kathmandu (6-7 hours). Free time in the evening for shopping or relaxation. Farewell dinner. Overnight in Kathmandu.",
      },
      {
        day: 13,
        title: "Final Departure",
        desc: "Transfer to airport for your departure flight. End of Annapurna Base Camp Trek.",
      },
    ],
    included: [
      "Airport and hotel transfers",
      "Tourist bus Kathmandu-Pokhara-Kathmandu",
      "Private vehicle Pokhara-Birethanti-Pokhara",
      "All accommodation during trek (teahouse)",
      "Three meals a day during trek",
      "Experienced trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "Annapurna Conservation Area Permit (ACAP)",
      "TIMS Card",
      "Government taxes",
      "First aid kit",
      "Farewell dinner",
    ],
    excluded: [
      "International flights",
      "Nepal visa fee",
      "Hotel in Kathmandu and Pokhara",
      "Meals in Kathmandu and Pokhara",
      "Travel insurance",
      "Personal equipment",
      "Hot showers, WiFi, battery charging on trek",
      "Alcoholic drinks and beverages",
      "Tips and personal expenses",
    ],
    images: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200",
    ],
    status: "published",
    sortOrder: 2,
  },
  {
    title: "Manaslu Circuit Trek",
    slug: "manaslu-circuit-trek",
    category: "trek",
    location: "Manaslu Region, Gorkha, Nepal",
    difficulty: "Challenging",
    durationDays: 15,
    durationText: "15 Days",
    price: 999, // USD
    maxAltitude: "5,106 m",
    bestSeason: "March - May, Sep - Nov",
    shortOverview:
      "The Manaslu Circuit Trek is an off-the-beaten-path adventure around the world's eighth highest mountain, Mt. Manaslu (8,163 m). This restricted area trek offers pristine mountain scenery, Tibetan Buddhist culture, and the challenge of crossing the Larkya La Pass at 5,106 meters.",
    highlights: [
      "Cross the spectacular Larkya La Pass (5,106 m)",
      "Trek around Mt. Manaslu, the 8th highest mountain (8,163 m)",
      "Experience authentic Tibetan Buddhist culture",
      "Visit ancient monasteries and prayer wheels",
      "Less crowded alternative to Annapurna Circuit",
      "Diverse landscapes from subtropical to alpine",
      "Views of Manaslu, Ganesh Himal, and Annapurna ranges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu (1,400 m)",
        desc: "Airport pickup and hotel transfer. Trek briefing and permit preparation. Overnight in Kathmandu.",
      },
      {
        day: 2,
        title: "Drive to Soti Khola (710 m)",
        desc: "8-9 hour scenic drive along the Prithvi Highway and through Dhading district. Pass Arughat Bazaar and reach Soti Khola on the banks of the Budhi Gandaki River. Overnight at teahouse.",
      },
      {
        day: 3,
        title: "Soti Khola to Machha Khola (930 m)",
        desc: "Trek along the Budhi Gandaki gorge. Cross suspension bridges and pass through Gurung villages. Rocky trail with ups and downs. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 4,
        title: "Machha Khola to Jagat (1,410 m)",
        desc: "Continue following the river through narrow gorges. Cross several suspension bridges. Pass Tatopani (hot springs) and climb to Jagat. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 5,
        title: "Jagat to Deng (1,860 m)",
        desc: "Enter the Manaslu Conservation Area. Trek through forests and past waterfalls. Pass through Tibetan-style villages of Philim and Ekle Bhatti. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 6,
        title: "Deng to Namrung (2,660 m)",
        desc: "Climb through forests and cross the Budhi Gandaki several times. Pass Ghap and reach Namrung with first clear views of Manaslu. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 7,
        title: "Namrung to Samagaun (3,530 m)",
        desc: "Trek through Lho village with its beautiful monastery. Stunning views of Manaslu North Face. Reach Samagaun, a large Tibetan village. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 8,
        title: "Acclimatization Day in Samagaun",
        desc: "Rest day for altitude acclimatization. Optional hike to Manaslu Base Camp or Pungyen Gompa. Explore Samagaun village and its monastery. Overnight at teahouse.",
      },
      {
        day: 9,
        title: "Samagaun to Samdo (3,860 m)",
        desc: "Short trekking day for better acclimatization. Cross a wooden bridge and climb gradually. Samdo is the last village near the Tibetan border. Trek time: 3-4 hours. Overnight at teahouse.",
      },
      {
        day: 10,
        title: "Samdo to Dharmasala / Larkya Phedi (4,460 m)",
        desc: "Gradual climb to the base camp before the pass. Also known as Larkya Phedi (foot of the pass). Prepare for early start next morning. Trek time: 4-5 hours. Overnight at basic teahouse.",
      },
      {
        day: 11,
        title: "Cross Larkya La Pass (5,106 m) to Bimthang (3,720 m)",
        desc: "Challenging day crossing the Larkya La Pass. Pre-dawn start for the long climb. Spectacular 360° views from the pass. Steep descent to Bimthang with views of Manaslu, Himlung Himal, and Cheo Himal. Trek time: 8-9 hours. Overnight at teahouse.",
      },
      {
        day: 12,
        title: "Bimthang to Tilije (2,300 m)",
        desc: "Descend through alpine meadows and rhododendron forests. Pass Sangure Kharka and Karche. Reach Tilije, a traditional village. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 13,
        title: "Tilije to Dharapani (1,860 m) and Drive to Besisahar",
        desc: "Trek through pine forests to Dharapani, where the Manaslu Circuit meets the Annapurna Circuit trail. Drive to Besisahar by jeep (2-3 hours). Trek time: 4-5 hours. Overnight at guesthouse.",
      },
      {
        day: 14,
        title: "Drive to Kathmandu",
        desc: "Long drive back to Kathmandu via Dumre and Mugling (7-8 hours). Farewell dinner with the team. Overnight in Kathmandu.",
      },
      {
        day: 15,
        title: "Final Departure",
        desc: "Airport transfer for your departure flight. End of Manaslu Circuit Trek.",
      },
    ],
    included: [
      "Airport transfers",
      "All ground transportation (bus and jeep)",
      "Teahouse accommodation during trek",
      "Three meals a day during trek",
      "Experienced trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "Manaslu Restricted Area Permit",
      "Manaslu Conservation Area Permit (MCAP)",
      "Annapurna Conservation Area Permit (ACAP)",
      "TIMS Card",
      "Government taxes",
      "First aid kit",
      "Farewell dinner",
    ],
    excluded: [
      "International flights",
      "Nepal visa",
      "Hotel in Kathmandu",
      "Meals in Kathmandu",
      "Travel insurance (mandatory)",
      "Personal trekking gear",
      "Hot showers, WiFi, battery charging",
      "Alcoholic beverages",
      "Tips and personal expenses",
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
    ],
    status: "published",
    sortOrder: 3,
  },
  {
    title: "Langtang Valley Trek",
    slug: "langtang-valley-trek",
    category: "trek",
    location: "Langtang Region, Rasuwa, Nepal",
    difficulty: "Moderate",
    durationDays: 10,
    durationText: "10 Days",
    price: 461, // USD
    maxAltitude: "4,380 m",
    bestSeason: "March - May, Sep - Nov",
    shortOverview:
      "The Langtang Valley Trek is often called the 'Valley of Glaciers' and offers stunning mountain scenery close to Kathmandu. Trek through Tamang villages, dense forests, and high alpine landscapes with views of Langtang Lirung (7,227 m) and Tibetan-influenced culture.",
    highlights: [
      "Trek through Langtang National Park",
      "Stunning views of Langtang Lirung (7,227 m)",
      "Visit Kyanjin Gompa, an ancient Buddhist monastery",
      "Experience Tamang culture and hospitality",
      "Optional climb to Tserko Ri (4,984 m) or Kyanjin Ri (4,773 m)",
      "Close to Kathmandu (no flight required)",
      "Cheese factories and yak herding villages",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu (1,400 m)",
        desc: "Airport pickup and hotel transfer. Trek briefing and preparation. Overnight in Kathmandu.",
      },
      {
        day: 2,
        title: "Drive to Syabrubesi (1,550 m)",
        desc: "Scenic 7-8 hour drive north of Kathmandu. Pass through Trisuli Bazaar and along the Bhote Koshi River. Reach Syabrubesi, the trek starting point. Overnight at teahouse.",
      },
      {
        day: 3,
        title: "Syabrubesi to Lama Hotel (2,380 m)",
        desc: "Begin trekking through oak and rhododendron forests. Follow the Langtang Khola. Pass Bamboo and reach Lama Hotel. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 4,
        title: "Lama Hotel to Langtang Village (3,430 m)",
        desc: "Climb through forests with occasional glimpses of Langtang Lirung. Pass the devastated site of old Langtang village (2015 earthquake). Reach the rebuilt Langtang village. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 5,
        title: "Langtang Village to Kyanjin Gompa (3,870 m)",
        desc: "Trek through yak pastures and stone-walled fields. Pass a government cheese factory. Reach Kyanjin Gompa with spectacular mountain views. Visit the monastery. Trek time: 3-4 hours. Overnight at teahouse.",
      },
      {
        day: 6,
        title: "Acclimatization Day at Kyanjin Gompa",
        desc: "Optional hike to Tserko Ri (4,984 m) for panoramic views, or Kyanjin Ri (4,773 m) for a shorter option. Alternatively, visit Langtang Glacier. Rest and explore the area. Overnight at teahouse.",
      },
      {
        day: 7,
        title: "Kyanjin Gompa to Lama Hotel (2,380 m)",
        desc: "Retrace your steps back down the valley. Enjoy different perspectives of the mountains. Descend through forests to Lama Hotel. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 8,
        title: "Lama Hotel to Syabrubesi (1,550 m)",
        desc: "Continue descending through the forest. Cross suspension bridges and pass small settlements. Reach Syabrubesi and celebrate the trek completion. Trek time: 5-6 hours. Overnight at teahouse.",
      },
      {
        day: 9,
        title: "Drive Back to Kathmandu",
        desc: "7-8 hour drive back to Kathmandu. Free afternoon for shopping or rest. Farewell dinner in the evening. Overnight in Kathmandu.",
      },
      {
        day: 10,
        title: "Final Departure",
        desc: "Airport transfer for your departure flight. End of Langtang Valley Trek.",
      },
    ],
    included: [
      "Airport transfers",
      "Private vehicle Kathmandu-Syabrubesi-Kathmandu",
      "Teahouse accommodation during trek",
      "Three meals a day during trek",
      "Experienced trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "Langtang National Park Permit",
      "TIMS Card",
      "Government taxes",
      "First aid kit",
      "Farewell dinner",
    ],
    excluded: [
      "International flights",
      "Nepal visa",
      "Hotel in Kathmandu",
      "Meals in Kathmandu",
      "Travel insurance",
      "Personal trekking equipment",
      "Hot showers, WiFi, battery charging",
      "Alcoholic drinks",
      "Tips and personal expenses",
    ],
    images: [
      "https://images.unsplash.com/photo-1540390769625-2fc3f8b1d50f?w=1200",
    ],
    status: "published",
    sortOrder: 4,
  },
  {
    title: "Ghorepani Poon Hill Trek",
    slug: "ghorepani-poon-hill-trek",
    category: "trek",
    location: "Annapurna Region, Kaski, Nepal",
    difficulty: "Easy to Moderate",
    durationDays: 9,
    durationText: "9 Days",
    price: 538, // USD
    maxAltitude: "3,210 m",
    bestSeason: "All Year (Best: March - May, Sep - Nov)",
    shortOverview:
      "The Ghorepani Poon Hill Trek is Nepal's most popular short trek, perfect for beginners and families. Famous for its spectacular sunrise views from Poon Hill (3,210 m) over the Dhaulagiri and Annapurna ranges, this trek offers authentic Gurung culture and beautiful rhododendron forests.",
    highlights: [
      "Breathtaking sunrise from Poon Hill (3,210 m)",
      "Panoramic views of Dhaulagiri, Annapurna, and Machhapuchhre",
      "Trek through blooming rhododendron forests (spring)",
      "Experience Gurung and Magar village culture",
      "Visit Ghandruk, a beautiful traditional village",
      "Suitable for families and beginner trekkers",
      "No flight required - drive from Pokhara",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu (1,400 m)",
        desc: "Airport reception and hotel transfer. Trek orientation meeting. Overnight in Kathmandu.",
      },
      {
        day: 2,
        title: "Drive to Pokhara (820 m)",
        desc: "Scenic 6-7 hour tourist bus journey along the Prithvi Highway. Views of rivers, villages, and terraced hillsides. Arrive in Pokhara and relax by Phewa Lake. Overnight in Pokhara.",
      },
      {
        day: 3,
        title: "Drive to Tikhedhunga (1,540 m) and Trek to Ulleri (2,050 m)",
        desc: "1.5 hour drive to Nayapul, then continue to Tikhedhunga. Begin trekking, climbing the famous stone staircase (over 3,000 steps) to Ulleri, a traditional Magar village. Trek time: 4-5 hours. Overnight at teahouse.",
      },
      {
        day: 4,
        title: "Ulleri to Ghorepani (2,860 m)",
        desc: "Gradual climb through beautiful rhododendron and oak forests. Pass through Banthanti. Reach Ghorepani with views of Annapurna South and Nilgiri. Trek time: 4-5 hours. Overnight at teahouse.",
      },
      {
        day: 5,
        title: "Poon Hill Sunrise (3,210 m) & Trek to Tadapani (2,630 m)",
        desc: "Pre-dawn hike to Poon Hill for magnificent sunrise over Dhaulagiri, Annapurna I, Annapurna South, Machhapuchhre, and Nilgiri. Return to Ghorepani for breakfast, then trek through rhododendron forests to Tadapani. Trek time: 6-7 hours. Overnight at teahouse.",
      },
      {
        day: 6,
        title: "Tadapani to Ghandruk (1,940 m)",
        desc: "Descend through forests with excellent mountain views. Reach Ghandruk, the largest Gurung village in the region. Visit the Gurung Museum and explore traditional stone houses. Trek time: 3-4 hours. Overnight at teahouse.",
      },
      {
        day: 7,
        title: "Ghandruk to Nayapul and Drive to Pokhara",
        desc: "Trek downhill through terraced fields to Kimche, then to Nayapul. Meet your vehicle and drive back to Pokhara (1.5 hours). Celebrate with the team. Trek time: 4-5 hours. Overnight in Pokhara.",
      },
      {
        day: 8,
        title: "Drive Back to Kathmandu",
        desc: "Return journey to Kathmandu by tourist bus (6-7 hours). Free evening for shopping in Thamel. Farewell dinner. Overnight in Kathmandu.",
      },
      {
        day: 9,
        title: "Final Departure",
        desc: "Transfer to airport for your departure flight. End of Ghorepani Poon Hill Trek.",
      },
    ],
    included: [
      "Airport transfers",
      "Tourist bus Kathmandu-Pokhara-Kathmandu",
      "Private vehicle Pokhara-Nayapul-Pokhara",
      "Teahouse accommodation during trek",
      "Three meals a day during trek",
      "Experienced trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "Annapurna Conservation Area Permit (ACAP)",
      "TIMS Card",
      "Government taxes",
      "First aid kit",
      "Farewell dinner",
    ],
    excluded: [
      "International flights",
      "Nepal visa",
      "Hotel in Kathmandu and Pokhara",
      "Meals in Kathmandu and Pokhara",
      "Travel insurance",
      "Personal equipment",
      "Hot showers, WiFi, battery charging",
      "Alcoholic beverages",
      "Tips and personal expenses",
    ],
    images: [
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=1200",
    ],
    status: "published",
    sortOrder: 5,
  },
];

async function main() {
  const uri = MONGO_URI.replace(" ", "");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
  const db = mongoose.connection.db;
  console.log("Connected to MongoDB.");

  // Get region IDs
  const regions = await db.collection("regions").find().toArray();
  const regionMap = {};
  regions.forEach(r => {
    const keyword = r.name.toLowerCase();
    regionMap[keyword] = r._id;
  });
  
  console.log("Found regions:", Object.keys(regionMap).map(k => k.split(' ')[0]));

  const col = db.collection("tourpackages");
  let created = 0;
  let updated = 0;

  for (const trek of treks) {
    // Assign region based on trek location
    let regionId = null;
    if (trek.location.toLowerCase().includes('annapurna')) {
      regionId = regionMap['annapurna region trekking'];
    } else if (trek.location.toLowerCase().includes('everest') || trek.location.toLowerCase().includes('khumbu')) {
      regionId = regionMap['everest region trekking'];
    } else if (trek.location.toLowerCase().includes('langtang')) {
      regionId = regionMap['langtang region trekking'];
    } else if (trek.location.toLowerCase().includes('manaslu')) {
      regionId = regionMap['manaslu region trekking'];
    }
    
    const doc = {
      ...trek,
      region: regionId,
      rating: trek.rating || 0,
      reviewsCount: trek.reviewsCount || 0,
      updatedAt: new Date(),
    };
    const result = await col.updateOne(
      { slug: trek.slug },
      { $set: doc, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );
    if (result.upsertedCount > 0) created += 1;
    else if (result.modifiedCount > 0) updated += 1;
    const regionName = regionId ? regions.find(r => r._id.equals(regionId))?.name.split(' ')[0] : 'No region';
    console.log(`✓ ${trek.title}: NPR ${trek.price.toLocaleString()} (${trek.durationText}) [${regionName}]`);
  }

  console.log(`\n🏔️  Treks updated: ${created} created, ${updated} updated.`);
  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
