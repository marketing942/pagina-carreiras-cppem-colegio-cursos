import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Títulos: geométrica e amigável (acolhedora, sem ficar infantil)
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});
// Pequenos rótulos: mesma família da identidade CPPEM
const eyebrow = Rajdhani({
  subsets: ["latin"],
  variable: "--font-eyebrow",
  display: "swap",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Carreiras | CPPEM Colégio e Cursos",
  description:
    "Construa sua carreira na empresa que transforma vidas pela educação. Conheça as vagas abertas no CPPEM Colégio e Cursos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${display.variable} ${eyebrow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
