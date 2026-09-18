import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Vehicle } from "@/models/vehicle";
import { revalidateVehicles } from "@/lib/revalidation";
import { slugify } from "@/lib/slugify";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const sp = request.nextUrl.searchParams;
    const category = sp.get("category");
    const available = sp.get("available");

    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (available === "true") {
      query.isAvailable = true;
      query.availableCount = { $gt: 0 };
    }

    const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    console.error("Get vehicles error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const body = await request.json();

    if (!body.slug && body.name) {
      const base = slugify(body.name);
      let slug = base;
      let n = 1;
      while (await Vehicle.findOne({ slug })) {
        slug = `${base}-${n++}`;
      }
      body.slug = slug;
    }

    const vehicle = await Vehicle.create(body);
    revalidateVehicles();
    return NextResponse.json(
      { success: true, message: "Vehicle created successfully", data: vehicle },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create vehicle error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}
