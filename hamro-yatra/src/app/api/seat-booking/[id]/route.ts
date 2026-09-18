import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { DailyRoute } from "@/models/dailyRoute";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const route = await DailyRoute.findById(id);
    if (!route) {
      return NextResponse.json(
        { success: false, message: "Route not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const seats: unknown = body?.bookedSeats;
    if (
      !Array.isArray(seats) ||
      seats.some((s) => !Number.isInteger(s) || s < 1 || s > (route.totalSeats ?? 0))
    ) {
      return NextResponse.json(
        { success: false, message: "bookedSeats must be an array of seat numbers within range." },
        { status: 400 }
      );
    }
    const unique = Array.from(new Set(seats));
    if (unique.length !== seats.length) {
      return NextResponse.json(
        { success: false, message: "bookedSeats must not contain duplicates." },
        { status: 400 }
      );
    }

    const existing = Array.isArray(route.bookedSeats) ? route.bookedSeats : [];
    const removed = existing.filter((s) => !seats.includes(s));
    if (removed.length > 0) {
      return NextResponse.json(
        { success: false, message: "Already-booked seats cannot be released." },
        { status: 409 }
      );
    }

    const updated = await DailyRoute.findByIdAndUpdate(
      id,
      {
        $set: {
          bookedSeats: seats,
          availableSeats: Math.max(0, (route.totalSeats ?? 0) - seats.length),
        },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Seats booked successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Seat booking error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}