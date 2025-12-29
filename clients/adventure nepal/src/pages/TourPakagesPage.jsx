import MainLayout from "@/layouts/MainLayout"

import TourPackages from "@/components/tour/TourPakages"
import TourFilters from "@/components/tour/TourFilter"

export default function ToursPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <main>
          {/* Hero */}
       <section
  className="relative h-[400px] bg-cover bg-center"
  style={{ backgroundImage: "url('/image.png')" }}
>
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
    <h1 className="text-4xl font-bold text-white mb-4">
      Explore Nepal Tour Packages
    </h1>
    <p className="text-white/90 max-w-2xl">
      Discover breathtaking adventures from Mustang to Rara Lake
    </p>
  </div>
</section>


          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <TourFilters />
              <TourPackages />
            </div>
          </section>
        </main>

    
      </div>
    </MainLayout>
  )
}
