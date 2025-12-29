import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Button,
} from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Star,
  Clock,
  Users,
  MapPin,
  TrendingUp,
  Calendar,
  Check,
  X,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react"

export default function TourDetailContent() {
  const tour = {
    title: "Upper Mustang Adventure Tour",
    images: [
      "/mustang-nepal-landscape.jpg",
      "/mustang-monastery.jpg",
      "/mustang-landscape-2.jpg",
      "/mustang-village.jpg",
    ],
    price: 750,
    duration: "12 Days",
    reviews: 48,
    difficulty: "Moderate",
    location: "Upper Mustang",
    maxAltitude: "3,800m",
    groupSize: "2-12 people",
    bestSeason: "March to November",
    overview:
      "Experience the ancient kingdom of Lo in Upper Mustang...",
    highlights: [
      "Explore Lo Manthang",
      "Ancient monasteries",
      "Tibetan culture",
      "Desert landscapes",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Hotel transfer" },
      { day: 2, title: "Fly to Pokhara", description: "Scenic flight" },
    ],
    included: ["Hotel", "Guide", "Permits"],
    excluded: ["Visa", "Insurance"],
  }

  return (
    <main className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>

        <img
          src={tour.images[0]}
          alt={tour.title}
          className="w-full h-[400px] object-cover rounded-lg"
        />

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="included">Included</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <p className="text-muted-foreground">{tour.overview}</p>
          </TabsContent>

          <TabsContent value="itinerary">
            {tour.itinerary.map((i) => (
              <div key={i.day}>
                <strong>Day {i.day}:</strong> {i.title}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="included">
            <ul>
              {tour.included.map((i, idx) => (
                <li key={idx}>✔ {i}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
