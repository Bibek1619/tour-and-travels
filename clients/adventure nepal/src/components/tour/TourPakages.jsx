import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllToursApi } from "@/api/tourApi"; // make sure the path is correct

export default function TourPackages() {
  // Fetch tours using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getAllToursApi(), // no params, but you can pass them if needed
  });
  const tours = data?.data || []; // or data?.tours depending on your API

  if (isLoading) return <div>Loading tours...</div>;
  if (isError) return <div>Error: {error.message}</div>;

 const BASE_URL = "http://localhost:5000";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <Card
          key={tour.id}
          className="overflow-hidden hover:shadow-xl transition bg-blue-50"
        >
          <div className="h-56 overflow-hidden relative">
  {tour.images?.length > 0 && (
 <img
  src={`${BASE_URL}/images/${tour.images[0].split("/").pop()}`}
  alt={tour.title}
  className="w-full h-full object-cover hover:scale-110 transition"
/>
)}
            <Badge className="absolute top-3 left-3">{tour.difficulty}</Badge>
          </div>

          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-green-700" />
              {tour.location}
            </div>

            <h3 className="font-semibold text-lg text-foreground">{tour.title}</h3>

            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm">
               {tour.rating} ({tour.reviewsCount})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <Clock className="h-4 w-4 text-green-700" />
                {tour.durationDays}
              </span>
              <span className="flex gap-1">
                <Users className="h-4 w-4 text-green-700" />
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
  );
}