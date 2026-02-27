import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { CheckCircle2, ChevronLeft, Banknote, Building2, Smartphone, CreditCard, Shield } from "lucide-react"


const Badge = ({ children }) => <span className="px-2 py-1 bg-gray-200 rounded">{children}</span>
const Separator = () => <hr className="my-4" />

export default function VehicleRental() {
  const [step, setStep] = useState("vehicle")
  const [bookingId, setBookingId] = useState("")
  const [bookingData, setBookingData] = useState({
    vehicleType: "",
    vehicleName: "",
    startDate: "",
    endDate: "",
    destination: "",
    pickupLocation: "",
    includeDriver: true,
    days: 0,
    dailyRate: 0,
    totalPrice: 0,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [transactionId, setTransactionId] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [processing, setProcessing] = useState(false)

  const updateBooking = (data) => setBookingData((prev) => ({ ...prev, ...data }))

  const handleCustomerSubmit = (customer) => {
    updateBooking(customer)
    const id = "BK" + Math.floor(Math.random() * 100000)
    setBookingId(id)
    setStep("payment")
  }

  const handlePayment = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setStep("confirmation")
    }, 1000)
  }

  // === Step Components inside one file ===

  const VehicleSelectionStep = () => (
    <Card className="max-w-3xl mx-auto">
      <CardHeader><CardTitle>Choose Vehicle</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Vehicle Type</Label>
          <Input value={bookingData.vehicleType} onChange={(e) => updateBooking({ vehicleType: e.target.value })} placeholder="SUV, Sedan..." />
        </div>
        <div>
          <Label>Vehicle Name</Label>
          <Input value={bookingData.vehicleName} onChange={(e) => updateBooking({ vehicleName: e.target.value })} placeholder="Toyota Prado..." />
        </div>
        <div className="flex gap-3 pt-4">
          <Button onClick={() => setStep("details")}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )

  const TripDetailsStep = () => (
    <Card className="max-w-3xl mx-auto">
      <CardHeader><CardTitle>Trip Details</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Start Date</Label>
          <Input type="date" value={bookingData.startDate} onChange={(e) => updateBooking({ startDate: e.target.value })} />
        </div>
        <div>
          <Label>End Date</Label>
          <Input type="date" value={bookingData.endDate} onChange={(e) => updateBooking({ endDate: e.target.value })} />
        </div>
        <div>
          <Label>Destination</Label>
          <Input value={bookingData.destination} onChange={(e) => updateBooking({ destination: e.target.value })} />
        </div>
        <div>
          <Label>Pickup Location</Label>
          <Input value={bookingData.pickupLocation} onChange={(e) => updateBooking({ pickupLocation: e.target.value })} />
        </div>
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={() => setStep("vehicle")}>Back</Button>
          <Button onClick={() => setStep("customer")}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )

  const CustomerInfoStep = () => (
    <Card className="max-w-3xl mx-auto">
      <CardHeader><CardTitle>Customer Info</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input value={bookingData.customerName} onChange={(e) => updateBooking({ customerName: e.target.value })} />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={bookingData.customerEmail} onChange={(e) => updateBooking({ customerEmail: e.target.value })} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={bookingData.customerPhone} onChange={(e) => updateBooking({ customerPhone: e.target.value })} />
        </div>
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={() => setStep("details")}>Back</Button>
          <Button onClick={() => handleCustomerSubmit({
            customerName: bookingData.customerName,
            customerEmail: bookingData.customerEmail,
            customerPhone: bookingData.customerPhone
          })}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )

  const PaymentStep = () => (
    <Card className="max-w-3xl mx-auto">
      <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select Payment Method</Label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border p-2 rounded w-full">
            <option value="cash">Cash on Arrival</option>
            <option value="bank">Bank Transfer</option>
            <option value="esewa">eSewa</option>
            <option value="khalti">Khalti</option>
            <option value="card">Credit/Debit Card</option>
          </select>
        </div>

        {paymentMethod === "bank" && (
          <div>
            <Label>Transaction ID</Label>
            <Input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="space-y-2">
            <Label>Card Number</Label>
            <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            <Label>Expiry</Label>
            <Input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
            <Label>CVV</Label>
            <Input value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={() => setStep("customer")}>Back</Button>
          <Button onClick={handlePayment} disabled={processing}>{processing ? "Processing..." : "Pay"}</Button>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-100 rounded mt-4">
          <Shield className="h-5 w-5 mt-1" />
          <p>Your payment is secure and encrypted.</p>
        </div>
      </CardContent>
    </Card>
  )

  const ConfirmationStep = () => (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
        <CardTitle className="text-2xl mt-2">Booking Confirmed!</CardTitle>
        <p className="text-muted-foreground">Booking ID: {bookingId}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p><strong>Vehicle:</strong> {bookingData.vehicleName}</p>
        <p><strong>Destination:</strong> {bookingData.destination}</p>
        <p><strong>Total:</strong> NPR {bookingData.totalPrice}</p>
        <div className="flex gap-3 pt-4">
          <Button onClick={() => setStep("vehicle")}>Book Again</Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="py-10 space-y-6">
      {step === "vehicle" && <VehicleSelectionStep />}
      {step === "details" && <TripDetailsStep />}
      {step === "customer" && <CustomerInfoStep />}
      {step === "payment" && <PaymentStep />}
      {step === "confirmation" && <ConfirmationStep />}
    </div>
  )
}
