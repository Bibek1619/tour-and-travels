"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Car,
  Mountain,
  Menu,
  X,
  ChevronRight,
  Compass,
  Inbox,
  Star,
  FileText,
  ClipboardList,
  CalendarCheck,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

function AdminUserBox() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  return (
    <div className="border-t p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-gray-700">
            {user?.name ?? "Administrator"}
          </p>
          <p className="truncate text-xs text-gray-400">
            {user?.email ?? "Signed in"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Sign out"
          onClick={async () => {
            await authClient.signOut();
            router.push("/login");
            router.refresh();
          }}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Tours", href: "/admin/tours", icon: Package },
  { name: "Treks", href: "/admin/treks", icon: Mountain },
  { name: "Vehicles", href: "/admin/vehicles", icon: Car },
  { name: "Adventures", href: "/admin/adventures", icon: Compass },
  { name: "Page Content", href: "/admin/page-content", icon: FileText },
  { name: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { name: "Booking Requests", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Customized Trips", href: "/admin/custom-trips", icon: ClipboardList },
  { name: "Reviews", href: "/admin/reviews", icon: Star },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <Link href="/" className="flex h-16 items-center gap-3 border-b px-6">
        <img
          src="/hamro yatra.jpeg"
          alt="Hamro Yatra Adventure"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-base font-bold text-gray-900 leading-tight">
            Hamro Yatra Adventure
          </span>
          <span className="text-xs text-gray-500">Admin Panel</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => mobile && setMobileOpen(false)}
              className={`
                group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-orange-50 text-orange-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive
                    ? "text-orange-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <span>{item.name}</span>
              {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      <AdminUserBox />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col border-r bg-white">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b bg-white px-4 shadow-sm lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <div className="flex items-center gap-2">
          <img
            src="/hamro yatra.jpeg"
            alt="Hamro Yatra Adventure"
            className="h-7 w-7 rounded-full object-cover"
          />
          <span className="text-lg font-bold">Admin Panel</span>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-72 border-r bg-white lg:hidden">
          <Sidebar mobile />
        </div>
      )}

      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

export default AdminLayout;