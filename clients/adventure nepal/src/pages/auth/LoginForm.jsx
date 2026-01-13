import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginApi } from "@/api/authApi";
import { loginSuccess } from "@/redux/slices/authSlice";

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 🔐 Login Mutation
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      dispatch(loginSuccess(data));
      toast.success("Signed in successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Invalid email or password"
      );
    },
  });

  // 🧠 Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate({
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  return (
    <div className="flex items-center justify-center bg-background px-4 ">
      <Card className="w-full max-w-md rounded-xl border bg-card shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-center text-2xl font-semibold text-foreground">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
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
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-green-500 text-accent-foreground hover:bg-green-600"
              disabled={loginMutation.isLoading}
            >
              {loginMutation.isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Links */}
          <div className="space-y-2 text-center text-sm">
            <button
              type="button"
              className="text-muted-foreground hover:text-accent"
              onClick={() => toast("Forgot password coming soon")}
            >
              Forgot your password?
            </button>

            <p className="text-muted-foreground">
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-red-500 font-medium hover:underline"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
