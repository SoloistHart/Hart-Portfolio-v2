import { Reveal } from "../Reveal";
import { future } from "../../data/journey";

export function Future() {
  return (
    <section
      id="chapter-future"
      className="chapter items-start justify-center"
    >
      <Reveal>
        <p className="eyebrow mb-4">{future.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="chapter-title mb-6 max-w-3xl">{future.title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede mb-12">{future.lede}</p>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="panel max-w-xl">
          <p className="mb-5 font-display text-2xl font-semibold text-white">
            {future.contact.cta}
          </p>
          <a
            href={`mailto:${future.contact.email}`}
            className="mb-6 inline-block font-mono text-lg text-curiosity underline-offset-4 hover:underline"
          >
            {future.contact.email}
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

      <Reveal delay={0.24}>
        <p className="mt-16 font-mono text-xs uppercase tracking-widest text-slate-500">
          The network continues beyond what is visible.
        </p>
      </Reveal>
    </section>
  );
}
