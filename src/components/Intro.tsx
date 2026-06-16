import { useEffect, useState } from "react";

/** A brief intro veil that fades to reveal the living network behind it. */
export function Intro() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-ink-950 transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="h-3 w-3 animate-ping rounded-full bg-curiosity" />
        <span className="font-mono text-xs uppercase tracking-widest2 text-slate-400">
          Initializing the system
        </span>
      </div>
    </div>
  );
}
