"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";
import { ChevronDown } from "lucide-react";

import { Button } from "./ui/button";

const navLinks = [
  { href: "/tours", label: "Tour Packages" },
  { href: "/trek-packages", label: "Trek Packages" },
  { href: "/adventures", label: "Adventures" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const vehicleItems = [
  { href: "/vehicles/scorpio-rent-in-pokhara", label: "Scorpio | Jeep Rent in Pokhara" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Top Bar */}
      <div className="border-b bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap justify-between items-center gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:+9779856006671"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+977 9856006671</span>
            </a>
            <a
              href="mailto:info@hamroyatraadventure.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">info@hamroyatraadventure.com</span>
            </a>
          </div>
          <div className="text-muted-foreground hidden sm:block">
            Regd. No: 88333/068/069 | Tourism License: 1408
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="mx-auto max-w-7xl px-4 py-3 sm:py-4 flex justify-between items-center gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Image
            src="/hamro yatra.jpeg"
            alt="Hamro Yatra Adventure"
            width={56}
            height={56}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
          />
          <span className="flex flex-col min-w-0">
            <span className="text-base sm:text-lg lg:text-xl font-bold text-primary truncate">
              Hamro Yatra Adventure
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground truncate">
              26+ Years of Experience
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1.5">
          <Link
            href="/"
            className={`text-base font-medium px-3.5 py-1.5 border-b-2 transition-colors ${
              pathname === "/"
                ? "border-[#1A2B48] text-[#1A2B48] font-semibold"
                : "border-transparent hover:border-[#1A2B48] hover:text-[#1A2B48]"
            }`}
          >
            Home
          </Link>

          {/* Vehicle Rental dropdown */}
          <div className="relative group">
            <button
              type="button"
              className={`flex items-center gap-1 text-base font-medium px-3.5 py-1.5 cursor-pointer border-b-2 transition-colors ${
                pathname.startsWith("/vehicles") || pathname === "/vehicle-booking"
                  ? "border-[#1A2B48] text-[#1A2B48] font-semibold"
                  : "border-transparent hover:border-[#1A2B48] hover:text-[#1A2B48]"
              }`}
            >
              Vehicle Rental
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 top-full pt-3 invisible opacity-0 translate-y-1 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0">
              <div className="w-64 rounded-xl border bg-background shadow-xl overflow-hidden">
                {vehicleItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent hover:border-[#1A2B48] hover:text-[#1A2B48] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`text-base font-medium px-3.5 py-1.5 border-b-2 transition-colors ${
                pathname === link.href
                  ? "border-[#1A2B48] text-[#1A2B48] font-semibold"
                  : "border-transparent hover:border-[#1A2B48] hover:text-[#1A2B48]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 relative">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setVehicleOpen(false);
            }}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background px-4 py-3 flex flex-col gap-1">
          <Link
            href="/"
            className={`text-base font-medium px-4 py-2 border-b-2 transition-colors ${
              pathname === "/"
                ? "border-[#1A2B48] text-[#1A2B48] font-semibold"
                : "border-transparent hover:border-[#1A2B48] hover:text-[#1A2B48]"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <button
            type="button"
            onClick={() => setVehicleOpen(!vehicleOpen)}
            className={`flex w-full items-center justify-between text-base font-medium px-4 py-2 border-b-2 transition-colors cursor-pointer ${
              vehicleOpen
                ? "border-[#1A2B48] text-[#1A2B48] font-semibold"
                : "border-transparent hover:border-[#1A2B48] hover:text-[#1A2B48]"
            }`}
          >
            Vehicle Rental
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                vehicleOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {vehicleOpen && vehicleItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`text-base font-medium pl-10 pr-4 py-2 border-b-2 transition-colors ${
                pathname.startsWith(item.href)
                  ? "border-[#1A2B48] text-[#1A2B48] font-semibold"
                  : "border-transparent hover:border-[#1A2B48] hover:text-[#1A2B48]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`text-base font-medium px-4 py-2 border-b-2 transition-colors ${
                pathname === link.href
                  ? "border-[#1A2B48] text-[#1A2B48] font-semibold"
                  : "border-transparent hover:border-[#1A2B48] hover:text-[#1A2B48]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;