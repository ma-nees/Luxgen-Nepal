import { createContentId } from "@/data/siteContent";

type CloudinaryFolder = "team" | "projects";

type CloudinaryUploadResult = {
  secure_url?: string;
  public_id?: string;
  original_filename?: string;
};

export type UploadedCloudinaryImage = {
  secureUrl: string;
  url: string;
  publicId: string;
  fileName: string;
};

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

function assertCloudinaryConfig() {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      "Missing Cloudinary config. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.",
    );
  }
}

function publicIdFromName(originalName: string) {
  const cleanName = originalName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);

  return `${cleanName || "uploaded-image"}-${createContentId("img")}`;
}

export async function uploadImageToCloudinary(
  fileOrDataUrl: File | string,
  folder: CloudinaryFolder,
) {
  assertCloudinaryConfig();

  const formData = new FormData();
  formData.append("file", fileOrDataUrl);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", `luxgen/${folder}`);
  formData.append(
    "public_id",
    publicIdFromName(fileOrDataUrl instanceof File ? fileOrDataUrl.name : "uploaded-image"),
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Cloudinary upload failed.");
  }

  const result = (await response.json()) as CloudinaryUploadResult;

  if (!result.secure_url || !result.public_id) {
    throw new Error("Cloudinary did not return an image URL.");
  }

  return {
    secureUrl: result.secure_url,
    url: result.secure_url,
    publicId: result.public_id,
    fileName:
      result.original_filename ||
      (fileOrDataUrl instanceof File ? fileOrDataUrl.name : "uploaded-image"),
  } satisfies UploadedCloudinaryImage;
}

export const uploadToCloudinary = uploadImageToCloudinary;
