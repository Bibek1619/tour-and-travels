import { Button } from "../ui/button";
import { useState } from "react";

export function HeroSection() {
  return (
    <section className="relative h-[400px] lg:h-[600px] overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          src="/hero video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
          Discover the Magic of Nepal
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-pretty fond-normal">
          Book your adventure with confidence - Vehicle rentals, seat reservations, tour packages, and hotels all in one place
        </p>

        {/* Button with dropdown */}
        <div className="relative group">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-accent-foreground text-lg px-8 cursor-pointer transition-colors"
          >
            View All Packages
          </Button>

          {/* Dropdown */}
          <div className="absolute hidden group-hover:block mt-2 w-48 bg-white rounded shadow-lg text-left">
            <a
              href="/tour-packages"
              className="block px-4 py-2 hover:bg-green-100 text-gray-800"
            >
              Tour Packages
            </a>
            <a
              href="/trek-packages"
              className="block px-4 py-2 hover:bg-green-100 text-gray-800"
            >
              Trek Packages
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/9779826689739"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-4 bottom-4 z-50 group"
      >
        <img src="/whatapplogo.webp" alt="WhatsApp" className="w-12 h-12" />
        <span className="absolute left-full bottom-1/2 ml-3 -translate-y-1/2 px-3 py-1 rounded bg-green-600 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Message on WhatsApp!
        </span>
      </a>
    </section>
  );
}
