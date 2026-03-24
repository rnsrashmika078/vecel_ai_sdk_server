import { FileType } from "../types/type";
import { apiFetch } from "./api_fetch";

export async function CloudinaryUpload(
  file: File | null = null
): Promise<FileType | null> {
  if (file != null) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Unimate");
    data.append("cloud_name", "dwcjokd3s");
    data.append("folder", "Unimate/uploads");

    const res = await apiFetch(
      "https://api.cloudinary.com/v1_1/dwcjokd3s/auto/upload",
      "POST",
      data,
      "EXTERNAL"
    );
    if (!res || !res.ok) return null;
    const result = await res.json();

    if (result) {
      const payload = {
        public_id: result.public_id,
        name: result.display_name,
        url: result.secure_url,
        format: result.format,
      };
      return payload;
    }
  }

  return null;
}
