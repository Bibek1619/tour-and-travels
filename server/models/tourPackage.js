 const mongoose=require("mongoose")

const tourPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    unique: true,
  },

  category: {
    type: String,
    enum: ["tour", "trek", "vehicle-tour"],
    required: true,
  },

  location: String,
  difficulty: String,
  durationDays: Number,
  groupSize: String,

  price: Number,
  maxAltitude: String,
  bestSeason: String,

  shortOverview: String,

  fullOverview: {
    intro: String,
    geography: String,
    culture: String,
    specialPlaces: String,
    trekking: String,
    bestTime: String,
    permits: String,
    conservation: String,
  },

  highlights: [String],

  itinerary: [
    {
      day: Number,
      title: String,
      desc: String,
    },
  ],

  included: [String],
  excluded: [String],

  images: [String],

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },

  rating: {
    type: Number,
    default: 0,
  },

  reviewsCount: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

module.exports = mongoose.model("TourPackage", tourPackageSchema);
