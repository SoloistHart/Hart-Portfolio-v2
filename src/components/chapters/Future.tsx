import { Reveal } from "../Reveal";
import { AnimatedText } from "../AnimatedText";
import { Parallax } from "../Parallax";
import { Magnetic } from "../Magnetic";
import { future } from "../../data/journey";

export function Future() {
  return (
    <section
      id="chapter-future"
      className="chapter items-start justify-center"
    >
      <Reveal>
        <p className="eyebrow mb-4">05 — {future.label}</p>
      </Reveal>

      <AnimatedText
        as="h2"
        text={future.title}
        className="chapter-title kinetic"
        stagger={0.08}
      />
      <Parallax amount={30}>
        <AnimatedText
          as="p"
          text={future.subtitle}
          className="mt-2 font-display text-2xl text-slate-400 sm:text-3xl"
          stagger={0.05}
        />
      </Parallax>

      <Reveal delay={0.2}>
        <div className="mt-14 flex flex-col items-start gap-6">
          <Magnetic strength={0.5}>
            <a
              href={`mailto:${future.contact.email}`}
              className="font-display text-2xl text-white underline-offset-4 hover:text-[color:var(--accent)] hover:underline sm:text-3xl"
            >
              {future.contact.cta}
            </a>
          </Magnetic>
          <div className="flex flex-wrap gap-3">
            {future.contact.links.map((link) => (
              <Magnetic key={link.label} strength={0.35}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-block rounded-full border border-white/15 px-5 py-2.5 text-sm text-slate-200 transition-colors hover:border-[color:var(--accent)] hover:text-white"
                >
                  {link.label}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
