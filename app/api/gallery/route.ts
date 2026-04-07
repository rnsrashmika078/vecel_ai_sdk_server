import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const folderName = "Unimate/";
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "Unimate/", // Ensure this matches the case in your Media Library exactly
      resource_type: "image", // The Admin API requires you to pick one, or loop through types
      max_results: 50,
    });
    console.log(result);
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
