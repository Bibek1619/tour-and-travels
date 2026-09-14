import type { ComponentType } from "react";
import {
  Users,
  MapPin,
  Calendar,
  Award,
  Star,
  Clock,
  Mountain,
  Compass,
  Heart,
  Shield,
  Headphones,
  CreditCard,
  Phone,
  Mail,
  MessageSquare,
  Bus,
  CalendarCheck,
  Armchair,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Users,
  MapPin,
  Calendar,
  Award,
  Star,
  Clock,
  Mountain,
  Compass,
  Heart,
  Shield,
  Headphones,
  CreditCard,
  Phone,
  Mail,
  MessageSquare,
  Bus,
  CalendarCheck,
  Armchair,
  TrendingUp,
  ArrowRight,
};

export function getIcon(
  name: string,
  fallback?: ComponentType<{ className?: string }>
): ComponentType<{ className?: string }> {
  return iconMap[name] ?? fallback ?? Star;
}

export function toIconList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export function toNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function asList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v).trim());
  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}