/**
 * A tiny framework-agnostic store for global scroll progress.
 *
 * The 3D scene reads `progress` every frame (inside `useFrame`) without
 * triggering React re-renders, while HTML chapters can subscribe for
 * coarse-grained updates (e.g. the active chapter index).
 */

type Listener = (progress: number) => void;

const state = {
  progress: 0, // 0 at the top of the page, 1 at the very bottom
  velocity: 0, // signed scroll velocity, useful for subtle motion cues
};

const listeners = new Set<Listener>();

export const scrollStore = {
  get progress() {
    return state.progress;
  },
  get velocity() {
    return state.velocity;
  },
  set(progress: number, velocity = 0) {
    state.progress = Math.min(1, Math.max(0, progress));
    state.velocity = velocity;
    for (const listener of listeners) listener(state.progress);
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

/**
 * The five narrative chapters. Each occupies an equal slice of the scroll
 * timeline; `chapterProgress` maps the global progress onto a local 0..1 range.
 */
export const CHAPTERS = [
  "curiosity",
  "learning",
  "systems",
  "impact",
  "future",
] as const;

export type ChapterId = (typeof CHAPTERS)[number];

export function chapterFromProgress(progress: number): number {
  return Math.min(CHAPTERS.length - 1, Math.floor(progress * CHAPTERS.length));
}
