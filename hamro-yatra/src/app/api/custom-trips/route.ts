import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CustomTrip } from "@/models/customTrip";
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
    if (payloadTooLarge(request.headers.get("content-length"))) {
      return NextResponse.json(
        { success: false, message: "Request body too large." },
        { status: 413 }
      );
    }
    await connectDB();
    const body = await request.json();

    const tripType = cleanString(body.tripType, 24);
    if (!tripType || !["trek", "tour", "other"].includes(tripType)) {
      return NextResponse.json(
        {
          success: false,
          message: "tripType must be one of trek, tour or other.",
        },
        { status: 400 }
      );
    }
    const email = body.email ? cleanString(body.email, MAX.email) : undefined;
    const phone = body.phone ? cleanString(body.phone, MAX.phone) : undefined;
    if (!email || !phone) {
      return NextResponse.json(
        { success: false, message: "Email and phone are required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
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

    const trip = await CustomTrip.create({
      ...body,
      tripType,
      email,
      phone,
      numberOfPeople: numberOfPeople ?? 1,
      status: "new",
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