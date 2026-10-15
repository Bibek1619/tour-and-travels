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
  
  console.log("\n=== REGIONS ===");
  const regions = await db.collection("regions").find().toArray();
  if (regions.length > 0) {
    regions.forEach(r => console.log(`${r.name} - ID: ${r._id}`));
  } else {
    console.log("No regions found in database");
  }
  
  console.log("\n=== TREKS AND THEIR REGIONS ===");
  const treks = await db.collection("tourpackages").find({ category: "trek" }).toArray();
  treks.forEach(t => {
    console.log(`${t.title} - region: ${t.region || "NULL"}`);
  });
  
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
