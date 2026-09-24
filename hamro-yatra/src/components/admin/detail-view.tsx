import {
  type FieldGroup,
  getPath,
} from "@/lib/admin-config";
import { DeleteButton } from "@/components/admin/delete-button";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

function formatValue(field: { type: string; columns?: { key: string; label: string }[] }, raw: unknown) {
  switch (field.type) {
    case "checkbox":
      return raw ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
          Yes
        </span>
      ) : (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          No
        </span>
      );
    case "date": {
      if (!raw) return "—";
      const d = new Date(raw as string);
      return isNaN(d.getTime()) ? String(raw) : d.toLocaleDateString();
    }
    case "list":
      if (!Array.isArray(raw) || raw.length === 0) return "—";
      return (
        <div className="flex flex-wrap gap-1.5">
          {raw.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      );
    case "images":
      if (!Array.isArray(raw) || raw.length === 0) return "—";
      return (
        <div className="flex flex-wrap gap-2">
          {raw.map((src, i) => (
            <div key={i} className="relative h-16 w-24 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={src as string}
                alt=""
                fill
                sizes="96px"
                unoptimized
                className="object-cover"
              />
            </div>
          ))}
        </div>
      );
    case "rows": {
      if (!Array.isArray(raw) || raw.length === 0) return "—";
      const columns = field.columns ?? [];
      return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-2">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {raw.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2 text-gray-700">
                      {String((row as Record<string, unknown>)[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    default:
      if (raw == null) return "—";
      if (typeof raw === "object") return JSON.stringify(raw);
      return String(raw);
  }
}

export function DetailView({
  entity,
  id,
  label,
  groups,
  data,
  backHref,
  editHref,
  deleteEndpoint,
}: {
  entity: string;
  id: string;
  label: string;
  groups: FieldGroup[];
  data: Record<string, unknown>;
  backHref: string;
  editHref: string;
  deleteEndpoint: string;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {String(data.title ?? data.name ?? data.routeName ?? `${label} Details`)}
          </h1>
          <p className="text-sm text-gray-500">
            {label} · ID: <span className="font-mono">{id}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={editHref}
            className="inline-flex items-center gap-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Edit
          </Link>
          <DeleteButton endpoint={deleteEndpoint} />
          <Link
            href={backHref}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-2"
          >
            Back to list
          </Link>
        </div>
      </div>

      {groups.map((group) => {
        const hasValues = group.fields.some(
          (f) => getPath(data, f.name) != null
        );
        if (!hasValues) return null;
        return (
          <div
            key={group.title}
            className="bg-white rounded-xl border border-gray-200 mb-6"
          >
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {group.title}
              </h2>
            </div>
            <dl className="divide-y divide-gray-100">
              {group.fields
                .filter((f) => getPath(data, f.name) != null)
                .map((field) => (
                  <div
                    key={field.name}
                    className="grid gap-2 py-4 px-6 md:grid-cols-3"
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      {field.label}
                    </dt>
                    <dd className="text-sm text-gray-900 md:col-span-2 whitespace-pre-wrap">
                      {formatValue(field, getPath(data, field.name))}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
}

export default DetailView;