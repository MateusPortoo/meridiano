"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { cities, types, type Property } from "@/lib/properties";

const modes = [
  { value: "todos", label: "Todos" },
  { value: "comprar", label: "Comprar" },
  { value: "alugar", label: "Alugar" },
];

const bedroomOptions = [
  { value: 0, label: "Quartos" },
  { value: 1, label: "1+" },
  { value: 2, label: "2+" },
  { value: 3, label: "3+" },
  { value: 4, label: "4+" },
];

const sortOptions = [
  { value: "destaque", label: "Destaque" },
  { value: "menor", label: "Menor preço" },
  { value: "maior", label: "Maior preço" },
];

const selectClass =
  "appearance-none rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2.5 pr-9 text-sm text-[var(--color-ink)] focus:border-[var(--color-forest)] focus:outline-none";

export function Listings({
  properties,
  initialMode = "todos",
  initialCity = "todas",
}: {
  properties: Property[];
  initialMode?: string;
  initialCity?: string;
}) {
  const [mode, setMode] = useState(initialMode);
  const [city, setCity] = useState(initialCity);
  const [type, setType] = useState("todos");
  const [beds, setBeds] = useState(0);
  const [sort, setSort] = useState("destaque");

  const results = useMemo(() => {
    let list = properties.filter((p) => {
      if (mode !== "todos" && p.mode !== mode) return false;
      if (city !== "todas" && p.city !== city) return false;
      if (type !== "todos" && p.type !== type) return false;
      if (beds > 0 && p.bedrooms < beds) return false;
      return true;
    });

    if (sort === "menor") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "maior") list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));

    return list;
  }, [properties, mode, city, type, beds, sort]);

  return (
    <section className="min-h-dvh bg-[var(--color-paper)] px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-bronze)]">
          Portfólio
        </p>
        <h1 className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight">
          Imóveis de exceção
        </h1>

        {/* Barra de filtros */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {/* Modo (segmentado) */}
          <div className="flex rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1">
            {modes.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMode(m.value)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  mode === m.value
                    ? "bg-[var(--color-forest)] text-white"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
              <option value="todas">Todas as cidades</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Chevron />
          </div>

          <div className="relative">
            <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
              <option value="todos">Todos os tipos</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Chevron />
          </div>

          <div className="relative">
            <select
              value={beds}
              onChange={(e) => setBeds(Number(e.target.value))}
              className={selectClass}
            >
              {bedroomOptions.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
            <Chevron />
          </div>

          <div className="relative ml-auto">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>

        <p className="mt-6 text-sm text-[var(--color-muted)]">
          {results.length} {results.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
        </p>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-2xl border border-dashed border-[var(--color-line)] py-20 text-center">
            <p className="text-[var(--color-muted)]">
              Nenhum imóvel encontrado com esses filtros.
            </p>
            <button
              type="button"
              onClick={() => {
                setMode("todos");
                setCity("todas");
                setType("todos");
                setBeds(0);
              }}
              className="mt-4 text-sm font-medium text-[var(--color-forest)] underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
