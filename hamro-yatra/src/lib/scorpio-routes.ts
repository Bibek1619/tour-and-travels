export const scorpioBaseSlug = "scorpio-rent-in-pokhara";

export interface ScorpioRoute {
  slug: string;
  route: string;
  image: string | null;
  meta: string;
  price: number;
  usd: number;
  distance: string;
  time: string;
}

export const scorpioRoutes: ScorpioRoute[] = [
  {
    slug: "pokhara-to-kathmandu-scorpio-hire",
    route: "Pokhara to Kathmandu",
    image: "/pkr-ktm.jpg",
    meta: "200 km • 6 hrs",
    price: 19000,
    usd: 145,
    distance: "200",
    time: "6",
  },
  {
    slug: "pokhara-to-ghandruk-scorpio-hire",
    route: "Pokhara to Ghandruk",
    image: "/ghandruk.jpg",
    meta: "32 km from Pokhara",
    price: 11000,
    usd: 85,
    distance: "32",
    time: "",
  },
  {
    slug: "pokhara-to-ghorepani-scorpio-hire",
    route: "Pokhara to Ghorepani",
    image: "/mustang.jpg",
    meta: "Annapurna foothills",
    price: 11000,
    usd: 85,
    distance: "",
    time: "",
  },
  {
    slug: "pokhara-to-jhinu-danda-scorpio-hire",
    route: "Pokhara to Jhinu Danda",
    image: "/jhinu.jpg",
    meta: "Pokhara to Annapurna",
    price: 11000,
    usd: 85,
    distance: "",
    time: "",
  },
];

export function findScorpioRoute(slug: string | undefined) {
  if (!slug) return undefined;
  return scorpioRoutes.find((route) => route.slug === slug);
}

export function scorpioRouteSlugSet() {
  return new Set(scorpioRoutes.map((route) => route.slug));
}