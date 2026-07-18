import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCheck, User } from 'lucide-react';

const SeatSelector = ({ vehicle, selectedSeats, onToggleSeat }) => {
  // Get booked seats from vehicle data
  const bookedSeats = vehicle.bookedSeats || [];
  
  // Calculate available seats
  const availableSeatsCount = vehicle.seats - bookedSeats.length;

  const getSeatClass = (seatNum, isBooked, isSelected) => {
    let base = 'w-14 h-14 rounded-lg border-2 flex items-center justify-center text-sm font-semibold transition-all cursor-pointer hover:scale-105 shadow';
    
    if (isBooked) {
      return base + ' bg-gray-400 border-gray-500 text-white cursor-not-allowed opacity-75';
    }
    if (isSelected) {
      return base + ' bg-orange-500 border-orange-600 text-white shadow-lg scale-105';
    }
    return base + ' bg-blue-500 border-blue-600 text-white hover:bg-blue-600';
  };

  // Bus Layout (18 seats) - like the image you showed
  const renderBusLayout = () => {
    const seats = [];
    let seatNum = 1;

    return (
      <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl p-6 border-4 border-gray-400" style={{ minWidth: '320px' }}>
        {/* Windshield */}
        <div className="bg-gray-300 h-4 rounded-t-full mb-6 mx-4"></div>
        
        {/* Driver section */}
        <div className="flex justify-end mb-6 px-4">
          <div className="w-14 h-14 bg-yellow-400 border-2 border-yellow-500 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-gray-800" />
          </div>
        </div>

        {/* Seats - Bus style: 2 columns (A and B rows) */}
        <div className="space-y-3">
          {/* Row 1-8: Single seats on left, double seats on right */}
          {[...Array(8)].map((_, rowIndex) => {
            const leftSeat = rowIndex + 1; // A1-A8
            const rightSeat1 = rowIndex + 9; // B1-B8 (seats 9-16)
            const rightSeat2 = rowIndex + 17; // B9-B16 (seats 17-18 only for first 2 rows)
            
            return (
              <div key={rowIndex} className="flex justify-between items-center gap-12 px-4">
                {/* Left column - Single seat */}
                <div
                  className={getSeatClass(
                    leftSeat,
                    bookedSeats.includes(leftSeat),
                    selectedSeats.includes(leftSeat)
                  )}
                  onClick={() => {
                    if (!bookedSeats.includes(leftSeat)) {
                      onToggleSeat(leftSeat, selectedSeats.includes(leftSeat));
                    }
                  }}
                  title={`Seat A${rowIndex + 1}`}
                >
                  A{rowIndex + 1}
                </div>

                {/* Right column - Double seats */}
                <div className="flex gap-2">
                  {rightSeat1 <= vehicle.seats && (
                    <div
                      className={getSeatClass(
                        rightSeat1,
                        bookedSeats.includes(rightSeat1),
                        selectedSeats.includes(rightSeat1)
                      )}
                      onClick={() => {
                        if (!bookedSeats.includes(rightSeat1)) {
                          onToggleSeat(rightSeat1, selectedSeats.includes(rightSeat1));
                        }
                      }}
                      title={`Seat B${rowIndex + 1}`}
                    >
                      B{rowIndex + 1}
                    </div>
                  )}
                  {rightSeat2 <= vehicle.seats && rowIndex < 2 && (
                    <div
                      className={getSeatClass(
                        rightSeat2,
                        bookedSeats.includes(rightSeat2),
                        selectedSeats.includes(rightSeat2)
                      )}
                      onClick={() => {
                        if (!bookedSeats.includes(rightSeat2)) {
                          onToggleSeat(rightSeat2, selectedSeats.includes(rightSeat2));
                        }
                      }}
                      title={`Seat B${rowIndex + 9}`}
                    >
                      B{rowIndex + 9}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Last row for any remaining seats */}
        {vehicle.seats > 16 && (
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(vehicle.seats - 16)].map((_, idx) => {
              const seatNum = 17 + idx;
              return (
                <div
                  key={seatNum}
                  className={getSeatClass(
                    seatNum,
                    bookedSeats.includes(seatNum),
                    selectedSeats.includes(seatNum)
                  )}
                  onClick={() => {
                    if (!bookedSeats.includes(seatNum)) {
                      onToggleSeat(seatNum, selectedSeats.includes(seatNum));
                    }
                  }}
                  title={`Seat ${seatNum}`}
                >
                  {seatNum}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // SUV Layout (7 seats)
  const renderSUVLayout = () => {
    return (
      <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl p-6 border-4 border-gray-400" style={{ minWidth: '280px' }}>
        {/* Windshield */}
        <div className="bg-gray-300 h-4 rounded-t-full mb-6 mx-4"></div>
        
        {/* Driver section */}
        <div className="flex justify-between mb-6 px-4">
          <div className="w-14 h-14 bg-yellow-400 border-2 border-yellow-500 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-gray-800" />
          </div>
          {/* Seat 1 - Front passenger */}
          <div
            className={getSeatClass(1, bookedSeats.includes(1), selectedSeats.includes(1))}
            onClick={() => {
              if (!bookedSeats.includes(1)) {
                onToggleSeat(1, selectedSeats.includes(1));
              }
            }}
            title="Seat 1 - Front"
          >
            1
          </div>
        </div>

        {/* Middle row - 3 seats */}
        <div className="flex justify-center gap-3 mb-6">
          {[2, 3, 4].map((seatNum) => (
            <div
              key={seatNum}
              className={getSeatClass(seatNum, bookedSeats.includes(seatNum), selectedSeats.includes(seatNum))}
              onClick={() => {
                if (!bookedSeats.includes(seatNum)) {
                  onToggleSeat(seatNum, selectedSeats.includes(seatNum));
                }
              }}
              title={`Seat ${seatNum} - Middle`}
            >
              {seatNum}
            </div>
          ))}
        </div>

        {/* Back row - 3 seats */}
        <div className="flex justify-center gap-3">
          {[5, 6, 7].map((seatNum) => (
            <div
              key={seatNum}
              className={getSeatClass(seatNum, bookedSeats.includes(seatNum), selectedSeats.includes(seatNum))}
              onClick={() => {
                if (!bookedSeats.includes(seatNum)) {
                  onToggleSeat(seatNum, selectedSeats.includes(seatNum));
                }
              }}
              title={`Seat ${seatNum} - Back`}
            >
              {seatNum}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Van Layout (12 seats)
  const renderVanLayout = () => {
    return (
      <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl p-6 border-4 border-gray-400" style={{ minWidth: '320px' }}>
        {/* Windshield */}
        <div className="bg-gray-300 h-4 rounded-t-full mb-6 mx-4"></div>
        
        {/* Driver section */}
        <div className="flex justify-between mb-6 px-4">
          <div className="w-14 h-14 bg-yellow-400 border-2 border-yellow-500 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-gray-800" />
          </div>
          <div
            className={getSeatClass(1, bookedSeats.includes(1), selectedSeats.includes(1))}
            onClick={() => {
              if (!bookedSeats.includes(1)) {
                onToggleSeat(1, selectedSeats.includes(1));
              }
            }}
            title="Seat 1"
          >
            1
          </div>
        </div>

        {/* Rows of 2 seats each */}
        <div className="space-y-4">
          {[...Array(5)].map((_, rowIndex) => {
            const seat1 = (rowIndex * 2) + 2;
            const seat2 = seat1 + 1;
            
            return (
              <div key={rowIndex} className="flex justify-between gap-12 px-4">
                <div
                  className={getSeatClass(seat1, bookedSeats.includes(seat1), selectedSeats.includes(seat1))}
                  onClick={() => {
                    if (!bookedSeats.includes(seat1)) {
                      onToggleSeat(seat1, selectedSeats.includes(seat1));
                    }
                  }}
                  title={`Seat ${seat1}`}
                >
                  {seat1}
                </div>
                <div
                  className={getSeatClass(seat2, bookedSeats.includes(seat2), selectedSeats.includes(seat2))}
                  onClick={() => {
                    if (!bookedSeats.includes(seat2)) {
                      onToggleSeat(seat2, selectedSeats.includes(seat2));
                    }
                  }}
                  title={`Seat ${seat2}`}
                >
                  {seat2}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLayout = () => {
    switch (vehicle.type) {
      case 'bus':
        return renderBusLayout();
      case 'suv':
        return renderSUVLayout();
      case 'van':
        return renderVanLayout();
      default:
        return renderBusLayout();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          Select Your Seats - {vehicle.name}
        </CardTitle>
        <div className="flex flex-wrap gap-3 text-sm mt-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Available: {availableSeatsCount}
          </Badge>
          <Badge variant="secondary" className="bg-gray-200 text-gray-800">
            Booked: {bookedSeats.length}
          </Badge>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Selected: {selectedSeats.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Seat Layout */}
        {renderLayout()}

        {/* Legend */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-sm w-full max-w-md">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 border-2 border-blue-600 rounded" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-400 border-2 border-gray-500 rounded" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 border-2 border-orange-600 rounded" />
            <span>Selected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeatSelector;

