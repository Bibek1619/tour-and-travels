import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const vars = {};
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m) vars[m[1]] = m[2].trim();
  }
  return vars;
}

const env = loadEnv(path.resolve(process.cwd(), ".env"));
const MONGO_URI = process.env.MONGO_URI || env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not found. Add it to .env or set the env variable.");
  process.exit(1);
}

const tourFaqs = [
  {
    q: "How do I book this tour?",
    a: "Contact us via the enquiry form, phone or WhatsApp. We'll share the detailed itinerary and confirm your booking within 24 hours.",
  },
  {
    q: "What is the price based on?",
    a: "Prices are per person and may vary with group size, season and accommodation category. Contact us for an exact quote for your group.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Bank transfer, Visa/Mastercard, IME Pay, Khalti and cash on arrival for smaller bookings.",
  },
  {
    q: "Can the itinerary be customized?",
    a: "Yes. All tours can be tailored for private groups, couples or solo travellers, including dates, duration and destinations.",
  },
  {
    q: "What should I pack?",
    a: "We send a full packing list after booking. Comfortable walking shoes, warm layers and sunscreen are always recommended in Nepal.",
  },
  {
    q: "Do you offer travel insurance?",
    a: "We strongly recommend comprehensive travel insurance and can help you arrange it for your trip.",
  },
];

const trekFaqs = [
  {
    q: "How difficult is this trek?",
    a: "The difficulty is clearly shown on the package. Day walks can be long and involve altitude gain, but prior trekking experience is generally not required for our moderate routes.",
  },
  {
    q: "Do I need trekking permits?",
    a: "Yes. We arrange all required permits (e.g. TIMS, ACAP) for you and include them where stated in the itinerary.",
  },
  {
    q: "What about altitude sickness?",
    a: "Our itineraries follow a safe, gradual ascent with proper acclimatization days. Our guides are trained to monitor and manage altitude sickness.",
  },
  {
    q: "What is the price based on?",
    a: "Prices are per person and may vary with group size, season and teahouse category. Contact us for an exact quote for your group.",
  },
  {
    q: "Can I trek solo or in a private group?",
    a: "Yes. We offer both joined group departures and fully private treks with your own guide and porter.",
  },
  {
    q: "How do I book this trek?",
    a: "Contact us via the enquiry form, phone or WhatsApp. We'll share the itinerary and confirm your booking within 24 hours.",
  },
];

const vehicleFaqs = [
  {
    q: "What is included in the daily rate?",
    a: "The daily rate covers the vehicle and a professional local driver. Fuel, tolls and parking are charged additionally according to your route.",
  },
  {
    q: "Can I self-drive?",
    a: "We recommend travelling with our experienced driver, who knows Nepal's roads and routes. Self-drive options can be discussed for short trips.",
  },
  {
    q: "Is a driver included?",
    a: "A professional driver can be added for NPR 2,000 per day. Pickup and drop-off is available from anywhere in Pokhara.",
  },
  {
    q: "How is the fuel cost calculated?",
    a: "Fuel is charged on top of the daily rate based on the actual distance of your route. We provide a transparent estimate before booking.",
  },
  {
    q: "How do I book this vehicle?",
    a: "Contact us via the enquiry form, phone or WhatsApp. Let us know your dates, route and group size and we'll confirm within 24 hours.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Bank transfer, Visa/Mastercard, IME Pay, Khalti and cash on arrival for smaller bookings.",
  },
];

const adventureFaqs = [
  {
    q: "Do I need experience to join?",
    a: "No — most of our adventures welcome first-timers. The difficulty level and any requirements (such as swimming for rafting) are listed on the package.",
  },
  {
    q: "What is the minimum age?",
    a: "The minimum age is shown on each package. Participants under 18 generally need a parent or guardian to sign a consent form.",
  },
  {
    q: "How safe is this activity?",
    a: "We use licensed operators, certified guides and well-maintained safety gear. All activities follow strict safety guidelines and briefing before departure.",
  },
  {
    q: "What should I bring?",
    a: "Comfortable clothes and shoes, sunscreen, a change of clothes (for water activities) and personal items. A full packing list is shared at booking.",
  },
  {
    q: "How do I book this adventure?",
    a: "Contact us via the enquiry form, phone or WhatsApp. We'll check availability and confirm your booking within 24 hours.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Rescheduling is free up to 48 hours before the activity. Cancellation policies vary by operator — contact us for details on your booking.",
  },
];

async function seedFaqs(db) {
  const results = { tours: 0, treks: 0, vehicles: 0, adventures: 0 };

  const noFaqsFilter = {
    $or: [{ faqs: { $exists: false } }, { faqs: null }, { faqs: { $size: 0 } }],
  };

  const tours = await db.collection("tourpackages").updateMany(
    { category: "tour", ...noFaqsFilter },
    { $set: { faqs: tourFaqs } }
  );
  results.tours = tours.modifiedCount || tours.upsertedCount;

  const treks = await db.collection("tourpackages").updateMany(
    { category: "trek", ...noFaqsFilter },
    { $set: { faqs: trekFaqs } }
  );
  results.treks = treks.modifiedCount || treks.upsertedCount;

  const vehicles = await db.collection("vehicles").updateMany(
    noFaqsFilter,
    { $set: { faqs: vehicleFaqs } }
  );
  results.vehicles = vehicles.modifiedCount || vehicles.upsertedCount;

  const adventures = await db.collection("adventures").updateMany(
    noFaqsFilter,
    { $set: { faqs: adventureFaqs } }
  );
  results.adventures = adventures.modifiedCount || adventures.upsertedCount;

  return results;
}

async function main() {
  const uri = MONGO_URI.replace(" ", "");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
  const db = mongoose.connection.db;
  console.log("Connected to MongoDB.");

  const results = await seedFaqs(db);
  console.log("Seed results:", results);

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});