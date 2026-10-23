"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import UnifiedEnquiryModal from "@/components/unified-enquiry-modal";

interface AdventureEnquiryButtonProps {
  packageName: string;
  packageId: string;
  packageType: "trek" | "tour" | "adventure";
}

export default function AdventureEnquiryButton({
  packageName,
  packageId,
  packageType,
}: AdventureEnquiryButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-3 group"
      >
        <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>Send Enquiry</span>
      </button>

      {showModal && (
        <UnifiedEnquiryModal
          packageName={packageName}
          packageId={packageId}
          packageType={packageType}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
