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

async function main() {
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 30000 });
  const db = mongoose.connection.db;

  for (const n of ["tourpackages", "vehicles", "adventures", "reviews"]) {
    console.log(n, "count:", await db.collection(n).countDocuments());
  }

  console.log("--- tours/treks ---");
  const tp = await db
    .collection("tourpackages")
    .find({})
    .project({ title: 1, category: 1, slug: 1, rating: 1, reviewsCount: 1, status: 1 })
    .toArray();
  for (const t of tp) console.log(t.category, "|", t.title, "|", t.slug, "| r:", t.rating, "| rc:", t.reviewsCount, "|", t.status);

  console.log("--- adventures ---");
  const ad = await db
    .collection("adventures")
    .find({})
    .project({ name: 1, slug: 1, rating: 1, reviewsCount: 1, status: 1 })
    .toArray();
  for (const a of ad) console.log(a.name, "|", a.slug, "| r:", a.rating, "| rc:", a.reviewsCount, "|", a.status);

  console.log("--- vehicles ---");
  const vh = await db
    .collection("vehicles")
    .find({})
    .project({ name: 1, rating: 1, totalReviews: 1 })
    .toArray();
  for (const v of vh) console.log(v.name, "| r:", v.rating, "| tr:", v.totalReviews);

  console.log("--- reviews (existing) ---");
  const rv = await db
    .collection("reviews")
    .find({})
    .project({ name: 1, rating: 1, status: 1, tour: 1, vehicle: 1, adventure: 1, featuredOnHomepage: 1 })
    .toArray();
  console.log("count:", rv.length);
  for (const r of rv) console.log(r.name, r.rating, r.status, "feat:", r.featuredOnHomepage, "tour:", String(r.tour || "").slice(0, 8), "veh:", String(r.vehicle || "").slice(0, 8), "adv:", String(r.adventure || "").slice(0, 8));

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("ERR", e);
  process.exit(1);
});