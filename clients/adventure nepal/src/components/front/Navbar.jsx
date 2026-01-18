import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, User } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { useSelector } from "react-redux";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const {isAuthenticated,user}=useSelector(state=>state.auth)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/seat-booking", label: "Seat Booking" },
    { href: "/vehicle-booking", label: "Vehicle Booking" },
    { href: "/tours", label: "Tour Packages" },
    { href: "/hotels", label: "Hotels" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Top Bar */}
      <div className="border-b bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 py-2 flex justify-between text-sm">
          <div className="flex items-center gap-4">
            <a
              href="tel:+9779841480794"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+977 984-1480794</span>
            </a>
            <a
              href="mailto:info@adventurenepal.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">info@adventurenepal.com</span>
            </a>
          </div>
          <div className="text-muted-foreground hidden sm:block">
            Regd. No: 88333/068/069 | Tourism License: 1408
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className="text-2xl font-bold text-primary">Adventure Nepal</span>
          <span className="text-xs text-muted-foreground">26+ Years of Experience</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className="text-base font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Icon & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 relative">
          {/* User Icon Dropdown */}
        
            {/* <button
              onClick={() => Navigate("/login")}
              className="p-2 rounded-full hover:bg-green-100"
            >
              <User className="h-5 w-6" />
            </button> */}
          
          
          <UserDropdown />

           

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
        <div className="lg:hidden border-t mt-4 pt-4 pb-4 px-4 flex flex-col gap-3">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className="text-base font-medium hover:text-primary transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}




    </header>
  );
}
