"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function DashainPopup() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={handleClose}
    >
      <div 
        className="relative bg-transparent rounded-2xl max-w-5xl w-full animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 md:top-2 md:right-2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 shadow-lg transition-all hover:scale-110"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Dashain Image */}
        <div className="relative w-full aspect-[3/4] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-white">
          <Image
            src="/dashain.jpg"
            alt="Happy Dashain"
            fill
            className="object-contain"
            priority
            quality={95}
          />
        </div>
      </div>
    </div>
  );
}
