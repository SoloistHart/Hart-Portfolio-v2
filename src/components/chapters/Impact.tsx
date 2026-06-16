import { Reveal } from "../Reveal";
import { impact } from "../../data/journey";

export function Impact() {
  return (
    <section id="chapter-impact" className="chapter">
      <Reveal>
        <p className="eyebrow mb-4">{impact.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="chapter-title mb-6 max-w-3xl">{impact.title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede mb-14">{impact.lede}</p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {impact.statements.map((s, i) => (
          <Reveal key={s.audience} delay={0.05 * i} className="panel">
            <p className="mb-2 font-display text-xl font-semibold text-impact">
              {s.audience}
            </p>
            <p className="text-slate-200">{s.promise}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
