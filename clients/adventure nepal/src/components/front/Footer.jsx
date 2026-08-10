import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "../ui/separator"; // Adjust path according to your project

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t">
      {/* Associations, Payment & Social Section */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 divide-y md:divide-y-0 divide-gray-100 text-center">
            {/* We Are Associated With */}
            <div className="pt-6 md:pt-0 first:pt-0">
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">We Are Associated With</h4>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <img
                  src="/nepal-tourism-board.png"
                  alt="Nepal Tourism Board"
                  className="h-12 sm:h-16 object-contain hover:scale-110 transition-transform"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden text-sm font-semibold text-gray-600 border border-gray-300 rounded px-4 py-2">
                  Nepal Tourism Board
                </div>
                
                <img
                  src="/taan.png"
                  alt="TAAN"
                  className="h-12 sm:h-16 object-contain hover:scale-110 transition-transform"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden text-sm font-semibold text-gray-600 border border-gray-300 rounded px-4 py-2">
                  TAAN
                </div>
                
                <img
                  src="/nma.png"
                  alt="Nepal Mountaineering Association"
                  className="h-12 sm:h-16 object-contain hover:scale-110 transition-transform"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden text-sm font-semibold text-gray-600 border border-gray-300 rounded px-4 py-2">
                  NMA
                </div>
              </div>
            </div>

            {/* We Accept */}
            <div className="pt-6 md:pt-0">
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">We Accept</h4>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 sm:px-6 sm:py-3 hover:border-blue-500 transition-colors">
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">VISA</span>
                </div>
                <div className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 sm:px-6 sm:py-3 hover:border-red-500 transition-colors">
                  <span className="text-xl sm:text-2xl font-bold text-red-600">Mastercard</span>
                </div>
                <div className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 sm:px-6 sm:py-3 hover:border-gray-600 transition-colors">
                  <span className="text-sm font-bold text-gray-700">Bank Transfer</span>
                </div>
              </div>
            </div>

            {/* Find & Follow Us on */}
            <div className="pt-6 md:pt-0">
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">Find & Follow Us on</h4>
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <a
                  href="https://facebook.com/adventurenepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com/adventurenepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/adventurenepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-500 hover:bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="https://youtube.com/adventurenepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-xl mb-4 text-primary">Adventure Nepal</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              26+ years of experience in organizing trekking, tours, and transportation services across Nepal.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-muted-foreground hover:text-primary transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/seat-booking" className="text-muted-foreground hover:text-primary transition-colors">
                  Seat Booking
                </Link>
              </li>
              <li>
                <Link to="/vehicle-booking" className="text-muted-foreground hover:text-primary transition-colors">
                  Vehicle Booking
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-muted-foreground hover:text-primary transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/Trek" className="text-muted-foreground hover:text-primary transition-colors">
                  Trekking pakages
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-muted-foreground hover:text-primary transition-colors">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tour Packages */}
          <div>
            <h4 className="font-semibold mb-4">Popular Tour Packages</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tours/mustang" className="text-muted-foreground hover:text-primary transition-colors">
                  Upper Mustang Tour
                </Link>
              </li>
              <li>
                <Link to="/tours/rara" className="text-muted-foreground hover:text-primary transition-colors">
                  Rara Lake Tour
                </Link>
              </li>
              <li>
                <Link to="/tours/pokhara" className="text-muted-foreground hover:text-primary transition-colors">
                  Pokhara Valley Tour
                </Link>
              </li>
              <li>
                <Link to="/tours/chitwan" className="text-muted-foreground hover:text-primary transition-colors">
                  Chitwan Jungle Safari
                </Link>
              </li>
              <li>
                <Link to="/tours/kathmandu-valley" className="text-muted-foreground hover:text-primary transition-colors">
                  Kathmandu Valley Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+9779841480794" className="text-muted-foreground hover:text-primary transition-colors">
                  +977 984-1480794
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@adventurenepal.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@adventurenepal.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground text-center">
          <p>© 2025 Adventure Nepal. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
          
          </div>
        </div>
      </div>
    </footer>
  );
}
