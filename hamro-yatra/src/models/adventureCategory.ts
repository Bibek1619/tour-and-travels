import mongoose, { Schema, type Document } from "mongoose";

export interface IAdventureCategory extends Document {
  slug: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
  createdAt: Date;
}

const AdventureCategorySchema = new Schema<IAdventureCategory>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AdventureCategory =
  mongoose.models.AdventureCategory ||
  mongoose.model<IAdventureCategory>("AdventureCategory", AdventureCategorySchema);