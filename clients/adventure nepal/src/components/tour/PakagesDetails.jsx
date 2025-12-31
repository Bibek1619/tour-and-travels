import { useState } from "react"
import { useParams } from "react-router-dom"
import { tours } from "../../data/toursData"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Clock,
  Users,
  MapPin,
  TrendingUp,
  Calendar,
  Check,
  X,
  Phone,
  Mail,
  MessageSquare,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export default function PackagesDetails() {
  const { slug } = useParams()
  const tour = tours.find((t) => t.slug === slug)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showFullOverview, setShowFullOverview] = useState(false)

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Tour not found
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + tour.images.length) % tour.images.length
    )
  }

  return (
    <main className="bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
          <span className="hover:text-foreground cursor-pointer transition">Home</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer transition">Packages</span>
          <span>/</span>
          <span className="text-foreground">{tour.title}</span>
        </div>

       <div className="relative grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-emerald-100 text-green-700 hover:bg-emerald-200 border-emerald-200">
                      {tour.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      Restricted Area
                    </Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {tour.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{tour.location}</span>
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-muted-foreground">({tour.reviews} reviews)</span>
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="relative rounded-xl overflow-hidden group">
              <div className="relative h-96 md:h-125 bg-gray-100">
                <img
                  src={tour.images[currentImageIndex]}
                  alt={`Tour view ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-900" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-5 w-5 text-gray-900" />
                </button>
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm">
                  {currentImageIndex + 1} / {tour.images.length}
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {tour.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tour.facts.map((fact, i) => {
                const Icon = fact.icon
                return (
                  <Card key={i} className="border-2 hover:border-emerald-200 hover:shadow-md transition">
                    <CardContent className="p-4 text-center">
                      <Icon className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <p className="text-xs text-muted-foreground mb-1">{fact.label}</p>
                      <p className="font-semibold text-sm">{fact.value}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Tabs */}
            <Card className="border-2 shadow-sm">
              <Tabs defaultValue="overview" className="w-full">
                <div className="border-b bg-muted/30">
                  <TabsList className="w-full justify-start rounded-none border-0 bg-transparent h-auto p-0">
                    <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-4 text-[20px]">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="itinerary" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-4 text-[20px]">
                      Itinerary
                    </TabsTrigger>
                    <TabsTrigger value="included" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-4 text-[20px]">
                      What's Included
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Overview */}
                <TabsContent value="overview" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">About This Trek</h3>
                    {!showFullOverview ? (
                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{tour.shortOverview}</p>
                        <Button
                          variant="outline"
                          onClick={() => setShowFullOverview(true)}
                          className="text-green-600 border-green-600 hover:bg-green-500"
                        >
                          Read More About {tour.title}
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {Object.entries(tour.fullOverview).map(([title, text], idx) => (
                          <div key={idx}>
                            <h4 className="font-semibold text-lg mb-2 text-gray-900">{title.replace(/([A-Z])/g, ' $1')}</h4>
                            <p className="text-muted-foreground leading-relaxed">{text}</p>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={() => setShowFullOverview(false)}
                          className="text-green-600 border-green-600 hover:bg-emerald-50"
                        >
                          Show Less
                          <ChevronUp className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Tour Highlights</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {tour.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-50 transition">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-700">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Itinerary */}
                <TabsContent value="itinerary" className="p-6 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Day by Day Itinerary</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Complete breakdown of your adventure
                    </p>
                  </div>
                  {tour.itinerary.map((d) => (
                    <Card key={d.day} className="border-l-4 border-l-emerald-600 hover:shadow-md transition">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                              <span className="text-green-700 font-bold">{d.day}</span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-lg mb-2 text-gray-900">{d.title}</h4>
                            <p className="text-muted-foreground mb-3 leading-relaxed">{d.desc}</p>
                            {d.activities && (
                              <div className="flex flex-wrap gap-2">
                                {d.activities.map((activity, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs bg-gray-50">
                                    {activity}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Included / Excluded */}
                <TabsContent value="included" className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-700" />
                        </div>
                        <h4 className="font-bold text-lg">What's Included</h4>
                      </div>
                      <ul className="space-y-3">
                        {tour.included.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <X className="h-5 w-5 text-red-600" />
                        </div>
                        <h4 className="font-bold text-lg">What's Not Included</h4>
                      </div>
                      <ul className="space-y-3">
                        {tour.excluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* RIGHT SIDEBAR */}
         <div className="lg:sticky lg:top-24 space-y-6 self-start">

            {/* Booking Card */}
            <Card className="border-2 border-emerald-100 shadow-lg">
              <CardContent className="p-6 space-y-5">
                <div className="text-center pb-4 border-b">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-green-800">Rs {tour.price}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-green-600" />
                      Duration
                    </span>
                    <span className="font-semibold text-sm">{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-green-600" />
                      Group Size
                    </span>
                    <span className="font-semibold text-sm">{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      Max Altitude
                    </span>
                    <span className="font-semibold text-sm">{tour.maxAltitude}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-green-600" />
                      Best Season
                    </span>
                    <span className="font-semibold text-sm">{tour.bestSeason}</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-base shadow-md hover:shadow-lg transition-all">
                  Book Now
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  🔒 Secure booking • Free cancellation up to 7 days
                </p>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="border-2 shadow-md">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Need Help?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Our travel experts are available 24/7 to assist you with bookings and inquiries.
                </p>
                <Separator />
                <div className="space-y-3">
                  <a href="tel:+97798XXXXXXXX" className="flex items-center gap-3 text-sm hover:text-emerald-600 transition group">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition">
                      <Phone className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-muted-foreground">+977 98XXXXXXXX</p>
                    </div>
                  </a>
                  <a href="mailto:info@adventurenepal.com" className="flex items-center gap-3 text-sm hover:text-emerald-600 transition group">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition">
                      <Mail className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-muted-foreground text-xs">info@adventurenepal.com</p>
                    </div>
                  </a>
                </div>
                <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp Us
                </Button>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="border-2 bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="p-6 space-y-3 text-center">
                <h5 className="font-semibold text-sm">Why Choose Us?</h5>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    15+ Years Experience
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    Licensed & Insured
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    Expert Local Guides
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    Best Price Guarantee
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
