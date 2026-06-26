import "server-only";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties as t } from "@/lib/db/schema";

export type PropertyInput = {
  title: string;
  type: string;
  mode: string;
  status: string;
  city: string;
  neighborhood: string;
  state: string;
  price: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking: number;
  area: number;
  description: string;
  highlights: string[];
  tone: string;
  images: string[];
  featured: boolean;
};

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[^\x00-\x7F]/g, "") // remove acentos (marcas combinantes não-ASCII)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Salva arquivos enviados em public/properties e retorna os caminhos públicos. */
export async function saveUploadedImages(slug: string, files: File[]): Promise<string[]> {
  const dir = path.join(process.cwd(), "public", "properties");
  await mkdir(dir, { recursive: true });

  const urls: string[] = [];
  let i = 1;
  for (const file of files) {
    if (!file || file.size === 0) continue;
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const filename = `${slug}-${Date.now()}-${i}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);
    urls.push(`/properties/${filename}`);
    i++;
  }
  return urls;
}

async function ensureUniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = base || "imovel";
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const rows = await db.select({ id: t.id }).from(t).where(eq(t.slug, slug)).limit(1);
    if (!rows[0] || rows[0].id === ignoreId) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

export async function createProperty(input: PropertyInput): Promise<string> {
  const slug = await ensureUniqueSlug(slugify(input.title));
  const [row] = await db
    .insert(t)
    .values({ ...input, slug })
    .returning({ id: t.id });
  return row.id;
}

export async function updateProperty(id: string, input: PropertyInput): Promise<void> {
  const slug = await ensureUniqueSlug(slugify(input.title), id);
  await db.update(t).set({ ...input, slug }).where(eq(t.id, id));
}

export async function deleteProperty(id: string): Promise<void> {
  await db.delete(t).where(eq(t.id, id));
}
