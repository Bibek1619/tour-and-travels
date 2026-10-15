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
  console.error("MONGO_URI not found.");
  process.exit(1);
}

async function main() {
  const uri = MONGO_URI.replace(" ", "");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
  const db = mongoose.connection.db;
  
  const trek = await db.collection("tourpackages").findOne({ 
    slug: "annapurna-base-camp-trek-4-days" 
  });
  
  if (trek) {
    console.log("\n4-Day Trek Details:");
    console.log("Title:", trek.title);
    console.log("Location:", trek.location);
    console.log("Slug:", trek.slug);
    console.log("Region ID:", trek.region);
    console.log("Status:", trek.status);
    console.log("Category:", trek.category);
    console.log("\nChecking regex match for 'annapurna':");
    const regex = /annapurna/i;
    console.log("Title matches:", regex.test(trek.title));
    console.log("Location matches:", regex.test(trek.location));
    console.log("Slug matches:", regex.test(trek.slug));
  } else {
    console.log("Trek not found!");
  }
  
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
