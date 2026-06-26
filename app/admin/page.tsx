import Link from "next/link";
import { getAllProperties } from "@/lib/queries";
import { priceLabel, statusLabels } from "@/lib/properties";
import { logoutAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

const statusColor: Record<string, string> = {
  disponivel: "bg-green-100 text-green-800",
  reservado: "bg-amber-100 text-amber-800",
  vendido: "bg-zinc-200 text-zinc-600",
};

export default async function AdminPage() {
  const list = await getAllProperties();

  return (
    <main className="min-h-dvh bg-[var(--color-paper)] px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Topo */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="font-display text-2xl font-semibold tracking-[0.15em] text-[var(--color-ink)]">
              MERIDIANO
            </p>
            <p className="text-sm text-[var(--color-muted)]">Painel · {list.length} imóveis</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/novo"
              className="rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)]"
            >
              + Novo imóvel
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-stone)]"
              >
                Sair
              </button>
            </form>
          </div>
        </div>

        {/* Lista */}
        <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
          {list.length === 0 ? (
            <p className="p-10 text-center text-[var(--color-muted)]">
              Nenhum imóvel ainda. Clique em “+ Novo imóvel”.
            </p>
          ) : (
            <ul className="divide-y divide-[var(--color-line)]">
              {list.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg text-[var(--color-ink)]">{p.title}</span>
                      {p.featured && (
                        <span className="rounded-full bg-[var(--color-bronze)]/15 px-2 py-0.5 text-xs text-[var(--color-bronze)]">
                          destaque
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-muted)]">
                      {p.type} · {p.neighborhood}, {p.state} · {p.mode === "alugar" ? "Locação" : "Venda"}
                    </p>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs ${statusColor[p.status] ?? ""}`}>
                    {statusLabels[p.status]}
                  </span>

                  <span className="w-36 text-right font-medium text-[var(--color-ink)]">
                    {priceLabel(p)}
                  </span>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/${p.id}`}
                      className="text-sm font-medium text-[var(--color-forest)] hover:underline"
                    >
                      Editar
                    </Link>
                    <DeleteButton id={p.id} title={p.title} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
          <Link href="/" className="hover:underline">← Ver o site</Link>
        </p>
      </div>
    </main>
  );
}
