const mongoose = require("mongoose");

const homepageContentSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, default: "Discover the Magic of Nepal" },
      subtitle: {
        type: String,
        default:
          "Book your adventure with confidence - Vehicle rentals, seat reservations, tour packages, and hotels all in one place",
      },
      videoSrc: { type: String, default: "/hero video.mp4" },
      ctaText: { type: String, default: "View All Packages" },
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
      sectionTitle: { type: String, default: "Why Adventure Nepal" },
      sectionHeading: {
        type: String,
        default: "Why Choose Adventure Nepal?",
      },
      headingHighlight: { type: String, default: "Adventure Nepal?" },
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

module.exports = mongoose.model("HomepageContent", homepageContentSchema);
