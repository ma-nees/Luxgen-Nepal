import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const uploadInput = z.object({
  folder: z.enum(["teamimg", "projectimg", "img"]),
  originalName: z.string().min(1),
  dataUrl: z.string().min(1),
});

function slugifyFileName(name: string) {
  const clean = name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);

  return clean || "uploaded-image";
}

function extensionFromDataUrl(dataUrl: string, originalName: string) {
  const mime = dataUrl.match(/^data:([^;]+);base64,/)?.[1] ?? "";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "image/svg+xml") return "svg";

  const existing = originalName.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
  return existing && ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(existing)
    ? existing
    : "jpg";
}

export const uploadAssetImage = createServerFn({ method: "POST" })
  .inputValidator(uploadInput)
  .handler(async ({ data }) => {
    const { mkdir, writeFile } = await import("node:fs/promises");
    const path = await import("node:path");

    const base64 = data.dataUrl.replace(/^data:[^;]+;base64,/, "");
    const ext = extensionFromDataUrl(data.dataUrl, data.originalName);
    const fileName = `${slugifyFileName(data.originalName)}-${Date.now().toString(36)}.${ext}`;
    const relativePath = path.join("src", "assets", data.folder, fileName);
    const absolutePath = path.join(process.cwd(), relativePath);

    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, Buffer.from(base64, "base64"));

    return {
      fileName,
      relativePath: relativePath.replace(/\\/g, "/"),
      url: `/${relativePath.replace(/\\/g, "/")}`,
    };
  });
