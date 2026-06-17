import { useEffect, useState } from "react";

/** A shader-style preloader: a count-up with an "assembling" line that fades to
 * reveal the living scene behind it. */
export function Intro() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const duration = 1100;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out so it decelerates toward 100
      const eased = 1 - Math.pow(1 - t, 2);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = window.requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setHidden(true), 250);
      }
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-950 transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <div className="flex w-64 flex-col items-center gap-4">
        <span className="font-display text-6xl font-bold tabular-nums text-white">
          {progress}
          <span className="text-2xl text-slate-500">%</span>
        </span>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-curiosity via-systems to-impact transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-slate-500">
          Assembling shaders
        </span>
      </div>
    </div>
  );
}
