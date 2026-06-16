import { Reveal } from "../Reveal";
import { AnimatedText } from "../AnimatedText";
import { Parallax } from "../Parallax";
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
        className="chapter-title"
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
        <div className="mt-14 flex flex-col gap-5">
          <a
            href={`mailto:${future.contact.email}`}
            className="font-display text-xl text-white underline-offset-4 hover:text-curiosity hover:underline sm:text-2xl"
          >
            {future.contact.cta}
          </a>
          <div className="flex flex-wrap gap-3">
            {future.contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-curiosity hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
