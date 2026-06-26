"use client";

import { useState } from "react";
import {
  cities,
  types,
  tones,
  toneStyles,
  type Property,
} from "@/lib/properties";

const input =
  "w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-forest)] focus:outline-none";
const label = "mb-1.5 block text-sm text-[var(--color-muted)]";

export function PropertyForm({
  property,
  action,
  submitLabel,
}: {
  property?: Property;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  const [keptImages, setKeptImages] = useState<string[]>(property?.images ?? []);

  return (
    <form action={action} className="grid gap-5">
      <div>
        <label className={label}>Título</label>
        <input name="title" required defaultValue={property?.title} className={input} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={label}>Tipo</label>
          <select name="type" defaultValue={property?.type ?? types[0]} className={input}>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Modo</label>
          <select name="mode" defaultValue={property?.mode ?? "comprar"} className={input}>
            <option value="comprar">Venda</option>
            <option value="alugar">Locação</option>
          </select>
        </div>
        <div>
          <label className={label}>Status</label>
          <select name="status" defaultValue={property?.status ?? "disponivel"} className={input}>
            <option value="disponivel">Disponível</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={label}>Cidade</label>
          <input name="city" list="cities" required defaultValue={property?.city} className={input} />
          <datalist id="cities">
            {cities.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <div>
          <label className={label}>Bairro</label>
          <input name="neighborhood" required defaultValue={property?.neighborhood} className={input} />
        </div>
        <div>
          <label className={label}>Estado (UF)</label>
          <input name="state" required defaultValue={property?.state} className={input} />
        </div>
      </div>

      <div>
        <label className={label}>Preço (R$ — total na venda, mensal na locação)</label>
        <input name="price" type="number" required defaultValue={property?.price} className={input} />
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-5">
        {([
          ["area", "Área (m²)"],
          ["bedrooms", "Quartos"],
          ["suites", "Suítes"],
          ["bathrooms", "Banheiros"],
          ["parking", "Vagas"],
        ] as const).map(([name, lbl]) => (
          <div key={name}>
            <label className={label}>{lbl}</label>
            <input
              name={name}
              type="number"
              defaultValue={property?.[name] ?? 0}
              className={input}
            />
          </div>
        ))}
      </div>

      <div>
        <label className={label}>Descrição</label>
        <textarea name="description" rows={4} defaultValue={property?.description} className={input} />
      </div>

      <div>
        <label className={label}>Destaques (um por linha)</label>
        <textarea
          name="highlights"
          rows={4}
          defaultValue={property?.highlights.join("\n")}
          placeholder={"Piscina privativa\nVista mar\nMobiliado"}
          className={input}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Cor do placeholder (sem foto)</label>
          <select name="tone" defaultValue={property?.tone ?? "forest"} className={input}>
            {tones.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-3 self-end pb-2.5">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={property?.featured}
            className="h-4 w-4 accent-[var(--color-forest)]"
          />
          <span className="text-sm text-[var(--color-ink)]">Destacar na home</span>
        </label>
      </div>

      {/* Fotos existentes (edição) */}
      {keptImages.length > 0 && (
        <div>
          <label className={label}>Fotos atuais</label>
          <div className="flex flex-wrap gap-3">
            {keptImages.map((url) => (
              <div
                key={url}
                className="relative h-24 w-32 overflow-hidden rounded-lg border border-[var(--color-line)]"
                style={{ background: toneStyles[property?.tone ?? "forest"] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
                <input type="hidden" name="keptImages" value={url} />
                <button
                  type="button"
                  onClick={() => setKeptImages((prev) => prev.filter((u) => u !== url))}
                  className="absolute right-1 top-1 rounded-full bg-black/70 px-2 text-sm text-white"
                  aria-label="Remover foto"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className={label}>
          {keptImages.length > 0 ? "Adicionar mais fotos" : "Fotos"}
        </label>
        <input name="images" type="file" accept="image/*" multiple className={input} />
        <p className="mt-1.5 text-xs text-[var(--color-muted)]">
          A primeira foto vira a capa. Pode enviar várias.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-full bg-[var(--color-forest)] px-8 py-3 font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)]"
        >
          {submitLabel}
        </button>
        <a
          href="/admin"
          className="rounded-full border border-[var(--color-line)] px-8 py-3 font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-stone)]"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
