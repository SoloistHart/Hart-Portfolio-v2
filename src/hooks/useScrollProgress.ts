import { useEffect, useState } from "react";
import { scrollStore, chapterFromProgress } from "../store/scroll";

/**
 * Reads native scroll position into the global `scrollStore` on every frame the
 * page actually moves. The 3D scene consumes the store directly (no re-render);
 * this hook only re-renders React when the *active chapter* changes.
 */
export function useScrollProgress(): number {
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    let frame = 0;
    let lastProgress = 0;

    const measure = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      const velocity = progress - lastProgress;
      lastProgress = progress;

      scrollStore.set(progress, velocity);
      setChapter(chapterFromProgress(scrollStore.progress));
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return chapter;
}
