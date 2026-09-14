import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/booking";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const sp = request.nextUrl.searchParams;
    const page = Number(sp.get("page") || 1);
    const limit = Number(sp.get("limit") || 50);
    const status = sp.get("status");
    const packageType = sp.get("packageType");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (packageType) query.packageType = packageType;

    const bookings = await Booking.find(
      query as unknown as Parameters<typeof Booking.find>[0]
    )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Booking.countDocuments(
      query as unknown as Parameters<typeof Booking.countDocuments>[0]
    );
    const newCount = await Booking.countDocuments({ status: "new" });

    return NextResponse.json({
      success: true,
      total,
      newCount,
      page,
      pages: Math.ceil(total / limit),
      data: bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);
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
    const booking = await Booking.create({
      ...body,
      status: body.status || "new",
    });
    return NextResponse.json(
      {
        success: true,
        message: "Booking request submitted successfully",
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}