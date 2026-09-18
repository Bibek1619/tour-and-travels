import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import { revalidateTourPackages } from "@/lib/revalidation";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const body = await request.json();
    const ids: unknown = body?.ids;

    if (!Array.isArray(ids) || ids.length === 0 || !ids.every((id) => typeof id === "string")) {
      return NextResponse.json(
        { success: false, message: "An ordered list of IDs is required." },
        { status: 400 }
      );
    }

    await Promise.all(
      ids.map((id: string, index: number) =>
        TourPackage.findByIdAndUpdate(id, { sortOrder: index + 1 })
      )
    );

    revalidateTourPackages();
    return NextResponse.json({
      success: true,
      message: "Order saved successfully",
    });
  } catch (error) {
    console.error("Reorder error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}