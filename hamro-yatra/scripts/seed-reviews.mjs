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
const MONGO_URI = (process.env.MONGO_URI || env.MONGO_URI || "").replace(" ", "");

if (!MONGO_URI) {
  console.error("MONGO_URI not found. Add it to .env or set the env variable.");
  process.exit(1);
}

const PER_ENTITY = parseInt(process.env.PER_ENTITY || "4", 10);
const FORCE_FEATURED = parseInt(
  process.env.FEATURED_LIMIT || "8",
  10
);

// ── Reviewer profiles (Nepali + foreign mix) ─────────────────────
const reviewers = [
  { name: "Ramesh Adhikari", location: "Kathmandu, Nepal", email: "ramesh.adhikari@gmail.com" },
  { name: "Emma Carter", location: "London, UK", email: "emma.carter@example.com" },
  { name: "Sunita Sharma", location: "Pokhara, Nepal", email: "sunita.sharma@gmail.com" },
  { name: "Liam O'Brien", location: "Sydney, Australia", email: "liam.obrien@example.com" },
  { name: "Bibek Thapa", location: "Biratnagar, Nepal", email: "bibek.thapa@gmail.com" },
  { name: "Sophie Müller", location: "Berlin, Germany", email: "sophie.mueller@example.com" },
  { name: "Anita Gurung", location: "Chitwan, Nepal", email: "anita.gurung@gmail.com" },
  { name: "Daniel Kim", location: "Singapore", email: "daniel.kim@example.com" },
  { name: "Prakash Subedi", location: "Butwal, Nepal", email: "prakash.subedi@gmail.com" },
  { name: "Hannah Schmidt", location: "Toronto, Canada", email: "hannah.schmidt@example.com" },
  { name: "Nabin Rai", location: "Dharan, Nepal", email: "nabin.rai@gmail.com" },
  { name: "Maya Evans", location: "New York, USA", email: "maya.evans@example.com" },
];

// ── Review templates per entity kind ──────────────────────────────
const tourTitles = [
  "Beautiful cultural experience",
  "Worth every rupee",
  "Well organized tour",
  "A perfect week in Nepal",
  "Great value and friendly team",
  "Highlight of our vacation",
];
const tourReviews = [
  "The itinerary was perfectly balanced — temples, culture and local food. Our guide explained every site with so much knowledge. Highly recommended!",
  "Everything was arranged exactly as promised. The team was warm, the vehicle comfortable and the sightseeing stress-free.",
  "We loved how the tour was customized for our family. Kids and elders both enjoyed every stop. Great hospitality throughout.",
  "A very well organized package. Pickups were on time, hotels were clean and the guide made us feel at home in Nepal.",
  "Honest pricing and no hidden costs. The cultural sites were stunning and the whole team was professional from start to finish.",
  "Wonderful experience! The guide went above and beyond to make our trip memorable. I would book with Hamro Yatra again.",
];

const trekTitles = [
  "Incredible trek, best guides",
  "Life-changing journey",
  "Well-paced and safe",
  "Perfect teahouse trek",
  "Amazing views, great team",
  "Our dream trek done right",
];
const trekReviews = [
  "The trek was incredible from start to finish. Our guide and porter were outstanding, and the teahouses were comfortable and clean.",
  "Amazing scenery at every step. The team managed altitude and pacing perfectly, and made sure we were always safe and well-fed.",
  "A life-changing adventure! The guide's knowledge of the trail, culture and weather was superb. Can't thank the team enough.",
  "Well-paced itinerary with proper acclimatization. We never felt rushed, and the sunrise views were absolutely worth it.",
  "Everything was taken care of — permits, tea houses, baggage. The support team was professional and genuinely caring.",
  "The best decision we made was booking this trek. Stunning mountains, warm people and a flawless operation from Hamro Yatra.",
];

const adventureTitles = [
  "Total adrenaline rush",
  "Thrilling and safe",
  "An unforgettable experience",
  "Best activity of our trip",
  "Professional and fun",
  "Definitely doing it again",
];
const adventureReviews = [
  "What an adrenaline rush! The instructors were professional, the equipment was top-notch, and the safety briefing was thorough.",
  "Perfect mix of thrill and fun. The team made us feel completely safe while still giving us an amazing experience.",
  "This was the highlight of our Nepal trip! Smooth booking, friendly staff and a breathtaking experience from start to finish.",
  "Professional operators with excellent safety standards. The rush was unreal and we felt in good hands the whole time.",
  "Great experience for first-timers. Clear instructions, quality gear and an energetic team. Highly recommended!",
  "We had so much fun we booked a second session! World-class facilities and a very welcoming crew.",
];

const vehicleTitles = [
  "Clean and comfortable ride",
  "Excellent driver service",
  "Reliable and punctual",
  "Perfect for our family",
  "Smooth mountain ride",
  "Great rental experience",
];
const vehicleReviews = [
  "The vehicle was spotless and comfortable, and our driver knew every road perfectly. Smooth journey through the mountains.",
  "Excellent service! The driver was courteous, punctual and very careful on the winding roads. Highly recommended.",
  "A reliable and well-maintained vehicle. Booking was easy and the pick-up was right on time. Will use again.",
  "Perfect vehicle for our family of six. Lots of space, clean interior and a very professional driver throughout.",
  "Great experience renting for our Pokhara trips. Fair pricing, good condition car and friendly support team.",
  "The driver made the long drives so comfortable. Safe, experienced and always smiling. Top quality service.",
];

const reviewByTitle = {
  tour: { titles: tourTitles, texts: tourReviews },
  trek: { titles: trekTitles, texts: trekReviews },
  adventure: { titles: adventureTitles, texts: adventureReviews },
  vehicle: { titles: vehicleTitles, texts: vehicleReviews },
};

// Distribution of ratings (mostly 4-5 with occasional 3)
const ratingPool = [5, 5, 4, 4, 5, 4, 3, 5];

function makeReview(kind, reviewerIdx, reviewIdx) {
  const pool = reviewByTitle[kind];
  const title = pool.titles[reviewIdx % pool.titles.length];
  const text = pool.texts[reviewIdx % pool.texts.length];
  const reviewer = reviewers[reviewerIdx % reviewers.length];
  return {
    name: reviewer.name,
    location: reviewer.location,
    email: reviewer.email,
    title,
    review: text,
    rating: ratingPool[reviewIdx % ratingPool.length],
    status: "approved",
    featuredOnHomepage: false,
  };
}

async function main() {
  const uri = MONGO_URI.replace(" ", "");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
  const db = mongoose.connection.db;
  console.log("Connected to MongoDB.");

  const [tours, vehicles, adventures] = await Promise.all([
    db.collection("tourpackages").find({}).toArray(),
    db.collection("vehicles").find({}).toArray(),
    db.collection("adventures").find({}).toArray(),
  ]);

  const reviewsCol = db.collection("reviews");
  const results = { tours: 0, treks: 0, vehicles: 0, adventures: 0 };
  let globalIdx = 0;
  const featuredIds = [];

  async function topUp(col, docs, kind, pushField, bucket) {
    if (!docs.length) return;
    for (let d = 0; d < docs.length; d++) {
      const doc = docs[d];
      const existing = await reviewsCol.countDocuments({
        [pushField]: doc._id,
        status: "approved",
      });
      const remaining = PER_ENTITY - existing;
      if (remaining <= 0) continue;
      const docsToCreate = Math.min(remaining, PER_ENTITY);
      for (let i = 0; i < docsToCreate; i++) {
        const review = makeReview(kind, globalIdx, globalIdx);
        const docReview = {
          ...review,
          [pushField]: doc._id,
          user: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        if (featuredIds.length < FORCE_FEATURED) {
          docReview.featuredOnHomepage = true;
          featuredIds.push(doc._id);
        }
        await reviewsCol.insertOne(docReview);
        globalIdx += 1;
      }
      results[bucket(doc)] = (results[bucket(doc)] || 0) + docsToCreate;
    }
  }

  await topUp(reviewsCol, tours, "tour", "tour", (doc) =>
    doc.category === "trek" ? "treks" : "tours"
  );
  await topUp(reviewsCol, adventures, "adventure", "adventure", () => "adventures");
  await topUp(reviewsCol, vehicles, "vehicle", "vehicle", () => "vehicles");

  console.log("Reviews created:", { tours: results.tours, treks: results.treks, adventures: results.adventures, vehicles: results.vehicles });

  // ── Recompute ratings & counts from actual approved reviews ────
  async function recomputeCollection(colName, countField) {
    const cursor = db.collection(colName).aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: colName === "vehicles" ? "vehicle" : colName === "adventures" ? "adventure" : "tour",
          as: "reviews",
        },
      },
      {
        $project: {
          _id: 1,
          count: {
            $size: {
              $filter: {
                input: "$reviews",
                as: "r",
                cond: { $eq: ["$$r.status", "approved"] },
              },
            },
          },
          avg: {
            $avg: {
              $map: {
                input: {
                  $filter: {
                    input: "$reviews",
                    as: "r",
                    cond: { $eq: ["$$r.status", "approved"] },
                  },
                },
                as: "r",
                in: "$$r.rating",
              },
            },
          },
        },
      },
    ]);
    const updates = [];
    for await (const row of cursor) {
      const rating = row.avg ? Math.round(row.avg * 10) / 10 : 0;
      updates.push(
        db.collection(colName).updateOne(
          { _id: row._id },
          { $set: { rating, [countField]: row.count } }
        )
      );
    }
    await Promise.all(updates);
    return updates.length;
  }

  const tourRec = await recomputeCollection("tourpackages", "reviewsCount");
  const vehicleRec = await recomputeCollection("vehicles", "totalReviews");
  const adventureRec = await recomputeCollection("adventures", "reviewsCount");
  console.log(
    `Ratings recomputed: tourpackages=${tourRec}, vehicles=${vehicleRec}, adventures=${adventureRec}`
  );

  // ── Distribute homepage features across entity kinds ───────────
  const groups = [
    { coll: "tourpackages", match: { category: { $ne: "trek" } }, field: "tour" },
    { coll: "tourpackages", match: { category: "trek" }, field: "tour" },
    { coll: "adventures", match: {}, field: "adventure" },
    { coll: "vehicles", match: {}, field: "vehicle" },
  ];
  let featuredCount = 0;
  for (const g of groups) {
    if (featuredCount >= FORCE_FEATURED) break;
    const entities = await db.collection(g.coll).find(g.match).toArray();
    for (const ent of entities) {
      if (featuredCount >= FORCE_FEATURED) break;
      const review = await reviewsCol.findOne({
        [g.field]: ent._id,
        status: "approved",
        featuredOnHomepage: { $ne: true },
      });
      if (!review) continue;
      await reviewsCol.updateOne(
        { _id: review._id },
        { $set: { featuredOnHomepage: true } }
      );
      featuredCount += 1;
    }
  }
  console.log(`Featured on homepage: ${featuredCount} reviews`);

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});