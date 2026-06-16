import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A tiny, dependency-free inertia scroller that gives desktop (wheel) scrolling
 * an iOS-style momentum/glide feel and keeps GSAP ScrollTrigger perfectly in
 * sync. On touch devices it stays out of the way so the native momentum (which
 * already feels great on iOS/Android) is used, and it disables itself for
 * reduced-motion users.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let running = false;
    let raf = 0;

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const loop = () => {
      // Exponential approach -> smooth, "weighted" glide.
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        running = false;
      }
      window.scrollTo(0, current);
      ScrollTrigger.update();
      if (running) raf = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      current = window.scrollY;
      raf = window.requestAnimationFrame(loop);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // let pinch-zoom through
      e.preventDefault();
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY));
      start();
    };

    // Keep the target aligned when the user scrolls by other means
    // (keyboard, scrollbar drag, anchor jumps) so wheel input resumes smoothly.
    const onScroll = () => {
      if (!running) target = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [enabled]);
}
