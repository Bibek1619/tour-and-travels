"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Luggage, Check } from "lucide-react"

export default function VehicleSelection({ onNext, initialData }) {
  const [selectedVehicle, setSelectedVehicle] = useState(
    initialData?.vehicleType || ""
  )

  const vehicles = [
    {
      type: "car",
      name: "Sedan Car",
      image:
        "https://english.onlinekhabar.com/wp-content/uploads/2024/01/Screenshot-2024-01-31-161452.png",
      dailyRate: 8000,
      capacity: "4 passengers",
      luggage: "3 bags",
      features: [
        "Air conditioning",
        "Music system",
        "Comfortable seats",
        "Professional driver",
      ],
      bestFor: "City tours, Short trips",
    },
    {
      type: "scorpio",
      name: "Mahindra Scorpio",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSNFbI6VYY4AgXbgcki9CkGlJY5JQAfW_hrw&s",
      dailyRate: 12000,
      capacity: "7 passengers",
      luggage: "5 bags",
      features: [
        "4WD capability",
        "Spacious interior",
        "Mountain-ready",
        "Expert driver",
      ],
      bestFor: "Mountain trips, Group travel",
    },
    {
      type: "ev-van",
      name: "Electric Van",
      image:
        "https://cgdigital.com.np/api/plugins/kcfinder/upload/images/KYC1%20%281%29.png",
      dailyRate: 10000,
      capacity: "12 passengers",
      luggage: "8 bags",
      features: [
        "Eco-friendly",
        "Spacious seating",
        "Large luggage space",
        "Comfortable ride",
      ],
      bestFor: "Group tours, Family trips",
    },
    {
      type: "bus",
      name: "Tourist Bus",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOhKcHHXy7fN_YwGgntXhVhwHdAsABMJ8cA&s",
      dailyRate: 20000,
      capacity: "30+ passengers",
      luggage: "20+ bags",
      features: [
        "AC/Non-AC options",
        "Reclining seats",
        "Entertainment system",
        "Experienced crew",
      ],
      bestFor: "Large groups, Corporate events",
    },
  ]

  const handleNext = () => {
    const vehicle = vehicles.find((v) => v.type === selectedVehicle)
    if (vehicle) {
      onNext({
        vehicleType: vehicle.type,
        vehicleName: vehicle.name,
        dailyRate: vehicle.dailyRate,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-extrabold text-lg sm:text-xl">
            Select Your Vehicle
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* VEHICLE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle.type}
                onClick={() => setSelectedVehicle(vehicle.type)}
                className={`cursor-pointer transition-all hover:shadow-lg bg-blue-50
                  ${
                    selectedVehicle === vehicle.type
                      ? "border-4 border-green-500"
                      : "border border-border"
                  }
                `}
              >
                {/* IMAGE */}
                <div className="relative h-44 sm:h-52 md:h-60 overflow-hidden rounded-t-lg">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedVehicle === vehicle.type && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <CardContent className="p-3 sm:p-4 space-y-3">
                  {/* TITLE & PRICE */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">
                        {vehicle.name}
                      </h3>
                      <Badge className="mt-1 bg-black/80 text-white text-xs">
                        {vehicle.bestFor}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        NPR {vehicle.dailyRate}
                      </p>
                      <p className="text-xs sm:text-sm">per day</p>
                    </div>
                  </div>

                  {/* CAPACITY */}
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <span>{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Luggage className="h-4 w-4 text-green-500" />
                      <span>{vehicle.luggage}</span>
                    </div>
                  </div>

                  {/* FEATURES */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Features:</p>
                    <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-3 gap-y-1">
                      {vehicle.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-xs sm:text-sm"
                        >
                          <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CONTINUE BUTTON */}
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleNext}
              disabled={!selectedVehicle}
              size="lg"
              className="
                min-w-[200px]
                text-base font-semibold text-white
                bg-gradient-to-r from-green-500 via-green-600 to-green-700
                hover:from-green-600 hover:via-green-700 hover:to-green-800
                focus:ring-4 focus:ring-green-500/50
              "
            >
              Continue to Trip Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
