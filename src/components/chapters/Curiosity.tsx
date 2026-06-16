import { Reveal } from "../Reveal";
import { AnimatedText } from "../AnimatedText";
import { Parallax } from "../Parallax";
import { hero } from "../../data/journey";

export function Curiosity() {
  return (
    <section
      id="chapter-curiosity"
      className="chapter items-start justify-center text-left"
    >
      <Reveal delay={0.9}>
        <p className="eyebrow mb-6">01 — Curiosity</p>
      </Reveal>

      <AnimatedText
        as="h1"
        text={hero.name}
        className="chapter-title mb-5"
        stagger={0.09}
        delay={1.0}
      />

      <Reveal delay={1.25}>
        <p className="mb-12 bg-gradient-to-r from-curiosity via-systems to-impact bg-clip-text font-display text-xl font-medium text-transparent sm:text-2xl">
          {hero.role}
        </p>
      </Reveal>

      <Parallax amount={40}>
        <AnimatedText
          as="p"
          text={hero.curiosityLine}
          className="font-display text-3xl leading-tight text-white/90 sm:text-5xl"
          stagger={0.05}
          delay={1.35}
        />
      </Parallax>

      <Reveal delay={1.7}>
        <div className="mt-16 flex items-center gap-3 text-slate-400">
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
