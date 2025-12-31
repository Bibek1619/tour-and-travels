import { tours } from "../../data/toursData"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function TourPackages() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <Card key={tour.id} className="overflow-hidden hover:shadow-xl transitio bg-green-100/75">
          <div className="h-56 overflow-hidden relative">
            <img
              src={tour.images[0]}
              alt={tour.title}
              className="w-full h-full object-cover hover:scale-110 transition"
            />
            <Badge className="absolute top-3 left-3">
              {tour.difficulty}
            </Badge>
          </div>

          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {tour.location}
            </div>

            <h3 className="font-semibold text-lg">{tour.title}</h3>

            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm">
                {tour.rating} ({tour.reviews})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <Clock className="h-4 w-4" />
                {tour.duration}
              </span>
              <span className="flex gap-1">
                <Users className="h-4 w-4" />
                {tour.groupSize}
              </span>
            </div>

            <Link to={`/tours/${tour.slug}`}>
              <Button className="w-full bg-green-700 text-white hover:bg-green-600">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
