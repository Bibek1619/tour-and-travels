import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getRecentBookingsApi } from "@/api/bookingApi";
import { Badge } from "@/components/ui/badge";
import { Clock, User, MapPin, Calendar } from "lucide-react";

const RecentBookings = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recentBookings"],
    queryFn: () => getRecentBookingsApi(10),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const bookings = data?.data || [];

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      confirmed: "bg-green-100 text-green-700 border-green-200",
      cancelled: "bg-red-100 text-red-700 border-red-200",
      completed: "bg-blue-100 text-blue-700 border-blue-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const bookingDate = new Date(date);
    const diffMs = now - bookingDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-muted p-3 rounded-lg h-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
          <p className="text-sm text-muted-foreground">Failed to load bookings</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 border-2 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
          <Badge variant="outline" className="text-xs">
            {bookings.length} total
          </Badge>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking._id || booking.id}
                className="flex items-start justify-between bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-green-600" />
                    <p className="font-semibold text-gray-900">
                      {booking.customerName || booking.name || "Guest"}
                    </p>
                    <Badge className={`text-xs ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3.5 w-3.5 text-green-600" />
                    <span>
                      {booking.tourTitle || booking.tour?.title || booking.vehicleName || "N/A"}
                    </span>
                  </div>

                  {booking.bookingDate && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-green-700">
                    Rs {booking.totalPrice?.toLocaleString() || booking.price?.toLocaleString() || "0"}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(booking.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
