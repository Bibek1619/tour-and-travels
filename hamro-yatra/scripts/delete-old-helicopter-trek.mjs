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
  
  console.log("Deleting old helicopter trek...");
  const result = await db.collection("tourpackages").deleteOne({ 
    slug: "annapurna-base-camp-trek-4-days-helicopter" 
  });
  
  if (result.deletedCount > 0) {
    console.log("✓ Deleted old helicopter trek successfully");
  } else {
    console.log("Trek not found or already deleted");
  }
  
  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
