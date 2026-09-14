"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface CustomerInfoFormProps {
  onBack: () => void;
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
}

export default function CustomerInfoForm({
  onBack,
  onSubmit,
}: CustomerInfoFormProps) {
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  const isValid = customer.name && customer.email && customer.phone;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl border p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Your Information</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Name *</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={customer.name}
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email *</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Phone *</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex-1 border hover:bg-gray-50 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={() => onSubmit(customer)}
          disabled={!isValid}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
