import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ named import
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";


// Fake auth hook for demo
const useAuth = () => {
  const [user, setUser] = useState({ name: "Bibek" });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const logout = () => setIsAuthenticated(false);

  return { user, isAuthenticated, logout };
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b  bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
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
          {["/", "/seat-booking", "/vehicle-booking", "/tours", "/hotels", "/about", "/contact"].map((href, idx) => (
            <Link
              key={idx}
              to={href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {["Home", "Seat Booking", "Vehicle Booking", "Tour Packages","Trekking Packages","Blogs", "Hotels", "About Us", "Contact"][idx]}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex gap-2 bg-transparent">
                  <User className="h-4 w-4" />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button size="sm" className="hidden sm:flex bg-accent hover:bg-accent/90 text-accent-foreground">
                Login
              </Button>
            </Link>
          )}

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
          {["/", "/seat-booking", "/vehicle-booking", "/tours", "/hotels", "/about", "/contact"].map((href, idx) => (
            <Link
              key={idx}
              to={href}
              className="text-sm font-medium hover:text-primary transition-colors py-2"
            >
              {["Home", "Seat Booking", "Vehicle Booking", "Tour Packages", "Hotels", "About Us", "Contact"][idx]}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors py-2">
                My Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium hover:text-primary transition-colors py-2 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors py-2">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
