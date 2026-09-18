import mongoose, { Schema, type InferSchemaType } from "mongoose";

const homepageContentSchema = new Schema(
  {
    hero: {
      title: { type: String, default: "Nepal Tours, Treks & Vehicle Rentals" },
      subtitle: {
        type: String,
        default:
          "Your trusted travel partner in Pokhara \u2013 book with confidence, travel with ease.",
      },
      mediaType: { type: String, enum: ["video", "image"], default: "video" },
      videoSrc: { type: String, default: "/hero video.mp4" },
      imageSrc: { type: String, default: "" },
      ctaText: { type: String, default: "Plan Your Trip" },
      tourLink: { type: String, default: "/tour-packages" },
      tourLinkText: { type: String, default: "Tour Packages" },
      trekLink: { type: String, default: "/trek-packages" },
      trekLinkText: { type: String, default: "Trek Packages" },
    },
    intro: {
      welcomeTitle: {
        type: String,
        default: "Dear Travelers, Namaste and Welcome",
      },
      welcomeHighlight: { type: String, default: "Namaste" },
      subtitle: { type: String, default: "Your Gateway to the Majestic Himalayas" },
      description1: { type: String, default: "" },
      description2: { type: String, default: "" },
      description3: { type: String, default: "" },
      ctaText: { type: String, default: "Discover Our Story" },
      ctaLink: { type: String, default: "/about" },
      whyChooseTitle: { type: String, default: "Why Choose Us?" },
      highlights: [
        {
          icon: { type: String, default: "Mountain" },
          text: { type: String, default: "" },
        },
      ],
      stats: [
        {
          value: { type: String, default: "" },
          label: { type: String, default: "" },
          icon: { type: String, default: "Users" },
        },
      ],
      image: { type: String, default: "" },
    },
    whyUs: {
      sectionTitle: { type: String, default: "Why Hamro Yatra Adventure" },
      sectionHeading: {
        type: String,
        default: "Why Choose Hamro Yatra Adventure?",
      },
      headingHighlight: { type: String, default: "Hamro Yatra Adventure?" },
      subheading: {
        type: String,
        default: "Travel with confidence, every step of the way",
      },
      subheadingHighlight: { type: String, default: "every step of the way" },
      description: { type: String, default: "" },
      ctaText: { type: String, default: "Explore Tours" },
      ctaLink: { type: String, default: "/tours" },
      slides: [
        {
          type: { type: String, enum: ["image", "video"], default: "image" },
          src: { type: String, default: "" },
          title: { type: String, default: "" },
          subtitle: { type: String, default: "" },
        },
      ],
      features: [
        {
          icon: { type: String, default: "Star" },
          title: { type: String, default: "" },
          badge: { type: String, default: "" },
          description: { type: String, default: "" },
        },
      ],
    },
  },
  { timestamps: true }
);

export type HomepageContentType = InferSchemaType<typeof homepageContentSchema>;

export const HomepageContent: mongoose.Model<HomepageContentType> =
  (mongoose.models.HomepageContent as
    | mongoose.Model<HomepageContentType>
    | undefined) ??
  mongoose.model<HomepageContentType>("HomepageContent", homepageContentSchema);