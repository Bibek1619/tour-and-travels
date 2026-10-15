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

async function main() {
  const uri = MONGO_URI.replace(" ", "");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
  const db = mongoose.connection.db;
  
  console.log("\n=== TREK PRICES (USD) ===");
  const treks = await db.collection("tourpackages")
    .find({ category: "trek", status: "published" })
    .toArray();
  treks.forEach(t => {
    console.log(`${t.title}: $${t.price} USD`);
  });
  
  console.log("\n=== TOUR PRICES (NPR) ===");
  const tours = await db.collection("tourpackages")
    .find({ category: "tour", status: "published" })
    .limit(5)
    .toArray();
  tours.forEach(t => {
    console.log(`${t.title}: Rs ${t.price} NPR`);
  });
  
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
