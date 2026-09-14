import mongoose, { Schema, type InferSchemaType } from "mongoose";

const enquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    startDate: Date,
    endDate: Date,
    numberOfPeople: { type: Number, default: 1 },
    comment: { type: String, trim: true },
    packageName: { type: String, trim: true },
    packageType: { type: String, default: "tour" },
    packageId: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export type EnquiryType = InferSchemaType<typeof enquirySchema>;

export const Enquiry: mongoose.Model<EnquiryType> =
  (mongoose.models.Enquiry as mongoose.Model<EnquiryType> | undefined) ??
  mongoose.model<EnquiryType>("Enquiry", enquirySchema);