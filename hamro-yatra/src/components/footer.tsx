import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "./ui/separator";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t">
      {/* Associations, Payment & Social Section */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 divide-y md:divide-y-0 divide-gray-100 text-center">
            {/* We Are Associated With */}
            <div className="pt-6 md:pt-0 first:pt-0">
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">
                We Are Associated With
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <img
                  src="/nepal-tourism-board.png"
                  alt="Nepal Tourism Board"
                  className="h-12 sm:h-16 object-contain hover:scale-110 transition-transform"
                />
                <div className="hidden text-sm font-semibold text-gray-600 border border-gray-300 rounded px-4 py-2">
                  Nepal Tourism Board
                </div>

                <img
                  src="/taan.png"
                  alt="TAAN"
                  className="h-12 sm:h-16 object-contain hover:scale-110 transition-transform"
                />
                <div className="hidden text-sm font-semibold text-gray-600 border border-gray-300 rounded px-4 py-2">
                  TAAN
                </div>

                <img
                  src="/nma.png"
                  alt="Nepal Mountaineering Association"
                  className="h-12 sm:h-16 object-contain hover:scale-110 transition-transform"
                />
                <div className="hidden text-sm font-semibold text-gray-600 border border-gray-300 rounded px-4 py-2">
                  NMA
                </div>
              </div>
            </div>

            {/* We Accept */}
            <div className="pt-6 md:pt-0">
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">
                We Accept
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 sm:px-6 sm:py-3 hover:border-blue-500 transition-colors">
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">
                    VISA
                  </span>
                </div>
                <div className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 sm:px-6 sm:py-3 hover:border-red-500 transition-colors">
                  <span className="text-xl sm:text-2xl font-bold text-red-600">
                    Mastercard
                  </span>
                </div>
                <div className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 sm:px-6 sm:py-3 hover:border-gray-600 transition-colors">
                  <span className="text-sm font-bold text-gray-700">
                    Bank Transfer
                  </span>
                </div>
              </div>
            </div>

            {/* Find & Follow Us on */}
            <div className="pt-6 md:pt-0">
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">
                Find &amp; Follow Us on
              </h4>
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <a
                  href="https://www.facebook.com/share/1EyvKahGsk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <FacebookIcon className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/hamro_yatra_adventure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <InstagramIcon className="h-6 w-6" />
                </a>
                <a
                  href="https://www.tiktok.com/@hamroyatraadventucher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 hover:bg-black text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <TikTokIcon className="h-6 w-6" />
                </a>
                <a
                  href="https://youtube.com/@hamroyatradventure333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <YoutubeIcon className="h-6 w-6" />
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
            <h3 className="font-bold text-xl mb-4 text-primary">
Hamro Yatra Adventure
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              26+ years of experience in organizing trekking, tours, and
              transportation services across Nepal.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1EyvKahGsk/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/hamro_yatra_adventure" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@hamroyatraadventucher" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/@hamroyatradventure333" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-muted-foreground hover:text-primary transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/seat-booking" className="text-muted-foreground hover:text-primary transition-colors">
                  Seat Booking
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-muted-foreground hover:text-primary transition-colors">
                  Vehicle Rental
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-muted-foreground hover:text-primary transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/Trek" className="text-muted-foreground hover:text-primary transition-colors">
                  Trekking pakages
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-muted-foreground hover:text-primary transition-colors">
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
                <Link href="/tours/rara" className="text-muted-foreground hover:text-primary transition-colors">
                  Rara Lake Tour
                </Link>
              </li>
              <li>
                <Link href="/tours/pokhara" className="text-muted-foreground hover:text-primary transition-colors">
                  Pokhara Valley Tour
                </Link>
              </li>
              <li>
                <Link href="/tours/chitwan" className="text-muted-foreground hover:text-primary transition-colors">
                  Chitwan Jungle Safari
                </Link>
              </li>
              <li>
                <Link href="/tours/kathmandu-valley" className="text-muted-foreground hover:text-primary transition-colors">
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
          <p>© 2025 Hamro Yatra Adventure. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;