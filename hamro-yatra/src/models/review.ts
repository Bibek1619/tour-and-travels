import mongoose, { Schema, type InferSchemaType } from "mongoose";

const reviewSchema = new Schema(
  {
    tour: {
      type: Schema.Types.ObjectId,
      ref: "TourPackage",
      index: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      index: true,
    },
    adventure: {
      type: Schema.Types.ObjectId,
      ref: "Adventure",
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    location: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    featuredOnHomepage: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export type ReviewType = InferSchemaType<typeof reviewSchema>;

export const Review: mongoose.Model<ReviewType> =
  (mongoose.models.Review as mongoose.Model<ReviewType> | undefined) ??
  mongoose.model<ReviewType>("Review", reviewSchema);