import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Review } from "@/models/review";
import { TourPackage } from "@/models/tourPackage";
import { Vehicle } from "@/models/vehicle";
import { Adventure } from "@/models/adventure";
import { recomputeRating, type ReviewTarget } from "@/lib/review-helpers";
import { revalidateEntityType } from "@/lib/revalidation";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";
import { cleanString, clampInt, isValidEmail, payloadTooLarge, MAX } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
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
    if (payloadTooLarge(request.headers.get("content-length"))) {
      return NextResponse.json(
        { success: false, message: "Request body too large." },
        { status: 413 }
      );
    }
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

    const cleanRating = clampInt(rating, 1, 5);
    if (cleanRating === null) {
      return NextResponse.json(
        { success: false, message: "Rating must be a whole number from 1 to 5." },
        { status: 400 }
      );
    }

    const cleanName = cleanString(name, MAX.name);
    const cleanLocation = location ? cleanString(location, MAX.location) : undefined;
    const cleanTitle = body.title ? cleanString(body.title, MAX.name) : undefined;
    const cleanEmail = email ? cleanString(email, MAX.email) : undefined;
    if (!cleanName || !String(review).trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, rating and review are required.",
        },
        { status: 400 }
      );
    }
    if (cleanEmail !== undefined && !isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (String(review).trim().length > 2000) {
      return NextResponse.json(
        { success: false, message: "Review must be at most 2000 characters." },
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
      user: null,
      name: cleanName,
      email: cleanEmail,
      location: cleanLocation,
      title: cleanTitle,
      rating: cleanRating,
      review: String(review).trim(),
    });

    await recomputeRating(targets[0]);

    revalidateEntityType(targets[0].type);

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