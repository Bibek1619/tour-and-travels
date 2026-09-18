import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin, unauthorized } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FORMATS = ["jpg", "jpeg", "png", "webp", "mp4", "webm", "mov"];
const MAX_SIZE = 30 * 1024 * 1024;

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") as string) || "tour-travels/tours";

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "File exceeds 30MB limit" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_FORMATS.includes(ext)) {
      return NextResponse.json(
        { success: false, message: "Only JPG, PNG, WEBP, MP4, WEBM or MOV files are allowed" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const isVideo = ["mp4", "webm", "mov"].includes(ext);

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: isVideo ? "video" : "auto",
            allowed_formats: ALLOWED_FORMATS,
            transformation: isVideo
              ? []
              : [
                  { width: 1920, crop: "scale", quality: "auto", fetch_format: "auto" },
                ],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as { secure_url: string });
          }
        );
        uploadStream.end(buffer);
      }
    );

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload image" },
      { status: 500 }
    );
  }
}