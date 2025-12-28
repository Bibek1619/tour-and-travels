"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Calendar, MapPin, Home } from "lucide-react"

export default function TripDetails({ bookingData, onBack, onNext }) {
  const [formData, setFormData] = useState({
    startDate: bookingData.startDate || "",
    endDate: bookingData.endDate || "",
    destination: bookingData.destination || "",
    pickupLocation: bookingData.pickupLocation || "",
    customPickupLocation: "",
    includeDriver: bookingData.includeDriver || false,
    specialRequests: "",
  })

  const [days, setDays] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDays(diffDays)

      let total = diffDays * bookingData.dailyRate
      if (formData.includeDriver) total += diffDays * 2000
      setTotalPrice(total)
    }
  }, [formData.startDate, formData.endDate, formData.includeDriver, bookingData.dailyRate])

  const handleNext = () => {
    onNext({
      ...formData,
      pickupLocation: formData.pickupLocation === "Custom Location" ? formData.customPickupLocation : formData.pickupLocation,
      days,
      totalPrice,
    })
  }

  const destinations = ["inside vallley", "outside valley"]

  const pickupLocations = [
    "Tribhuvan International Airport",
    "Hotel in Kathmandu",
    "Hotel in Pokhara",
    "Bus Station",
    "Custom Location",
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Trip Details Form */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Start Date
              </Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                End Date
              </Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                min={formData.startDate || new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {days > 0 && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm">
                <span className="text-muted-foreground">Trip Duration:</span>{" "}
                <span className="font-semibold">{days} days</span>
              </p>
            </div>
          )}

          {/* Destination */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Destination
            </Label>
            <Select
              value={formData.destination}
              onValueChange={(value) => setFormData({ ...formData, destination: value })}
            >
              <SelectTrigger className="bg-card text-card-foreground border border-border hover:bg-muted focus:bg-muted">
                <SelectValue placeholder="Select destination" className="text-foreground" />
              </SelectTrigger>
              <SelectContent className="bg-card text-card-foreground">
                {destinations.map((dest) => (
                  <SelectItem
                    key={dest}
                    value={dest}
                    className="hover:bg-primary hover:text-primary-foreground radix-state-open:bg-muted"
                  >
                    {dest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pickup Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Home className="h-4 w-4 text-primary" />
              Pickup Location
            </Label>
            <Select
              value={formData.pickupLocation}
              onValueChange={(value) => setFormData({ ...formData, pickupLocation: value })}
            >
              <SelectTrigger className="bg-card text-card-foreground border border-border hover:bg-muted focus:bg-muted">
                <SelectValue placeholder="Select pickup location" className="text-foreground" />
              </SelectTrigger>
              <SelectContent className="bg-card text-card-foreground">
                {pickupLocations.map((location) => (
                  <SelectItem
                    key={location}
                    value={location}
                    className="hover:bg-primary hover:text-primary-foreground radix-state-open:bg-muted"
                  >
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Show input if Custom Location selected */}
            {formData.pickupLocation === "Custom Location" && (
              <Input
                placeholder="Enter custom pickup location"
                value={formData.customPickupLocation}
                onChange={(e) => setFormData({ ...formData, customPickupLocation: e.target.value })}
                className="mt-2"
              />
            )}
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <Label>Additional Services</Label>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id="driver"
                  checked={formData.includeDriver}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, includeDriver: checked })
                  }
                />
                <div className="flex-1">
                  <label htmlFor="driver" className="text-sm font-medium cursor-pointer">
                    Include Professional Driver
                  </label>
                  <p className="text-sm text-muted-foreground">NPR 2,000 per day</p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label>Special Requests (Optional)</Label>
            <Textarea
              placeholder="Any special requirements or preferences for your trip..."
              value={formData.specialRequests}
              onChange={(e) =>
                setFormData({ ...formData, specialRequests: e.target.value })
              }
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vehicle:</span>
              <span className="font-medium">{bookingData.vehicleName}</span>
            </div>
            {formData.destination && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destination:</span>
                <span className="font-medium">{formData.destination}</span>
              </div>
            )}
            {days > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{days} days</span>
              </div>
            )}
            {formData.pickupLocation && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pickup:</span>
                <span className="font-medium">
                  {formData.pickupLocation === "Custom Location" ? formData.customPickupLocation : formData.pickupLocation}
                </span>
              </div>
            )}
          </div>

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vehicle rental:</span>
              <span className="font-medium">
                NPR {bookingData.dailyRate} x {days} days
              </span>
            </div>
            {formData.includeDriver && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Driver service:</span>
                <span className="font-medium">NPR 2,000 x {days} days</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total:</span>
              <span className="text-primary">NPR {totalPrice.toLocaleString()}</span>
            </div>
          </div>
<div className="lg:col-span-3 flex flex-col space-y-2 mt-4">
    <Button
      onClick={handleNext}
      disabled={
        !formData.startDate ||
        !formData.endDate ||
        !formData.destination ||
        (!formData.pickupLocation ||
          (formData.pickupLocation === "Custom Location" &&
            !formData.customPickupLocation))
      }
      className="
        min-w-[200px]
        text-base font-semibold text-white
        bg-gradient-to-r from-green-500 via-green-600 to-green-700
        hover:from-green-600 hover:via-green-700 hover:to-green-800
        focus:outline-none focus:ring-4 focus:ring-green-500/50 cursor-pointer
      "
    >
      Continue to Confirmation
    </Button>
<Button
  onClick={onBack}
  variant="outline"
  className="w-full bg-transparent text-foreground hover:bg-transparent hover:text-foreground cursor-pointer flex items-center justify-center"
>
  <ChevronLeft className="h-4 w-4 mr-2" />
  Back
</Button>



  </div>

        </CardContent>
      </Card>
    </div>
  )
}
