import { SiteHeader } from "@/components/SiteHeader";
import { Listings } from "@/components/Listings";
import { getPublicProperties } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string; cidade?: string }>;
}) {
  const { modo, cidade } = await searchParams;
  const initialMode = modo === "comprar" || modo === "alugar" ? modo : "todos";
  const initialCity = cidade ?? "todas";

  const properties = await getPublicProperties();

  return (
    <>
      <SiteHeader />
      <Listings
        properties={properties}
        initialMode={initialMode}
        initialCity={initialCity}
      />
    </>
  );
}
