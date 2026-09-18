const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX = {
  name: 120,
  email: 254,
  phone: 40,
  location: 200,
  comment: 5000,
} as const;

export const MAX_BODY_BYTES = 200_000;

export function isValidEmail(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return (
    value.length > 0 &&
    value.length <= MAX.email &&
    EMAIL_RE.test(value)
  );
}

export function cleanString(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const s = value.trim();
  if (!s || s.length > max) return undefined;
  return s;
}

export function clampInt(
  value: unknown,
  min: number,
  max: number
): number | null {
  const n = Number(value);
  if (!Number.isFinite(n) || Math.floor(n) !== n || n < min || n > max) {
    return null;
  }
  return n;
}

export function payloadTooLarge(contentLength: string | null): boolean {
  return contentLength !== null && Number(contentLength) > MAX_BODY_BYTES;
}