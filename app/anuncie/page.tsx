import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";
import { AnuncieForm } from "@/components/AnuncieForm";

export const metadata: Metadata = {
  title: "Anuncie seu imóvel — MERIDIANO",
  description:
    "Anuncie seu imóvel de alto padrão com a MERIDIANO: curadoria, fotografia profissional e uma carteira qualificada de compradores e locatários.",
};

const steps = [
  { num: "01", title: "Avaliação", text: "Visitamos o imóvel e definimos o valor ideal de mercado." },
  { num: "02", title: "Produção", text: "Fotografia profissional, tour e material de alto padrão." },
  { num: "03", title: "Divulgação", text: "Apresentamos a uma carteira qualificada e ao mercado certo." },
  { num: "04", title: "Negociação", text: "Conduzimos propostas, documentação e fechamento com você." },
];

const reasons = [
  { title: "Carteira qualificada", text: "Compradores e locatários de alto padrão já em relacionamento com a MERIDIANO." },
  { title: "Curadoria, não volume", text: "Selecionamos poucos imóveis para dar atenção real a cada um." },
  { title: "Marketing de exceção", text: "Fotografia, vídeo e posicionamento à altura do seu imóvel." },
];

export default function AnunciePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Intro com vídeo de fundo */}
        <section className="relative flex min-h-[70vh] items-end overflow-hidden px-5 py-[var(--space-section)] text-white sm:px-8">
          <HeroVideoBackground src="/videos/hero.mp4" />
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/70">
              Para proprietários
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05]">
              Seu imóvel merece o endereço certo de venda.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Anuncie com a MERIDIANO e tenha curadoria, produção profissional e
              acesso a quem realmente compra e aluga alto padrão.
            </p>
          </div>
        </section>

        {/* Por que anunciar */}
        <section className="bg-[var(--color-paper)] px-5 py-[var(--space-section)] sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              {reasons.map((r) => (
                <div key={r.title} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7">
                  <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">{r.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--color-muted)]">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="bg-[var(--color-stone)] px-5 py-[var(--space-section)] sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[var(--color-bronze)]">
              Como funciona
            </p>
            <h2 className="mb-12 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
              Do convite à chave entregue.
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.num}>
                  <span className="font-display text-4xl font-semibold text-[var(--color-bronze)]">{s.num}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--color-muted)]">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section className="bg-[var(--color-paper)] px-5 py-[var(--space-section)] sm:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[var(--color-bronze)]">
              Comece agora
            </p>
            <h2 className="mb-8 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
              Conte sobre o seu imóvel.
            </h2>
            <AnuncieForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
