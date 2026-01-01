import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Check, X, ChevronDown, ChevronUp } from "lucide-react"

export default function TourTabs({ tour }) {
  const [showFullOverview, setShowFullOverview] = useState(false)

  return (
    <Card className="border-2 shadow-sm">
      <Tabs defaultValue="overview" className="w-full">

        {/* TAB HEADER */}
        <div className="border-b bg-muted/30">
          <TabsList className="w-full justify-start rounded-none border-0 bg-transparent h-auto p-0">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent
              data-[state=active]:border-emerald-600
              data-[state=active]:bg-transparent
              data-[state=active]:shadow-none
              px-4 sm:px-6 py-4 text-lg sm:text-[20px]"
            >
              Overview
            </TabsTrigger>

            <TabsTrigger
              value="itinerary"
              className="rounded-none border-b-2 border-transparent
              data-[state=active]:border-emerald-600
              data-[state=active]:bg-transparent
              data-[state=active]:shadow-none
              px-4 sm:px-6 py-4 text-lg sm:text-[20px]"
            >
              Itinerary
            </TabsTrigger>

            <TabsTrigger
              value="included"
              className="rounded-none border-b-2 border-transparent
              data-[state=active]:border-emerald-600
              data-[state=active]:bg-transparent
              data-[state=active]:shadow-none
              px-4 sm:px-6 py-4 text-lg sm:text-[20px]"
            >
              What's Included
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ================= OVERVIEW ================= */}
        <TabsContent value="overview" className="p-4 sm:p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              About This Trek
            </h3>

            {!showFullOverview ? (
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {tour.shortOverview}
                </p>

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
                    <h4 className="font-semibold text-lg mb-2 text-gray-900">
                      {title.replace(/([A-Z])/g, " $1")}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {text}
                    </p>
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

          {/* HIGHLIGHTS */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Tour Highlights
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {tour.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg
                  bg-emerald-50/50 border border-emerald-100"
                >
                  <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ================= ITINERARY ================= */}
        <TabsContent value="itinerary" className="p-4 sm:p-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Day by Day Itinerary
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Complete breakdown of your adventure
            </p>
          </div>

          {tour.itinerary.map((d) => (
            <Card
              key={d.day}
              className="border-l-4 border-l-emerald-600"
            >
              <CardContent className="p-5">
                <h4 className="font-bold text-lg mb-2 text-gray-900">
                  Day {d.day}: {d.title}
                </h4>
                <p className="text-muted-foreground mb-3">
                  {d.desc}
                </p>

                {d.activities && (
                  <div className="flex flex-wrap gap-2">
                    {d.activities.map((a, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {a}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ================= INCLUDED / EXCLUDED ================= */}
        <TabsContent value="included" className="p-4 sm:p-6">
          <div className="grid md:grid-cols-2 gap-8">

            {/* INCLUDED */}
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
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span className="text-gray-700 text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EXCLUDED */}
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
                    <X className="h-5 w-5 text-red-500 mt-0.5" />
                    <span className="text-gray-700 text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
