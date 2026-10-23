import { ImageResponse } from "next/og";
import { OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Carreiras | CPPEM Colégio e Cursos";
export const size = OG_SIZE;
export const contentType = "image/png";

// Imagem padrão do site (usada quando a página não tem a sua).
export default async function Image() {
  return new ImageResponse(
    await ogCard({
      eyebrow: "Carreiras",
      title: "Construa sua carreira na empresa que transforma vidas pela educação",
      meta: "CPPEM Colégio e Cursos · Caruaru-PE",
    }),
    { ...size }
  );
}
