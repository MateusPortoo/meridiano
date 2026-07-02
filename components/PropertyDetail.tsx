"use client";

import { useState } from "react";
import Link from "next/link";
import { PropertyImage } from "@/components/PropertyImage";
import { priceLabel, toneStyles, type Property } from "@/lib/properties";

const modeLabel: Record<Property["mode"], string> = {
  comprar: "À venda",
  alugar: "Para alugar",
};

function VideoSection({ slug, title }: { slug: string; title: string }) {
  const src = `/videos/${slug}.mp4`;
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-black">
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        className="w-full max-h-[520px] object-cover"
        aria-label={`Vídeo do imóvel ${title}`}
        onError={(e) => {
          (e.currentTarget.closest("div") as HTMLDivElement).style.display = "none";
        }}
      />
    </div>
  );
}

function Spec({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-2xl text-[var(--color-ink)]">{value}</span>
      <span className="text-xs uppercase tracking-wider text-[var(--color-muted)]">{label}</span>
    </div>
  );
}

export function PropertyDetail({ property }: { property: Property }) {
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);

  return (
    <main className="bg-[var(--color-paper)] px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/imoveis"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
        >
          ← Voltar para os imóveis
        </Link>

        {/* Galeria */}
        <div className="grid gap-3 md:grid-cols-4">
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-3"
            style={{ background: toneStyles[property.tone] }}
          >
            <PropertyImage
              src={property.images[active]}
              alt={property.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute left-4 top-4 z-10 rounded-full bg-[var(--color-paper)]/90 px-3 py-1 text-xs font-medium text-[var(--color-ink)]">
              {modeLabel[property.mode]}
            </span>
          </div>

          <div className="flex gap-3 md:flex-col md:overflow-y-auto md:max-h-[480px]">
            {property.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                className={`relative aspect-[4/3] flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors md:aspect-[4/3] md:w-full ${
                  active === i ? "border-[var(--color-forest)]" : "border-transparent"
                }`}
                style={{ background: toneStyles[property.tone] }}
              >
                <PropertyImage
                  src={img}
                  alt={`${property.title} ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Vídeo do imóvel (exibido somente se existir no servidor) */}
        <VideoSection slug={property.slug} title={property.title} />

        {/* Conteúdo */}
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          {/* Esquerda */}
          <div className="lg:col-span-2">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-bronze)]">
              {property.type} · {property.neighborhood}, {property.city} — {property.state}
            </p>
            <h1 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
              {property.title}
            </h1>
            <p className="mt-3 font-display text-2xl text-[var(--color-forest)]">
              {priceLabel(property)}
            </p>

            {/* Specs */}
            <div className="mt-8 flex flex-wrap gap-6 border-y border-[var(--color-line)] py-6">
              <Spec value={`${property.area}m²`} label="Área total" />
              {property.bedrooms > 0 && <Spec value={property.bedrooms} label="Quartos" />}
              {property.suites > 0 && <Spec value={property.suites} label="Suítes" />}
              {property.bathrooms > 0 && <Spec value={property.bathrooms} label="Banheiros" />}
              {property.parking > 0 && <Spec value={property.parking} label="Vagas" />}
            </div>

            {/* Descrição */}
            <h2 className="mt-10 font-display text-xl font-semibold">Sobre o imóvel</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-muted)]">
              {property.description}
            </p>

            {/* Destaques */}
            <h2 className="mt-10 font-display text-xl font-semibold">Destaques</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {property.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-[var(--color-ink)]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-bronze)]" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Localização (sem mapa interativo) */}
            <h2 className="mt-10 font-display text-xl font-semibold">Localização</h2>
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-stone)] text-[var(--color-forest)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-[var(--color-ink)]">
                  {property.neighborhood}, {property.city} — {property.state}
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  Endereço exato compartilhado com a visita agendada.
                </p>
              </div>
            </div>
          </div>

          {/* Direita — corretor (sticky) */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <p className="font-display text-lg font-semibold">Agende uma visita</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Um especialista MERIDIANO cuida de tudo.
              </p>

              {sent ? (
                <p className="mt-6 rounded-xl bg-[var(--color-stone)] p-4 text-sm text-[var(--color-forest)]">
                  Recebemos seu contato. Em breve um especialista falará com você. ✦
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="mt-5 flex flex-col gap-3"
                >
                  <input
                    required
                    placeholder="Seu nome"
                    className="rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:border-[var(--color-forest)] focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Telefone / WhatsApp"
                    className="rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:border-[var(--color-forest)] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="mt-1 rounded-full bg-[var(--color-forest)] py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)]"
                  >
                    Solicitar visita
                  </button>
                  <p className="text-center text-xs text-[var(--color-muted)]">
                    Resposta em até 2 horas úteis
                  </p>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
