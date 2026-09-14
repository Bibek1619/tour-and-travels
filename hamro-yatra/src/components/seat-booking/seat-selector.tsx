"use client";

import { cn } from "@/lib/utils";
import { UserCheck } from "lucide-react";

interface SeatSelectorProps {
  vehicleType: string;
  totalSeats: number;
  bookedSeats: number[];
  selectedSeats: number[];
  onToggleSeat: (seatNum: number) => void;
  vehicleName: string;
}

function getSeatClass(
  seatNum: number,
  isBooked: boolean,
  isSelected: boolean
) {
  const base =
    "w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 flex items-center justify-center text-xs sm:text-sm font-semibold transition-all shadow";
  if (isBooked)
    return cn(base, "bg-gray-400 border-gray-500 text-white cursor-not-allowed opacity-75");
  if (isSelected)
    return cn(base, "bg-orange-500 border-orange-600 text-white shadow-lg scale-105 cursor-pointer");
  return cn(base, "bg-blue-500 border-blue-600 text-white hover:bg-blue-600 hover:scale-105 cursor-pointer");
}

function renderBusLayout(
  totalSeats: number,
  bookedSeats: number[],
  selectedSeats: number[],
  onToggleSeat: (seatNum: number) => void
) {
  const rows = Math.ceil((totalSeats - 2) / 4);
  const seats: React.ReactNode[] = [];

  seats.push(
    <div key="driver" className="flex items-center justify-center gap-2 mb-4">
      <div className="w-16 h-10 bg-yellow-400 border-2 border-yellow-500 rounded-lg flex items-center justify-center text-xs font-bold text-yellow-900">
        DRIVER
      </div>
      <div className="w-16 h-10 bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-500">
        DOOR
      </div>
    </div>
  );

  for (let r = 0; r < rows; r++) {
    const leftNum = r * 2 + 1;
    const rightBase = r * 4 + 1;
    const rightNums = [rightBase, rightBase + 1, rightBase + 2, rightBase + 3];

    seats.push(
      <div key={r} className="flex items-center gap-3 sm:gap-4 mb-3">
        {leftNum <= totalSeats - 2 && (
          <button
            type="button"
            disabled={bookedSeats.includes(leftNum)}
            onClick={() => onToggleSeat(leftNum)}
            className={getSeatClass(leftNum, bookedSeats.includes(leftNum), selectedSeats.includes(leftNum))}
          >
            {leftNum}
          </button>
        )}
        <div className="w-8" />
        {rightNums
          .filter((n) => n <= totalSeats - 2)
          .map((n) => (
            <button
              key={n}
              type="button"
              disabled={bookedSeats.includes(n)}
              onClick={() => onToggleSeat(n)}
              className={getSeatClass(n, bookedSeats.includes(n), selectedSeats.includes(n))}
            >
              {n}
            </button>
          ))}
      </div>
    );
  }

  const lastRow = [];
  const start = rows * 4 + 1;
  for (let s = start; s <= totalSeats; s++) {
    lastRow.push(s);
  }
  if (lastRow.length > 0) {
    seats.push(
      <div key="last" className="flex items-center gap-3 sm:gap-4 mb-3">
        {lastRow.slice(0, 2).map((n) => (
          <button
            key={n}
            type="button"
            disabled={bookedSeats.includes(n)}
            onClick={() => onToggleSeat(n)}
            className={getSeatClass(n, bookedSeats.includes(n), selectedSeats.includes(n))}
          >
            {n}
          </button>
        ))}
        <div className="w-8" />
        {lastRow.slice(2).map((n) => (
          <button
            key={n}
            type="button"
            disabled={bookedSeats.includes(n)}
            onClick={() => onToggleSeat(n)}
            className={getSeatClass(n, bookedSeats.includes(n), selectedSeats.includes(n))}
          >
            {n}
          </button>
        ))}
      </div>
    );
  }

  return <div className="flex flex-col items-center">{seats}</div>;
}

function renderVanLayout(
  totalSeats: number,
  bookedSeats: number[],
  selectedSeats: number[],
  onToggleSeat: (seatNum: number) => void
) {
  const seats: React.ReactNode[] = [];

  seats.push(
    <div key="driver" className="flex items-center justify-center gap-2 mb-4">
      <div className="w-16 h-10 bg-yellow-400 border-2 border-yellow-500 rounded-lg flex items-center justify-center text-xs font-bold text-yellow-900">
        DRIVER
      </div>
      <button
        type="button"
        disabled={bookedSeats.includes(1)}
        onClick={() => onToggleSeat(1)}
        className={getSeatClass(1, bookedSeats.includes(1), selectedSeats.includes(1))}
      >
        1
      </button>
    </div>
  );

  for (let r = 0; r < Math.ceil((totalSeats - 1) / 2); r++) {
    const left = r * 2 + 2;
    const right = left + 1;
    seats.push(
      <div key={r} className="flex items-center gap-4 sm:gap-6 mb-3">
        {left <= totalSeats && (
          <button
            type="button"
            disabled={bookedSeats.includes(left)}
            onClick={() => onToggleSeat(left)}
            className={getSeatClass(left, bookedSeats.includes(left), selectedSeats.includes(left))}
          >
            {left}
          </button>
        )}
        <div className="w-8" />
        {right <= totalSeats && (
          <button
            type="button"
            disabled={bookedSeats.includes(right)}
            onClick={() => onToggleSeat(right)}
            className={getSeatClass(right, bookedSeats.includes(right), selectedSeats.includes(right))}
          >
            {right}
          </button>
        )}
      </div>
    );
  }

  return <div className="flex flex-col items-center">{seats}</div>;
}

function renderSUVLayout(
  totalSeats: number,
  bookedSeats: number[],
  selectedSeats: number[],
  onToggleSeat: (seatNum: number) => void
) {
  const seats: React.ReactNode[] = [];

  seats.push(
    <div key="driver" className="flex items-center justify-center gap-2 mb-4">
      <div className="w-16 h-10 bg-yellow-400 border-2 border-yellow-500 rounded-lg flex items-center justify-center text-xs font-bold text-yellow-900">
        DRIVER
      </div>
      <button
        type="button"
        disabled={bookedSeats.includes(1)}
        onClick={() => onToggleSeat(1)}
        className={getSeatClass(1, bookedSeats.includes(1), selectedSeats.includes(1))}
      >
        1
      </button>
    </div>
  );

  const rows = [
    [2, 3, 4],
    [5, 6, 7],
  ];

  for (const row of rows) {
    seats.push(
      <div key={row[0]} className="flex items-center gap-4 sm:gap-6 mb-3">
        {row.map(
          (n) =>
            n <= totalSeats && (
              <button
                key={n}
                type="button"
                disabled={bookedSeats.includes(n)}
                onClick={() => onToggleSeat(n)}
                className={getSeatClass(n, bookedSeats.includes(n), selectedSeats.includes(n))}
              >
                {n}
              </button>
            )
        )}
      </div>
    );
  }

  return <div className="flex flex-col items-center">{seats}</div>;
}

export default function SeatSelector({
  vehicleType,
  totalSeats,
  bookedSeats,
  selectedSeats,
  onToggleSeat,
  vehicleName,
}: SeatSelectorProps) {
  const availableCount = totalSeats - bookedSeats.length;

  const renderLayout = () => {
    switch (vehicleType) {
      case "bus":
        return renderBusLayout(totalSeats, bookedSeats, selectedSeats, onToggleSeat);
      case "van":
        return renderVanLayout(totalSeats, bookedSeats, selectedSeats, onToggleSeat);
      case "suv":
        return renderSUVLayout(totalSeats, bookedSeats, selectedSeats, onToggleSeat);
      default:
        return renderBusLayout(totalSeats, bookedSeats, selectedSeats, onToggleSeat);
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <UserCheck className="w-5 h-5" />
          Select Your Seats - {vehicleName}
        </h3>
        <div className="flex flex-wrap gap-3 text-sm mt-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            Available: {availableCount}
          </span>
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
            Booked: {bookedSeats.length}
          </span>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
            Selected: {selectedSeats.length}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center overflow-x-auto py-4">{renderLayout()}</div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-sm w-full max-w-md mx-auto">
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
    </div>
  );
}
