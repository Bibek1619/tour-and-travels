import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Calendar, Users, Clock, MapPin } from 'lucide-react';

const MustangPackages = ({ vehicles, onSelectVehicle }) => {
  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      weekday: 'short'
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Available Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden hover:shadow-2xl transition-all group">
            <CardHeader className="p-0">
              <div className="relative">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform" 
                />
                {/* Available Seats Badge */}
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {vehicle.availableSeats} Seats Left
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">
                  <Truck size={12} className="mr-1" /> {vehicle.type}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Users size={12} className="mr-1" /> {vehicle.seats} Total
                </Badge>
              </div>
              
              <CardTitle className="mb-2">{vehicle.name}</CardTitle>
              <CardDescription className="mb-4 text-sm">
                {vehicle.description}
              </CardDescription>
              
              <div className="space-y-2 text-sm text-gray-700 border-t pt-3">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-orange-600 flex-shrink-0" />
                  <span className="font-medium">{vehicle.route}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600 flex-shrink-0" />
                  <span><strong>Departs:</strong> {formatDate(vehicle.departureDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-green-600 flex-shrink-0" />
                  <span><strong>Time:</strong> {vehicle.departureTime} ({vehicle.duration})</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0 bg-gray-50">
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    NPR {vehicle.pricePerSeat.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">per seat</p>
                </div>
                <Button 
                  onClick={() => onSelectVehicle(vehicle)}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  View Seats
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MustangPackages;

