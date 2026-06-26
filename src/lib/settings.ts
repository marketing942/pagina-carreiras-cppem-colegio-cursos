import { createClient } from "./supabase/server";
import type { SiteSettings } from "./types";

/** Valores padrão usados como fallback caso o Supabase não esteja configurado. */
export const DEFAULT_SETTINGS: SiteSettings = {
  id: "default",
  company_name: "CPPEM Colégio e Cursos",
  about_text:
    "Há mais de 7 anos, o CPPEM trabalha todos os dias com um único propósito ambicioso: transformar vidas por meio da educação. Somando o CPPEM Concursos e a atuação no ensino superior EAD, já são cerca de 14.000 alunos aprovados em concursos públicos em todo o Brasil — histórias reais de mudança, dignidade e futuro. Além disso, contamos com mais de 50 colaboradores e professores juntos mudando vidas.",
  stat_years: "+7 anos de história",
  stat_students: "+14.000 alunos aprovados",
  stat_team: "+50 colaboradores e professores",
  stat_extra: "Educação, disciplina e transformação de vidas",
  form_url:
    "https://cppem.notion.site/2e5bbae8074c80a4b7ddf45a8fb28f97?pvs=105",
  form_embed_url:
    "https://cppem.notion.site/ebd//2e5bbae8074c80a4b7ddf45a8fb28f97",
  show_form_embed: true,
  instagram_url: "https://instagram.com/cppem",
  youtube_url: "https://youtube.com/@cppem",
  tiktok_url: "https://tiktok.com/@cppem",
  linkedin_url: null,
  whatsapp_url: "https://wa.me/5581999999999",
  address: "Caruaru-PE",
  footer_description:
    "Há mais de 7 anos transformando vidas por meio da educação.",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

/** Busca as configurações do site (linha única). */
export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return DEFAULT_SETTINGS;
    }
    return data as SiteSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}
