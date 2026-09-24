export interface DestinationCardData {
  id: string;
  name: string;
  category: string;
  country: string;
  badge: string;
  image: string;
  hoverImage: string;
  href: string;
}

export const DEFAULT_CARDS: DestinationCardData[] = [
  {
    id: "manang",
    name: "Manang Tour",
    category: "Tour Package",
    country: "Manang, Annapurna Region, Nepal",
    badge: "2N/3D",
    image: "/manang.jpg",
    hoverImage: "/manang.jpg",
    href: "/tours",
  },
  {
    id: "mustang",
    name: "Mustang Tour",
    category: "Tour Package",
    country: "Upper Mustang, Nepal",
    badge: "1N/2D",
    image: "/mustang.jpg",
    hoverImage: "/mustang.jpg",
    href: "/tours",
  },
  {
    id: "scorpio",
    name: "Scorpio Rent in Pokhara",
    category: "Vehicle Rent",
    country: "Pokhara, Nepal",
    badge: "With Driver",
    image: "/car%20rent.jpg",
    hoverImage: "/car%20rent.jpg",
    href: "/vehicles/scorpio-rent-in-pokhara",
  },
  {
    id: "annapurna",
    name: "Annapurna Trek Package",
    category: "Trekking",
    country: "Annapurna Region, Nepal",
    badge: "Multi-Day Trek",
    image: "/annapurna.jpg",
    hoverImage: "/annapurna.jpg",
    href: "/treks",
  },
  {
    id: "paragliding",
    name: "Paragliding in Pokhara",
    category: "Adventure",
    country: "Phewa Lake, Pokhara",
    badge: "Tandem Flights",
    image: "/paraglding.jpg",
    hoverImage: "/paraglding.jpg",
    href: "/adventures/paragliding",
  },
];