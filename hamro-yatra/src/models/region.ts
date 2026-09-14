import mongoose, { Schema, type Document } from "mongoose";

export interface IRegion extends Document {
  name: string;
  description: string;
  image: string;
  createdAt: Date;
}

const RegionSchema = new Schema<IRegion>(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Region =
  mongoose.models.Region || mongoose.model<IRegion>("Region", RegionSchema);
