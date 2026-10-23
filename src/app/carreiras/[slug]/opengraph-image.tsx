import { ImageResponse } from "next/og";
import { OG_SIZE, ogCard } from "@/lib/og";
import { getJobBySlug } from "@/lib/jobs";
import { categoryLabel, parseUnits, workTypeLabel } from "@/lib/constants";

export const alt = "Vaga no CPPEM Colégio e Cursos";
export const size = OG_SIZE;
export const contentType = "image/png";

// Imagem de compartilhamento de cada vaga: título, unidade e local.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return new ImageResponse(
      await ogCard({ eyebrow: "Carreiras", title: "Vagas no CPPEM Colégio e Cursos", meta: "Caruaru-PE" }),
      { ...size }
    );
  }

  const meta = [
    parseUnits(job.unit).join(", "),
    job.location,
    job.category === "trabalho" ? workTypeLabel(job.work_type) : "",
  ]
    .filter(Boolean)
    .join("  ·  ");

  return new ImageResponse(
    await ogCard({
      eyebrow: job.status === "encerrada" ? "Vaga encerrada" : `Vaga de ${categoryLabel(job.category)}`,
      title: job.title,
      meta,
    }),
    { ...size }
  );
}
