import Link from "next/link";
import { PropertyImage } from "@/components/PropertyImage";
import { priceLabel, toneStyles, type Property } from "@/lib/properties";

const modeLabel: Record<Property["mode"], string> = {
  comprar: "À venda",
  alugar: "Para alugar",
};

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/imovel/${property.slug}`} className="group block">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-xl"
        style={{ background: toneStyles[property.tone] }}
      >
        <PropertyImage
          src={property.images[0]}
          alt={property.title}
          className="absolute inset-0 z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 z-20 rounded-full bg-[var(--color-paper)]/90 px-3 py-1 text-xs font-medium tracking-wide text-[var(--color-ink)]">
          {modeLabel[property.mode]}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-bronze)]">
          {property.type} · {property.neighborhood}, {property.state}
        </p>
        <h3 className="mt-1.5 font-display text-xl leading-tight text-[var(--color-ink)]">
          {property.title}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-sm text-[var(--color-muted)]">
          <span>{property.area} m²</span>
          <span className="h-1 w-1 rounded-full bg-[var(--color-line)]" />
          <span>{property.suites} suítes</span>
          <span className="h-1 w-1 rounded-full bg-[var(--color-line)]" />
          <span>{property.parking} vagas</span>
        </div>

        <p className="mt-3 font-display text-lg text-[var(--color-forest)]">
          {priceLabel(property)}
        </p>
      </div>
    </Link>
  );
}
