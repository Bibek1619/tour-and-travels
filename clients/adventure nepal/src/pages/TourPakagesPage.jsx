import MainLayout from "@/layouts/MainLayout"
import TourPackages from "@/components/tour/TourPakages"

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
              <TourPackages />
            </div>
          </section>
        </main>
      </div>
    </MainLayout>
  )
}
