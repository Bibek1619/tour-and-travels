import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TourGallery({ images }) {
  const [index, setIndex] = useState(0)

  return (
    <div className="relative rounded-xl overflow-hidden group">
      <div className="h-64 sm:h-80 md:h-96 bg-gray-100">
        <img
          src={images[index]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Controls */}
      <button
        onClick={() => setIndex((index - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => setIndex((index + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2"
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-3 right-3 text-xs bg-black/60 text-white px-2 py-1 rounded-full">
        {index + 1} / {images.length}
      </div>
    </div>
  )
}
