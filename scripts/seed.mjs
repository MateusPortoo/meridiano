import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL não definida");
  process.exit(1);
}

const sql = postgres(url, { prepare: false });

const data = [
  {
    slug: "cobertura-horizonte",
    title: "Cobertura Horizonte",
    type: "Cobertura",
    mode: "comprar",
    status: "disponivel",
    city: "São Paulo",
    neighborhood: "Vila Nova Conceição",
    state: "SP",
    price: 8900000,
    bedrooms: 4, suites: 4, bathrooms: 6, parking: 4, area: 420,
    description:
      "Cobertura duplex no coração da Vila Nova Conceição, com terraço privativo, piscina com borda infinita e vista aberta para o Parque Ibirapuera. Acabamentos em mármore travertino e madeira freijó.",
    highlights: ["Terraço com piscina", "Vista para o Ibirapuera", "4 suítes", "Automação completa"],
    tone: "forest",
    images: ["/properties/cobertura-horizonte-1.jpg", "/properties/cobertura-horizonte-2.jpg", "/properties/cobertura-horizonte-3.jpg"],
    featured: true,
  },
  {
    slug: "mansao-aurora",
    title: "Mansão Aurora",
    type: "Mansão",
    mode: "comprar",
    status: "disponivel",
    city: "Rio de Janeiro",
    neighborhood: "Joá",
    state: "RJ",
    price: 22000000,
    bedrooms: 6, suites: 6, bathrooms: 8, parking: 6, area: 1100,
    description:
      "Residência exclusiva no Joá, debruçada sobre o mar. Arquitetura assinada, pé-direito triplo no living, spa, adega climatizada e acesso privativo à enseada.",
    highlights: ["Vista mar 180°", "Acesso à enseada", "Spa e adega", "Arquitetura assinada"],
    tone: "stone",
    images: ["/properties/mansao-aurora-1.jpg", "/properties/mansao-aurora-2.jpg", "/properties/mansao-aurora-3.jpg"],
    featured: true,
  },
  {
    slug: "apartamento-meridiano-itaim",
    title: "Apartamento Meridiano",
    type: "Apartamento",
    mode: "alugar",
    status: "disponivel",
    city: "São Paulo",
    neighborhood: "Itaim Bibi",
    state: "SP",
    price: 32000,
    bedrooms: 3, suites: 3, bathrooms: 4, parking: 3, area: 240,
    description:
      "Apartamento de alto padrão no Itaim Bibi, totalmente mobiliado por escritório de design. Living integrado, varanda gourmet e infraestrutura completa de lazer no edifício.",
    highlights: ["Mobiliado por designer", "Varanda gourmet", "Lazer completo", "Pronto para morar"],
    tone: "bronze",
    images: ["/properties/apartamento-meridiano-itaim-1.jpg", "/properties/apartamento-meridiano-itaim-2.jpg", "/properties/apartamento-meridiano-itaim-3.jpg"],
    featured: false,
  },
  {
    slug: "casa-mare-alta",
    title: "Casa Maré Alta",
    type: "Casa de Praia",
    mode: "comprar",
    status: "disponivel",
    city: "Florianópolis",
    neighborhood: "Jurerê Internacional",
    state: "SC",
    price: 12500000,
    bedrooms: 5, suites: 5, bathrooms: 7, parking: 5, area: 680,
    description:
      "Casa pé na areia em Jurerê Internacional, com piscina aquecida, deck de madeira e integração total entre interior e jardim. O verão o ano inteiro, com a privacidade de um endereço único.",
    highlights: ["Pé na areia", "Piscina aquecida", "Deck e jardim", "5 suítes"],
    tone: "graphite",
    images: ["/properties/casa-mare-alta-1.jpg", "/properties/casa-mare-alta-2.jpg", "/properties/casa-mare-alta-3.jpg"],
    featured: true,
  },
  {
    slug: "cobertura-duplex-leblon",
    title: "Cobertura Duplex Leblon",
    type: "Cobertura",
    mode: "alugar",
    status: "disponivel",
    city: "Rio de Janeiro",
    neighborhood: "Leblon",
    state: "RJ",
    price: 45000,
    bedrooms: 4, suites: 3, bathrooms: 5, parking: 3, area: 360,
    description:
      "Cobertura duplex no Leblon a uma quadra da praia, com piscina privativa no rooftop e vista para o mar e a lagoa. Locação para quem exige o melhor endereço do Rio.",
    highlights: ["Rooftop com piscina", "Vista mar e lagoa", "A uma quadra da praia", "Duplex"],
    tone: "forest",
    images: ["/properties/cobertura-duplex-leblon-1.jpg", "/properties/cobertura-duplex-leblon-2.jpg", "/properties/cobertura-duplex-leblon-3.jpg"],
    featured: false,
  },
  {
    slug: "residencia-bosque",
    title: "Residência Bosque",
    type: "Casa",
    mode: "comprar",
    status: "disponivel",
    city: "São Paulo",
    neighborhood: "Jardim Europa",
    state: "SP",
    price: 6700000,
    bedrooms: 4, suites: 3, bathrooms: 5, parking: 4, area: 390,
    description:
      "Casa contemporânea no Jardim Europa, cercada por jardim de inverno e bosque privativo. Concreto aparente, esquadrias de piso a teto e total integração com a natureza no centro da cidade.",
    highlights: ["Bosque privativo", "Concreto aparente", "Jardim de inverno", "Projeto premiado"],
    tone: "stone",
    images: ["/properties/residencia-bosque-1.jpg", "/properties/residencia-bosque-2.jpg", "/properties/residencia-bosque-3.jpg"],
    featured: false,
  },
];

const cols = [
  "slug", "title", "type", "mode", "status", "city", "neighborhood", "state",
  "price", "bedrooms", "suites", "bathrooms", "parking", "area",
  "description", "highlights", "tone", "images", "featured",
];

await sql`delete from meridiano.properties`;
for (const p of data) {
  await sql`insert into meridiano.properties ${sql(p, cols)}`;
}

const [{ count }] = await sql`select count(*)::int as count from meridiano.properties`;
console.log(`Seed concluído: ${count} imóveis inseridos.`);
await sql.end();
