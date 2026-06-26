"use client";

import { deletePropertyAction } from "@/app/admin/actions";

export function DeleteButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deletePropertyAction}
      onSubmit={(e) => {
        if (!confirm(`Apagar "${title}"? Esta ação não pode ser desfeita.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-[var(--color-muted)] transition-colors hover:text-red-600"
      >
        Apagar
      </button>
    </form>
  );
}
