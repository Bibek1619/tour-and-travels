"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PriceRow {
  route: string;
  type: string;
  price: number;
}

export function ScorpioPriceTable({ rows }: { rows: PriceRow[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ left: 0, width: 100, hasOverflow: false });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) {
        setState({ left: 0, width: 100, hasOverflow: false });
        return;
      }
      const width = (el.clientWidth / el.scrollWidth) * 100;
      const left = (el.scrollLeft / maxScroll) * (100 - width);
      setState({ left, width, hasOverflow: true });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div>
      <div className="relative">
        <div
          ref={wrapRef}
          className="overflow-x-auto scrollbar-hide rounded-xl border border-gray-200"
        >
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="px-3 py-3 text-sm font-semibold">
                  Travel Details
                </th>
                <th className="px-3 py-3 text-sm font-semibold">
                  Travel Type / Duration
                </th>
                <th className="px-3 py-3 text-sm font-semibold text-right">
                  Price (Nrs)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.route}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-orange-50 transition-colors`}
                >
                  <td className="px-3 py-3 text-sm font-medium text-gray-800">
                    {row.route}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-600">
                    {row.type}
                  </td>
                  <td className="px-3 py-3 text-sm font-bold text-gray-900 text-right">
                    {row.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Scroll arrows (only when table overflows) */}
        {state.hasOverflow && (
          <button
            type="button"
            aria-label="Scroll price table left"
            onClick={() =>
              wrapRef.current?.scrollBy({ left: -320, behavior: "smooth" })
            }
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {state.hasOverflow && (
          <button
            type="button"
            aria-label="Scroll price table right"
            onClick={() =>
              wrapRef.current?.scrollBy({ left: 320, behavior: "smooth" })
            }
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Always-visible scroll indicator */}
      <div
        className={`mt-2 h-1.5 rounded-full bg-gray-200 ${
          state.hasOverflow ? "block" : "hidden"
        }`}
      >
        <div
          className="h-full rounded-full bg-orange-500"
          style={{ width: `${state.width}%`, marginLeft: `${state.left}%` }}
        />
      </div>
    </div>
  );
}

export default ScorpioPriceTable;