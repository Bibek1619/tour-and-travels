const mongoose = require("mongoose");
require("dotenv").config();
const Review = require("../models/Review");
const TourPackage = require("../models/tourPackage");

const reviewTemplates = [
  {
    name: "Sarah Mitchell",
    title: "Travel Blogger, USA",
    email: "sarah.mitchell@example.com",
    rating: 5,
    review: "Adventure Nepal planned our entire Everest Base Camp trek flawlessly. The guides were incredibly knowledgeable, and every detail was taken care of. It was the trip of a lifetime!",
    featuredOnHomepage: true,
  },
  {
    name: "James Wilson",
    title: "Adventure Enthusiast, UK",
    email: "james.wilson@example.com",
    rating: 5,
    review: "From the moment we landed in Kathmandu, everything was perfect. The cultural tour was beautifully organized, and the team was so warm and welcoming. Highly recommended!",
    featuredOnHomepage: true,
  },
  {
    name: "Priya Sharma",
    title: "Photographer, India",
    email: "priya.sharma@example.com",
    rating: 5,
    review: "The Annapurna Circuit trek exceeded all my expectations. Our guide was passionate, safe, and made the journey unforgettable. I will definitely book with them again.",
    featuredOnHomepage: true,
  },
  {
    name: "Emily Chen",
    title: "Family Traveler, Australia",
    email: "emily.chen@example.com",
    rating: 4,
    review: "We booked a family tour to Pokhara and Chitwan. The kids loved the jungle safari, and the whole trip was stress-free. Adventure Nepal truly cares about their guests.",
    featuredOnHomepage: true,
  },
  {
    name: "David Thompson",
    title: "CEO, Wanderlust Media",
    email: "david.thompson@example.com",
    rating: 5,
    review: "Nepal changed my perspective on life. The mountains, the people, the culture — Adventure Nepal made sure I experienced it all in the most authentic way possible.",
    featuredOnHomepage: true,
  },
  {
    name: "Marie Dubois",
    title: "Solo Traveler, France",
    email: "marie.dubois@example.com",
    rating: 5,
    review: "The Langtang Valley trek was breathtaking. Less crowded than Everest but equally stunning. Our guide was exceptional — knowledgeable and very caring.",
    featuredOnHomepage: true,
  },
  {
    name: "Carlos Rodriguez",
    title: "Mountain Guide, Spain",
    email: "carlos.rodriguez@example.com",
    rating: 4,
    review: "Great experience with the Mustang trek. The desert landscape is completely different from what I expected in Nepal. Unique and highly recommended for adventurers.",
    featuredOnHomepage: false,
  },
  {
    name: "Yuki Tanaka",
    title: "Landscape Photographer, Japan",
    email: "yuki.tanaka@example.com",
    rating: 5,
    review: "The Ghorepani Poon Hill trek was perfect for a short getaway. The sunrise views over Dhaulagiri and Annapurna are unforgettable. The whole team was fantastic.",
    featuredOnHomepage: false,
  },
];

async function seedReviews() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Get all published tours to distribute reviews
    const tours = await TourPackage.find({ status: "published" }).select("_id title");
    if (tours.length === 0) {
      console.log("❌ No published tours found. Run tour/trek seeders first.");
      process.exit(1);
    }
    console.log(`📦 Found ${tours.length} tours to assign reviews to`);

    // Clear existing reviews
    const deleted = await Review.deleteMany({});
    console.log(`🗑️  Deleted ${deleted.deletedCount} existing reviews`);

    // Assign reviews round-robin across tours
    const reviewsToInsert = reviewTemplates.map((r, i) => ({
      tour: tours[i % tours.length]._id,
      name: r.name,
      title: r.title,
      email: r.email,
      rating: r.rating,
      review: r.review,
      status: "approved",
      featuredOnHomepage: r.featuredOnHomepage,
    }));

    const inserted = await Review.insertMany(reviewsToInsert);
    console.log(`✅ Seeded ${inserted.length} reviews\n`);

    // Show summary
    inserted.forEach((r, i) => {
      const tour = tours[i % tours.length];
      console.log(`  ${i + 1}. ${reviewTemplates[i].name} → ${tour.title} (${r.rating}★) ${r.featuredOnHomepage ? "⭐ featured" : ""}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding reviews:", error);
    process.exit(1);
  }
}

seedReviews();
