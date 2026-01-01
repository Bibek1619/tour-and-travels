import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Star, Heart, Share2 } from "lucide-react"

export default function TourHeader({ tour }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="bg-emerald-100 text-green-700">
              {tour.difficulty}
            </Badge>
            <Badge variant="outline">Restricted Area</Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            {tour.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4 text-green-600" />
              {tour.location}
            </span>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{tour.rating}</span>
              <span className="text-muted-foreground">
                ({tour.reviews} reviews)
              </span>
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="icon" variant="outline" className="rounded-full">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
