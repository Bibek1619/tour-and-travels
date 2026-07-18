import MainLayout from "@/layouts/MainLayout"
import TourPackages from "@/components/tour/TourPakages"
import { Link } from "react-router-dom"
import { MessageSquare, Phone, Mail, Calendar } from "lucide-react"

export default function ToursPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <main>
          {/* Hero Section */}
          <section
            className="relative h-[400px] bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Nepal Tour Packages
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Explore the cultural heritage, natural wonders, and spiritual destinations of Nepal
              </p>
            </div>
          </section>

          {/* Tours Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Popular Tour Packages
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choose from our carefully crafted tour packages
                </p>
              </div>
              <TourPackages />
            </div>
          </section>

          {/* Customize Tour CTA Section - Moved to Bottom */}
          <section className="py-16 bg-gradient-to-r from-orange-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                      Customize Your Own Tour
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg">
                      Can't find the perfect tour package? Create a personalized itinerary tailored to your interests, budget, and schedule. Our travel experts will help you design your dream Nepal adventure.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-orange-600" />
                        </div>
                        <span>Flexible dates and duration</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-4 h-4 text-orange-600" />
                        </div>
                        <span>Choose your own destinations</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-4 h-4 text-orange-600" />
                        </div>
                        <span>Free consultation with travel experts</span>
                      </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                      >
                        <MessageSquare className="w-5 h-5" />
                        Customize Tour
                      </Link>
                      <a
                        href="tel:+9779841480794"
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        Call Us Now
                      </a>
                    </div>
                  </div>

                  {/* Right Video */}
                  <div className="relative">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <video
                        className="w-full h-[400px] object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src="/hero video.mp4" type="video/mp4" />
                        {/* Fallback image if video doesn't load */}
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    {/* Contact Info Card Overlay */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl">
                      <p className="text-sm text-gray-600 mb-2">Need help?</p>
                      <div className="flex items-center gap-2 text-orange-600 font-semibold">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">info@adventurenepal.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-orange-600 font-semibold mt-1">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">+977 984-1480794</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </MainLayout>
  )
}
