import Link from "next/link";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { createPropertyAction } from "@/app/admin/actions";

export default function NovoImovelPage() {
  return (
    <main className="min-h-dvh bg-[var(--color-paper)] px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          ← Voltar ao painel
        </Link>
        <h1 className="mb-8 mt-3 font-display text-3xl font-semibold text-[var(--color-ink)]">
          Novo imóvel
        </h1>
        <PropertyForm action={createPropertyAction} submitLabel="Criar imóvel" />
      </div>
    </main>
  );
}
