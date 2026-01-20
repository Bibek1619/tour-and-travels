import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { verifyCodeApi } from "@/api/authApi";
import Loader from "@/components/Loader";

export default function VerifyCode() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [code, setCode] = useState(Array(6).fill("")); // 6-digit OTP
  const inputsRef = useRef([]);
  const [resendTimer, setResendTimer] = useState(30);

  const verifyMutation = useMutation({
    mutationFn: verifyCodeApi,
    onSuccess: () => {
      toast.success("account is created sucessfully .please login ");
      setTimeout(() => {
        navigate("/login"); 
      }, 1500);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to verify code");
    },
  });

  const handleInputChange = (e, idx) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      const newCode = [...code];
      newCode[idx] = val.slice(-1);
      setCode(newCode);

      if (val && idx < code.length - 1) {
        inputsRef.current[idx + 1].focus();
      }
    }
  };

  const handleVerify = () => {
    verifyMutation.mutate({ email, code: code.join("") });
  };

  // Resend timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleResend = () => {
    toast.success(`Verification code resent to ${email}`);
    setResendTimer(30);
    // call resend API if available
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-medium">Invalid access</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative">
      {/* Loader overlay */}
      {verifyMutation.isLoading && <Loader />}

      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
              Verify Your Email
            </h2>
            <p className="text-sm text-muted-foreground">
              We sent a verification code to <br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>

          {/* OTP inputs */}
          <div className="flex justify-between gap-2 mt-4">
            {code.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                ref={(el) => (inputsRef.current[idx] = el)}
                value={digit}
                onChange={(e) => handleInputChange(e, idx)}
                className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            ))}
          </div>

          <Button
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-300 hover:from-green-600 hover:to-green-400 text-white font-semibold"
            onClick={handleVerify}
            disabled={verifyMutation.isLoading}
          >
            {verifyMutation.isLoading ? "Verifying..." : "Verify Code"}
          </Button>

          {/* Resend code */}
          <div className="text-center mt-4 text-sm">
            <span className="text-muted-foreground">Didn’t receive code?{" "}</span>
            <button
              className={`font-medium text-green-500 hover:underline ${
                resendTimer > 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleResend}
              disabled={resendTimer > 0}
            >
              Resend {resendTimer > 0 && `(${resendTimer}s)`}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
