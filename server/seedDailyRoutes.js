const mongoose = require("mongoose");
const DailyRoute = require("./models/DailyRoute");
const Vehicle = require("./models/Vehicle");
require("dotenv").config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const seedDailyRoutes = async () => {
  try {
    await connectDB();

    // Clear existing routes
    await DailyRoute.deleteMany({});
    console.log("🗑️  Cleared existing daily routes");

    // Find an existing Scorpio, otherwise create one
    let scorpio = await Vehicle.findOne({ model: /scorpio/i });

    if (!scorpio) {
      scorpio = await Vehicle.create({
        category: "jeep",
        fuelType: "diesel",
        brand: "Mahindra",
        model: "Scorpio",
        name: "Mahindra Scorpio (7 Seater)",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        ],
        dailyRate: 5000,
        capacity: 7,
        luggage: "4 bags",
        features: ["AC", "Experienced Driver", "Music System", "Comfortable Seats"],
        bestFor: "Mountain roads & small groups",
        availableCount: 1,
        rating: 4.8,
        totalReviews: 24,
        isAvailable: true,
      });
      console.log("🚙 Created Scorpio vehicle");
    } else {
      console.log("🚙 Using existing Scorpio vehicle");
    }

    // Single Scorpio daily route
    const scorpioRoute = {
      routeName: "Pokhara to Mustang (Scorpio)",
      vehicle: scorpio._id,
      departure: {
        location: "Pokhara",
        time: "07:00 AM",
      },
      arrival: {
        location: "Jomsom, Mustang",
        time: "02:00 PM",
      },
      departureDate: new Date("2026-08-15"),
      duration: "7-9 hours",
      price: 5000,
      totalSeats: 7,
      bookedSeats: [2, 5, 6],
      availableSeats: 4,
      stops: ["Beni", "Tatopani", "Ghasa", "Marpha"],
      amenities: ["AC", "Experienced Driver", "Water", "Mountain Views"],
      description:
        "Comfortable 7-seater Mahindra Scorpio for the scenic journey from Pokhara to Mustang. AC, experienced mountain driver, and stunning Himalayan views along the way.",
      status: "active",
      featured: true,
    };

    const createdRoute = await DailyRoute.create(scorpioRoute);
    console.log(`✅ Successfully seeded 1 Scorpio daily route (id: ${createdRoute._id})`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

// Run the seeder
seedDailyRoutes();
