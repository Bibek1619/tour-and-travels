"use client"
import VehicleBookingFlow from "@/components/vehiclebook/VehicleBookingFlow"
import MainLayout from "@/layouts/MainLayout"

export default function VehicleBookingPage() {
  return (
    <MainLayout>
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Vehicle Booking</h1>
      <VehicleBookingFlow />
    </div>
    </MainLayout>
  )
}
