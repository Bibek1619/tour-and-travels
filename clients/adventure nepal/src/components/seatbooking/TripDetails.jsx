import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, CarFront } from 'lucide-react';

const TripDetails = ({ vehicle, selectedSeats }) => {
  const totalPrice = selectedSeats.length * vehicle.pricePerSeat;
  const departureTime = '05:00 AM Daily';

  return (
    <Card className="w-full lg:w-80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Trip Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CarFront size={16} />
            <span>{vehicle.name} - {vehicle.type}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={16} />
            <span>Capacity: {vehicle.seats} seats</span>
          </div>
        </div>

        <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold flex items-center gap-2">
            <MapPin size={18} />
            Route
          </h3>
          <p className="text-sm">Kathmandu → Pokhara → Upper Mustang</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={14} />
            <span>{departureTime} | ~14 hours drive</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Seats Selected:</span>
            <Badge>{selectedSeats.length}</Badge>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-primary">NPR {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Experienced Mustang driver</li>
          <li>• AC / Heater</li>
          <li>• Road permits included</li>
          <li>• Free water bottles</li>
          <li>• Breakdown assistance 24/7</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default TripDetails;

