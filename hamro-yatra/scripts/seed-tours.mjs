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

const tours = [
  {
    title: "Pokhara to Ghandruk Tour",
    slug: "pokhara-to-ghandruk-tour",
    category: "tour",
    location: "Ghandruk, Kaski, Nepal",
    difficulty: "Easy",
    durationDays: 2,
    durationText: "1 Night 2 Days",
    price: 4500,
    maxAltitude: "1,940 m",
    bestSeason: "All Year",
    shortOverview:
      "Ghandruk is a charming Gurung village set against the Annapurna and Machhapuchhre ranges. Enjoy the classic culture, stone-paved streets and stunning mountain sunrise on this 1 night 2 days short trip from Pokhara.",
    highlights: [
      "Gurung traditional village and museum",
      "Panoramic views of Annapurna South & Machhapuchhre",
      "Local homestay and warm hospitality",
      "Easy 1-2 hours drive from Pokhara",
    ],
    itinerary: [
      {
        day: 1,
        title: "Pokhara to Ghandruk",
        desc: "Drive towards Ghandruk, explore the classic Gurung village, visit the museum and enjoy the sunset view over the Annapurna range. Overnight at a local homestay.",
      },
      {
        day: 2,
        title: "Sunrise view and drive back",
        desc: "Wake up early to catch the golden sunrise on Machhapuchhre, have breakfast and drive back to Pokhara, arriving by afternoon.",
      },
    ],
    included: [
      "Private vehicle with driver",
      "1 night homestay accommodation",
      "Breakfast and dinner",
      "Local guide service",
    ],
    excluded: [
      "Personal expenses",
      "Travel insurance",
      "Any meals not mentioned",
    ],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    ],
    status: "published",
    sortOrder: 1,
  },
  {
    title: "Pokhara to Sikles Tour",
    slug: "pokhara-to-sikles-tour",
    category: "tour",
    location: "Sikles, Kaski, Nepal",
    difficulty: "Easy",
    durationDays: 2,
    durationText: "1 Night 2 Days",
    price: 4500,
    maxAltitude: "1,980 m",
    bestSeason: "All Year",
    shortOverview:
      "Sikles is a beautiful Gurung village above Phewa Lake, known for its Swiss-style settlement, quiet trails and huge views of the Annapurna range. Perfect escape from Pokhara for one night.",
    highlights: [
      "Authentic Gurung village with Swiss influence",
      "Close-up views of Annapurna II, Lamjung Himal & Machhapuchhre",
      "Short gentle hike through rhododendron forest",
      "Peaceful community homestay",
    ],
    itinerary: [
      {
        day: 1,
        title: "Pokhara to Sikles",
        desc: "Drive to Sikles, check in at the community homestay and take a short walk around the village to enjoy the late afternoon mountain views.",
      },
      {
        day: 2,
        title: "Village hike and drive back",
        desc: "Enjoy a morning walk on the village trails, breakfast and drive back to Pokhara with beautiful valley views on the way.",
      },
    ],
    included: [
      "Private vehicle with driver",
      "1 night homestay accommodation",
      "Breakfast and dinner",
      "Local guide service",
    ],
    excluded: [
      "Personal expenses",
      "Travel insurance",
      "Any meals not mentioned",
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
    ],
    status: "published",
    sortOrder: 2,
  },
  {
    title: "Pokhara to Dhorpatan Tour",
    slug: "pokhara-to-dhorpatan-tour",
    category: "tour",
    location: "Dhorpatan, Baglung, Nepal",
    difficulty: "Moderate",
    durationDays: 2,
    durationText: "1 Night 2 Days",
    price: 6000,
    maxAltitude: "2,850 m",
    bestSeason: "March - June, Sep - Nov",
    shortOverview:
      "Dhorpatan is Nepal's only hunting reserve and a vast highland valley surrounded by Dhaulagiri peaks. A unique short getaway with wide meadows, wildlife sightings and dramatic mountain views.",
    highlights: [
      "Nepal's only hunting reserve, Dhorpatan",
      "Wide open meadows with grazing yak herds",
      "Views of Dhaulagiri and surrounding peaks",
      "A chance to spot blue sheep and wildlife",
    ],
    itinerary: [
      {
        day: 1,
        title: "Pokhara to Dhorpatan",
        desc: "Drive up into the Dhaulagiri region to Dhorpatan valley, passing rhododendron forests and mountain villages. Enjoy the evening over the open meadows.",
      },
      {
        day: 2,
        title: "Valley morning and drive back",
        desc: "Spend the morning exploring the valley and spotting wildlife, then drive back to Pokhara by evening.",
      },
    ],
    included: [
      "Private jeep vehicle with driver",
      "1 night guesthouse accommodation",
      "Breakfast and dinner",
      "Local guide service",
    ],
    excluded: [
      "Personal expenses",
      "Travel insurance",
      "Any meals not mentioned",
    ],
    images: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200",
    ],
    status: "published",
    sortOrder: 3,
  },
  {
    title: "Upper Mustang Tour",
    slug: "upper-mustang-tour",
    category: "tour",
    location: "Upper Mustang, Nepali, Nepal",
    difficulty: "Moderate",
    durationDays: 5,
    durationText: "3 Nights 4 Days",
    price: 13000,
    maxAltitude: "3,810 m",
    bestSeason: "March - Nov",
    shortOverview:
      "Upper Mustang takes you to the mysterious trans-Himalayan kingdom full of ancient monasteries, sky caves and the walled city of Lo Manthang. A once-in-a-lifetime journey beyond the Annapurnas.",
    highlights: [
      "The forbidden walled city of Lo Manthang",
      "Ancient monasteries & sky caves",
      "Dramatic Kaligandaki gorge views",
      "Unique Tibetan Buddhist culture",
    ],
    itinerary: [
      {
        day: 1,
        title: "Pokhara to Jomsom",
        desc: "Drive or fly to Jomsom and start the journey into Upper Mustang, exploring the villages along the Kali Gandaki valley.",
      },
      {
        day: 2,
        title: "Jomsom to Lo Manthang gateway",
        desc: "Travel through Tsaile, Ghami and Samar, passing chortens, mani walls and cave settlements towards the old kingdom.",
      },
      {
        day: 3,
        title: "Lo Manthang exploration",
        desc: "Explore the walled city of Lo Manthang, the royal palace and the most important monasteries in the Mustang kingdom.",
      },
      {
        day: 4,
        title: "Lo Manthang to Jomsom",
        desc: "Return journey through the high windy plateau and canyon villages back to Jomsom.",
      },
      {
        day: 5,
        title: "Jomsom to Pokhara",
        desc: "Fly or drive back to Pokhara, ending the Upper Mustang journey.",
      },
    ],
    included: [
      "Private vehicle with driver",
      "3 nights lodges/teahouses",
      "Breakfast and dinner",
      "Local guide and permits support",
    ],
    excluded: [
      "Upper Mustang special permit fee",
      "Airfare if flying",
      "Personal expenses",
      "Travel insurance",
    ],
    images: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200",
    ],
    status: "published",
    sortOrder: 4,
  },
];

async function main() {
  const uri = MONGO_URI.replace(" ", "");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
  const db = mongoose.connection.db;
  console.log("Connected to MongoDB.");

  const col = db.collection("tourpackages");
  let created = 0;
  let updated = 0;

  for (const tour of tours) {
    const { createdAt, ...rest } = tour;
    const doc = {
      ...rest,
      rating: 0,
      reviewsCount: 0,
      updatedAt: new Date(),
    };
    const result = await col.updateOne(
      { slug: tour.slug },
      { $set: doc, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );
    if (result.upsertedCount > 0) created += 1;
    else if (result.modifiedCount > 0) updated += 1;
    else updated += 1;
    console.log(`- ${tour.title}: Rs ${tour.price} (${tour.durationText})`);
  }

  console.log(`Tours seeded: ${created} created, ${updated} updated.`);
  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});