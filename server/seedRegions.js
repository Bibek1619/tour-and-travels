require("dotenv").config();
const mongoose = require("mongoose");
const Region = require("./models/Region");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const regions = [
  {
    name: "Everest Region Trekking",
    description: "Home to the world's highest peak Mount Everest (8,848m), the Everest region offers iconic treks through Sherpa villages, Buddhist monasteries, and stunning Himalayan panoramas. Experience the legendary Everest Base Camp, Gokyo Lakes, and breathtaking views from Kala Patthar.",
    image: null
  },
  {
    name: "Annapurna Region Trekking",
    description: "The Annapurna region is Nepal's most popular trekking destination, featuring diverse landscapes from lush rhododendron forests to high mountain passes. Trek the famous Annapurna Circuit, visit the sacred Muktinath temple, and enjoy panoramic views of Annapurna, Dhaulagiri, and Machhapuchhre.",
    image: null
  },
  {
    name: "Langtang Region Trekking",
    description: "Close to Kathmandu yet beautifully remote, Langtang offers pristine alpine scenery, Tamang culture, and sacred lakes. Trek through Langtang Valley, visit the holy Gosainkunda lakes, and experience the warm hospitality of mountain communities.",
    image: null
  },
  {
    name: "Manaslu Region Trekking",
    description: "Off the beaten path, the Manaslu Circuit offers adventure around the world's eighth highest mountain. Experience authentic Tibetan culture, cross the dramatic Larkya La Pass (5,160m), and enjoy spectacular mountain views in relative solitude.",
    image: null
  },
  {
    name: "Upper Mustang Trekking",
    description: "Enter the forbidden kingdom of Upper Mustang, a restricted area preserving ancient Tibetan Buddhist culture. Trek through desert-like landscapes, visit centuries-old monasteries, and explore the walled city of Lo Manthang in this rain-shadow region.",
    image: null
  },
  {
    name: "Dolpo Region Trekking",
    description: "Remote and wild, Dolpo is Nepal's largest district and one of the most isolated regions. Experience pristine Himalayan wilderness, deep turquoise Phoksundo Lake, ancient Bon Po culture, and dramatic landscapes featured in the film 'Caravan'.",
    image: null
  }
];

const seedRegions = async () => {
  try {
    await connectDB();
    
    // Clear existing regions
    await Region.deleteMany({});
    console.log("🗑️  Cleared existing regions");
    
    // Insert new regions
    await Region.insertMany(regions);
    console.log("✅ Successfully seeded trek regions!");
    console.log(`📍 Added ${regions.length} regions`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding regions:", error);
    process.exit(1);
  }
};

seedRegions();
