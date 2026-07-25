import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Receipt, Armchair } from 'lucide-react';

const TripDetails = ({ vehicle, selectedSeats }) => {
  const totalPrice = selectedSeats.length * vehicle.pricePerSeat;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Receipt className="w-5 h-5" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Seats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Seats Selected</span>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {selectedSeats.length}
            </Badge>
          </div>
          
          {selectedSeats.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Armchair className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Your Seats:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.sort((a, b) => a - b).map((seat) => (
                  <Badge key={seat} className="bg-orange-500 text-white">
                    Seat {seat}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price per seat</span>
            <span className="font-medium">NPR {vehicle.pricePerSeat.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Number of seats</span>
            <span className="font-medium">× {selectedSeats.length}</span>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t-2">
            <span className="text-lg font-semibold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-orange-600">
              NPR {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Note */}
        {selectedSeats.length === 0 && (
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-800">
              Select your preferred seats from the seat map to continue
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TripDetails;

