import mongoose, { Schema, type InferSchemaType } from "mongoose";

const reviewSchema = new Schema(
  {
    tour: {
      type: Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
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
      default: "approved",
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