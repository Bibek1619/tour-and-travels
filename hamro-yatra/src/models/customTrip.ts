import mongoose, { Schema, type InferSchemaType } from "mongoose";

const customTripSchema = new Schema(
  {
    tripType: {
      type: String,
      enum: ["trek", "tour", "other"],
      required: true,
    },
    customTripType: { type: String, trim: true },
    place: { type: String, trim: true },
    startDate: Date,
    endDate: Date,
    numberOfPeople: { type: Number, default: 1 },
    notes: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export type CustomTripType = InferSchemaType<typeof customTripSchema>;

export const CustomTrip: mongoose.Model<CustomTripType> =
  (mongoose.models.CustomTrip as mongoose.Model<CustomTripType> | undefined) ??
  mongoose.model<CustomTripType>("CustomTrip", customTripSchema);