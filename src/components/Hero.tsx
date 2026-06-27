import Logo from "./Logo";

interface HeroProps {
  openJobsCount: number;
  areasCount: number;
}

/** Seção de destaque (hero) da página pública de carreiras. */
export default function Hero({ openJobsCount, areasCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      {/* Brilhos decorativos */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />

      <div className="container-page relative py-14 sm:py-20">
        {/* Logos das marcas — passa confiança institucional */}
        <div className="mb-10 flex flex-wrap items-center gap-8 sm:gap-12">
          <Logo variant="cppem" className="h-20 sm:h-28" />
          <span className="h-16 w-px bg-white/20" aria-hidden />
          <Logo variant="colegio" className="h-20 sm:h-28" />
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-brand-100">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-400" />
          Estamos contratando
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
          Construa sua carreira na empresa que transforma vidas pela
          educação.
        </h1>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#vagas" className="btn-primary">
            Ver vagas abertas
          </a>
          <a href="#sobre" className="btn-ghost">
            Conheça nossa missão
          </a>

          {/* Indicadores rápidos */}
          <div className="mt-2 flex flex-wrap items-center gap-8 sm:ml-auto sm:mt-0">
            <div>
              <p className="text-3xl font-black text-white">{openJobsCount}</p>
              <p className="text-xs uppercase tracking-wide text-brand-300">
                Vagas abertas
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">{areasCount}</p>
              <p className="text-xs uppercase tracking-wide text-brand-300">
                Áreas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curva inferior */}
      <div className="h-8 rounded-t-[36px] bg-white" />
    </section>
  );
}
