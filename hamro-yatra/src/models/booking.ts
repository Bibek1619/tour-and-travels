import mongoose, { Schema, type InferSchemaType } from "mongoose";

const bookingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    startDate: Date,
    endDate: Date,
    numberOfPeople: { type: Number, default: 1 },
    destination: { type: String, trim: true },
    pickupLocation: { type: String, trim: true },
    seats: { type: String, trim: true },
    days: { type: Number },
    dailyRate: { type: Number },
    totalPrice: { type: Number },
    comment: { type: String, trim: true },
    packageName: { type: String, trim: true },
    packageType: { type: String, default: "vehicle" },
    packageId: { type: String },
    termsAgreed: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "cancelled", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export type BookingType = InferSchemaType<typeof bookingSchema>;

export const Booking: mongoose.Model<BookingType> =
  (mongoose.models.Booking as mongoose.Model<BookingType> | undefined) ??
  mongoose.model<BookingType>("Booking", bookingSchema);