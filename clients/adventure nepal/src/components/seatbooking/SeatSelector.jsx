import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCheck } from 'lucide-react';
import { Button } from '../ui/button';

const SeatSelector = ({ vehicle, selectedSeats, onToggleSeat }) => {
  const [seatsStatus] = useState(() => {
    // Mock seat statuses per vehicle (4x5 grid = 20 seats)
    const statuses = Array(20).fill('free');
    const reservedCount = Math.floor(Math.random() * 5) + 2;
    const bookedCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < bookedCount; i++) {
      statuses[Math.floor(Math.random() * 20)] = 'booked';
    }
    for (let i = 0; i < reservedCount; i++) {
      let idx;
      do {
        idx = Math.floor(Math.random() * 20);
      } while (statuses[idx] === 'booked');
      statuses[idx] = 'reserved';
    }
    return statuses;
  });

  const getSeatClass = (status, isSelected) => {
    let base = 'w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all cursor-pointer hover:scale-105 mx-1 my-1 shadow-md';
    if (isSelected) return base + ' bg-blue-500 border-blue-600 text-white shadow-lg';
    switch (status) {
      case 'free': return base + ' bg-emerald-500 border-emerald-600 text-white hover:bg-emerald-600';
      case 'reserved': return base + ' bg-amber-500 border-amber-600 text-white hover:bg-amber-600';
      case 'booked': return base + ' bg-red-500 border-red-600 text-white cursor-not-allowed opacity-75';
      default: return base + ' bg-gray-200 border-gray-300';
    }
  };

  const seatNumber = (row, col) => row * 5 + col + 1;

  const availableSeats = seatsStatus.filter(s => s === 'free').length;
  const selectedCount = selectedSeats.length;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          Select Seats - {vehicle.name}
        </CardTitle>
        <div className="flex gap-4 text-sm">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200">
            Free: {availableSeats}
          </Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
            Reserved
          </Badge>
          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
            Booked
          </Badge>
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Selected: {selectedCount}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-5 gap-1 p-4 bg-gradient-to-b from-gray-50 to-white rounded-lg border">
          {Array(4).fill().map((_, row) => (
            <div key={row} className="flex justify-center mb-1">
              {Array(5).fill().map((_, col) => {
                const idx = row * 5 + col;
                const status = seatsStatus[idx];
                const seatNum = seatNumber(row, col);
                const isSelected = selectedSeats.includes(seatNum);
                const isSelectable = status === 'free' || isSelected;

                return (
                  <div
                    key={seatNum}
                    className={getSeatClass(status, isSelected)}
                    onClick={() => isSelectable && onToggleSeat(seatNum, isSelected)}
                    title={`Seat ${seatNum}: ${status}${isSelected ? ' (selected)' : ''}`}
                  >
                    {seatNum}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-emerald-500 rounded-sm" />
            <span>Free</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-amber-500 rounded-sm" />
            <span>Reserved</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-500 rounded-sm" />
            <span>Booked</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeatSelector;

