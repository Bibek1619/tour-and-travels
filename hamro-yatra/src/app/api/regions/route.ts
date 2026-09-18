import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Region } from "@/models/region";
import { revalidateRegion } from "@/lib/revalidation";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const regions = await Region.find().sort({ name: 1 }).lean();
    return NextResponse.json(regions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch regions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await connectDB();
    const body = await request.json();
    const region = await Region.create(body);
    revalidateRegion();
    return NextResponse.json(region, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create region" },
      { status: 500 }
    );
  }
}
