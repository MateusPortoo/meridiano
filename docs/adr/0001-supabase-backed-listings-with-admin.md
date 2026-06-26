# 0001 — Imóveis no Supabase com painel /admin

Status: Aceito · 2026-06-25

## Contexto

O MERIDIANO nasceu como protótipo com os imóveis fixos em `lib/properties.ts`
(dados no código). Virou negócio real: o dono precisa adicionar, editar e
remover imóveis — com fotos — sem depender de um desenvolvedor.

## Decisão

Mover os imóveis de `lib/properties.ts` para o **Supabase**:

- **Postgres** — tabela `properties`
- **Auth** (e-mail + senha, sem signup público) — protege o `/admin`, nível único (Admin)
- **Storage** — fotos dos imóveis

O site público passa a ler do Supabase via **SSR (dinâmico)** — imóvel cadastrado
aparece na hora. O `/admin` é um CRUD protegido por login. A camada de tipos
(`type Property`) e a UI pública são preservadas; muda só a fonte dos dados.

## Alternativas consideradas

- **CMS headless (Sanity/Payload)** — painel pronto, menos código. Descartado por
  preferência de manter tudo na própria stack (Supabase já usado em outros projetos).
- **Airtable/planilha como banco** — simples demais; sem auth/storage integrados.
- **Manter estático + rebuild manual** — não atende: o dono não consegue mexer sozinho.
- **ISR (cache com revalidação)** — adiada; SSR é suficiente no tráfego boutique e
  evita confusão de "imóvel novo não aparece ainda".

## Consequências

- Páginas públicas deixam de ser estáticas e passam a consultar o banco por requisição.
- Surge dependência de variáveis de ambiente (URL + chaves Supabase), local e na Vercel.
- Os 6 imóveis fictícios são migrados como seed inicial e depois substituídos pelos reais.
- Caminho aberto para evoluções futuras: papéis (corretor), ISR, filtros server-side.
