import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/booking";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";
import { cleanString, clampInt, isValidEmail, payloadTooLarge, MAX } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
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
    if (payloadTooLarge(request.headers.get("content-length"))) {
      return NextResponse.json(
        { success: false, message: "Request body too large." },
        { status: 413 }
      );
    }
    await connectDB();
    const body = await request.json();

    const name = cleanString(body.name, MAX.name);
    const phone = cleanString(body.phone, MAX.phone);
    const email = body.email ? cleanString(body.email, MAX.email) : undefined;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required." },
        { status: 400 }
      );
    }
    if (email !== undefined && !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    let numberOfPeople: number | undefined;
    if (body.numberOfPeople != null) {
      numberOfPeople = clampInt(body.numberOfPeople, 1, 100) ?? undefined;
      if (numberOfPeople === undefined) {
        return NextResponse.json(
          {
            success: false,
            message: "Number of people must be between 1 and 100.",
          },
          { status: 400 }
        );
      }
    }

    const booking = await Booking.create({
      ...body,
      name,
      phone,
      email: email ?? undefined,
      numberOfPeople: numberOfPeople ?? 1,
      status: "new",
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