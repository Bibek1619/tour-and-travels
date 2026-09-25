"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface PriceRow {
  route: string;
  price: number;
  usd: number;
  distance: string;
  time: string;
}

export function ScorpioPriceTable({ rows }: { rows: PriceRow[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    hasOverflow: false,
    canScrollLeft: false,
    canScrollRight: false,
    canScrollDown: false,
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const maxScrollX = Math.max(0, el.scrollWidth - el.clientWidth);
      const maxScrollY = Math.max(0, el.scrollHeight - el.clientHeight);
      setState({
        hasOverflow: maxScrollX > 1,
        canScrollLeft: maxScrollX > 1 && el.scrollLeft > 1,
        canScrollRight: maxScrollX > 1 && el.scrollLeft < maxScrollX - 1,
        canScrollDown:
          maxScrollY > 1 && el.scrollTop < maxScrollY - 1,
      });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollTable = (amount: -1 | 1) => {
    const el = wrapRef.current;
    if (!el) return;

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = Math.min(maxScroll, Math.max(0, el.scrollLeft + amount * 320));
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const scrollDown = () => {
    const el = wrapRef.current;
    if (!el) return;

    const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
    const target = Math.min(maxScroll, el.scrollTop + 320);
    el.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div>
      <p className="mb-3 text-sm text-gray-600">
        Distances and travel times are approximate and may vary by route and
        traffic.
      </p>
      <div className="relative">
        <div
          ref={wrapRef}
          className="max-h-[270px] overscroll-contain overflow-x-auto overflow-y-auto border border-gray-300 bg-white"
        >
          <table className="w-full min-w-[780px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[300px]" />
              <col className="w-[120px]" />
              <col className="w-[150px]" />
              <col className="w-[120px]" />
              <col className="w-[100px]" />
            </colgroup>
            <thead>
              <tr className="bg-gray-50 text-gray-950">
                <th className="sticky top-0 z-10 border border-gray-300 bg-gray-50 px-3 py-3 text-sm font-semibold">
                  Scorpio Rental for
                </th>
                <th className="sticky top-0 z-10 border border-gray-300 bg-gray-50 px-3 py-3 text-sm font-semibold whitespace-nowrap">
                  Cost (NRS)
                </th>
                <th className="sticky top-0 z-10 border border-gray-300 bg-gray-50 px-3 py-3 text-sm font-semibold whitespace-nowrap">
                  Cost (USD)
                </th>
                <th className="sticky top-0 z-10 border border-gray-300 bg-gray-50 px-3 py-3 text-sm font-semibold whitespace-nowrap">
                  Distance (KM)
                </th>
                <th className="sticky top-0 z-10 border border-gray-300 bg-gray-50 px-3 py-3 text-sm font-semibold whitespace-nowrap">
                  Time (Hrs)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.route}
                  className="bg-white transition-colors hover:bg-orange-50/40"
                >
                  <td className="border border-gray-300 px-3 py-3 text-sm font-medium text-gray-800">
                    {row.route}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-900">
                    {row.price.toLocaleString("en-US")}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-sm text-gray-700">
                    {row.usd}$
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-sm text-gray-700">
                    {row.distance}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-sm text-gray-700">
                    {row.time}
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
            onClick={() => scrollTable(-1)}
            disabled={!state.canScrollLeft}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {state.hasOverflow && (
          <button
            type="button"
            aria-label="Scroll price table right"
            onClick={() => scrollTable(1)}
            disabled={!state.canScrollRight}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
      {state.canScrollDown && (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            aria-label="Scroll price table down"
            onClick={scrollDown}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-orange-600 shadow-lg ring-1 ring-gray-200 transition hover:bg-orange-600 hover:text-white"
          >
            <ChevronDown className="w-4 h-4" />
            More Routes
          </button>
        </div>
      )}
    </div>
  );
}

export default ScorpioPriceTable;