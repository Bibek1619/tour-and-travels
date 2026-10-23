import mongoose, { Schema, type Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  status: "draft" | "published";
  featured?: boolean;
  readTime: number; // in minutes
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, default: "" },
    category: { type: String, default: "Travel Tips" },
    tags: [{ type: String }],
    author: {
      name: { type: String, default: "Hamro Yatra Team" },
      avatar: { type: String, default: "" },
    },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    featured: { type: Boolean, default: false },
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
