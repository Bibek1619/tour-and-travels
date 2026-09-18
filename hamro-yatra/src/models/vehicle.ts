import mongoose, { Schema, type InferSchemaType } from "mongoose";

const vehicleSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["car", "bike", "jeep", "van", "bus"],
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["petrol", "diesel", "electric", "hybrid"],
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      index: true,
    },
    images: {
      type: [String],
      required: true,
    },
    dailyRate: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    luggage: {
      type: String,
    },
    features: [String],
    bestFor: {
      type: String,
    },
    availableCount: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    faqs: [
      {
        q: String,
        a: String,
      },
    ],
  },
  { timestamps: true }
);

export type VehicleType = InferSchemaType<typeof vehicleSchema>;

export const Vehicle: mongoose.Model<VehicleType> =
  (mongoose.models.Vehicle as mongoose.Model<VehicleType> | undefined) ??
  mongoose.model<VehicleType>("Vehicle", vehicleSchema);
