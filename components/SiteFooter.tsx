import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-ink)] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 border-b border-white/15 pb-10 lg:flex-row lg:justify-between">
          <div>
            <p className="font-display text-3xl font-semibold tracking-[0.15em]">MERIDIANO</p>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              Imobiliária boutique de alto padrão. Endereços de exceção para
              comprar e alugar.
            </p>
          </div>
          <div className="flex gap-16 text-sm">
            <div>
              <p className="mb-3 font-medium text-white/90">Navegar</p>
              <ul className="space-y-2 text-white/60">
                <li><Link href="/imoveis?modo=comprar" className="hover:text-white">Comprar</Link></li>
                <li><Link href="/imoveis?modo=alugar" className="hover:text-white">Alugar</Link></li>
                <li><Link href="/anuncie" className="hover:text-white">Anuncie</Link></li>
                <li><Link href="/sobre" className="hover:text-white">Sobre</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-medium text-white/90">Contato</p>
              <ul className="space-y-2 text-white/60">
                <li>contato@meridiano.com.br</li>
                <li>+55 11 4000-0000</li>
                <li>São Paulo · Rio · Florianópolis</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="pt-8 text-xs text-white/40">
          © 2026 MERIDIANO. Projeto fictício de demonstração.
        </p>
      </div>
    </footer>
  );
}
