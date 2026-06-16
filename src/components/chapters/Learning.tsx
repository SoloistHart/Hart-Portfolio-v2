import { Reveal } from "../Reveal";
import { learning } from "../../data/journey";

export function Learning() {
  return (
    <section id="chapter-learning" className="chapter">
      <Reveal>
        <p className="eyebrow mb-4">{learning.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="chapter-title mb-6">{learning.title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede mb-14">{learning.lede}</p>
      </Reveal>

      <ol className="relative ml-3 border-l border-white/10">
        {learning.roles.map((role, i) => (
          <Reveal as="li" key={role.title} delay={0.05 * i} className="mb-10 pl-8">
            <span
              className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-gradient-to-br from-curiosity to-systems shadow-[0_0_18px_2px_rgba(56,189,248,0.5)]"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-widest text-curiosity">
                {`0${i + 1}`}
              </span>
              <h3 className="font-display text-2xl font-semibold text-white">
                {role.title}
              </h3>
              <p className="text-slate-300">{role.arc}</p>
              <p className="text-sm italic text-slate-400">“{role.lesson}”</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
