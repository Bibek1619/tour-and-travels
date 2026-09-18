import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import { revalidateTourPackages } from "@/lib/revalidation";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(request: NextRequest) {
  console.log("[tours] request URL:", request.url);
  try {
    await connectDB();

    const sp = request.nextUrl.searchParams;
    const page = Number(sp.get("page") || 1);
    const limit = Number(sp.get("limit") || 10);
    const category = sp.get("category");
    const search = sp.get("search");
    const region = sp.get("region");

    const query: Record<string, unknown> = {};
    query.status = "published";
    if (category) query.category = category;
    if (region) query.region = region;
    if (search) query.title = { $regex: search, $options: "i" };

    const tours = await TourPackage.find(
      query as unknown as Parameters<typeof TourPackage.find>[0]
    )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await TourPackage.countDocuments(
      query as unknown as Parameters<typeof TourPackage.countDocuments>[0]
    );

    return NextResponse.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: tours,
    });
  } catch (error) {
    console.error("Get tours error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const body = await request.json();

    if (!body.slug && body.title) {
      let base = slugify(body.title);
      let slug = base;
      let n = 1;
      while (await TourPackage.findOne({ slug })) {
        slug = `${base}-${n++}`;
      }
      body.slug = slug;
    }

    const tour = await TourPackage.create(body);
    revalidateTourPackages();
    return NextResponse.json(
      { success: true, message: "Tour created successfully", data: tour },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create tour error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}