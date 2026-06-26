/**
 * Gera um slug a partir de um título.
 * Remove acentos, espaços e caracteres especiais.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos (combining marks)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove caracteres inválidos
    .replace(/\s+/g, "-") // espaços -> hífen
    .replace(/-+/g, "-") // hífens duplicados
    .replace(/^-+|-+$/g, ""); // hífens nas pontas
}
