import { Card, CardContent } from "@/components/ui/card";

const RecentBookings = () => {
  // Dummy data (replace with API later)
  const bookings = [
    {
      id: 1,
      name: "Rahul Sharma",
      tour: "Pokhara Tour",
      date: "2 mins ago",
    },
    {
      id: 2,
      name: "Sita Thapa",
      tour: "Kathmandu City Tour",
      date: "10 mins ago",
    },
    {
      id: 3,
      name: "John Doe",
      tour: "Chitwan Safari",
      date: "1 hour ago",
    },
  ];

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">
          Recent Bookings
        </h2>

        <div className="space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex justify-between items-center bg-muted p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{booking.name}</p>
                <p className="text-sm text-muted-foreground">
                  Booked {booking.tour}
                </p>
              </div>

              <span className="text-xs text-muted-foreground">
                {booking.date}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
