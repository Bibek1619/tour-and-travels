"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

import VehicleSelection from "./VehicleSelection"
import TripDetails from "./TripDetails"
import CustomerInfoForm from "./CustomerInfoForm"
import VehicleBookingConfirmation from "./VehicleBookingConfirmation"

export default function VehicleBookingFlow() {
  const [currentStep, setCurrentStep] = useState("vehicle")
  const [bookingId, setBookingId] = useState("")
  const [bookingData, setBookingData] = useState({
    vehicleType: "",
    vehicleName: "",
    startDate: "",
    endDate: "",
    destination: "",
    pickupLocation: "",
    includeDriver: true,
    includeAccommodation: false,
    days: 0,
    dailyRate: 0,
    totalPrice: 0,
  })

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const handleCustomerSubmit = (customerData) => {
    updateBookingData(customerData)
    setBookingId(Math.floor(Math.random() * 1000000).toString())
    setCurrentStep("confirmation")
  }

  const steps = [
    { id: "vehicle", label: "Choose Vehicle" },
    { id: "details", label: "Trip Details" },
    { id: "customer", label: "Your Info" },
    { id: "confirmation", label: "Confirmation" },
  ]

  const getStepStatus = (stepId) => {
    const order = steps.map((s) => s.id)
    const currentIndex = order.indexOf(currentStep)
    const stepIndex = order.indexOf(stepId)

    if (stepIndex < currentIndex) return "completed"
    if (stepIndex === currentIndex) return "current"
    return "upcoming"
  }

  return (
    <div className="space-y-8">
      {/* ================= Progress Steps ================= */}
      {/* ================= Progress Steps ================= */}
{currentStep !== "confirmation" && (
  <Card className="bg-card text-card-foreground">
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id)

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle + Label */}
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <div
                  className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full font-semibold transition-colors
                    ${
                      status === "completed" || status === "current"
                        ? "bg-green-500 text-white" // ✅ completed/current steps green
                        : "bg-muted text-muted-foreground"
                    }`}
                >
                  {status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-white" /> // ✅ green check
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Label */}
                <p
                  className={`text-[11px] sm:text-sm font-medium text-center leading-tight
                    ${
                      status === "upcoming"
                        ? "text-muted-foreground"
                        : "text-foreground"
                    }`}
                >
                  {step.label}
                </p>
              </div>

              {/* Arrow Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
                  <div
                    className={`relative w-full h-0.5 rounded transition-colors
                      ${
                        status === "completed"
                          ? "bg-green-500" // ✅ green line for completed
                          : "bg-muted"
                      }`}
                  >
                    {/* Arrow Head */}
                    <span
                      className={`absolute right-0 -top-1 w-0 h-0
                        border-t-4 border-b-4 border-l-6
                        border-t-transparent border-b-transparent
                        ${
                          status === "completed"
                            ? "border-l-green-500" // ✅ green arrow
                            : "border-l-muted"
                        }`}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </CardContent>
  </Card>
)}


      {/* ================= Step Content ================= */}
      {currentStep === "vehicle" && (
        <VehicleSelection
          initialData={bookingData}
          onNext={(data) => {
            updateBookingData(data)
            setCurrentStep("details")
          }}
        />
      )}

      {currentStep === "details" && (
        <TripDetails
          bookingData={bookingData}
          onBack={() => setCurrentStep("vehicle")}
          onNext={(data) => {
            updateBookingData(data)
            setCurrentStep("customer")
          }}
        />
      )}

      {currentStep === "customer" && (
        <CustomerInfoForm
          onBack={() => setCurrentStep("details")}
          onSubmit={handleCustomerSubmit}
        />
      )}

      {currentStep === "confirmation" && (
        <VehicleBookingConfirmation
          bookingData={bookingData}
          bookingId={bookingId}
        />
      )}
    </div>
  )
}
