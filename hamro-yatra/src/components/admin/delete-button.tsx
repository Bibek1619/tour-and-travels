"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteButton({
  endpoint,
}: {
  endpoint: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleDelete = async () => {
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        alert(json?.message || "Delete failed");
        return;
      }
      setConfirming(false);
      startTransition(() => router.refresh());
    } catch (error) {
      alert("Delete failed: " + (error as Error).message);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={pending}
          className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
        >
          {pending && <Loader2 className="h-3 w-3 animate-spin" />}
          Confirm
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-medium px-3 py-1.5 rounded transition-colors"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Delete
    </button>
  );
}

export default DeleteButton;