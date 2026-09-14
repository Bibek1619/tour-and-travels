import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PageContent } from "@/models/pageContent";
import { pageContentSlugs, deepMerge } from "@/lib/page-content";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content/defaults";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!pageContentSlugs.includes(slug as (typeof pageContentSlugs)[number])) {
      return NextResponse.json(
        { success: false, message: "Unknown page content slug" },
        { status: 404 }
      );
    }
    await connectDB();
    const doc = await PageContent.findOne({ slug }).select("content").lean();
    const defaults = DEFAULT_PAGE_CONTENT[
      slug as (typeof pageContentSlugs)[number]
    ] as unknown as Record<string, unknown>;
    const merged = deepMerge(
      defaults,
      (doc?.content ?? {}) as Record<string, unknown>
    );
    return NextResponse.json({ success: true, data: merged });
  } catch (error) {
    console.error("Get page content error:", error);
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
  try {
    const { slug } = await params;
    if (!pageContentSlugs.includes(slug as (typeof pageContentSlugs)[number])) {
      return NextResponse.json(
        { success: false, message: "Unknown page content slug" },
        { status: 404 }
      );
    }
    const body = await request.json();
    await connectDB();

    await PageContent.findOneAndUpdate(
      { slug },
      { $set: { slug, content: body } },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Page content updated successfully",
    });
  } catch (error) {
    console.error("Update page content error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}