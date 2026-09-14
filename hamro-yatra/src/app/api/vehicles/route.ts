import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Vehicle } from "@/models/vehicle";

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
  try {
    await connectDB();
    const body = await request.json();
    const vehicle = await Vehicle.create(body);
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
