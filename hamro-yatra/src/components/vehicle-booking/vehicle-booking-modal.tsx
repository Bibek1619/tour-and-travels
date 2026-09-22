"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Loader2,
  CheckCircle2,
  CalendarDays,
  Users,
  ShieldCheck,
  Send,
} from "lucide-react";

interface VehicleBookingModalProps {
  mode: "booking" | "enquiry";
  vehicleName: string;
  vehicleId: string;
  onClose: () => void;
}

interface FormState {
  packageName: string;
  adults: string;
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  message: string;
  agree: boolean;
}

const emptyForm: FormState = {
  packageName: "",
  adults: "1",
  fullName: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  message: "",
  agree: false,
};

const inputClass =
  "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-sm";

export default function VehicleBookingModal({
  mode,
  vehicleName,
  vehicleId,
  onClose,
}: VehicleBookingModalProps) {
  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    packageName: vehicleName,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const isBooking = mode === "booking";
  const title = isBooking ? "Book Vehicle" : "Make Enquiry";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const update = (key: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone) {
      setError("Please fill in your full name, email and phone number.");
      return;
    }
    if (isBooking && !form.agree) {
      setError("Please agree to the Terms and Conditions to continue.");
      return;
    }
    setError("");
    setStatus("submitting");
    const payload = {
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      location: "Pokhara, Nepal",
      startDate: form.checkIn ? new Date(form.checkIn) : undefined,
      endDate: form.checkOut ? new Date(form.checkOut) : undefined,
      numberOfPeople: Number(form.adults || 1),
      comment: form.message,
      packageName: isBooking
        ? `${form.packageName || vehicleName} - Booking`
        : vehicleName,
      packageType: "vehicle",
      packageId: vehicleId,
      termsAgreed: isBooking ? form.agree : false,
    };
    try {
      const res = await fetch(isBooking ? "/api/bookings" : "/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or call us directly.");
    }
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/60 overflow-y-auto"
    >
      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white rounded-t-2xl">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              {!isBooking && (
                <p className="text-sm text-gray-500 mt-1">
                  Make an enquiry and we will reach you as soon as possible.
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {status === "success" ? (
            <div className="p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isBooking ? "Booking Request Sent!" : "Enquiry Sent!"}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Thank you! Our team will contact you shortly to confirm your{" "}
                {vehicleName} hire.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Package
                </label>
                <input
                  type="text"
                  value={form.packageName}
                  onChange={(e) => update("packageName", e.target.value)}
                  className={inputClass}
                  readOnly
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-sm font-medium mb-1.5">
                  <Users className="w-4 h-4 text-orange-600" />
                  No. of People -
                  <span className="text-red-600">*</span>
                </label>
                <select
                  value={form.adults}
                  onChange={(e) => update("adults", e.target.value)}
                  className={inputClass}
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                  <option value="5">5 Adults</option>
                  <option value="6">6 Adults</option>
                  <option value="7">7 Adults</option>
                </select>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Personal Details
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium mb-1.5">
                        <CalendarDays className="w-4 h-4 text-orange-600" />
                        Check In
                      </label>
                      <input
                        type="text"
                        value={form.checkIn}
                        onChange={(e) => update("checkIn", e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium mb-1.5">
                        <CalendarDays className="w-4 h-4 text-orange-600" />
                        Check Out
                      </label>
                      <input
                        type="text"
                        value={form.checkOut}
                        onChange={(e) => update("checkOut", e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={3}
                      placeholder="Where do you want to travel? Any special requests?"
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              </div>

              {isBooking && (
                <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => update("agree", e.target.checked)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span>
                    I understand / agree the{" "}
                    <span className="font-medium">Terms and Conditions</span>.{" "}
                    <span className="text-red-600">*</span>
                  </span>
                </label>
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-colors"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : isBooking ? (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Book Vehicle
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Enquiry
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}