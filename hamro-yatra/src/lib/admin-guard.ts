import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function requireAdmin(): Promise<boolean> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const role = session?.user?.role;
    if (!role) return false;
    return Array.isArray(role) ? role.includes("admin") : role === "admin";
  } catch (error) {
    console.error("requireAdmin error:", error);
    return false;
  }
}

export function unauthorized(): NextResponse {
  return NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  );
}