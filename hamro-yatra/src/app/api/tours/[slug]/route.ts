import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import { revalidateTourPackages } from "@/lib/revalidation";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const tour = await TourPackage.findOne({
      slug,
      status: "published",
    });

    if (!tour) {
      return NextResponse.json(
        { success: false, message: "Tour not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: tour });
  } catch (error) {
    console.error("Get tour by slug error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const { slug } = await params;
    const body = await request.json();
    const tour = await TourPackage.findByIdAndUpdate(slug, body, {
      new: true,
      runValidators: true,
    });
    if (!tour) {
      return NextResponse.json(
        { success: false, message: "Tour not found" },
        { status: 404 }
      );
    }
    revalidateTourPackages();
    return NextResponse.json({
      success: true,
      message: "Tour updated successfully",
      data: tour,
    });
  } catch (error) {
    console.error("Update tour error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const { slug } = await params;
    const tour = await TourPackage.findById(slug);
    if (!tour) {
      return NextResponse.json(
        { success: false, message: "Tour not found" },
        { status: 404 }
      );
    }
    await tour.deleteOne();
    revalidateTourPackages();
    return NextResponse.json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    console.error("Delete tour error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
