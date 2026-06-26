import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PropertyImage } from "@/components/PropertyImage";
import { toneStyles } from "@/lib/properties";
import { getPropertyBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sobre — MERIDIANO",
  description:
    "A MERIDIANO é uma imobiliária boutique de alto padrão. Curadoria, discrição e atendimento à altura de cada endereço.",
};

const stats = [
  { value: "R$ 2,4 bi", label: "em imóveis negociados" },
  { value: "18 anos", label: "de mercado de luxo" },
  { value: "98%", label: "de clientes satisfeitos" },
  { value: "3", label: "praças: SP · RJ · Litoral" },
];

const values = [
  { title: "Curadoria", text: "Selecionamos cada imóvel. Trabalhamos com poucos para servir bem a cada um." },
  { title: "Discrição", text: "Negociações confidenciais e respeito absoluto à privacidade dos nossos clientes." },
  { title: "Excelência", text: "Da fotografia ao fechamento, cada detalhe é tratado com o padrão que o imóvel pede." },
];

export default async function SobrePage() {
  const showcase = await getPropertyBySlug("mansao-aurora");
  const showcaseTone = showcase?.tone ?? "stone";
  const showcaseImage = showcase?.images[0] ?? "/properties/sobre.jpg";

  return (
    <>
      <SiteHeader />
      <main>
        {/* Intro */}
        <section className="bg-[var(--color-paper)] px-5 pb-12 pt-20 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[var(--color-bronze)]">
              Sobre a MERIDIANO
            </p>
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.04]">
              Imóveis são pontos no mapa. Endereços são decisões de vida.
            </h1>
          </div>
        </section>

        {/* Imagem + história */}
        <section className="bg-[var(--color-paper)] px-5 pb-[var(--space-section)] sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-3xl"
              style={{ background: toneStyles[showcaseTone] }}
            >
              <PropertyImage
                src={showcaseImage}
                alt="MERIDIANO"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg leading-relaxed text-[var(--color-muted)]">
                A MERIDIANO nasceu de uma convicção simples: comprar ou vender um
                imóvel de exceção exige mais do que um anúncio bonito. Exige
                <span className="text-[var(--color-ink)]"> curadoria, discrição e gente que entende
                o valor de um endereço.</span>
              </p>
              <p className="mt-5 leading-relaxed text-[var(--color-muted)]">
                Somos uma imobiliária boutique. Trabalhamos com um portfólio
                enxuto de coberturas, mansões e residências selecionadas — em São
                Paulo, no Rio e no litoral — para dar a cada cliente o tempo e a
                atenção que uma decisão dessas merece.
              </p>
              <p className="mt-5 font-display text-xl text-[var(--color-forest)]">
                Endereços de exceção, do começo ao fim.
              </p>
            </div>
          </div>
        </section>

        {/* Números */}
        <section className="bg-[var(--color-forest)] px-5 py-[var(--space-section)] text-white sm:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none">
                  {s.value}
                </p>
                <p className="mt-3 text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Valores */}
        <section className="bg-[var(--color-paper)] px-5 py-[var(--space-section)] sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[var(--color-bronze)]">
              No que acreditamos
            </p>
            <h2 className="mb-12 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
              Nossos princípios
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="border-t border-[var(--color-line)] pt-6">
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)]">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--color-muted)]">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--color-stone)] px-5 py-[var(--space-section)] sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
              Vamos encontrar o seu próximo endereço?
            </h2>
            <div className="flex shrink-0 gap-3">
              <Link
                href="/imoveis"
                className="rounded-full bg-[var(--color-forest)] px-8 py-4 font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)]"
              >
                Ver imóveis
              </Link>
              <Link
                href="/anuncie"
                className="rounded-full border border-[var(--color-forest)] px-8 py-4 font-medium text-[var(--color-forest)] transition-colors hover:bg-[var(--color-forest)] hover:text-white"
              >
                Anunciar
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
