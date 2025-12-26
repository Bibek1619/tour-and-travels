import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "../ui/separator"; // Adjust path according to your project

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
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

          {/* Popular Destinations */}
          <div>
            <h4 className="font-semibold mb-4">Popular Destinations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tours/mustang" className="text-muted-foreground hover:text-primary transition-colors">
                  Upper Mustang
                </Link>
              </li>
              <li>
                <Link to="/tours/rara" className="text-muted-foreground hover:text-primary transition-colors">
                  Rara Lake
                </Link>
              </li>
              <li>
                <Link to="/tours/pokhara" className="text-muted-foreground hover:text-primary transition-colors">
                  Pokhara Valley
                </Link>
              </li>
              <li>
                <Link to="/tours/dhorpatan" className="text-muted-foreground hover:text-primary transition-colors">
                  Dhorpatan Reserve
                </Link>
              </li>
              <li>
                <Link to="/tours/everest" className="text-muted-foreground hover:text-primary transition-colors">
                  Everest Base Camp
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

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Adventure Nepal. All rights reserved.</p>
          <div className="flex gap-4">
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
