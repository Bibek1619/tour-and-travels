const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    // 🚘 Vehicle Category
    category: {
      type: String,
      required: true,
      enum: ["car", "bike", "jeep", "van", "bus"],
    },

    // ⚡ Fuel Type
    fuelType: {
      type: String,
      required: true,
      enum: ["petrol", "diesel", "electric", "hybrid"],
    },

    // 🏭 Brand
    brand: {
      type: String,
      required: true,
      trim: true, // Honda, Bajaj, Royal Enfield
    },

    // 🚗 Model Name
    model: {
      type: String,
      required: true, // Pulsar 220, Bullet 350, Scorpio
    },

    // 📝 Display Name (optional but useful)
    name: {
      type: String,
      required: true, // "Royal Enfield Bullet 350"
    },

    image: {
      type: String,
      required: true,
    },

    dailyRate: {
      type: Number,
      required: true,
    },

    capacity: {
      type: Number, // number of passengers
      required: true,
    },

    luggage: {
      type: String, // "3 bags" (mainly for cars)
    },

    features: [String],

    bestFor: {
      type: String,
    },

    // ⭐ Ratings
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // 🚦 Availability
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
