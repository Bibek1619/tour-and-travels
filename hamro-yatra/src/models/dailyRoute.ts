import mongoose, { Schema, type InferSchemaType } from "mongoose";

const dailyRouteSchema = new Schema(
  {
    routeName: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    departure: {
      location: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
    arrival: {
      location: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
    departureDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: [Number],
      default: [],
    },
    stops: [String],
    amenities: [String],
    description: String,
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export type DailyRouteType = InferSchemaType<typeof dailyRouteSchema>;

export const DailyRoute: mongoose.Model<DailyRouteType> =
  (mongoose.models.DailyRoute as mongoose.Model<DailyRouteType> | undefined) ??
  mongoose.model<DailyRouteType>("DailyRoute", dailyRouteSchema);