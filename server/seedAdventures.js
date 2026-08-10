require("dotenv").config();
const mongoose = require("mongoose");
const Adventure = require("./models/Adventure");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const adventures = [
  // Rafting Adventures
  {
    name: "Trishuli River Rafting - Full Day",
    slug: "trishuli-river-rafting-full-day",
    category: "rafting",
    description: "Experience the thrill of white water rafting on the Trishuli River. This full-day adventure takes you through Class II-III rapids, perfect for beginners and experienced rafters alike. Enjoy stunning mountain views and pristine natural surroundings.",
    shortDescription: "Full day white water rafting adventure on the Trishuli River with Class II-III rapids",
    location: "Trishuli River, Nepal",
    duration: "6-7 hours",
    difficulty: "Moderate",
    minAge: 12,
    price: 65,
    groupSize: { min: 4, max: 12 },
    included: ["Professional guide", "Safety equipment", "Lunch", "Transport from Kathmandu"],
    excluded: ["Personal expenses", "Tips", "Travel insurance"],
    requirements: ["Basic swimming skills", "Good physical health", "Comfortable clothing"],
    safetyInfo: "All safety equipment provided. Experienced guides will accompany you throughout the journey.",
    bestSeason: "September to December, March to May",
    images: [],
    featured: true,
    status: "published"
  },
  {
    name: "Bhote Koshi River Rafting - Extreme",
    slug: "bhote-koshi-river-rafting-extreme",
    category: "rafting",
    description: "Take on Nepal's steepest river! The Bhote Koshi offers continuous Class IV-V rapids in a stunning canyon setting. This is extreme rafting at its best, recommended for experienced rafters only.",
    shortDescription: "Extreme white water rafting on Nepal's steepest river with Class IV-V rapids",
    location: "Bhote Koshi River, Nepal",
    duration: "4-5 hours",
    difficulty: "Expert",
    minAge: 16,
    price: 95,
    groupSize: { min: 4, max: 10 },
    included: ["Expert guide", "Premium safety gear", "Lunch", "Transport"],
    excluded: ["Personal expenses", "Tips", "Insurance"],
    requirements: ["Previous rafting experience", "Excellent physical condition", "Strong swimming skills"],
    safetyInfo: "This is an extreme adventure. Only for experienced rafters in excellent physical condition.",
    bestSeason: "October to November, March to April",
    images: [],
    featured: false,
    status: "published"
  },

  // Paragliding Adventures
  {
    name: "Pokhara Paragliding - Tandem Flight",
    slug: "pokhara-paragliding-tandem-flight",
    category: "paragliding",
    description: "Soar like a bird over the beautiful Pokhara Valley! Experience the thrill of paragliding with stunning views of the Annapurna range, Phewa Lake, and the valley below. Tandem flights with experienced pilots make this accessible to everyone.",
    shortDescription: "Tandem paragliding flight over Pokhara with Himalayan views",
    location: "Sarangkot, Pokhara",
    duration: "30-45 minutes flight",
    difficulty: "Easy",
    minAge: 5,
    price: 85,
    groupSize: { min: 1, max: 1 },
    included: ["Certified pilot", "All equipment", "Photos/Videos", "Transport to launch site"],
    excluded: ["Hotel pickup", "Tips", "Extra photos"],
    requirements: ["No experience needed", "Weight limit: 110kg", "Good weather conditions"],
    safetyInfo: "Certified pilots and maintained equipment. Flights subject to weather conditions.",
    bestSeason: "October to April",
    images: [],
    featured: true,
    status: "published"
  },

  // Bungee Jumping
  {
    name: "The Last Resort Bungee Jump",
    slug: "last-resort-bungee-jump",
    category: "bungee",
    description: "Take the ultimate leap of faith! Jump 160 meters from a suspension bridge over the Bhote Koshi River. This is one of the highest bungee jumps in the world and an unforgettable adrenaline rush.",
    shortDescription: "160m bungee jump from a suspension bridge - one of the world's highest",
    location: "The Last Resort, Bhote Koshi",
    duration: "2-3 hours (including preparation)",
    difficulty: "Hard",
    minAge: 18,
    price: 110,
    groupSize: { min: 1, max: 1 },
    included: ["Professional jump master", "Safety equipment", "Certificate", "Photos"],
    excluded: ["Transport from Kathmandu", "Accommodation", "Meals"],
    requirements: ["Age 18+", "Weight: 40-110kg", "Good health", "No heart/back problems"],
    safetyInfo: "Internationally certified equipment. Experienced jump masters. Medical clearance required.",
    bestSeason: "Year-round (weather permitting)",
    images: [],
    featured: true,
    status: "published"
  },

  // Zipline Adventures
  {
    name: "Zipflyer Nepal - World's Steepest Zipline",
    slug: "zipflyer-nepal-steepest-zipline",
    category: "zipline",
    description: "Experience the world's steepest zipline! Fly at speeds up to 160 km/h on a 1.8km cable with a 600-meter vertical drop. An incredible adrenaline experience with stunning mountain views.",
    shortDescription: "World's steepest and fastest zipline - 1.8km at 160km/h",
    location: "Sarangkot, Pokhara",
    duration: "2-3 hours",
    difficulty: "Moderate",
    minAge: 12,
    price: 90,
    groupSize: { min: 1, max: 2 },
    included: ["Safety equipment", "Helmet & harness", "Professional guide", "Certificate", "Transport to launch"],
    excluded: ["Hotel pickup", "Meals", "Tips"],
    requirements: ["Weight: 35-125kg", "Height: minimum 140cm", "Good health"],
    safetyInfo: "World-class safety standards. Regular equipment maintenance. Weather dependent.",
    bestSeason: "September to May",
    images: [],
    featured: true,
    status: "published"
  },

  // Canyoning
  {
    name: "Jalbire Canyon - Full Day Canyoning",
    slug: "jalbire-canyon-canyoning",
    category: "canyoning",
    description: "Explore the stunning Jalbire Canyon through canyoning! Abseil down waterfalls, jump into crystal-clear pools, slide down natural water slides, and navigate through narrow gorges. An adventure combining multiple activities in one incredible experience.",
    shortDescription: "Full day canyoning adventure with rappelling, jumping, and sliding through waterfalls",
    location: "Jalbire, Chitwan",
    duration: "7-8 hours",
    difficulty: "Hard",
    minAge: 14,
    price: 100,
    groupSize: { min: 2, max: 8 },
    included: ["Expert guide", "Technical equipment", "Wetsuit", "Helmet", "Lunch", "Transport"],
    excluded: ["Personal expenses", "Tips", "Insurance"],
    requirements: ["Good physical fitness", "Swimming ability", "No fear of heights", "Adventure mindset"],
    safetyInfo: "Technical equipment and experienced guides. Comprehensive safety briefing provided.",
    bestSeason: "October to April",
    images: [],
    featured: false,
    status: "published"
  },

  // Kayaking
  {
    name: "Seti River Kayaking Course",
    slug: "seti-river-kayaking-course",
    category: "kayaking",
    description: "Learn to kayak on the beautiful Seti River! This 3-day course covers kayaking basics, safety, river reading, and techniques. Perfect for beginners wanting to master white water kayaking in a stunning Himalayan setting.",
    shortDescription: "3-day beginner kayaking course on the Seti River with professional instruction",
    location: "Seti River, Pokhara",
    duration: "3 days",
    difficulty: "Easy",
    minAge: 12,
    price: 350,
    groupSize: { min: 2, max: 6 },
    included: ["Professional instructor", "All kayaking equipment", "Safety gear", "Accommodation", "Meals during course"],
    excluded: ["Travel to Pokhara", "Personal expenses", "Insurance"],
    requirements: ["Basic swimming skills", "No prior experience needed", "Good health"],
    safetyInfo: "Small groups for personalized instruction. All equipment provided. Safety first approach.",
    bestSeason: "September to November, March to May",
    images: [],
    featured: false,
    status: "published"
  }
];

const seedAdventures = async () => {
  try {
    await connectDB();
    
    // Clear existing adventures
    await Adventure.deleteMany({});
    console.log("🗑️  Cleared existing adventures");
    
    // Insert new adventures
    await Adventure.insertMany(adventures);
    console.log("✅ Successfully seeded adventures!");
    console.log(`📍 Added ${adventures.length} adventures`);
    console.log("\nCategories seeded:");
    console.log("  🚣 Rafting: 2");
    console.log("  🪂 Paragliding: 1");
    console.log("  🎢 Bungee: 1");
    console.log("  🎢 Zipline: 1");
    console.log("  🧗 Canyoning: 1");
    console.log("  🛶 Kayaking: 1");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding adventures:", error);
    process.exit(1);
  }
};

seedAdventures();
