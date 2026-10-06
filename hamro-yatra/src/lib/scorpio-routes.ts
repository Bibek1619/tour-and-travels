export const scorpioBaseSlug = "scorpio-rent-in-pokhara";

export const scorpioOrigin = "Pokhara";

export interface ScorpioFaq {
  q: string;
  a: string;
}

export interface ScorpioHighlight {
  label: string;
  value: string;
}

export interface ScorpioRelatedLink {
  href: string;
  label: string;
}

export interface ScorpioRoute {
  slug: string;
  /** Human readable route name, e.g. "Pokhara to Ghandruk". */
  route: string;
  origin: string;
  destination: string;
  image: string | null;
  heroImage?: string | null;
  /** Short card meta line. */
  meta: string;
  price: number;
  usd: number;
  distance: string;
  time: string;
  /** Fact chips. Good for featured snippets. */
  highlights: ScorpioHighlight[];
  /** Unique body copy. Keep 3+ paragraphs to avoid thin content. */
  overview: string[];
  /** Optional extra section rendered under the overview. */
  detailTitle?: string;
  detailBody?: string;
  /** Rendered as visible FAQ and emitted as FAQPage JSON-LD. */
  faqs: ScorpioFaq[];
  relatedLinks: ScorpioRelatedLink[];
  /** Optional overrides. Falls back to a generated title/description. */
  seoTitle?: string;
  seoDescription?: string;
}

export const scorpioRoutes: ScorpioRoute[] = [
  {
    slug: "pokhara-to-kathmandu-scorpio-hire",
    route: "Pokhara to Kathmandu",
    origin: "Pokhara",
    destination: "Kathmandu",
    image: "/pkr-ktm.jpg",
    heroImage: "/carhero1 (1).jpg",
    meta: "200 km • 6 hrs",
    price: 17000,
    usd: 130,
    distance: "200",
    time: "6",
    highlights: [
      { label: "Distance", value: "200 km" },
      { label: "Drive time", value: "Approx. 6 hours" },
      { label: "Route", value: "Prithivi Highway" },
      { label: "Vehicle", value: "Mahindra Scorpio, 7 seater" },
      { label: "Driver", value: "Experienced local driver included" },
      { label: "Trip type", value: "One-way or return" },
    ],
    overview: [
      "Travel from Pokhara to Kathmandu in the most comfort and convenience on the road through our high-class Jeep Scorpio rental package by Hamro Yatra Adventure. Enjoy the amazing scenery of Nepal with your own eyes as you start a 210km journey from the very heart of Pokhara to the quiet city of Kathmandu.",
      "Our Jeep rental service guarantees no hassle journey so that you can enjoy the beauty of your journey rather than worrying about the small things. Having a fleet of regularly serviced Scorpios and Jeeps and competent drivers, we provide you with a safe and exciting ride alongside Prithivi Highway.",
      "The Prithivi Highway is the main overland artery connecting the two biggest cities in Nepal, and the drive passes through the Terai lowlands before climbing into the hills past Mugling and Kurintar. Most travellers use this route to reach Kathmandu after a Pokhara stay, a Chitwan or Lumbini trip, or the start of a mountain flight. Because the road is busier than the mountain routes, an early start gets you the best light and the smoothest traffic.",
      "Please do not hesitate to contact us to book your Pokhara to Kathmandu Jeep rental package. Now comes the time to start your unforgettable overland journey through Nepal.",
    ],
    detailTitle: "Pokhara to Kathmandu Scorpio Jeep Trip",
    detailBody:
      "Rent a Scorpio jeep with comfortable and stylish facilities from Pokhara to Kathmandu for a very memorable trip. The journey is 210km away, but it will be as pleasant as it can be, as you enjoy seeing the lovely landscapes of Nepal. The experienced drivers of our company and well-maintained jeeps ensure your safety and comfort during the trip, so you can unwind and take in the scenery of the Bhairahawa-Bardia route. The Pokhara to Kathmandu Jeep trip is not only designed to bring you home or let you continue your adventure but also to provide you with great convenience and flexibility, which will make your travel pleasant and memorable.",
    faqs: [
      {
        q: "How long does it take to drive from Pokhara to Kathmandu?",
        a: "The drive takes roughly 6 hours over about 200 km via the Prithivi Highway. Allow extra time for the flight from Pokhara to Lukla, as the road is busier during the day. Departing early in the morning usually gives you the smoothest journey.",
      },
      {
        q: "How much does a Scorpio hire from Pokhara to Kathmandu cost?",
        a: "A one-way Scorpio jeep hire from Pokhara to Kathmandu starts from NPR 17,000 (about USD 130) with an experienced driver included. The price covers the vehicle, fuel, driver allowance and the one-way drop. Contact us for return-trip and multi-day rates.",
      },
      {
        q: "Is the driver included in the rental price?",
        a: "Yes. All our Scorpio hires in Pokhara are provided with a professional local driver who knows the Prithivi Highway and the hill routes well. You do not need a Nepali driving licence to hire a vehicle with a driver.",
      },
      {
        q: "Can we stop along the way from Pokhara to Kathmandu?",
        a: "Yes, the route has several good stopping points. You can break the journey at Bandipur, Kurintar, or Mugling, and our drivers can arrange a stop at the Kurintar viewpoint or along the Trishuli riverside. Tell us in advance which stops you want so we can allow enough time.",
      },
      {
        q: "How many people can the Scorpio carry?",
        a: "Our Scorpio is a 7-seater with room for luggage, which comfortably fits a small family or a group of friends with trekking gear. For larger groups we can arrange a second vehicle or a van.",
      },
      {
        q: "Is the road from Pokhara to Kathmandu suitable in monsoon season?",
        a: "The Prithivi Highway stays open through the monsoon, though you should expect slower traffic, some waterlogging on the lowland section and occasional landslides on the hill stretch between Mugling and Kurintar. We recommend allowing a few extra hours of buffer during July to September.",
      },
    ],
    relatedLinks: [
      {
        href: "/tours/pokhara-valley-scenic-tour",
        label: "Pokhara valley scenic tour",
      },
      { href: "/tours/pokhara-to-chitwan-jungle-safari", label: "Chitwan jungle safari tour" },
      { href: "/tours/kathmandu-valley-cultural-tour", label: "Kathmandu valley cultural tour" },
    ],
  },
  {
    slug: "pokhara-to-ghandruk-scorpio-hire",
    route: "Pokhara to Ghandruk",
    origin: "Pokhara",
    destination: "Ghandruk",
    image: "/ghandruk.jpg",
    meta: "32 km from Pokhara",
    price: 10000,
    usd: 77,
    distance: "32",
    time: "2",
    highlights: [
      { label: "Distance", value: "32 km" },
      { label: "Drive time", value: "Approx. 2 hours" },
      { label: "Road", value: "Off-road uphill, 4WD recommended" },
      { label: "Vehicle", value: "Mahindra Scorpio, 7 seater" },
      { label: "Driver", value: "Experienced local driver included" },
      { label: "Best season", value: "October to November, March to April" },
    ],
    overview: [
      "Looking for a Scorpio or Jeep rental from Pokhara to Ghandruk? Ghandruk, a beautiful Gurung village in the Annapurna region of Nepal, is one of the most popular trekking and cultural destinations in the Annapurna Himalaya, offering stunning close-up views of Annapurna South (7,219m), Machhapuchhre (Fishtail Mountain), and Hiunchuli along the Modi Khola valley.",
      "The road climbs out of Pokhara through Naudi and Birethanti and gets progressively narrower and rougher as it approaches the village. Most of the last few kilometres are unpaved and steep, so a vehicle with good ground clearance and four-wheel drive makes a real difference. Our Scorpios handle this stretch comfortably, and an experienced driver who knows the road is worth as much as the vehicle itself.",
      "Ghandruk is also the trailhead for the famous Ghandruk to Ghorepani and Poon Hill trek and the Annapurna Base Camp trek, making our Scorpio Jeep rental the easiest and most convenient way to reach the trekking starting point from Pokhara. Travellers usually drive up the night before or early the morning of the trek to start walking from a village at 1,940 m rather than 800 m.",
      "One-way Ghandruk jeep hire is perfect for travellers who want to explore the Annapurna Conservation Area, Gurung culture, traditional stone houses, and the best sunrise viewpoints around Poon Hill without the hassle of public buses. We can also arrange a waiting jeep, so you can be dropped back in Pokhara after your trek finishes.",
    ],
    faqs: [
      {
        q: "How long does the drive from Pokhara to Ghandruk take?",
        a: "Allow about 2 hours for the 32 km climb from Pokhara. The road is uphill and partly unpaved, so it is slower than the distance suggests, and monsoon rain or roadworks can add time. Book an early morning pickup if you have a trek starting the same day.",
      },
      {
        q: "How much does a Scorpio jeep hire from Pokhara to Ghandruk cost?",
        a: "A one-way Scorpio hire from Pokhara to Ghandruk is NPR 10,000 (about USD 77) including the driver, fuel and the uphill drop. Round trips and waiting-jeep arrangements are quoted separately depending on how many days you need the vehicle.",
      },
      {
        q: "Do I need a 4WD vehicle to reach Ghandruk?",
        a: "A high-clearance 4WD vehicle is strongly recommended, because the road becomes rough and steep on the final stretch. Our Mahindra Scorpios are available in 4WD for this route, which is why we recommend them over a standard car for Ghandruk and Ghorepani.",
      },
      {
        q: "Can I get a ride back to Pokhara after trekking from Ghandruk?",
        a: "Yes. Most Ghandruk treks finish at a different village such as Ghorepani, Jhinu Danda or Nayapool, so we usually collect you from the nearest road-head rather than Ghandruk itself. Tell us your trek itinerary and we will plan the pickup point and time with you.",
      },
      {
        q: "What can I see in Ghandruk?",
        a: "Ghandruk is a traditional Gurung village known for slate-roofed houses, terraced fields, rhododendron and bamboo forest, and clear views of Annapurna South, Machhapuchhre and Hiunchuli. It is also the starting point for the Ghandruk to Ghorepani and Poon Hill trek.",
      },
      {
        q: "What luggage can I carry in the Scorpio?",
        a: "The Scorpio is a 7-seater with luggage space for trekking bags, but the road is rough, so we recommend packing a soft duffel rather than a hard wheeled suitcase. If you are carrying a large load, let us know in advance so we can send a second vehicle.",
      },
    ],
    relatedLinks: [
      { href: "/tours/pokhara-to-ghandruk-tour", label: "Ghandruk village tour package" },
      { href: "/treks/ghorepani-poon-hill-trek", label: "Ghorepani and Poon Hill trek" },
      { href: "/trek-packages/annapurna", label: "Annapurna trekking packages" },
    ],
  },
  {
    slug: "pokhara-to-ghorepani-scorpio-hire",
    route: "Pokhara to Ghorepani",
    origin: "Pokhara",
    destination: "Ghorepani",
    image: "/mustang.jpg",
    meta: "Annapurna foothills",
    price: 11000,
    usd: 85,
    distance: "55",
    time: "3-4",
    highlights: [
      { label: "Distance", value: "55 km" },
      { label: "Drive time", value: "Approx. 3 to 4 hours" },
      { label: "Altitude", value: "2,860 m at the village" },
      { label: "Road", value: "Off-road uphill, 4WD recommended" },
      { label: "Vehicle", value: "Mahindra Scorpio, 7 seater" },
      { label: "Trek start", value: "Poon Hill sunrise trek" },
    ],
    overview: [
      "Ghorepani sits at 2,860 m in the Annapurna foothills and is the most popular trailhead in the Annapurna region. A Scorpio or jeep hire from Pokhara to Ghorepani is the standard way to start the Poon Hill trek, and it saves you a full day of walking compared with trekking up from Ghandruk or Ulleri.",
      "The drive leaves Pokhara via Naudi and climbs the same hill road as Ghandruk before continuing higher into rhododendron and pine forest. The road surface is rough and unpaved for long stretches and the gradient is steep, so a high-clearance four-wheel-drive vehicle with an experienced driver is the practical choice. The 55 km takes roughly 3 to 4 hours depending on road conditions and the monsoon.",
      "Most of our Ghorepani guests continue walking to Poon Hill for sunrise the next morning, which is about a 45 minute climb from the village. If you are travelling as a group with gear, we can arrange a waiting jeep at Ghorepani and a pickup from Jhinu Danda or Nayapool at the end of the trek, so you only travel the road once in each direction.",
      "Because the road climbs through the same Annapurna Conservation Area that you will walk into, the journey is part of the experience rather than just a transfer. October to November and March to April give the clearest mountain views and the most comfortable driving conditions.",
    ],
    faqs: [
      {
        q: "How long does the jeep ride from Pokhara to Ghorepani take?",
        a: "Expect 3 to 4 hours for the 55 km climb from Pokhara. The road is steep and unpaved for much of the way, so allow more time in the monsoon, when rain, landslides and roadworks can slow traffic significantly.",
      },
      {
        q: "How much does a Scorpio hire from Pokhara to Ghorepani cost?",
        a: "A one-way Scorpio jeep hire from Pokhara to Ghorepani is NPR 11,000 (about USD 85), including the driver, fuel and the uphill drop. A waiting-jeep arrangement, where the vehicle stays in Ghorepani until you finish trekking, is priced based on the number of days.",
      },
      {
        q: "Is Ghorepani reachable by a normal car?",
        a: "Not reliably. The final stretch of road is rough, steep and unpaved, and a standard sedan or city car can struggle in the monsoon. We recommend a Mahindra Scorpio with four-wheel drive for this route, which is why this service is priced as a jeep hire rather than a car rental.",
      },
      {
        q: "Which trek starts from Ghorepani?",
        a: "Ghorepani is the classic start for the Ghorepani and Poon Hill trek. From the village it is about 45 minutes uphill to Poon Hill for the well-known sunrise viewpoint over the Annapurna range, and the trail then descends toward Jhinu Danda, Nayapool or Ghandruk.",
      },
      {
        q: "How do I get back to Pokhara from Ghorepani?",
        a: "Most walkers finish at Jhinu Danda or Nayapool rather than climbing back to Ghorepani. We arrange pickups from those road-heads, and also from other Annapurna trailheads such as Siwai and Birethanti, so you do not have to retrace the climb.",
      },
      {
        q: "When is the best time to travel to Ghorepani?",
        a: "October to November and March to April give the clearest views of the Annapurna range and the most reliable road conditions. The monsoon months are green and quiet but the road is slower and more prone to disruption, and in winter mornings the road can be icy at altitude.",
      },
    ],
    relatedLinks: [
      { href: "/treks/ghorepani-poon-hill-trek", label: "Ghorepani and Poon Hill trek" },
      { href: "/trek-packages/annapurna", label: "Annapurna trekking packages" },
      { href: "/tours/pokhara-to-ghandruk-tour", label: "Ghandruk village tour package" },
    ],
  },
  {
    slug: "pokhara-to-jhinu-danda-scorpio-hire",
    route: "Pokhara to Jhinu Danda",
    origin: "Pokhara",
    destination: "Jhinu Danda",
    image: "/jhinu.jpg",
    meta: "Pokhara to Annapurna",
    price: 13000,
    usd: 100,
    distance: "58",
    time: "3-4",
    highlights: [
      { label: "Distance", value: "58 km" },
      { label: "Drive time", value: "Approx. 3 to 4 hours" },
      { label: "Altitude", value: "1,780 m at the village" },
      { label: "Road", value: "Off-road uphill, 4WD recommended" },
      { label: "Vehicle", value: "Mahindra Scorpio, 7 seater" },
      { label: "Hot springs", value: "Jhinu hot springs on the way down" },
    ],
    overview: [
      "Jhinu Danda is the village at 1,780 m that the Annapurna Base Camp trek passes through, and it is also the finish point for most Poon Hill and Ghorepani walks. A Scorpio or jeep hire from Pokhara to Jhinu Danda is the easiest way to start an Annapurna Base Camp trek, and the same road is used to collect you when you come back down.",
      "The road climbs from Pokhara through Naudi and Birethanti, then continues up past Ghandruk to a junction above the village. The drive is roughly 58 km and takes 3 to 4 hours on a good day. Like the rest of this section, the surface is narrow, steep and partly unpaved, so a high-clearance vehicle with four-wheel drive and a driver who knows the road is worth booking.",
      "Jhinu Danda is small, but it has a strong draw: the natural hot springs on the Jhinu Khola just below the village, which trekkers on the way down to Nayapool usually stop at. The road-head is also convenient for the Poon Hill and Ghorepani treks, so a waiting jeep here is a common way to combine a jeep hire with a short Annapurna trek in one trip.",
      "If you are starting the Annapurna Base Camp trek, most itineraries use Jhinu Danda as the first overnight stop so the walk to Bamboo and Deurali starts at a manageable altitude. We can arrange the jeep, the waiting time in Jhinu, and the return pickup from Nayapool or Siwai as a single booking.",
    ],
    faqs: [
      {
        q: "How long does the jeep ride from Pokhara to Jhinu Danda take?",
        a: "The 58 km climb takes about 3 to 4 hours. The road is steep, narrow and unpaved for much of the way above Ghandruk, so allow extra time during the monsoon and in the early morning when the road can be damp.",
      },
      {
        q: "How much does a Scorpio hire from Pokhara to Jhinu Danda cost?",
        a: "A one-way Scorpio jeep hire from Pokhara to Jhinu Danda is NPR 13,000 (about USD 100), including the driver, fuel and the drop. If the vehicle needs to wait while you trek, we quote the waiting days separately and pick you up from Jhinu, Nayapool or Siwai as convenient.",
      },
      {
        q: "Can I collect a jeep from Jhinu Danda after the Annapurna Base Camp trek?",
        a: "Yes, and most of our ABC trek guests do. The ABC walk finishes at Jhinu Danda, where there are lodges, and the road-head there means we can collect you directly instead of you walking down to Nayapool. Let us know your itinerary and we will time the pickup.",
      },
      {
        q: "What is the road condition from Pokhara to Jhinu Danda?",
        a: "The first part out of Pokhara is paved, but the road becomes narrow, steep and unpaved as it climbs toward Ghandruk and the Jhinu junction. It is passable in a high-clearance vehicle, but in the monsoon expect water, mud and occasional roadblocks. A four-wheel-drive Scorpio is the most reliable option.",
      },
      {
        q: "Is there something to do in Jhinu Danda besides trekking?",
        a: "Yes. The Jhinu hot springs on the Jhinu Khola below the village are a popular stop for trekkers walking out to Nayapool, and the village has a handful of family-run lodges where you can eat and rest. It also works as a quiet overnight stop before starting a longer Annapurna walk.",
      },
      {
        q: "Can the Scorpio carry trekking gear for several days?",
        a: "Yes, a 7-seater Scorpio carries several trekkers with duffel bags for a multi-day walk. Pack soft bags rather than hard wheeled luggage, and tell us in advance if you have a large load, an infant seat or a tent so we send a suitable vehicle.",
      },
    ],
    relatedLinks: [
      { href: "/treks/annapurna-base-camp-trek", label: "Annapurna Base Camp trek" },
      { href: "/trek-packages/annapurna", label: "Annapurna trekking packages" },
      { href: "/treks/ghorepani-poon-hill-trek", label: "Ghorepani and Poon Hill trek" },
    ],
  },
  {
    slug: "pokhara-to-dhampus-scorpio-hire",
    route: "Pokhara to Dhampus",
    origin: "Pokhara",
    destination: "Dhampus",
    image: "/dhampus.jpg",
    meta: "26 km • 1.5 hrs",
    price: 6000,
    usd: 46,
    distance: "26",
    time: "1.5",
    highlights: [
      { label: "Distance", value: "26 km" },
      { label: "Drive time", value: "Approx. 1.5 hours" },
      { label: "Altitude", value: "1,650 m at the village" },
      { label: "Road", value: "Steep hill track, 4WD recommended" },
      { label: "Vehicle", value: "Mahindra Scorpio, 7 seater" },
      { label: "Views", value: "Annapurna, Machhapuchhre & Dhaulagiri" },
    ],
    overview: [
      "Dhampus is a traditional Gurung village perched on a ridge at 1,650 m in the Annapurna foothills, only about 26 km from Pokhara — one of the shortest mountain drives we offer and the easiest way to get a real Himalayan view without a long transfer. From the terraced fields and slate-roofed houses of the village you look across the Pokhara valley to Annapurna, Machhapuchhre (Fishtail) and Hiunchuli, and on a clear morning the Dhaulagiri range and Phewa Lake are visible below.",
      "The jeep leaves Pokhara on the Baglung highway, passes Hemja and Dhikur Pokhari, and then climbs the hill road up to the village. Most of the route is motorable but the final section is steep, narrow and rough — and it turns slippery in the monsoon — so a high-clearance four-wheel-drive Scorpio with a driver who knows the road is the sensible choice. The drive takes roughly an hour to an hour and a half each way.",
      "Dhampus sits on the classic Mardi Himal trekking route and is a short walk from Australian Camp, which makes our Scorpio hire useful as a simple drop-off: drive up, enjoy sunset and sunrise from the ridge, then either walk on or be collected again. The village lies inside the Annapurna Conservation Area, so trekkers continuing beyond Dhampus need an ACAP permit, which is easy to arrange in Pokhara before you leave.",
      "Book the Pokhara to Dhampus jeep hire for an overnight village stay, a short family day trip or as the starting point of the Mardi Himal or Australian Camp walk. Waiting time and the return drive to Pokhara can be added to the same booking whenever you are ready to come back down.",
    ],
    faqs: [
      {
        q: "How long does the drive from Pokhara to Dhampus take?",
        a: "The 26 km run from Pokhara via the Baglung highway and Hemja takes about 1 to 1.5 hours. The last climb into the village is steep and slow, and monsoon rain can add extra time, so allow a little buffer if you are arriving for sunset or breakfast.",
      },
      {
        q: "How much does a Scorpio hire from Pokhara to Dhampus cost?",
        a: "A one-way Scorpio jeep hire from Pokhara to Dhampus is NPR 6,000 (about USD 46), including the driver, fuel and the drop at the village. Waiting time and the return trip to Pokhara are quoted separately depending on how long you need the vehicle.",
      },
      {
        q: "Is the road to Dhampus suitable for a normal car?",
        a: "Only partly. The highway section to Hemja is paved and fine for any vehicle, but the final climb to Dhampus is a steep, narrow and unpaved hill track. We recommend a 4WD Scorpio, especially in the monsoon when the surface becomes muddy and loose.",
      },
      {
        q: "What can I see in Dhampus?",
        a: "Dhampus is known for its terraced farmland, Gurung stone houses and wide mountain views. On a clear day you can see Annapurna, Machhapuchhre, Hiunchuli, Dhaulagiri and the Pokhara valley with Phewa Lake. Sunrise and sunset over the Himalaya from the village ridge are the main draw, and Australian Camp is about an hour's walk away.",
      },
      {
        q: "Do I need an ACAP permit for Dhampus?",
        a: "Dhampus lies inside the Annapurna Conservation Area, so an ACAP permit is required for trekking in the area. It is issued in Pokhara with your passport and a photo, and our team can help you arrange it before departure if you plan to walk beyond the village.",
      },
      {
        q: "Can I combine the Dhampus drive with the Mardi Himal trek?",
        a: "Yes. Dhampus is on the Mardi Himal route and close to Australian Camp, so a common plan is to be dropped in Dhampus, walk to Low Camp or Australian Camp, and be picked up again at the road-head. Tell us your itinerary and we will position the jeep and time the pick-up with you.",
      },
    ],
    relatedLinks: [
      { href: "/trek-packages/annapurna", label: "Annapurna trekking packages" },
      { href: "/tours/pokhara-valley-scenic-tour", label: "Pokhara valley scenic tour" },
      { href: "/tours/pokhara-to-ghandruk-tour", label: "Ghandruk village tour package" },
    ],
  },
  {
    slug: "pokhara-to-landruk-scorpio-hire",
    route: "Pokhara to Landruk",
    origin: "Pokhara",
    destination: "Landruk",
    image: "/landruk.png",
    meta: "Annapurna & Mardi Himal trek base",
    price: 13000,
    usd: 100,
    distance: "50",
    time: "3-4",
    highlights: [
      { label: "Distance", value: "Approx. 50 km" },
      { label: "Drive time", value: "Approx. 3 to 4 hours" },
      { label: "Altitude", value: "1,565 m at the village" },
      { label: "Road", value: "Off-road uphill, 4WD recommended" },
      { label: "Vehicle", value: "Mahindra Scorpio, 7 seater" },
      { label: "Best for", value: "Annapurna Base Camp & Mardi Himal treks" },
    ],
    overview: [
      "Landruk is the Gurung village at 1,565 m on the south bank of the Modi Khola valley, directly opposite Ghandruk, and it is best known as a trekking base: most people who book a Scorpio to Landruk are starting or finishing the Annapurna Base Camp trek or the Mardi Himal trek. From the village the trail drops to the Modi Khola and climbs toward Jhinu Danda and Chhomrong for ABC, or continues up through Forest Camp and Low Camp on the Mardi Himal route.",
      "Because it sits slightly off the main trail, Landruk is quieter than Ghandruk and rewards walkers with one of the best balcony views in the region — Annapurna South (7,219 m), Hiunchuli (6,441 m), Machhapuchhre and, on a clear day, Dhaulagiri across the valley. It also makes a peaceful first or last night on the Ghandruk–Majgaon–Dhampus circuit, with stone houses, terraced fields, prayer flags and a handful of lodges above the river.",
      "The road journey from Pokhara runs along the Baglung highway through Nayapul and Birethanti before climbing into the Modi Khola valley — roughly 50 km in 3 to 4 hours. The track is narrow, steep and unpaved for long stretches, with sharp drops above the river, so a four-wheel-drive Scorpio and an experienced mountain driver are essential rather than optional. In the monsoon expect mud, loose surfaces and the occasional delay.",
      "Landruk is also famous for its honey hunters, who climb bamboo and rope ladders up the cliffs above the Modi Khola to harvest wild honeycomb — something our drivers are happy to explain on the way up. The standard way to use this hire is as a drop-off at the start of your trek, with a pick-up arranged in Landruk or at whichever road-head you finish: Jhinu Danda, Nayapool, Siding or Dhampus. Send us your itinerary and we will plan both legs with you.",
    ],
    faqs: [
      {
        q: "Is Landruk a starting point for the Annapurna Base Camp and Mardi Himal treks?",
        a: "Yes — this is the main reason people drive to Landruk. For Annapurna Base Camp you descend from the village to the Modi Khola, cross at New Bridge and climb to Jhinu Danda and Chhomrong. For the Mardi Himal trek you continue upward through Forest Camp to Low Camp. The village also connects to Ghandruk, Majgaon and Dhampus on the classic Poon Hill circuit, so it works as a start or a finish.",
      },
      {
        q: "How long does the drive from Pokhara to Landruk take?",
        a: "Allow about 3 to 4 hours for the roughly 50 km journey. The jeep follows the Baglung highway toward Nayapul and then climbs the hill track along the Modi Khola valley to the village. The road is slow and rough in places, so it takes longer than the distance suggests.",
      },
      {
        q: "How much does a Scorpio hire from Pokhara to Landruk cost?",
        a: "A one-way Scorpio jeep hire from Pokhara to Landruk is NPR 13,000 (about USD 100), including the experienced driver, fuel and the drop. Return trips, waiting days and pick-ups from further along the trekking trail are quoted separately.",
      },
      {
        q: "What is the road condition from Pokhara to Landruk?",
        a: "The highway section is paved, but the climb into the village is narrow, steep and partly unpaved with sharp drops above the Modi Khola. A high-clearance 4WD vehicle is required, and during the monsoon the track can be muddy and slow — our drivers carry out this route regularly and know every turn.",
      },
      {
        q: "Can I get a ride back to Pokhara after trekking?",
        a: "Yes. Arrange a waiting jeep or a return pick-up when you book — most guests finish at Jhinu Danda, Nayapool, Siding or Dhampus rather than walking back into Landruk. Send us your trek itinerary and we will arrange the pick-up village, day and time with you.",
      },
      {
        q: "What else is Landruk famous for?",
        a: "Landruk is well known for its honey hunters, who scale the cliffs above the Modi Khola on rope and bamboo ladders to collect wild honey, and for the wide open views of Annapurna South, Hiunchuli and Machhapuchhre from directly across the valley from Ghandruk.",
      },
      {
        q: "Where can I stay in Landruk and when is the best time to go?",
        a: "There are several family lodges and teahouses in the village, including a well-known ridge lodge with ensuite rooms and mountain views. October to November and March to April give the clearest skies for the Annapurna panorama, and spring and autumn are also when the honey-hunting season is most active.",
      },
    ],
    relatedLinks: [
      { href: "/treks/annapurna-base-camp-trek", label: "Annapurna Base Camp trek" },
      { href: "/trek-packages/annapurna", label: "Annapurna trekking packages" },
      { href: "/treks/ghorepani-poon-hill-trek", label: "Ghorepani and Poon Hill trek" },
    ],
  },
];

export function findScorpioRoute(slug: string | undefined) {
  if (!slug) return undefined;
  return scorpioRoutes.find((route) => route.slug === slug);
}

export function scorpioRouteSlugSet() {
  return new Set(scorpioRoutes.map((route) => route.slug));
}
