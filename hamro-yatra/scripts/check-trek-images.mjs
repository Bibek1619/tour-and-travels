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
  
  console.log("\n=== TREK IMAGES ===");
  const treks = await db.collection("tourpackages")
    .find({ category: "trek", status: "published" })
    .toArray();
  
  treks.forEach(t => {
    console.log(`\n${t.title}:`);
    console.log(`Images: ${t.images?.length || 0}`);
    if (t.images?.length > 0) {
      t.images.forEach((img, i) => {
        console.log(`  [${i}] ${img.substring(0, 80)}...`);
      });
    }
  });
  
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
