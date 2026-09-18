import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    redirect("/login");
  }
  return <>{children}</>;
}