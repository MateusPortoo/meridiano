import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { properties as propsTable } from "@/lib/db/schema";
import type { Property } from "@/lib/properties";

type Row = typeof propsTable.$inferSelect;

function toProperty(r: Row): Property {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    type: r.type,
    mode: r.mode as Property["mode"],
    status: r.status as Property["status"],
    city: r.city,
    neighborhood: r.neighborhood,
    state: r.state,
    price: r.price,
    bedrooms: r.bedrooms,
    suites: r.suites,
    bathrooms: r.bathrooms,
    parking: r.parking,
    area: r.area,
    description: r.description,
    highlights: r.highlights,
    tone: r.tone as Property["tone"],
    images: r.images,
    featured: r.featured,
  };
}

/** Imóveis visíveis no site público (somente Disponível). */
export async function getPublicProperties(): Promise<Property[]> {
  const rows = await db
    .select()
    .from(propsTable)
    .where(eq(propsTable.status, "disponivel"))
    .orderBy(desc(propsTable.featured), desc(propsTable.createdAt));
  return rows.map(toProperty);
}

/** Imóveis em destaque (Disponível + featured). */
export async function getFeaturedProperties(): Promise<Property[]> {
  const rows = await db
    .select()
    .from(propsTable)
    .where(and(eq(propsTable.status, "disponivel"), eq(propsTable.featured, true)))
    .orderBy(desc(propsTable.createdAt));
  return rows.map(toProperty);
}

/** Um imóvel pelo slug (qualquer status — a página decide o que fazer). */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const rows = await db.select().from(propsTable).where(eq(propsTable.slug, slug)).limit(1);
  return rows[0] ? toProperty(rows[0]) : null;
}

/** Admin: todos os imóveis, qualquer status. */
export async function getAllProperties(): Promise<Property[]> {
  const rows = await db.select().from(propsTable).orderBy(desc(propsTable.createdAt));
  return rows.map(toProperty);
}

/** Admin: um imóvel pelo id. */
export async function getPropertyById(id: string): Promise<Property | null> {
  const rows = await db.select().from(propsTable).where(eq(propsTable.id, id)).limit(1);
  return rows[0] ? toProperty(rows[0]) : null;
}
