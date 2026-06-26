"use client";

import { useState } from "react";
import { cities, types } from "@/lib/properties";

const inputClass =
  "w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm text-[var(--color-ink)] focus:border-[var(--color-forest)] focus:outline-none";

export function AnuncieForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-10 text-center">
        <p className="font-display text-2xl text-[var(--color-forest)]">Recebemos seu imóvel ✦</p>
        <p className="mt-3 text-[var(--color-muted)]">
          Um especialista MERIDIANO entrará em contato em até 1 dia útil para
          agendar a avaliação e a sessão de fotos.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-[var(--color-muted)]">Nome</label>
          <input required placeholder="Seu nome" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-[var(--color-muted)]">Telefone / WhatsApp</label>
          <input required type="tel" placeholder="(00) 00000-0000" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-[var(--color-muted)]">E-mail</label>
          <input required type="email" placeholder="voce@email.com" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-[var(--color-muted)]">Tipo de imóvel</label>
          <select className={inputClass} defaultValue="">
            <option value="" disabled>Selecione</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-[var(--color-muted)]">Cidade</label>
          <select className={inputClass} defaultValue="">
            <option value="" disabled>Selecione</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-[var(--color-muted)]">Objetivo</label>
          <select className={inputClass} defaultValue="comprar">
            <option value="comprar">Vender</option>
            <option value="alugar">Alugar</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-[var(--color-muted)]">Valor estimado</label>
          <input placeholder="R$" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-[var(--color-muted)]">Mensagem (opcional)</label>
          <textarea rows={3} placeholder="Conte um pouco sobre o imóvel" className={inputClass} />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-[var(--color-forest)] py-4 font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)] sm:w-auto sm:px-12"
      >
        Enviar para avaliação
      </button>
      <p className="mt-3 text-xs text-[var(--color-muted)]">
        Avaliação sem compromisso · seus dados são tratados com confidencialidade
      </p>
    </form>
  );
}
