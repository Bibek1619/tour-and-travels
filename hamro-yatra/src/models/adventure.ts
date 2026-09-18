import mongoose, { Schema, type InferSchemaType } from "mongoose";

const adventureSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: ["rafting", "kayaking", "paragliding", "bungee", "zipline", "canyoning"],
    },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["", "Easy", "Moderate", "Hard", "Expert"],
      default: "Moderate",
    },
    minAge: { type: Number, default: 12 },
    price: { type: Number, required: true },
    groupSize: {
      min: { type: Number, default: 1 },
      max: { type: Number, default: 10 },
    },
    included: [String],
    excluded: [String],
    requirements: [String],
    safetyInfo: String,
    bestSeason: String,
    images: [String],
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0 },
    faqs: [
      {
        q: String,
        a: String,
      },
    ],
  },
  { timestamps: true }
);

export type AdventureType = InferSchemaType<typeof adventureSchema>;

export const Adventure: mongoose.Model<AdventureType> =
  (mongoose.models.Adventure as mongoose.Model<AdventureType> | undefined) ??
  mongoose.model<AdventureType>("Adventure", adventureSchema);