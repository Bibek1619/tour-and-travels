import mongoose, { Schema } from "mongoose";

const pageContentSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    content: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export type PageContentType = {
  slug: string;
  content: Record<string, unknown>;
};

export const PageContent: mongoose.Model<PageContentType> =
  (mongoose.models.PageContent as mongoose.Model<PageContentType> | undefined) ??
  mongoose.model<PageContentType>("PageContent", pageContentSchema);