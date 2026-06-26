"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cities } from "@/lib/properties";

const modes = [
  { value: "comprar", label: "Comprar" },
  { value: "alugar", label: "Alugar" },
];

export function HeroSearch() {
  const router = useRouter();
  const [mode, setMode] = useState("comprar");
  const [city, setCity] = useState("todas");

  function handleSearch() {
    const params = new URLSearchParams({ modo: mode });
    if (city !== "todas") params.set("cidade", city);
    router.push(`/imoveis?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[var(--color-paper)]/95 p-3 shadow-2xl backdrop-blur-md">
      {/* Modo */}
      <div className="mb-3 flex gap-1 rounded-full bg-[var(--color-stone)] p-1">
        {modes.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => setMode(m.value)}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              mode === m.value
                ? "bg-[var(--color-forest)] text-white"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Cidade + buscar */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] focus:border-[var(--color-forest)] focus:outline-none"
          >
            <option value="todas">Todas as cidades</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
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
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="rounded-xl bg-[var(--color-forest)] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)]"
        >
          Buscar imóveis
        </button>
      </div>
    </div>
  );
}
