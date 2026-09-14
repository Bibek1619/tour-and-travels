import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import { Vehicle } from "@/models/vehicle";
import { Adventure } from "@/models/adventure";
import { DailyRoute } from "@/models/dailyRoute";
import { Enquiry } from "@/models/enquiry";
import { Booking } from "@/models/booking";
import { CustomTrip } from "@/models/customTrip";
import { Review } from "@/models/review";
import { Region } from "@/models/region";
import { ADMIN_CONFIG } from "@/lib/admin-config";

export function getEntityInfo(entity: string) {
  return ADMIN_CONFIG[entity];
}

export async function fetchEntity(entity: string, id: string) {
  await connectDB();

  switch (entity) {
    case "tours":
    case "treks": {
      const doc = await TourPackage.findById(id).lean();
      return doc ? JSON.parse(JSON.stringify(doc)) : null;
    }
    case "vehicles": {
      const doc = await Vehicle.findById(id).lean();
      return doc ? JSON.parse(JSON.stringify(doc)) : null;
    }
    case "adventures": {
      const doc = await Adventure.findById(id).lean();
      return doc ? JSON.parse(JSON.stringify(doc)) : null;
    }
    case "daily-routes": {
      const doc = await DailyRoute.findById(id)
        .populate("vehicle", "name")
        .lean();
      return doc ? JSON.parse(JSON.stringify(doc)) : null;
    }
    case "enquiries": {
      const doc = await Enquiry.findById(id).lean();
      return doc ? JSON.parse(JSON.stringify(doc)) : null;
    }
    case "bookings": {
      const doc = await Booking.findById(id).lean();
      return doc ? JSON.parse(JSON.stringify(doc)) : null;
    }
    case "custom-trips": {
      const doc = await CustomTrip.findById(id).lean();
      return doc ? JSON.parse(JSON.stringify(doc)) : null;
    }
    case "reviews": {
      const doc = await Review.findById(id)
        .populate("tour", "title")
        .lean();
      return doc ? JSON.parse(JSON.stringify(doc)) : null;
    }
    default:
      return null;
  }
}

export async function fetchEntityOptions(entity: string) {
  if (entity === "treks") {
    await connectDB();
    const regions = JSON.parse(
      JSON.stringify(await Region.find().select("_id name").lean())
    ) as { _id: unknown; name?: string }[];
    return {
      regions: regions.map((r) => ({
        value: String(r._id),
        label: r.name || "Region",
      })),
    } as Record<string, unknown>;
  }
  if (entity !== "daily-routes") return {} as Record<string, unknown>;
  await connectDB();
  const vehicles = JSON.parse(
    JSON.stringify(await Vehicle.find().select("_id name").lean())
  ) as { _id: unknown; name?: string }[];
  return {
    vehicles: vehicles.map((v) => ({
      value: String(v._id),
      label: v.name || "Vehicle",
    })),
  };
}