import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Car, 
  Calendar, 
  Mountain,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Compass
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Tours',
      href: '/admin/dashboard/tours',
      icon: Mountain,
    },
    {
      name: 'Vehicles',
      href: '/admin/dashboard/vehicles',
      icon: Car,
    },
    {
      name: 'Adventures',
      href: '/admin/dashboard/adventures',
      icon: Compass,
    },
    {
      name: 'Bookings',
      href: '/admin/dashboard/bookings',
      icon: Calendar,
    },
    {
      name: 'Users',
      href: '/admin/dashboard/users',
      icon: Users,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const Sidebar = ({ mobile = false }) => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
          <Mountain className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900">Adventure Nepal</span>
          <span className="text-xs text-gray-500">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => mobile && setMobileOpen(false)}
              className={`
                group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all
                ${
                  isActive
                    ? 'bg-orange-50 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive ? 'text-orange-600' : 'text-gray-500 group-hover:text-gray-700'
                }`}
              />
              <span>{item.name}</span>
              {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center gap-3 rounded-lg border bg-gray-50 p-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-orange-500 text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'Admin User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@example.com'}</p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full mt-3 justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
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
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Mountain className="h-6 w-6 text-orange-600" />
          <span className="text-lg font-bold">Adventure Nepal</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
