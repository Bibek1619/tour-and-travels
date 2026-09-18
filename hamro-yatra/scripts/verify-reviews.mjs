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

  console.log("=== Approved review count per tourpackage ===");
  const tps = await db.collection("tourpackages").find({}).project({ title: 1, category: 1, rating: 1, reviewsCount: 1 }).toArray();
  for (const t of tps) {
    const c = await db.collection("reviews").countDocuments({ tour: t._id, status: "approved" });
    console.log(t.category, "|", t.title, "| db.rating:", t.rating, "| db.reviewsCount:", t.reviewsCount, "| actual approved:", c);
  }

  console.log("=== per adventure ===");
  const ads = await db.collection("adventures").find({}).project({ name: 1, rating: 1, reviewsCount: 1 }).toArray();
  for (const a of ads) {
    const c = await db.collection("reviews").countDocuments({ adventure: a._id, status: "approved" });
    console.log(a.name, "| db.rating:", a.rating, "| db.reviewsCount:", a.reviewsCount, "| actual approved:", c);
  }

  console.log("=== per vehicle ===");
  const vhs = await db.collection("vehicles").find({}).project({ name: 1, rating: 1, totalReviews: 1 }).toArray();
  for (const v of vhs) {
    const c = await db.collection("reviews").countDocuments({ vehicle: v._id, status: "approved" });
    console.log(v.name, "| db.rating:", v.rating, "| db.totalReviews:", v.totalReviews, "| actual approved:", c);
  }

  console.log("=== featured on homepage (approved) ===");
  const feat = await db
    .collection("reviews")
    .find({ status: "approved", featuredOnHomepage: true })
    .project({ name: 1, rating: 1, tour: 1, vehicle: 1, adventure: 1 })
    .toArray();
  for (const f of feat) {
    let label = "";
    if (f.tour) label = "tour:" + String(f.tour);
    else if (f.vehicle) label = "vehicle:" + String(f.vehicle);
    else if (f.adventure) label = "adventure:" + String(f.adventure);
    console.log(f.name, f.rating, label);
  }
  console.log("featured total:", feat.length);

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("ERR", e);
  process.exit(1);
});