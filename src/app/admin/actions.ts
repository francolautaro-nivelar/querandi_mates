"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { saveSection, type SiteContent } from "@/lib/content";
import { uploadImageBlob } from "@/lib/blob";

export type LoginState = { error?: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") || "");
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!hash) {
    return { error: "El panel todavía no está configurado (falta ADMIN_PASSWORD_HASH)." };
  }

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    return { error: "Contraseña incorrecta." };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/login");
}

export type SaveResult = { ok: true } | { ok: false; error: string };

// Next.js redacts thrown Error messages from Server Actions in production, so
// expected failures (e.g. Blob not configured yet) are returned as data
// instead of thrown, letting the admin UI show a message the owner can act on.
async function saveAndRevalidate<K extends keyof SiteContent>(
  section: K,
  value: SiteContent[K]
): Promise<SaveResult> {
  try {
    await saveSection(section, value);
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "No se pudo guardar. Intentá de nuevo.",
    };
  }
  revalidatePath("/");
  return { ok: true };
}

export async function saveHero(value: SiteContent["hero"]) {
  return saveAndRevalidate("hero", value);
}

export async function saveNosotros(value: SiteContent["nosotros"]) {
  return saveAndRevalidate("nosotros", value);
}

export async function saveProductos(value: SiteContent["productos"]) {
  return saveAndRevalidate("productos", value);
}

export async function savePorQueElegirnos(value: SiteContent["porQueElegirnos"]) {
  return saveAndRevalidate("porQueElegirnos", value);
}

export async function saveMarcas(value: SiteContent["marcas"]) {
  return saveAndRevalidate("marcas", value);
}

export async function saveCta(value: SiteContent["cta"]) {
  return saveAndRevalidate("cta", value);
}

export async function saveContacto(value: SiteContent["contacto"]) {
  return saveAndRevalidate("contacto", value);
}

export async function saveFooter(value: SiteContent["footer"]) {
  return saveAndRevalidate("footer", value);
}

export type UploadResult = { ok: true; url: string } | { ok: false; error: string };

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No se recibió ningún archivo." };
  }
  try {
    const url = await uploadImageBlob(file);
    return { ok: true, url };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "No se pudo subir la imagen.",
    };
  }
}
