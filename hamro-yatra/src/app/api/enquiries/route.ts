import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/enquiry";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const sp = request.nextUrl.searchParams;
    const page = Number(sp.get("page") || 1);
    const limit = Number(sp.get("limit") || 50);
    const status = sp.get("status");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const enquiries = await Enquiry.find(
      query as unknown as Parameters<typeof Enquiry.find>[0]
    )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Enquiry.countDocuments(
      query as unknown as Parameters<typeof Enquiry.countDocuments>[0]
    );
    const newCount = await Enquiry.countDocuments({ status: "new" });

    return NextResponse.json({
      success: true,
      total,
      newCount,
      page,
      pages: Math.ceil(total / limit),
      data: enquiries,
    });
  } catch (error) {
    console.error("Get enquiries error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const enquiry = await Enquiry.create({
      ...body,
      status: body.status || "new",
    });
    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully", data: enquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create enquiry error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}