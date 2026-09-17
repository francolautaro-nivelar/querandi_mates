import { put, list } from "@vercel/blob";

const CONTENT_PATH = "content/site.json";

export async function readContentJson(): Promise<unknown | null> {
  const { blobs } = await list({ prefix: CONTENT_PATH, limit: 1 });
  const blob = blobs[0];
  if (!blob) return null;

  const res = await fetch(blob.url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function writeContentJson(data: unknown): Promise<void> {
  await put(CONTENT_PATH, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function uploadImageBlob(file: File): Promise<string> {
  const ext = file.name.includes(".") ? file.name.split(".").pop() : undefined;
  const pathname = `content/images/${crypto.randomUUID()}${ext ? `.${ext}` : ""}`;

  const blob = await put(pathname, file, {
    access: "public",
    contentType: file.type || undefined,
  });

  return blob.url;
}
