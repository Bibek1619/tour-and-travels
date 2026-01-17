import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { verifyCodeApi } from "@/api/authApi";

export default function VerifyCode() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [code, setCode] = useState("");

  const verifyMutation = useMutation({
    mutationFn: verifyCodeApi,
    onSuccess: () => {
      toast.success("Code verified successfully");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to verify code"
      );
    },
  });

  const handleVerify = () => {
    verifyMutation.mutate({ email, code });
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-medium">Invalid access</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
              Verify Your Email
            </h2>
            <p className="text-sm text-muted-foreground">
              We’ve sent a verification code to <br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-center tracking-widest text-lg"
            />
          </div>

          <Button
            className="w-full bg-gradient-to-r from-green-500 to-green-300 hover:from-green-600 hover:to-green-400 text-white font-semibold"
            onClick={handleVerify}
            disabled={verifyMutation.isPending}
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify Code"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
