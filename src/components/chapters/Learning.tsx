import { Reveal } from "../Reveal";
import { AnimatedText } from "../AnimatedText";
import { Parallax } from "../Parallax";
import { learning } from "../../data/journey";

export function Learning() {
  return (
    <section id="chapter-learning" className="chapter">
      <Reveal>
        <p className="eyebrow mb-4">02 — {learning.label}</p>
      </Reveal>

      <AnimatedText
        as="h2"
        text={learning.title}
        className="chapter-title kinetic mb-16 max-w-3xl"
      />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {learning.roles.map((role, i) => (
          <Reveal key={role.title} delay={i * 0.08}>
            <Parallax amount={18 + i * 14}>
              <div className="border-t border-white/15 pt-4">
                <span className="font-mono text-xs text-[color:var(--accent)]">
                  {`0${i + 1}`}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{role.essence}</p>
              </div>
            </Parallax>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
