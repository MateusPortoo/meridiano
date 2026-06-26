"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";

const inputClass =
  "w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm text-[var(--color-ink)] focus:border-[var(--color-forest)] focus:outline-none";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, {});

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[var(--color-paper)] px-5">
      <div className="w-full max-w-sm">
        <p className="mb-2 text-center font-display text-3xl font-semibold tracking-[0.15em] text-[var(--color-ink)]">
          MERIDIANO
        </p>
        <p className="mb-8 text-center text-sm text-[var(--color-muted)]">Painel administrativo</p>

        <form action={action} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
          <label className="mb-1.5 block text-sm text-[var(--color-muted)]">E-mail</label>
          <input name="email" type="email" required className={inputClass} />

          <label className="mb-1.5 mt-4 block text-sm text-[var(--color-muted)]">Senha</label>
          <input name="password" type="password" required className={inputClass} />

          {state?.error && (
            <p className="mt-3 text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-6 w-full rounded-full bg-[var(--color-forest)] py-3 font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)] disabled:opacity-60"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
