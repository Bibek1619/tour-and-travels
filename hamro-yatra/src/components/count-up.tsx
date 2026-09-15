"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function parseValue(raw: string): {
  target: number;
  suffix: string;
  abbreviated: "K" | "M" | "";
} {
  const match = raw.trim().match(/^([\d,]+\.?\d*)\s*([KkMm]?)\s*(.*)$/);
  if (!match) return { target: 0, suffix: raw.trim(), abbreviated: "" };
  const num = Number(match[1].replace(/,/g, ""));
  const abbreviation = match[2].toUpperCase() as "K" | "M" | "";
  const multiplier =
    abbreviation === "M" ? 1_000_000 : abbreviation === "K" ? 1_000 : 1;
  const target = num * multiplier;
  return {
    target: Number.isFinite(target) ? target : 0,
    suffix: match[3],
    abbreviated: abbreviation,
  };
}

function formatCount(value: number, abbreviated: "K" | "M" | ""): string {
  if (abbreviated === "M") {
    return (value / 1_000_000).toLocaleString("en-US", {
      maximumFractionDigits: 1,
    });
  }
  if (abbreviated === "K") {
    return (value / 1_000).toLocaleString("en-US", {
      maximumFractionDigits: value % 1_000 === 0 ? 0 : 1,
    });
  }
  return value.toLocaleString("en-US");
}

export default function CountUp({
  value,
  duration = 1800,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  const { target, suffix, abbreviated } = parseValue(value);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {formatCount(display, abbreviated)}
      {suffix}
    </span>
  );
}