import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Clock,
  Users,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  Check,
} from "lucide-react"

export default function TourSidebar({ tour }) {
  return (
    <div className="md:sticky md:top-24 space-y-6">

      {/* BOOKING CARD */}
      <Card className="border-2 border-emerald-100 shadow-lg">
        <CardContent className="p-5 sm:p-6 space-y-5">
          <div className="text-center pb-4 border-b">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-green-800">
                Rs {tour.price}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              per person
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <SidebarRow icon={Clock} label="Duration" value={tour.duration} />
            <SidebarRow icon={Users} label="Group Size" value={tour.groupSize} />
            <SidebarRow icon={TrendingUp} label="Max Altitude" value={tour.maxAltitude} />
            <SidebarRow icon={Calendar} label="Best Season" value={tour.bestSeason} />
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-base shadow-md">
            Book Now
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            🔒 Secure booking • Free cancellation up to 7 days
          </p>
        </CardContent>
      </Card>

      {/* CONTACT CARD */}
      <Card className="border-2 shadow-md">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <h4 className="font-bold text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            Need Help?
          </h4>

          <p className="text-sm text-muted-foreground">
            Our travel experts are available 24/7 to assist you with bookings and inquiries.
          </p>

          <Separator />

          <div className="space-y-3">
            <a
              href="tel:+97798XXXXXXXX"
              className="flex items-center gap-3 text-sm hover:text-emerald-600 transition"
            >
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Phone className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-muted-foreground text-xs">
                  +977 98XXXXXXXX
                </p>
              </div>
            </a>

            <a
              href="mailto:info@adventurenepal.com"
              className="flex items-center gap-3 text-sm hover:text-emerald-600 transition"
            >
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Mail className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-muted-foreground text-xs">
                  info@adventurenepal.com
                </p>
              </div>
            </a>
          </div>

          <Button
            variant="outline"
            className="w-full border-green-600 text-green-600 hover:bg-green-500 font-medium"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            WhatsApp Us
          </Button>
        </CardContent>
      </Card>

      {/* TRUST BADGES */}
      <Card className="border-2 bg-linear-to-br from-emerald-50 to-white">
        <CardContent className="p-5 sm:p-6 space-y-3 text-center">
          <h5 className="font-semibold text-sm">Why Choose Us?</h5>

          <div className="space-y-2 text-xs text-muted-foreground">
            <TrustRow text="15+ Years Experience" />
            <TrustRow text="Licensed & Insured" />
            <TrustRow text="Expert Local Guides" />
            <TrustRow text="Best Price Guarantee" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ---------- Small Reusable Parts ---------- */

function SidebarRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-gray-700">
        <Icon className="h-4 w-4 text-green-600" />
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}

function TrustRow({ text }) {
  return (
    <p className="flex items-center justify-center gap-2">
      <Check className="h-4 w-4 text-emerald-600" />
      {text}
    </p>
  )
}
