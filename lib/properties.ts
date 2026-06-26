export type Mode = "comprar" | "alugar";
export type Status = "disponivel" | "reservado" | "vendido";
export type Tone = "forest" | "stone" | "bronze" | "graphite";

export type Property = {
  id: string;
  slug: string;
  title: string;
  type: string;
  mode: Mode;
  status: Status;
  city: string;
  neighborhood: string;
  state: string;
  price: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking: number;
  area: number;
  description: string;
  highlights: string[];
  tone: Tone;
  images: string[];
  featured: boolean;
};

export const toneStyles: Record<Tone, string> = {
  forest: "linear-gradient(150deg, var(--color-forest) 0%, var(--color-forest-deep) 100%)",
  stone: "linear-gradient(150deg, var(--color-stone) 0%, #d8d1c4 100%)",
  bronze: "linear-gradient(150deg, var(--color-bronze) 0%, #6f5734 100%)",
  graphite: "linear-gradient(150deg, #3a3a36 0%, var(--color-ink) 100%)",
};

export const cities = ["São Paulo", "Rio de Janeiro", "Florianópolis"];
export const types = ["Cobertura", "Apartamento", "Casa", "Mansão", "Casa de Praia"];
export const tones: Tone[] = ["forest", "stone", "bronze", "graphite"];

export const statusLabels: Record<Status, string> = {
  disponivel: "Disponível",
  reservado: "Reservado",
  vendido: "Vendido",
};

export function priceLabel(p: { price: number; mode: Mode }): string {
  const value = p.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });
  return p.mode === "alugar" ? `${value}/mês` : value;
}
