import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { DailyRoute } from "@/models/dailyRoute";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const sp = request.nextUrl.searchParams;
    const page = Number(sp.get("page") || 1);
    const limit = Number(sp.get("limit") || 20);
    const status = sp.get("status");
    const featured = sp.get("featured");
    const departureLocation = sp.get("departureLocation");
    const arrivalLocation = sp.get("arrivalLocation");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (featured) query.featured = featured === "true";
    if (departureLocation)
      query["departure.location"] = { $regex: departureLocation, $options: "i" };
    if (arrivalLocation)
      query["arrival.location"] = { $regex: arrivalLocation, $options: "i" };

    const routes = await DailyRoute.find(
      query as unknown as Parameters<typeof DailyRoute.find>[0]
    )
      .sort({ departureDate: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await DailyRoute.countDocuments(
      query as unknown as Parameters<typeof DailyRoute.countDocuments>[0]
    );

    return NextResponse.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: routes,
    });
  } catch (error) {
    console.error("Get daily routes error:", error);
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

    if (Array.isArray(body.bookedSeats) && body.totalSeats != null) {
      body.availableSeats = Math.max(
        0,
        body.totalSeats - body.bookedSeats.length
      );
    }

    const route = await DailyRoute.create(body);
    return NextResponse.json(
      { success: true, message: "Daily route created successfully", data: route },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create daily route error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}