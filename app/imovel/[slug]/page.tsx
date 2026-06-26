import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { PropertyDetail } from "@/components/PropertyDetail";
import { getPropertyBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Imóvel não encontrado — MERIDIANO" };

  return {
    title: `${property.title} — MERIDIANO`,
    description: property.description,
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property || property.status === "vendido") notFound();

  return (
    <>
      <SiteHeader />
      <PropertyDetail property={property} />
    </>
  );
}
