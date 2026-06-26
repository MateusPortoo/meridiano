import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MERIDIANO — Endereços de exceção",
  description:
    "Imobiliária boutique de alto padrão. Coberturas, mansões e residências de exceção para compra e locação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        {/* Fontshare — Zodiak (serifada editorial) + General Sans (corpo) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=zodiak@400,500,600,700&f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
