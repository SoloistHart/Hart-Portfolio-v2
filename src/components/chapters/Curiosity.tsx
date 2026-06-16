import { Reveal } from "../Reveal";
import { hero } from "../../data/journey";

export function Curiosity() {
  return (
    <section
      id="chapter-curiosity"
      className="chapter items-start justify-center text-left"
    >
      <Reveal>
        <p className="eyebrow mb-6">Stage 01 — Curiosity</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="chapter-title mb-6">
          {hero.name}
          <span className="mt-3 block bg-gradient-to-r from-curiosity via-systems to-impact bg-clip-text text-2xl font-medium text-transparent sm:text-3xl">
            {hero.role}
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="lede mb-8 font-display text-2xl text-white/90 sm:text-3xl">
          {hero.curiosityLine}
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <p className="lede">{hero.intro}</p>
      </Reveal>

      <Reveal delay={0.28}>
        <div className="mt-14 flex items-center gap-3 text-slate-400">
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
            <span className="h-2 w-1 animate-pulse2 rounded-full bg-curiosity" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest">
            {hero.scrollCue}
          </span>
        </div>
      </Reveal>
    </section>
  );
}
