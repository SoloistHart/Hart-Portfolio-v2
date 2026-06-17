import { Reveal } from "../Reveal";
import { AnimatedText } from "../AnimatedText";
import { Parallax } from "../Parallax";
import { systems } from "../../data/journey";

export function Systems() {
  return (
    <section id="chapter-systems" className="chapter">
      <Reveal>
        <p className="eyebrow mb-4">03 — {systems.label}</p>
      </Reveal>

      <AnimatedText
        as="h2"
        text={systems.title}
        className="chapter-title kinetic mb-10 max-w-3xl"
      />

      <Reveal delay={0.1}>
        <div className="mb-12 flex flex-wrap items-center gap-x-3 gap-y-2">
          {systems.flow.map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-systems">
                {step}
              </span>
              {i < systems.flow.length - 1 && (
                <span className="text-slate-600">→</span>
              )}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="flex flex-col gap-5">
        {systems.projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.05}>
            <Parallax amount={26}>
              <article className="panel flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-display text-2xl font-semibold text-white">
                  {project.name}
                </h3>
                <p className="font-mono text-sm text-slate-400">
                  <span className="text-impact">{project.problem}</span>
                  <span className="mx-2 text-slate-600">→</span>
                  <span className="text-emerald-300">{project.outcome}</span>
                </p>
              </article>
            </Parallax>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
