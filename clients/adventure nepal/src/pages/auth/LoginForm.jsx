import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainLayout from "@/layouts/MainLayout";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 🔹 UI-only fake login
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Signed in successfully (UI only)");
      navigate("/"); // 👉 redirect after login
    }, 1200);
  };

  return (
    <MainLayout>
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-2xl border border-border rounded-2xl bg-card">
        <CardContent className="p-6">
          <h2 className="text-center text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-400 text-transparent bg-clip-text">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <button
              type="button"
              className="text-sm text-accent hover:underline"
              onClick={() => toast("Forgot password UI only")}
            >
              Forgot your password?
            </button>

            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-accent font-medium hover:underline"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
    </MainLayout>
  );
}
