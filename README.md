# MERIDIANO

> Plataforma imobiliária de alto padrão — com painel administrativo completo.

MERIDIANO é uma plataforma de imóveis (compra, venda e locação) com busca e filtros, página de detalhe do imóvel e um **painel administrativo** onde o proprietário gerencia os anúncios — tudo renderizado no servidor (SSR) e persistido em **PostgreSQL**.

## ✨ Funcionalidades

- 🏠 **Home** com imóveis em destaque
- 🔎 **Busca e filtros** (cidade, tipo, modalidade, status)
- 🏡 **Página do imóvel** (PDP) com galeria e detalhes
- 🔐 **Painel administrativo** com login (sem cadastro público)
  - **CRUD** completo de imóveis
  - **Upload de fotos**
  - Controle de **status** (Disponível / Reservado / Vendido)
- ⚙️ **SSR** — páginas dinâmicas lendo do banco a cada requisição
- 🛡️ Rotas `/admin` protegidas por **middleware** + sessão JWT assinada

## 🛠️ Stack

- **Next.js 16** (App Router, Server Actions) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Drizzle ORM** + **PostgreSQL** (driver `postgres`)
- **jose** — sessão JWT em cookie assinado

## 🚀 Rodando localmente

Requer um PostgreSQL acessível. Copie `.env.example` para `.env.local` e preencha as variáveis.

```bash
npm install
npm run dev
# abre http://localhost:3000  (admin em /admin)
```

## 📄 Sobre

Projeto desenvolvido por **Mateus Porto** como estudo de aplicação full-stack com SSR, banco de dados e área administrativa autenticada.
