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

const UserDropdown = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; // UI only (replace later)

  // 🔹 Logged OUT UI
  if (!isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            aria-label="User menu"
            className="hover:bg-amber-500 cursor-pointer w-11 h-11"
          >
            <User style={{ width: 28, height: 28 }} />
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
          className="hover:bg-amber-500 cursor-pointer px-3 py-2 rounded-md text-sm"
        >
          <User className="w-6 h-6 mr-1" />
          Bibek
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
          onClick={() => navigate("/login")}
          className="text-destructive font-medium hover:bg-destructive/10 cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
