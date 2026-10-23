import { readFile } from "node:fs/promises";
import path from "node:path";

/** Tamanho padrão de imagem de compartilhamento (Open Graph). */
export const OG_SIZE = { width: 1200, height: 630 };

async function logoDataUrl(name: "cppem" | "colegio"): Promise<string> {
  const file = await readFile(path.join(process.cwd(), "public", "logos", `${name}.png`));
  return `data:image/png;base64,${file.toString("base64")}`;
}

interface OgCardProps {
  eyebrow: string;
  title: string;
  meta?: string;
}

/** Cartão de compartilhamento: fundo azul-marinho, logos num painel claro e título grande. */
export async function ogCard({ eyebrow, title, meta }: OgCardProps) {
  const [cppem, colegio] = await Promise.all([logoDataUrl("cppem"), logoDataUrl("colegio")]);
  const fontSize = title.length > 60 ? 52 : title.length > 36 ? 62 : 74;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px",
        background: "linear-gradient(135deg, #0b1a40 0%, #122a5c 100%)",
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "0 36px",
            borderRadius: 999,
            background: "#fdfbf6",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cppem} width={136} height={136} alt="" />
          <div style={{ width: 2, height: 76, background: "#e4d7b9" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={colegio} width={136} height={136} alt="" />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e3c98f",
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: "flex", marginTop: 18, fontSize, lineHeight: 1.1, fontWeight: 700 }}>
          {title}
        </div>
        {meta ? (
          <div style={{ display: "flex", marginTop: 26, fontSize: 28, color: "#c3d0e6" }}>{meta}</div>
        ) : null}
      </div>

      <div style={{ display: "flex", height: 8, width: 160, borderRadius: 4, background: "#c9ae7a" }} />
    </div>
  );
}
