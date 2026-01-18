import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice"; // adjust path

const UserDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Get auth info from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // 🔹 Logged OUT UI
  if (!isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            aria-label="User menu"
            className="hover:bg-green-100 cursor-pointer w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full"
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 bg-card">
          <DropdownMenuItem onClick={() => navigate("/login")}>
            Sign In
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => navigate("/register")}>
            Sign Up
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // 🔹 Logged IN UI
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          aria-label="User menu"
          className="hover:bg-green-100 cursor-pointer px-2 sm:px-3 py-2 rounded-md flex items-center gap-1 sm:gap-2"
        >
        <User  className="text-red-700" size={34} />

          {/* Show username only on sm+ screens */}
          <span className="hidden sm:inline font-medium">{user?.name || "User"}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 bg-card">
        <DropdownMenuItem asChild>
          <Link to="/dashboard">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/orders/my-orders">Orders</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            dispatch(logout());       // clear Redux state
            navigate("/login");        // redirect to login
          }}
          className="text-destructive font-medium hover:bg-destructive/10 cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
