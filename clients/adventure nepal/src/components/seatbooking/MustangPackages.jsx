import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Calendar, Users } from 'lucide-react';

const MustangPackages = ({ onSelectVehicle }) => {
  const packages = [
    {
      id: 1,
      name: 'Scorpio',
      type: 'SUV',
      seats: 7,
      pricePerSeat: 5000,
      route: 'Kathmandu to Upper Mustang (Daily)',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      description: 'Comfortable 7-seater Scorpio for adventure to Mustang. AC, experienced driver.',
    },
    {
      id: 2,
      name: 'EV Van',
      type: 'Electric Van',
      seats: 12,
      pricePerSeat: 4500,
      route: 'Kathmandu to Upper Mustang (Daily Eco)',
      image: 'https://images.unsplash.com/photo-1606698175636-678f6ad18088?w=400',
      description: 'Eco-friendly EV Van, 12 seats. Silent ride, charging stops included.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {packages.map((pkg) => (
        <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-all group">
          <CardHeader className="p-0">
            <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary"><Truck size={14} /> {pkg.type}</Badge>
              <Badge variant="outline"><Users size={14} /> {pkg.seats} Seats</Badge>
            </div>
            <CardTitle>{pkg.name}</CardTitle>
            <CardDescription className="mb-4">{pkg.description}</CardDescription>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{pkg.route}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="text-2xl font-bold text-primary">NPR {pkg.pricePerSeat.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">per seat</p>
              </div>
              <Button onClick={() => onSelectVehicle(pkg)}>View Seats</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MustangPackages;

