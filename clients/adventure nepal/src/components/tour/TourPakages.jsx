import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, MapPin, TrendingUp, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

export default function TourPackages() {
  const tours = [
    {
      id: 1,
      slug: "mustang-adventure",
      title: "Upper Mustang Adventure Tour",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS9oNV6AC5UYb5uzgJ0UeiIxrGT919jwsh4Q&s",
      price: 750,
      duration: "12 Days",
      reviews: 48,
      difficulty: "Moderate",
      location: "Upper Mustang",
      maxAltitude: "3,800m",
      groupSize: "2-12 people",
      bestSeason: "Mar-Nov",
    },
    {
      id: 2,
      slug: "pokhara-sightseeing",
      title: "Pokhara Valley Sightseeing",
      image: "https://berqwp-cdn.sfo3.cdn.digitaloceanspaces.com/cache/www.himalayanglacier.com/wp-content/uploads/2021/06/Colorful-boats-in-Fewa-Taal-Pokhara.jpg?bwp",
      price: 395,
      duration: "5 Days",
      reviews: 67,
      difficulty: "Easy",
      location: "Pokhara Valley",
      maxAltitude: "1,400m",
      groupSize: "2-20 people",
      bestSeason: "Year-round",
    },
    {
      id: 3,
      slug: "dhorpatan wildlife",
      title: " Dhorpatan Wildlife Expedition",
      image: "https://himalayan-masters.com/wp-content/uploads/2023/10/Majestic-mountain-seen-from-Dhorpatan-Hunting-Reserve-in-Nepal.webp",
      price: 1250,
      duration: "4 Days",
      reviews: 156,
      difficulty: "Challenging",
      location: "baglung",
      maxAltitude: "4,364m",
      groupSize: "2-15 people",
      bestSeason: "Mar-May, Sep-Nov",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <Card
          key={tour.id}
          className="overflow-hidden group hover:shadow-xl transition-all duration-300"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />

            <Badge className="absolute top-3 left-3">
              {tour.difficulty}
            </Badge>
          </div>

          {/* Content */}
          <CardContent className="p-5 space-y-3">
            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {tour.location}
            </div>

            {/* Title + Price */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-lg leading-snug">
                {tour.title}
              </h3>

              <div className="text-right shrink-0">
                <p className="text-lg font-extrabold text-green-700">
                  RS {tour.price}
                </p>
                <span className="text-xs text-muted-foreground">
                  per person
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                ({tour.reviews})
              </span>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {tour.duration}
              </div>

              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {tour.groupSize}
              </div>

              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {tour.maxAltitude}
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {tour.bestSeason}
              </div>
            </div>

            {/* Button */}
            <Link to={`/tours/${tour.slug}`} className="block pt-3">
              <Button className="w-full">View Details</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
