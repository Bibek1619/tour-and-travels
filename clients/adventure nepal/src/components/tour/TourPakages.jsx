import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, MapPin, TrendingUp, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

export  default function TourPackages() {
  const tours = [
    {
      id: 1,
      slug: "mustang-adventure",
      title: "Upper Mustang Adventure Tour",
      image: "/mustang-nepal-landscape.jpg",
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
      image: "/pokhara-phewa-lake-nepal.jpg",
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
      slug: "everest-base-camp",
      title: "Everest Base Camp Trek",
      image: "/everest-base-camp-trek.jpg",
      price: 1250,
      duration: "14 Days",
      reviews: 156,
      difficulty: "Challenging",
      location: "Khumbu Region",
      maxAltitude: "5,364m",
      groupSize: "2-15 people",
      bestSeason: "Mar-May, Sep-Nov",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <Card
          key={tour.id}
          className="overflow-hidden group hover:shadow-xl transition-all"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />

            <Badge className="absolute top-3 left-3">{tour.difficulty}</Badge>

            <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-md">
              <p className="font-bold">
                ${tour.price}
                <span className="text-xs text-muted-foreground"> / Person</span>
              </p>
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{tour.location}</span>
            </div>

            <h3 className="font-semibold text-lg mb-2">{tour.title}</h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm text-muted-foreground ml-1">({tour.reviews})</span>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
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
            <Link to={`/tours/${tour.slug}`}>
              <Button className="w-full">View Details</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
