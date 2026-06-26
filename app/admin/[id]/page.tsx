import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/queries";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { updatePropertyAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function EditarImovelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  const action = updatePropertyAction.bind(null, id);

  return (
    <main className="min-h-dvh bg-[var(--color-paper)] px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          ← Voltar ao painel
        </Link>
        <h1 className="mb-8 mt-3 font-display text-3xl font-semibold text-[var(--color-ink)]">
          Editar imóvel
        </h1>
        <PropertyForm property={property} action={action} submitLabel="Salvar alterações" />
      </div>
    </main>
  );
}
