import { Scene } from "./three/Scene";
import { Intro } from "./components/Intro";
import { ProgressRail } from "./components/ProgressRail";
import { Reveal } from "./components/Reveal";
import { Curiosity } from "./components/chapters/Curiosity";
import { Learning } from "./components/chapters/Learning";
import { Systems } from "./components/chapters/Systems";
import { Impact } from "./components/chapters/Impact";
import { Future } from "./components/chapters/Future";
import { useDeviceCapability } from "./hooks/useDeviceCapability";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { hero } from "./data/journey";

export default function App() {
  const capability = useDeviceCapability();
  const activeChapter = useScrollProgress();
  useSmoothScroll(!capability.prefersReducedMotion);

  return (
    <div className="vignette relative">
      <Intro />
      <Scene tier={capability.tier} />
      <div className="readability-scrim" aria-hidden="true" />

      <header className="fixed left-0 top-0 z-30 flex w-full items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-display text-sm font-semibold tracking-widest2 text-white">
          {hero.name.toUpperCase()}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Curiosity → Systems → Impact
        </span>
      </header>

      <ProgressRail activeChapter={activeChapter} />

      <main className="story-layer">
        <Curiosity />
        <Learning />
        <Systems />
        <Impact />
        <Future />

        <Reveal as="footer" className="px-6 pb-10 text-center sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
            {hero.name} · {new Date().getFullYear()}
          </p>
        </Reveal>
      </main>

      {capability.tier === "static" && (
        <p className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/10 bg-ink-900/80 px-4 py-2 text-center font-mono text-[10px] uppercase tracking-widest text-slate-400 backdrop-blur">
          Optimized experience — storytelling preserved without 3D
        </p>
      )}
    </div>
  );
}
