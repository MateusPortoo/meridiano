import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PropertyCard } from "@/components/PropertyCard";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";
import { HeroSearch } from "@/components/HeroSearch";
import { toneStyles } from "@/lib/properties";
import { getFeaturedProperties } from "@/lib/queries";

export const dynamic = "force-dynamic";

const regions = [
  { name: "São Paulo", caption: "Coberturas e residências de assinatura", tone: "graphite" as const },
  { name: "Rio de Janeiro", caption: "Vista mar e endereços icônicos", tone: "forest" as const },
  { name: "Litoral", caption: "Casas de praia e mansões pé na areia", tone: "bronze" as const },
];

export default async function Home() {
  const featured = await getFeaturedProperties();

  return (
    <>
      <SiteHeader variant="overlay" />
      <main>
        {/* HERO */}
        <section className="relative flex min-h-[90vh] items-end overflow-hidden">
          <HeroVideoBackground src="/videos/hero.mp4" />

          <div className="relative z-10 w-full px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
            <div className="mx-auto max-w-7xl">
              <p className="rise mb-4 text-sm uppercase tracking-[0.3em] text-white/80" style={{ animationDelay: "0.1s" }}>
                MERIDIANO · Imobiliária de exceção
              </p>
              <h1
                className="rise max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.04] text-white"
                style={{ animationDelay: "0.25s" }}
              >
                Endereços de exceção.
              </h1>
              <p
                className="rise mt-5 mb-9 max-w-md text-lg leading-relaxed text-white/85"
                style={{ animationDelay: "0.4s" }}
              >
                Coberturas, mansões e residências selecionadas para quem busca o
                melhor endereço — para comprar ou alugar.
              </p>
              <div className="rise" style={{ animationDelay: "0.55s" }}>
                <HeroSearch />
              </div>
            </div>
          </div>
        </section>

        {/* DESTAQUES */}
        <section className="bg-[var(--color-paper)] px-5 py-[var(--space-section)] sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[var(--color-bronze)]">
                  Seleção MERIDIANO
                </p>
                <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight">
                  Imóveis em destaque
                </h2>
              </div>
              <Link
                href="/imoveis"
                className="text-sm font-medium text-[var(--color-forest)] underline-offset-4 hover:underline"
              >
                Ver todo o portfólio →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          </div>
        </section>

        {/* REGIÕES */}
        <section className="bg-[var(--color-stone)] px-5 py-[var(--space-section)] sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[var(--color-bronze)]">
              Onde estamos
            </p>
            <h2 className="mb-12 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight">
              Endereços que importam
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {regions.map((region) => (
                <Link
                  key={region.name}
                  href="/imoveis"
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl p-7"
                  style={{ background: toneStyles[region.tone] }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl font-semibold text-white">{region.name}</h3>
                    <p className="mt-1 text-sm text-white/80">{region.caption}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ANUNCIE */}
        <section
          id="anuncie"
          className="bg-[var(--color-forest)] px-5 py-[var(--space-section)] text-white sm:px-8"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/60">
                Para proprietários
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
                Anuncie seu imóvel com a MERIDIANO.
              </h2>
              <p className="mt-4 text-white/80">
                Curadoria, fotografia profissional e acesso a uma carteira de
                compradores e locatários de alto padrão.
              </p>
            </div>
            <Link
              href="/anuncie"
              className="shrink-0 rounded-full bg-white px-8 py-4 font-medium text-[var(--color-forest)] transition-colors hover:bg-white/90"
            >
              Quero anunciar
            </Link>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
