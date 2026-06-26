import Link from "next/link";

const navLinks = [
  { label: "Comprar", href: "/imoveis?modo=comprar" },
  { label: "Alugar", href: "/imoveis?modo=alugar" },
  { label: "Anuncie", href: "/anuncie" },
  { label: "Sobre", href: "/sobre" },
];

export function SiteHeader({ variant = "solid" }: { variant?: "solid" | "overlay" }) {
  const overlay = variant === "overlay";

  return (
    <header
      className={
        overlay
          ? "absolute top-0 left-0 right-0 z-40"
          : "sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-paper)]/90 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className={`font-display text-2xl font-semibold tracking-[0.15em] ${
            overlay ? "text-white" : "text-[var(--color-ink)]"
          }`}
        >
          MERIDIANO
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                overlay
                  ? "text-white/80 hover:text-white"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/imoveis"
          className={`rounded-full px-5 py-2 text-sm tracking-wide transition-colors ${
            overlay
              ? "bg-white text-[var(--color-ink)] hover:bg-white/90"
              : "bg-[var(--color-forest)] text-white hover:bg-[var(--color-forest-deep)]"
          }`}
        >
          Ver imóveis
        </Link>
      </div>
    </header>
  );
}
