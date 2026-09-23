"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";

import { Button } from "./ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  // { href: "/seat-booking", label: "Seat Booking" },
  { href: "/vehicles", label: "Vehicle Rental" },
  { href: "/tours", label: "Tour Packages" },
  { href: "/trek-packages", label: "Trek Packages" },
  { href: "/adventures", label: "Adventures" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          <img
            src="/hamro yatra.jpeg"
            alt="Hamro Yatra Adventure"
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
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`text-base font-medium transition-colors ${
                pathname === link.href ? "text-green-500" : "hover:text-green-500"
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`text-base font-medium rounded-md px-2 py-2 transition-colors ${
                pathname === link.href
                  ? "text-green-500 bg-green-50"
                  : "hover:text-green-500 hover:bg-muted"
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