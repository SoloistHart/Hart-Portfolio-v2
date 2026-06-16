import { Reveal } from "../Reveal";
import { systems } from "../../data/journey";

const FLOW = ["Problem", "Thinking", "Architecture", "Outcome"] as const;

export function Systems() {
  return (
    <section id="chapter-systems" className="chapter">
      <Reveal>
        <p className="eyebrow mb-4">{systems.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="chapter-title mb-6">{systems.title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede mb-14">{systems.lede}</p>
      </Reveal>

      <div className="flex flex-col gap-8">
        {systems.projects.map((project, i) => (
          <Reveal as="article" key={project.name} delay={0.04 * i} className="panel">
            <header className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl font-semibold text-white">
                {project.name}
              </h3>
              <span className="hidden font-mono text-xs uppercase tracking-widest text-systems sm:block">
                {FLOW.join(" → ")}
              </span>
            </header>

            <dl className="grid gap-5 sm:grid-cols-2">
              <Field label="Problem" value={project.problem} accent="text-impact" />
              <Field label="Thinking" value={project.thinking} accent="text-curiosity" />
              <Field
                label="Architecture"
                value={project.architecture}
                accent="text-systems"
                mono
              />
              <Field label="Outcome" value={project.outcome} accent="text-emerald-300" />
            </dl>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  accent,
  mono = false,
}: {
  label: string;
  value: string;
  accent: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className={`flow-step mb-1 ${accent}`}>{label}</dt>
      <dd
        className={`text-sm leading-relaxed text-slate-300 ${
          mono ? "font-mono text-[13px] text-slate-400" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
