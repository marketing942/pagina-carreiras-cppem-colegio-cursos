import type { ContentItem } from "@/lib/types";
import Icon, { type IconName } from "./Icon";

const VALID_ICONS: IconName[] = ["spark", "cap", "heart", "building", "star", "check", "users", "book", "briefcase", "sun"];
const FALLBACK_ICONS: IconName[] = ["spark", "cap", "heart", "building", "star", "check"];

function iconFor(item: ContentItem, index: number): IconName {
  return VALID_ICONS.includes(item.icon as IconName)
    ? (item.icon as IconName)
    : FALLBACK_ICONS[index % FALLBACK_ICONS.length];
}

/** "Por que trabalhar no CPPEM": cards com os diferenciais da empresa (editáveis no admin). */
export default function WhyWorkSection({ items }: { items: ContentItem[] }) {
  return (
    <section id="por-que-trabalhar" className="scroll-mt-20 bg-canvas2 py-14 sm:py-20" aria-labelledby="por-que-trabalhar-titulo">
      <div className="container-page">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">Por que o CPPEM</span>
          <h2 id="por-que-trabalhar-titulo" className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            Por que trabalhar no CPPEM
          </h2>
          <p className="mt-3 text-inksoft">
            Mais do que uma vaga: um lugar para crescer, aprender e fazer parte de algo maior.
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={`${item.title}-${i}`} className="card card-hover flex flex-col p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-goldsoft text-goldink">
                <Icon name={iconFor(item, i)} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-inksoft">{item.text}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-inkmuted">
          Alguns benefícios variam conforme a vaga. Os detalhes estão na página de cada oportunidade.
        </p>
      </div>
    </section>
  );
}
