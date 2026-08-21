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
    description:
      "Home to the world's highest peak Mount Everest (8,848m), the Everest region offers iconic treks through Sherpa villages, Buddhist monasteries, and stunning Himalayan panoramas. Experience the legendary Everest Base Camp, Gokyo Lakes, and breathtaking views from Kala Patthar.",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
  },
  {
    name: "Annapurna Region Trekking",
    description:
      "The Annapurna region is Nepal's most popular trekking destination, featuring diverse landscapes from lush rhododendron forests to high mountain passes. Trek the famous Annapurna Circuit, visit the sacred Muktinath temple, and enjoy panoramic views of Annapurna, Dhaulagiri, and Machhapuchhre.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
  },
  {
    name: "Langtang Region Trekking",
    description:
      "Close to Kathmandu yet beautifully remote, Langtang offers pristine alpine scenery, Tamang culture, and sacred lakes. Trek through Langtang Valley, visit the holy Gosainkunda lakes, and experience the warm hospitality of mountain communities.",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=80",
  },
  {
    name: "Manaslu Region Trekking",
    description:
      "Off the beaten path, the Manaslu Circuit offers adventure around the world's eighth highest mountain. Experience authentic Tibetan culture, cross the dramatic Larkya La Pass (5,160m), and enjoy spectacular mountain views in relative solitude.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  },
  {
    name: "Upper Mustang Trekking",
    description:
      "Enter the forbidden kingdom of Upper Mustang, a restricted area preserving ancient Tibetan Buddhist culture. Trek through desert-like landscapes, visit centuries-old monasteries, and explore the walled city of Lo Manthang in this rain-shadow region.",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80",
  },
  {
    name: "Dolpo Region Trekking",
    description:
      "Remote and wild, Dolpo is Nepal's largest district and one of the most isolated regions. Experience pristine Himalayan wilderness, deep turquoise Phoksundo Lake, ancient Bon Po culture, and dramatic landscapes featured in the film 'Caravan'.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
  },
];

const seedRegions = async () => {
  try {
    await connectDB();

    await Region.deleteMany({});
    console.log("🗑️  Cleared existing regions");

    const inserted = await Region.insertMany(regions);
    console.log(`✅ Successfully seeded ${inserted.length} trek regions!\n`);
    inserted.forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding regions:", error);
    process.exit(1);
  }
};

seedRegions();
