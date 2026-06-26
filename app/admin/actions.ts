"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, destroySession, checkCredentials } from "@/lib/auth";
import {
  createProperty,
  updateProperty,
  deleteProperty,
  saveUploadedImages,
  slugify,
  type PropertyInput,
} from "@/lib/admin";

export async function loginAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(email, password)) {
    return { error: "E-mail ou senha incorretos." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

async function parseForm(formData: FormData): Promise<PropertyInput> {
  const title = String(formData.get("title") ?? "").trim();

  const keptImages = formData.getAll("keptImages").map(String).filter(Boolean);
  const files = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0);
  const uploaded = await saveUploadedImages(slugify(title) || "imovel", files);

  const highlights = String(formData.get("highlights") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    title,
    type: String(formData.get("type") ?? ""),
    mode: String(formData.get("mode") ?? "comprar"),
    status: String(formData.get("status") ?? "disponivel"),
    city: String(formData.get("city") ?? ""),
    neighborhood: String(formData.get("neighborhood") ?? ""),
    state: String(formData.get("state") ?? ""),
    price: Number(formData.get("price") ?? 0),
    bedrooms: Number(formData.get("bedrooms") ?? 0),
    suites: Number(formData.get("suites") ?? 0),
    bathrooms: Number(formData.get("bathrooms") ?? 0),
    parking: Number(formData.get("parking") ?? 0),
    area: Number(formData.get("area") ?? 0),
    description: String(formData.get("description") ?? ""),
    highlights,
    tone: String(formData.get("tone") ?? "forest"),
    images: [...keptImages, ...uploaded],
    featured: formData.get("featured") === "on",
  };
}

export async function createPropertyAction(formData: FormData): Promise<void> {
  const input = await parseForm(formData);
  await createProperty(input);
  revalidatePath("/");
  redirect("/admin");
}

export async function updatePropertyAction(id: string, formData: FormData): Promise<void> {
  const input = await parseForm(formData);
  await updateProperty(id, input);
  revalidatePath("/");
  redirect("/admin");
}

export async function deletePropertyAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteProperty(id);
    revalidatePath("/");
  }
  revalidatePath("/admin");
}
