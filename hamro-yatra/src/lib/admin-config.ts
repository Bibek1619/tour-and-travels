export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "date"
  | "list"
  | "rows"
  | "images"
  | "image"
  | "video";

export interface FieldOption {
  value: string;
  label: string;
}

export type RowColumnMediaType = "image" | "video" | "media";

export interface RowColumn {
  key: string;
  label: string;
  type?: RowColumnMediaType;
  folder?: string;
  options?: FieldOption[];
}

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: FieldOption[];
  dynamic?: string;
  columns?: RowColumn[];
  required?: boolean;
  help?: string;
  folder?: string;
}

export interface FieldGroup {
  title: string;
  fields: FieldDef[];
}

export interface AdminEntityConfig {
  entity: string;
  label: string;
  apiBase: string;
  groups: FieldGroup[];
}

export const TOUR_STATUS_OPTIONS: FieldOption[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

export const CATEGORY_OPTIONS: FieldOption[] = [
  { value: "tour", label: "Tour" },
  { value: "trek", label: "Trek" },
  { value: "vehicle-tour", label: "Vehicle Tour" },
];

export const VEHICLE_CATEGORY_OPTIONS: FieldOption[] = [
  { value: "car", label: "Car" },
  { value: "bike", label: "Bike" },
  { value: "jeep", label: "Jeep" },
  { value: "van", label: "Van" },
  { value: "bus", label: "Bus" },
];

export const FUEL_TYPE_OPTIONS: FieldOption[] = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
];

export const ADVENTURE_CATEGORY_OPTIONS: FieldOption[] = [
  { value: "rafting", label: "Rafting" },
  { value: "kayaking", label: "Kayaking" },
  { value: "paragliding", label: "Paragliding" },
  { value: "bungee", label: "Bungee" },
  { value: "zipline", label: "Zipline" },
  { value: "canyoning", label: "Canyoning" },
];

export const DIFFICULTY_OPTIONS: FieldOption[] = [
  { value: "Easy", label: "Easy" },
  { value: "Moderate", label: "Moderate" },
  { value: "Hard", label: "Hard" },
  { value: "Expert", label: "Expert" },
];

export const ROUTE_STATUS_OPTIONS: FieldOption[] = [
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const ENQUIRY_STATUS_OPTIONS: FieldOption[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
  { value: "closed", label: "Closed" },
];

export const REVIEW_STATUS_OPTIONS: FieldOption[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
];

export const BOOKING_STATUS_OPTIONS: FieldOption[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "closed", label: "Closed" },
];

export const BOOKING_TYPE_OPTIONS: FieldOption[] = [
  { value: "vehicle", label: "Vehicle" },
  { value: "seat", label: "Seat" },
];

const tourGroups: FieldGroup[] = [
  {
    title: "Basics",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "category", label: "Category", type: "select", options: CATEGORY_OPTIONS },
      { name: "status", label: "Status", type: "select", options: TOUR_STATUS_OPTIONS },
      { name: "location", label: "Location", type: "text" },
      { name: "difficulty", label: "Difficulty", type: "text" },
      { name: "durationDays", label: "Duration (days)", type: "number" },
      { name: "price", label: "Price ($)", type: "number" },
      { name: "maxAltitude", label: "Max Altitude", type: "text" },
      { name: "bestSeason", label: "Best Season", type: "text" },
      { name: "rating", label: "Rating", type: "number" },
      { name: "reviewsCount", label: "Reviews Count", type: "number" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  {
    title: "Overview",
    fields: [
      { name: "shortOverview", label: "Short Overview", type: "textarea" },
      { name: "fullOverview.intro", label: "Intro", type: "textarea" },
      { name: "fullOverview.geography", label: "Geography", type: "textarea" },
      { name: "fullOverview.culture", label: "Culture", type: "textarea" },
      { name: "fullOverview.specialPlaces", label: "Special Places", type: "textarea" },
      { name: "fullOverview.trekking", label: "Trekking", type: "textarea" },
      { name: "fullOverview.bestTime", label: "Best Time", type: "textarea" },
      { name: "fullOverview.permits", label: "Permits", type: "textarea" },
      { name: "fullOverview.conservation", label: "Conservation", type: "textarea" },
    ],
  },
  {
    title: "Content",
    fields: [
      { name: "highlights", label: "Highlights (one per line)", type: "list" },
      { name: "included", label: "Included (one per line)", type: "list" },
      { name: "excluded", label: "Excluded (one per line)", type: "list" },
      { name: "images", label: "Image URLs (one per line)", type: "images" },
      {
        name: "itinerary",
        label: "Itinerary (Day [TAB] Title [TAB] Description per line)",
        type: "rows",
        columns: [
          { key: "day", label: "Day" },
          { key: "title", label: "Title" },
          { key: "desc", label: "Description" },
        ],
      },
    ],
  },
];

const trekGroups: FieldGroup[] = [
  {
    title: "Basics",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "category", label: "Category", type: "select", options: CATEGORY_OPTIONS },
      { name: "status", label: "Status", type: "select", options: TOUR_STATUS_OPTIONS },
      { name: "location", label: "Location", type: "text" },
      { name: "difficulty", label: "Difficulty", type: "text" },
      { name: "durationDays", label: "Duration (days)", type: "number" },
      { name: "price", label: "Price ($)", type: "number" },
      { name: "maxAltitude", label: "Max Altitude", type: "text" },
      { name: "bestSeason", label: "Best Season", type: "text" },
      { name: "region", label: "Region", type: "select", dynamic: "regions" },
      { name: "rating", label: "Rating", type: "number" },
      { name: "reviewsCount", label: "Reviews Count", type: "number" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  {
    title: "Overview",
    fields: [
      { name: "shortOverview", label: "Short Overview", type: "textarea" },
      { name: "fullOverview.intro", label: "Intro", type: "textarea" },
      { name: "fullOverview.geography", label: "Geography", type: "textarea" },
      { name: "fullOverview.culture", label: "Culture", type: "textarea" },
      { name: "fullOverview.specialPlaces", label: "Special Places", type: "textarea" },
      { name: "fullOverview.trekking", label: "Trekking", type: "textarea" },
      { name: "fullOverview.bestTime", label: "Best Time", type: "textarea" },
      { name: "fullOverview.permits", label: "Permits", type: "textarea" },
      { name: "fullOverview.conservation", label: "Conservation", type: "textarea" },
    ],
  },
  {
    title: "Content",
    fields: [
      { name: "highlights", label: "Highlights (one per line)", type: "list" },
      { name: "included", label: "Included (one per line)", type: "list" },
      { name: "excluded", label: "Excluded (one per line)", type: "list" },
      { name: "images", label: "Image URLs (one per line)", type: "images" },
      {
        name: "itinerary",
        label: "Itinerary (Day [TAB] Title [TAB] Description per line)",
        type: "rows",
        columns: [
          { key: "day", label: "Day" },
          { key: "title", label: "Title" },
          { key: "desc", label: "Description" },
        ],
      },
    ],
  },
];

const vehicleGroups: FieldGroup[] = [
  {
    title: "Vehicle Details",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: VEHICLE_CATEGORY_OPTIONS },
      { name: "fuelType", label: "Fuel Type", type: "select", options: FUEL_TYPE_OPTIONS },
      { name: "brand", label: "Brand", type: "text" },
      { name: "model", label: "Model", type: "text" },
      { name: "dailyRate", label: "Daily Rate ($)", type: "number" },
      { name: "capacity", label: "Capacity", type: "number" },
      { name: "luggage", label: "Luggage", type: "text" },
      { name: "bestFor", label: "Best For", type: "text" },
      { name: "availableCount", label: "Available Count", type: "number" },
      { name: "isAvailable", label: "Available", type: "checkbox" },
      { name: "features", label: "Features (one per line)", type: "list" },
      { name: "images", label: "Image URLs (one per line)", type: "images" },
    ],
  },
];

const adventureGroups: FieldGroup[] = [
  {
    title: "Adventure Details",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "category", label: "Category", type: "select", options: ADVENTURE_CATEGORY_OPTIONS },
      { name: "status", label: "Status", type: "select", options: TOUR_STATUS_OPTIONS },
      { name: "location", label: "Location", type: "text" },
      { name: "duration", label: "Duration", type: "text" },
      { name: "difficulty", label: "Difficulty", type: "select", options: DIFFICULTY_OPTIONS },
      { name: "minAge", label: "Min Age", type: "number" },
      { name: "price", label: "Price (NPR)", type: "number" },
      { name: "bestSeason", label: "Best Season", type: "text" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "safetyInfo", label: "Safety Info", type: "textarea" },
      { name: "shortDescription", label: "Short Description", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    title: "Group & Content",
    fields: [
      { name: "groupSize.min", label: "Group Min", type: "number" },
      { name: "groupSize.max", label: "Group Max", type: "number" },
      { name: "included", label: "Included (one per line)", type: "list" },
      { name: "excluded", label: "Excluded (one per line)", type: "list" },
      { name: "requirements", label: "Requirements (one per line)", type: "list" },
      { name: "images", label: "Image URLs (one per line)", type: "images" },
    ],
  },
];

const dailyRouteGroups: FieldGroup[] = [
  {
    title: "Route Details",
    fields: [
      { name: "routeName", label: "Route Name", type: "text", required: true },
      { name: "vehicle", label: "Vehicle", type: "select", dynamic: "vehicles" },
      { name: "status", label: "Status", type: "select", options: ROUTE_STATUS_OPTIONS },
      { name: "departureDate", label: "Departure Date", type: "date" },
      { name: "returnDate", label: "Return Date", type: "date" },
      { name: "duration", label: "Duration", type: "text" },
      { name: "price", label: "Price ($)", type: "number" },
      { name: "totalSeats", label: "Total Seats", type: "number" },
      { name: "availableSeats", label: "Available Seats", type: "number" },
      { name: "featured", label: "Featured", type: "checkbox" },
    ],
  },
  {
    title: "Stops",
    fields: [
      { name: "departure.location", label: "Departure Location", type: "text" },
      { name: "departure.time", label: "Departure Time", type: "text" },
      { name: "arrival.location", label: "Arrival Location", type: "text" },
      { name: "arrival.time", label: "Arrival Time", type: "text" },
      { name: "stops", label: "Stops (one per line)", type: "list" },
      { name: "amenities", label: "Amenities (one per line)", type: "list" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
];

const enquiryGroups: FieldGroup[] = [
  {
    title: "Enquiry Details",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "numberOfPeople", label: "Number Of People", type: "number" },
      { name: "packageName", label: "Package Name", type: "text" },
      { name: "packageType", label: "Package Type", type: "text" },
      { name: "status", label: "Status", type: "select", options: ENQUIRY_STATUS_OPTIONS },
      { name: "comment", label: "Comment", type: "textarea" },
    ],
  },
];

const bookingGroups: FieldGroup[] = [
  {
    title: "Booking Details",
    fields: [
      { name: "packageName", label: "Package", type: "text" },
      { name: "packageType", label: "Booking Type", type: "select", options: BOOKING_TYPE_OPTIONS },
      { name: "status", label: "Status", type: "select", options: BOOKING_STATUS_OPTIONS },
      { name: "numberOfPeople", label: "Number Of People", type: "number" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "destination", label: "Destination", type: "text" },
      { name: "pickupLocation", label: "Pickup Location", type: "text" },
      { name: "seats", label: "Seat Numbers", type: "text" },
      { name: "days", label: "Days", type: "number" },
      { name: "dailyRate", label: "Daily Rate (NPR)", type: "number" },
      { name: "totalPrice", label: "Total Price (NPR)", type: "number" },
      { name: "comment", label: "Message", type: "textarea" },
      { name: "termsAgreed", label: "Terms Agreed", type: "checkbox" },
    ],
  },
  {
    title: "Contact Details",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone Number", type: "text", required: true },
      { name: "location", label: "Location", type: "text" },
    ],
  },
];

const reviewGroups: FieldGroup[] = [
  {
    title: "Review Details",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "title", label: "Title", type: "text" },
      { name: "rating", label: "Rating", type: "number" },
      { name: "status", label: "Status", type: "select", options: REVIEW_STATUS_OPTIONS },
      { name: "featuredOnHomepage", label: "Featured On Homepage", type: "checkbox" },
      { name: "review", label: "Review", type: "textarea" },
    ],
  },
];

const CUSTOM_TRIP_TYPE_OPTIONS: FieldOption[] = [
  { value: "trek", label: "Trek" },
  { value: "tour", label: "Tour" },
  { value: "other", label: "Other" },
];

const customTripGroups: FieldGroup[] = [
  {
    title: "Trip Details",
    fields: [
      { name: "tripType", label: "Trip Type", type: "select", options: CUSTOM_TRIP_TYPE_OPTIONS, required: true },
      { name: "customTripType", label: "Custom Trip Type", type: "text" },
      { name: "place", label: "Place To Visit", type: "text" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "numberOfPeople", label: "Number Of People", type: "number" },
      { name: "notes", label: "Notes", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: ENQUIRY_STATUS_OPTIONS },
    ],
  },
  {
    title: "Contact Details",
    fields: [
      { name: "email", label: "Email", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "text", required: true },
    ],
  },
];

export const ADMIN_CONFIG: Record<string, AdminEntityConfig> = {
  tours: { entity: "tours", label: "Tour", apiBase: "/api/tours", groups: tourGroups },
  treks: { entity: "treks", label: "Trek", apiBase: "/api/tours", groups: trekGroups },
  vehicles: { entity: "vehicles", label: "Vehicle", apiBase: "/api/vehicles", groups: vehicleGroups },
  adventures: { entity: "adventures", label: "Adventure", apiBase: "/api/adventures", groups: adventureGroups },
  "daily-routes": { entity: "daily-routes", label: "Daily Route", apiBase: "/api/daily-routes", groups: dailyRouteGroups },
  enquiries: { entity: "enquiries", label: "Enquiry", apiBase: "/api/enquiries", groups: enquiryGroups },
  bookings: { entity: "bookings", label: "Booking Request", apiBase: "/api/bookings", groups: bookingGroups },
  "custom-trips": { entity: "custom-trips", label: "Custom Trip", apiBase: "/api/custom-trips", groups: customTripGroups },
  reviews: { entity: "reviews", label: "Review", apiBase: "/api/reviews", groups: reviewGroups },
};

export function getPath(obj: unknown, path: string): unknown {
  const keys = path.split(".");
  let cur: unknown = obj;
  for (const key of keys) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[key];
  }
  return cur;
}

export function setPath(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
) {
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof cur[key] !== "object" || cur[key] === null) {
      cur[key] = {};
    }
    cur = cur[key] as Record<string, unknown>;
  }
  cur[keys[keys.length - 1]] = value;
}