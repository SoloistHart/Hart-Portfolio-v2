import { useEffect } from "react";
import { scrollStore } from "../store/scroll";

/**
 * Drives a global `--vskew` CSS variable from scroll velocity so headings can
 * subtly skew/lean while scrolling and spring back at rest — the "kinetic"
 * feel of motion-led sites. Elements opt in via the `.kinetic` class.
 * Disabled for touch / reduced-motion.
 */
export function useKineticScroll() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isTouch || reduce) return;

    let last = scrollStore.progress;
    let skew = 0;
    let raf = 0;

    const loop = () => {
      const p = scrollStore.progress;
      const dp = p - last;
      last = p;
      // Map progress delta (small) to a clamped degree value, then ease.
      const target = Math.max(-2.5, Math.min(2.5, dp * 900));
      skew += (target - skew) * 0.12;
      if (Math.abs(skew) < 0.01) skew = 0;
      document.documentElement.style.setProperty("--vskew", `${skew.toFixed(3)}deg`);
      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(raf);
      document.documentElement.style.setProperty("--vskew", "0deg");
    };
  }, []);
}
