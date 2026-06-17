import { Reveal } from "../Reveal";
import { AnimatedText } from "../AnimatedText";
import { Parallax } from "../Parallax";
import { impact } from "../../data/journey";

export function Impact() {
  return (
    <section id="chapter-impact" className="chapter">
      <Reveal>
        <p className="eyebrow mb-4">04 — {impact.label}</p>
      </Reveal>

      <AnimatedText
        as="h2"
        text={impact.title}
        className="chapter-title kinetic mb-16 max-w-3xl"
      />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {impact.statements.map((s, i) => (
          <Reveal key={s.audience} delay={i * 0.07}>
            <Parallax amount={16 + i * 12}>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl font-bold text-impact sm:text-4xl">
                  {s.audience}
                </span>
                <span className="text-slate-300">{s.promise}</span>
              </div>
            </Parallax>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
