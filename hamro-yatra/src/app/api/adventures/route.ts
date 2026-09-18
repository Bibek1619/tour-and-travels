import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Adventure } from "@/models/adventure";
import { revalidateAdventures } from "@/lib/revalidation";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const sp = request.nextUrl.searchParams;
    const page = Number(sp.get("page") || 1);
    const limit = Number(sp.get("limit") || 20);
    const category = sp.get("category");
    const difficulty = sp.get("difficulty");
    const featured = sp.get("featured");
    const search = sp.get("search");

    const query: Record<string, unknown> = {};
    query.status = "published";
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (featured) query.featured = featured === "true";
    if (search)
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];

    const adventures = await Adventure.find(
      query as unknown as Parameters<typeof Adventure.find>[0]
    )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Adventure.countDocuments(
      query as unknown as Parameters<typeof Adventure.countDocuments>[0]
    );

    return NextResponse.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: adventures,
    });
  } catch (error) {
    console.error("Get adventures error:", error);
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

    if (!body.slug && body.name) {
      let base = slugify(body.name);
      let slug = base;
      let n = 1;
      while (await Adventure.findOne({ slug })) {
        slug = `${base}-${n++}`;
      }
      body.slug = slug;
    }

    const adventure = await Adventure.create(body);
    revalidateAdventures();
    return NextResponse.json(
      { success: true, message: "Adventure created successfully", data: adventure },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create adventure error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}