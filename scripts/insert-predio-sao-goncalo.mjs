import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL não definida");
  process.exit(1);
}

const sql = postgres(url, { prepare: false });

const imovel = {
  slug: "predio-comercial-sao-goncalo",
  title: "Prédio Comercial Centro São Gonçalo",
  type: "Prédio Comercial",
  mode: "alugar",
  status: "disponivel",
  city: "São Gonçalo",
  neighborhood: "Centro",
  state: "RJ",
  price: 55000,
  bedrooms: 0,
  suites: 0,
  bathrooms: 14,
  parking: 0,
  area: 2700,
  description:
    "Excelente oportunidade para empresas que buscam uma localização estratégica e ampla estrutura corporativa. Prédio comercial localizado na Rua Doutor Feliciano Sodré, nº 230, Centro de São Gonçalo, em uma das principais vias da cidade, com fácil acesso ao transporte público, bancos, órgãos públicos, comércio e serviços. O imóvel conta com 7 pavimentos, cada um com aproximadamente 300 m², totalizando 2.700 m² de área construída, permitindo locação de andares individuais ou da edificação completa.",
  highlights: [
    "7 andares corporativos",
    "300 m² por pavimento — planta livre em L",
    "2 vestiários + arquivo por andar",
    "2 elevadores",
    "Portaria",
    "IPTU + Água + Luz à parte",
  ],
  tone: "graphite",
  images: [
    "/properties/predio-comercial-sao-goncalo-1.jpg",
    "/properties/predio-comercial-sao-goncalo-2.jpg",
    "/properties/predio-comercial-sao-goncalo-3.jpg",
    "/properties/predio-comercial-sao-goncalo-4.jpg",
    "/properties/predio-comercial-sao-goncalo-5.jpg",
  ],
  featured: true,
};

const cols = [
  "slug", "title", "type", "mode", "status", "city", "neighborhood", "state",
  "price", "bedrooms", "suites", "bathrooms", "parking", "area",
  "description", "highlights", "tone", "images", "featured",
];

// Remove caso já exista (idempotente)
await sql`delete from meridiano.properties where slug = ${imovel.slug}`;
await sql`insert into meridiano.properties ${sql(imovel, cols)}`;

const [{ count }] = await sql`select count(*)::int as count from meridiano.properties`;
console.log(`Imóvel inserido. Total agora: ${count} imóveis.`);
await sql.end();
