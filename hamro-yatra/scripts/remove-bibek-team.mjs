import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env file
const envPath = join(__dirname, "..", ".env");
let uri;
try {
  const envContent = readFileSync(envPath, "utf-8");
  const match = envContent.match(/MONGO(?:DB)?_URI=(.+)/);
  uri = match ? match[1].trim().replace(/\s+/g, '') : null;
} catch (error) {
  console.error("❌ Could not read .env file");
  process.exit(1);
}

if (!uri) {
  console.error("❌ MONGO_URI not found in .env");
  process.exit(1);
}

async function removeBibekFromTeam() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");
    
    const db = client.db();
    const pageContentCollection = db.collection("pagecontents");
    
    // Find the about page content
    const aboutDoc = await pageContentCollection.findOne({ slug: "about" });
    
    if (!aboutDoc) {
      console.log("ℹ️  No about page content in database - using defaults");
      return;
    }
    
    console.log("📝 Current team members:");
    const currentTeam = aboutDoc.content?.team?.members || [];
    currentTeam.forEach((member, idx) => {
      console.log(`   ${idx + 1}. ${member.name} - ${member.role}`);
    });
    
    // Filter out Bibek
    const updatedTeam = currentTeam.filter(
      member => !member.name.toLowerCase().includes('bibek')
    );
    
    console.log(`\n📊 Team size: ${currentTeam.length} → ${updatedTeam.length}`);
    
    // Update the team
    const result = await pageContentCollection.updateOne(
      { slug: "about" },
      {
        $set: {
          "content.team.members": updatedTeam
        }
      }
    );
    
    if (result.modifiedCount > 0) {
      console.log("\n✅ Team updated successfully!");
    } else {
      console.log("\nℹ️  No changes needed");
    }
    
    // Verify the update
    const updatedDoc = await pageContentCollection.findOne({ slug: "about" });
    console.log("\n📝 Updated team members:");
    const newTeam = updatedDoc.content?.team?.members || [];
    newTeam.forEach((member, idx) => {
      console.log(`   ${idx + 1}. ${member.name} - ${member.role}`);
    });
    
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("\n👋 Disconnected from MongoDB");
  }
}

removeBibekFromTeam();
