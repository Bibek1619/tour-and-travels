"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import DeleteButton from "@/components/admin/delete-button";

export default function RowActions({
  baseHref,
  endpoint,
}: {
  baseHref: string;
  endpoint: string;
}) {
  return (
    <div className="flex items-center justify-end gap-0.5">
      <Link
        href={baseHref}
        className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs font-medium px-2.5 py-1.5 rounded transition-colors"
        title="View"
      >
        <Eye className="h-3.5 w-3.5" />
        View
      </Link>
      <Link
        href={`${baseHref}/edit`}
        className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:bg-orange-50 text-xs font-medium px-2.5 py-1.5 rounded transition-colors"
        title="Edit"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Edit
      </Link>
      <DeleteButton endpoint={endpoint} />
    </div>
  );
}