import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CustomTrip } from "@/models/customTrip";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const sp = request.nextUrl.searchParams;
    const page = Number(sp.get("page") || 1);
    const limit = Number(sp.get("limit") || 50);
    const status = sp.get("status");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const trips = await CustomTrip.find(
      query as unknown as Parameters<typeof CustomTrip.find>[0]
    )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await CustomTrip.countDocuments(
      query as unknown as Parameters<typeof CustomTrip.countDocuments>[0]
    );
    const newCount = await CustomTrip.countDocuments({ status: "new" });

    return NextResponse.json({
      success: true,
      total,
      newCount,
      page,
      pages: Math.ceil(total / limit),
      data: trips,
    });
  } catch (error) {
    console.error("Get custom trips error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const trip = await CustomTrip.create({
      ...body,
      status: body.status || "new",
    });
    return NextResponse.json(
      { success: true, message: "Trip plan submitted successfully", data: trip },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create custom trip error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}