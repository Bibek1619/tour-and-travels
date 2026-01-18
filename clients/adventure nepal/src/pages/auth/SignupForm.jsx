import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/api/authApi";

export default function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ React Query handles loading, success & error
 const registerMutation = useMutation({
  mutationFn: registerApi,
  onSuccess: (data, variables) => {
    console.log("SUCCESS", data, variables); // ✅ log for debugging
    toast.success("Verification code is sent to your email, check it out");
    navigate("/verify-code", { state: { email: variables.email } });
  },
  onError: (error) => {
    toast.error(error?.response?.data?.message || "Registration failed");
  },
});


  const handleSubmit = (e) => {
    e.preventDefault();


    registerMutation.mutate({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  return (
    <div className="flex items-center justify-center bg-background px-4 ">
      <Card className="w-full max-w-md shadow-2xl border rounded-2xl bg-card">
        <CardContent className="p-6">
          <h2 className="text-center text-2xl font-bold mb-6 bg-gradient-to-r from-green-500 to-green-400 text-transparent bg-clip-text">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Bibek Sharma"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>

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
              className="w-full rounded-lg bg-gradient-to-r from-green-500 to-green-300 hover:from-green-600 hover:to-green-400 text-white font-semibold"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating account..."
                : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              className="text-accent font-medium hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
