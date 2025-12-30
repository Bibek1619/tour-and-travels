import { useState } from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

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
  Camera,
  Mountain,
  Utensils,
  Bed,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export default function PackagesDetails() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showFullOverview, setShowFullOverview] = useState(false)

  const tour = {
    title: "Upper Mustang Adventure Tour",
    images: [
      "https://risingnepaldaily.com/storage/media/90084/SKT_MUSTANG_image0.jpg",
      "https://www.acethehimalaya.com/wp-content/uploads/2024/06/why-trek-upper-mustang-nepal.jpg",
      "https://images.unsplash.com/photo-1617191519105-d07b98b9f7a3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop",
    ],
    price: 750,
    duration: "12 Days",
    reviews: 48,
    rating: 4.8,
    difficulty: "Moderate",
    location: "Upper Mustang, Nepal",
    maxAltitude: "3,800m",
    groupSize: "2–12 People",
    bestSeason: "March – November",
    shortOverview: "Explore the hidden kingdom of Upper Mustang, a land of dramatic desert landscapes, ancient monasteries, and rich Tibetan culture. This journey takes you deep into one of Nepal's most restricted and mystical regions...",
    fullOverview: {
      intro: "Upper Mustang, often called the 'Last Forbidden Kingdom,' is a remote and culturally preserved region in northern Nepal that remained closed to foreigners until 1992. This restricted area offers an unparalleled journey into a landscape that seems frozen in time, where ancient Tibetan Buddhist culture thrives in its purest form.",
      geography: "Located in the rain shadow of the Annapurna and Dhaulagiri mountain ranges, Upper Mustang presents a stunning high-altitude desert landscape characterized by dramatic eroded cliffs in shades of red, yellow, and brown. The region sits at an average elevation of 3,700 meters (12,000 feet) and receives minimal rainfall, creating a surreal, moon-like terrain punctuated by deep canyons, towering rock formations, and mysterious sky caves that date back thousands of years.",
      culture: "The people of Upper Mustang are ethnically Tibetan and maintain a lifestyle and culture that has remained virtually unchanged for centuries. The region was once part of the Tibetan Kingdom and served as an important trade route between Tibet and India. Today, approximately 6,000 people inhabit this remote area, living in traditional mud-brick homes, practicing Tibetan Buddhism, and speaking the Loba language. Prayer flags flutter everywhere, mani walls line the trails, and the sound of Buddhist chants echoes from ancient monasteries.",
      loManthang: "Lo Manthang, the walled capital city of the former Kingdom of Lo, is the crown jewel of Upper Mustang. Founded in 1380, this medieval fortress city is surrounded by six-meter-high walls and contains approximately 150 households. The city is home to four major monasteries, including Jampa Gompa (built in 1447), Thubchen Gompa, and Chhoede Gompa, which house priceless Buddhist art, ancient manuscripts, and stunning murals that have survived centuries. Until 2008, the region had its own king, and the royal palace still stands at the city's center.",
      skyeCaves: "One of Upper Mustang's greatest mysteries is its thousands of man-made caves carved into sheer cliff faces, some reaching heights of 150 feet above the valley floor. Archaeological research suggests these caves served various purposes: meditation chambers for monks, living quarters, burial sites, and storage facilities. Many contain ancient Buddhist murals, manuscripts, and artifacts dating back over 2,000 years. The caves of Chhoser, near Lo Manthang, form one of the most extensive cave complexes, with multiple stories connected by precarious ladders and passages.",
      trekking: "The trek to Upper Mustang is considered moderate, making it accessible to trekkers with good fitness levels. Unlike many Himalayan treks, this journey focuses more on cultural immersion and dramatic landscapes than extreme altitude challenges. The trail follows ancient trade routes through traditional villages, crosses windswept passes, and traverses the world's deepest gorge - Kali Gandaki. Trekkers stay in family-run tea houses, sharing meals with locals and experiencing genuine hospitality.",
      bestTime: "The ideal trekking seasons are spring (March to May) and autumn (September to November). However, Upper Mustang's rain-shadow location makes it one of the few regions in Nepal suitable for trekking even during monsoon season (June to August), as the area receives minimal rainfall. Spring brings wildflowers and comfortable temperatures, while autumn offers crystal-clear mountain views and harvest celebrations.",
      permits: "Upper Mustang is a restricted area requiring a special permit costing $500 USD for 10 days, plus $50 for each additional day. Trekkers must be accompanied by a registered guide and travel in groups of at least two people. This restriction helps preserve the fragile environment and unique culture of the region.",
      conservation: "The region faces challenges from increasing tourism, climate change, and the emigration of young people to cities. Organizations like the American Himalayan Foundation work to preserve ancient monasteries, while local communities balance economic development with cultural preservation. Visitors play a crucial role by respecting local customs, supporting local businesses, and practicing responsible tourism."
    },
    highlights: [
      "Explore the walled city of Lo Manthang, the ancient capital",
      "Visit ancient Buddhist monasteries with rare murals and manuscripts",
      "Experience unique Tibetan culture, traditions & lifestyle",
      "Trek through breathtaking desert landscapes and dramatic cliffs",
      "Discover mysterious sky caves and ancient cave dwellings",
      "Witness traditional festivals and ceremonies (seasonal)",
      "Enjoy panoramic views of Annapurna and Dhaulagiri ranges",
      "Interact with friendly local communities in remote villages",
    ],
    itinerary: [
      { 
        day: 1, 
        title: "Arrival in Kathmandu", 
        desc: "Welcome to Nepal! Upon arrival at Tribhuvan International Airport, you'll be greeted by our representative and transferred to your hotel. After check-in and rest, attend a trip briefing where you'll meet your guide and fellow travelers. Evening welcome dinner featuring traditional Nepali cuisine.",
        activities: ["Airport pickup", "Hotel check-in", "Trip briefing", "Welcome dinner"]
      },
      { 
        day: 2, 
        title: "Fly to Pokhara", 
        desc: "Early morning scenic flight to Pokhara (25 minutes) with stunning views of the Himalayan range including Mt. Everest, Langtang, and Annapurna. Explore Pokhara's lakeside area, visit local markets, and prepare for the trek. Overnight in a comfortable hotel.",
        activities: ["Scenic flight", "City exploration", "Trek preparation", "Lakeside walk"]
      },
      { 
        day: 3, 
        title: "Fly to Jomsom & Trek to Kagbeni", 
        desc: "Morning flight to Jomsom through the world's deepest gorge - Kali Gandaki. Begin your Mustang adventure with a 3-hour trek to Kagbeni, the gateway to Upper Mustang. Walk through apple orchards and alongside the Kali Gandaki River. Explore the medieval village with its narrow alleys and ancient monastery.",
        activities: ["Flight to Jomsom", "Trek start (3 hours)", "Village exploration", "Monastery visit"]
      },
      { 
        day: 4, 
        title: "Kagbeni to Chele", 
        desc: "Enter the restricted area of Upper Mustang. Trek through a dramatic landscape of red cliffs, ancient caves, and barren hills. Pass through traditional villages of Tangbe and Chhusang, crossing the river multiple times on suspension bridges. Steady climb to Chele village (3,050m).",
        activities: ["6-7 hours trekking", "Permit checkpoint", "Village visits", "River crossings"]
      },
      { 
        day: 5, 
        title: "Chele to Syanbochen", 
        desc: "Challenging but rewarding day crossing three high passes with magnificent views. Trek through a colorful landscape of eroded canyons, ancient caves, and rock formations. Visit Samar village with its beautiful monastery. Continue to Syanbochen (3,800m), experiencing the unique high-altitude desert environment.",
        activities: ["7-8 hours trekking", "Three pass crossings", "Cave exploration", "Monastery visit"]
      },
      { 
        day: 6, 
        title: "Syanbochen to Ghami", 
        desc: "Trek across the high plateau with spectacular views of Nilgiri, Annapurna, and Tilicho Peak. Cross Yamda La pass (3,850m) and descend to Ghami, passing through Geling village. Visit the long mani wall and explore Ghami's red monastery with ancient Buddhist art and scriptures.",
        activities: ["6-7 hours trekking", "Mountain views", "Mani wall visit", "Red monastery tour"]
      },
      { 
        day: 7, 
        title: "Ghami to Tsarang", 
        desc: "Cross the Nyi La pass (4,010m), the highest point of the trek, with panoramic mountain views. Descend to Tsarang, one of the largest and most beautiful villages in Upper Mustang. Visit the impressive Tsarang monastery and the former royal palace with stunning views of the valley.",
        activities: ["5-6 hours trekking", "Highest pass", "Palace visit", "Monastery exploration"]
      },
      { 
        day: 8, 
        title: "Tsarang to Lo Manthang", 
        desc: "The most anticipated day! Trek to the walled city of Lo Manthang, the ancient capital of the Kingdom of Lo. Enter through the ancient gate and explore this medieval fortress city. Visit the Royal Palace, three main monasteries (Thubchen, Chodey, and Jampa), and wander through narrow alleys discovering traditional Tibetan life.",
        activities: ["4-5 hours trekking", "City exploration", "Palace visit", "Three monastery tours"]
      },
      { 
        day: 9, 
        title: "Exploration Day in Lo Manthang", 
        desc: "Full day to explore the cultural and spiritual heart of Upper Mustang. Optional excursion to Chhoser caves - one of the most spectacular cave complexes in the world. Visit Namgyal Monastery, interact with local monks, witness daily life in this timeless city, and attend traditional ceremonies if scheduled.",
        activities: ["Cave exploration", "Cultural immersion", "Monastery visits", "Photography"]
      },
      { 
        day: 10, 
        title: "Lo Manthang to Yara", 
        desc: "Trek to the remote village of Yara, passing through stunning landscapes of eroded cliffs and hidden valleys. Visit the sacred Luri Gompa cave monastery famous for its 13th-century paintings. Experience the warm hospitality of Yara villagers and enjoy spectacular sunset views.",
        activities: ["6-7 hours trekking", "Cave monastery visit", "Village homestay", "Cultural exchange"]
      },
      { 
        day: 11, 
        title: "Return to Jomsom via Kagbeni", 
        desc: "Begin the return journey, trekking back through familiar landscapes but with new perspectives. Descend to Kagbeni and continue to Jomsom. Celebrate the successful completion of your Upper Mustang adventure with a farewell dinner.",
        activities: ["7-8 hours trekking", "Farewell gathering", "Trek completion celebration"]
      },
      { 
        day: 12, 
        title: "Fly to Pokhara & Kathmandu, Departure", 
        desc: "Morning flight back to Pokhara, then onward to Kathmandu. Final day for souvenir shopping, exploring Thamel, or simply relaxing. Transfer to the airport for your departure flight, carrying unforgettable memories of the forbidden kingdom.",
        activities: ["Flights", "Shopping time", "Airport transfer", "Departure"]
      },
    ],
    included: [
      "Airport transfers (arrival & departure)",
      "3-night hotel accommodation in Kathmandu & Pokhara (3-star)",
      "All meals during the trek (breakfast, lunch, dinner)",
      "Tea house/lodge accommodation during the trek",
      "Experienced English-speaking trekking guide",
      "Porter service (1 porter for 2 trekkers)",
      "All necessary permits (ACAP, TIMS, Restricted Area Permit)",
      "Kathmandu-Pokhara-Jomsom flights (both ways)",
      "First aid kit and oxygen meter",
      "Government taxes and official expenses",
      "Welcome and farewell dinners",
      "Achievement certificate",
    ],
    excluded: [
      "International flights to/from Nepal",
      "Nepal entry visa fees ($30 for 15 days, $50 for 30 days)",
      "Travel and rescue insurance (mandatory)",
      "Personal expenses (WiFi, laundry, phone calls, bar bills)",
      "All beverages (soft/hard drinks)",
      "Tips for guide, porter, and driver (customary)",
      "Extra night accommodation in Kathmandu/Pokhara",
      "Meals in Kathmandu/Pokhara (except welcome/farewell)",
      "Emergency evacuation costs",
      "Any costs arising from unforeseen circumstances",
    ],
    facts: [
      { icon: Mountain, label: "Max Altitude", value: "4,010m (Nyi La Pass)" },
      { icon: Bed, label: "Accommodation", value: "Tea Houses & Lodges" },
      { icon: Utensils, label: "Meals", value: "3 Meals Daily" },
      { icon: Camera, label: "Photography", value: "Unlimited Opportunities" },
    ]
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length)
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
          <span className="text-foreground">Upper Mustang</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
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
                      <MapPin className="h-4 w-4 text-emerald-600" />
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
              <div className="relative h-96 md:h-[500px] bg-gray-100">
                <img
                  src={tour.images[currentImageIndex]}
                  alt={`Tour view ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Buttons */}
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

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm">
                  {currentImageIndex + 1} / {tour.images.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {tour.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? 'w-8 bg-white' 
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tour.facts.map((fact, i) => {
                const Icon = fact.icon
                return (
                  <Card key={i} className="border-2 hover:border-emerald-200 hover:shadow-md transition">
                    <CardContent className="p-4 text-center">
                      <Icon className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                      <p className="text-xs text-muted-foreground mb-1">{fact.label}</p>
                      <p className="font-semibold text-sm">{fact.value}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Tabs Section */}
            <Card className="border-2 shadow-sm">
              <Tabs defaultValue="overview" className="w-full">
                <div className="border-b bg-muted/30">
                  <TabsList className="w-full justify-start rounded-none border-0 bg-transparent h-auto p-0">
                    <TabsTrigger 
                      value="overview" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-4"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="itinerary"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-4"
                    >
                      Itinerary
                    </TabsTrigger>
                    <TabsTrigger 
                      value="included"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-4"
                    >
                      What's Included
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">About This Trek</h3>
                    
                    {!showFullOverview ? (
                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {tour.shortOverview}
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowFullOverview(true)}
                          className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                        >
                          Read More About Upper Mustang
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">Introduction</h4>
                          <p className="text-muted-foreground leading-relaxed">{tour.fullOverview.intro}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">Geography & Landscape</h4>
                          <p className="text-muted-foreground leading-relaxed">{tour.fullOverview.geography}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">Culture & People</h4>
                          <p className="text-muted-foreground leading-relaxed">{tour.fullOverview.culture}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">Lo Manthang - The Walled City</h4>
                          <p className="text-muted-foreground leading-relaxed">{tour.fullOverview.loManthang}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">The Mysterious Sky Caves</h4>
                          <p className="text-muted-foreground leading-relaxed">{tour.fullOverview.skyeCaves}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">Trekking Experience</h4>
                          <p className="text-muted-foreground leading-relaxed">{tour.fullOverview.trekking}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">Best Time to Visit</h4>
                          <p className="text-muted-foreground leading-relaxed">{tour.fullOverview.bestTime}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">Permits & Regulations</h4>
                          <p className="text-muted-foreground leading-relaxed">{tour.fullOverview.permits}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">Conservation & Sustainability</h4>
                          <p className="text-muted-foreground leading-relaxed">{tour.fullOverview.conservation}</p>
                        </div>

                        <Button 
                          variant="outline" 
                          onClick={() => setShowFullOverview(false)}
                          className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
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
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="itinerary" className="p-6 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Day by Day Itinerary</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Complete breakdown of your 12-day adventure
                    </p>
                  </div>
                  
                  {tour.itinerary.map((d) => (
                    <Card key={d.day} className="border-l-4 border-l-emerald-600 hover:shadow-md transition">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                              <span className="text-emerald-700 font-bold">
                                {d.day}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-lg mb-2 text-gray-900">
                              {d.title}
                            </h4>
                            <p className="text-muted-foreground mb-3 leading-relaxed">
                              {d.desc}
                            </p>
                            {d.activities && (
                              <div className="flex flex-wrap gap-2">
                                {d.activities.map((activity, idx) => (
                                  <Badge 
                                    key={idx} 
                                    variant="outline" 
                                    className="text-xs bg-gray-50"
                                  >
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

                <TabsContent value="included" className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Check className="h-5 w-5 text-emerald-600" />
                        </div>
                        <h4 className="font-bold text-lg">What's Included</h4>
                      </div>
                      <ul className="space-y-3">
                        {tour.included.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
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
                            <span className="text-gray-700">{item}</span>
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
          <div className="lg:sticky lg:top-24 space-y-6 h-fit">
            
            {/* Booking Card */}
            <Card className="border-2 border-emerald-100 shadow-lg">
              <CardContent className="p-6 space-y-5">
                <div className="text-center pb-4 border-b">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-emerald-600">
                      Rs {tour.price}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    per person
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-emerald-600" />
                      Duration
                    </span>
                    <span className="font-semibold text-sm">{tour.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-emerald-600" />
                      Group Size
                    </span>
                    <span className="font-semibold text-sm">{tour.groupSize}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      Max Altitude
                    </span>
                    <span className="font-semibold text-sm">{tour.maxAltitude}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      Best Season
                    </span>
                    <span className="font-semibold text-sm">{tour.bestSeason}</span>
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 text-base shadow-md hover:shadow-lg transition-all">
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
                  <MessageSquare className="h-5 w-5 text-emerald-600" />
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