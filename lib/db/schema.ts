import {
  pgSchema,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const meridiano = pgSchema("meridiano");

export const properties = meridiano.table("properties", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  mode: text("mode").notNull(), // comprar | alugar
  status: text("status").notNull().default("disponivel"), // disponivel | reservado | vendido
  city: text("city").notNull(),
  neighborhood: text("neighborhood").notNull(),
  state: text("state").notNull(),
  price: integer("price").notNull(),
  bedrooms: integer("bedrooms").notNull().default(0),
  suites: integer("suites").notNull().default(0),
  bathrooms: integer("bathrooms").notNull().default(0),
  parking: integer("parking").notNull().default(0),
  area: integer("area").notNull().default(0),
  description: text("description").notNull().default(""),
  highlights: text("highlights").array().notNull().default([]),
  tone: text("tone").notNull().default("forest"),
  images: text("images").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
