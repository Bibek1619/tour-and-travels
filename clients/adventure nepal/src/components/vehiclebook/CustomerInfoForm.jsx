"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function CustomerInfoForm({ onSubmit, onBack }) {
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" })

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Your Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium">Name</Label>
            <Input
              placeholder="Enter your full name"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Phone</Label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          {/* Back Button */}
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full min-w-[200px] bg-transparent text-foreground hover:bg-transparent hover:text-foreground cursor-pointer flex items-center justify-center"
          >
            Back
          </Button>

          {/* Confirm Booking Button */}
          <Button
            onClick={() => onSubmit(customer)}
            disabled={!customer.name || !customer.email || !customer.phone}
            className="
              w-full
              min-w-[200px]
              text-base font-semibold text-white
              bg-gradient-to-r from-green-500 via-green-600 to-green-700
              hover:from-green-600 hover:via-green-700 hover:to-green-800
              focus:outline-none focus:ring-4 focus:ring-green-500/50
              cursor-pointer
              flex items-center justify-center
            "
          >
            Confirm Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
