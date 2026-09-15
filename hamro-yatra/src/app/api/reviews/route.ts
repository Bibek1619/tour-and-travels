import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Review } from "@/models/review";
import { TourPackage } from "@/models/tourPackage";
import { Vehicle } from "@/models/vehicle";
import { Adventure } from "@/models/adventure";
import { recomputeRating, type ReviewTarget } from "@/lib/review-helpers";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const sp = request.nextUrl.searchParams;
    const status = sp.get("status");
    const page = Number(sp.get("page") || 1);
    const limit = Number(sp.get("limit") || 50);

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const reviews = await Review.find(
      query as unknown as Parameters<typeof Review.find>[0]
    )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Review.countDocuments(
      query as unknown as Parameters<typeof Review.countDocuments>[0]
    );

    return NextResponse.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: reviews,
    });
  } catch (error) {
    console.error("Get reviews error:", error);
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
    const {
      tour,
      vehicle,
      adventure,
      name,
      email,
      rating,
      review,
      user,
      location,
    } = body;

    if (!name || !rating || !review) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, rating and review are required.",
        },
        { status: 400 }
      );
    }

    const targets: ReviewTarget[] = [];
    if (tour) {
      const exists = await TourPackage.findById(tour);
      if (!exists) {
        return NextResponse.json(
          { success: false, message: "Tour not found" },
          { status: 404 }
        );
      }
      targets.push({ type: "tour", id: tour });
    }
    if (vehicle) {
      const exists = await Vehicle.findById(vehicle);
      if (!exists) {
        return NextResponse.json(
          { success: false, message: "Vehicle not found" },
          { status: 404 }
        );
      }
      targets.push({ type: "vehicle", id: vehicle });
    }
    if (adventure) {
      const exists = await Adventure.findById(adventure);
      if (!exists) {
        return NextResponse.json(
          { success: false, message: "Adventure not found" },
          { status: 404 }
        );
      }
      targets.push({ type: "adventure", id: adventure });
    }

    if (targets.length !== 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Exactly one of tour, vehicle or adventure is required.",
        },
        { status: 400 }
      );
    }

    const newReview = await Review.create({
      tour: targets[0].type === "tour" ? targets[0].id : undefined,
      vehicle: targets[0].type === "vehicle" ? targets[0].id : undefined,
      adventure: targets[0].type === "adventure" ? targets[0].id : undefined,
      user: user || null,
      name: String(name).trim(),
      email: email ? String(email).trim().toLowerCase() : undefined,
      location: location ? String(location).trim() : undefined,
      rating: Number(rating),
      review: String(review).trim(),
    });

    await recomputeRating(targets[0]);

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for reviewing us!",
        data: newReview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}