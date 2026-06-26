import type { SiteSettings } from "@/lib/types";

interface StatsSectionProps {
  settings: SiteSettings;
}

/** Cards de indicadores institucionais (editáveis pelo admin). */
export default function StatsSection({ settings }: StatsSectionProps) {
  const stats = [
    settings.stat_years,
    settings.stat_students,
    settings.stat_team,
    settings.stat_extra,
  ].filter(Boolean) as string[];

  return (
    <section id="indicadores" className="bg-brand-50 py-16">
      <div className="container-page">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            // Separa número (primeira palavra) do restante para destaque visual
            const [highlight, ...rest] = stat.split(" ");
            return (
              <div
                key={i}
                className="card flex flex-col gap-2 p-6 text-center"
              >
                <span className="text-3xl font-black text-accent-500">
                  {highlight}
                </span>
                <span className="text-sm font-medium text-brand-700">
                  {rest.join(" ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
