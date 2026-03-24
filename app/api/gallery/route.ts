import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const folderName = "Unimate";
    const result = await cloudinary.api.resources({
      max_results: 10,
      type: "upload",
      prefix: folderName,
    });
    return NextResponse.json({ resources: result.resources });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Error while getting resources",
      },
      { status: 500 },
    );
  }
}
