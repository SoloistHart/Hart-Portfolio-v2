import { useEffect, useState } from "react";
import { scrollStore, CHAPTERS } from "../store/scroll";
import { chapterLabels } from "../data/journey";

interface ProgressRailProps {
  activeChapter: number;
}

/** Fixed vertical rail showing journey progress and the active chapter. */
export function ProgressRail({ activeChapter }: ProgressRailProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => scrollStore.subscribe(setProgress), []);

  const goTo = (id: string) => {
    document
      .getElementById(`chapter-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Journey progress"
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 sm:flex"
    >
      {CHAPTERS.map((id, i) => {
        const active = i === activeChapter;
        return (
          <button
            key={id}
            type="button"
            onClick={() => goTo(id)}
            className="group flex items-center gap-3"
            aria-current={active ? "step" : undefined}
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                active
                  ? "text-white opacity-100"
                  : "text-slate-400 opacity-0 group-hover:opacity-100"
              }`}
            >
              {chapterLabels[i]}
            </span>
            <span
              className={`h-[2px] rounded-full transition-all duration-300 ${
                active
                  ? "w-8 bg-curiosity"
                  : "w-4 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        );
      })}
      <div
        className="mt-2 h-16 w-[2px] overflow-hidden rounded-full bg-white/10"
        aria-hidden="true"
      >
        <div
          className="w-full bg-gradient-to-b from-curiosity via-systems to-impact"
          style={{ height: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </nav>
  );
}
