"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Download, Mail, Car, Calendar, MapPin } from "lucide-react"

export default function VehicleBookingConfirmation({ bookingData, bookingId, onBookAnother }) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Vehicle Booking Confirmed!</CardTitle>
        <p className="text-muted-foreground">Your vehicle has been successfully reserved</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Booking Reference */}
        <div className="bg-muted/50 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
          <p className="text-2xl font-bold text-primary">{bookingId}</p>
        </div>

        {/* Booking Details */}
        <div className="space-y-4">
          <h3 className="font-semibold">Booking Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Car className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Vehicle</p>
                <p className="font-medium">{bookingData.vehicleName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Destination</p>
                <p className="font-medium">{bookingData.destination}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{new Date(bookingData.startDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{new Date(bookingData.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm pt-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pickup Location:</span>
              <span className="font-medium">{bookingData.pickupLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{bookingData.days} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Services:</span>
              <div className="flex gap-2">
                {bookingData.includeDriver && <Badge variant="secondary">Driver Included</Badge>}
                {bookingData.includeAccommodation && <Badge variant="secondary">Accommodation</Badge>}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Payment Summary */}
        <div className="space-y-3">
          <h3 className="font-semibold">Payment Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total Amount:</span>
              <span className="text-primary">NPR {bookingData.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Important Information */}
        <div className="bg-accent/10 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-sm">Important Information</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Vehicle will be available at pickup location on the start date</li>
            <li>• Driver will contact you 24 hours before departure</li>
            <li>• Fuel costs are included in the rental price</li>
            <li>• Carry valid ID proof and driving license (if self-driving)</li>
            <li>• Cancellation available up to 48 hours before start date</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          <Button variant="outline" className="w-full bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Download Booking
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Mail className="h-4 w-4 mr-2" />
            Email Confirmation
          </Button>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={onBookAnother}>
            Book Another Vehicle
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
