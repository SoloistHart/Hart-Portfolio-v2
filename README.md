# RhoHart — Portfolio

A premium, story-driven, interactive portfolio. It is not a list of projects — it is a single continuous scroll that travels one narrative:

> **Curiosity → Systems → Impact**

The visitor experiences the evolution of a curious person becoming an AI Engineer who builds systems that create meaningful outcomes, across five chapters:

1. **Curiosity** — everything starts with a single question.
2. **Learning** — each role adds a piece of the puzzle.
3. **Systems Thinking** — projects told as Problem → Thinking → Architecture → Outcome.
4. **Impact** — technology matters when it helps people.
5. **The Future** — still building, still learning, still exploring.

A living neural-network scene grows and shifts color behind the story, and the experience degrades gracefully on low-end devices or when motion is reduced.

## Tech stack

- **App:** React 18, TypeScript, Vite
- **Styling:** TailwindCSS
- **3D:** Three.js, @react-three/fiber, @react-three/drei (custom GLSL shaders)
- **Motion:** GSAP + ScrollTrigger

## Getting started

```sh
# Install dependencies
npm install

# Run the dev server (http://localhost:5173)
npm run dev

# Type-check + production build
npm run build

# Preview the production build
npm run preview

# Lint
npm run lint
```

This is a fully client-side app — no backend, database, or required secrets. Optional Vite environment variables (prefixed `VITE_`) can be documented in `.env.example`.

## Deployment (GitHub Pages)

The app is a static site and is configured to deploy to GitHub Pages at:

```
https://soloisthart.github.io/Hart-Portfolio-v2/
```

> GitHub Pages serves project sites under `/<repo>/`, so production builds use
> `base: /Hart-Portfolio-v2/` (see `vite.config.ts`). Override with the
> `BASE_PATH` env var for a custom domain or different repo name.

Two ways to publish:

- **Automatic (recommended):** push/merge to `main`. The workflow in
  `.github/workflows/deploy.yml` builds and publishes to Pages on every push to
  the default branch.
- **Prebuilt branch (no CI needed):** the `cursor/gh-pages-143a` branch contains
  a ready-to-serve build. In **Settings → Pages**, choose
  **Deploy from a branch → `cursor/gh-pages-143a` → `/ (root)`**.

> Note: Pages requires the repository to be **public** (free plan) or a paid
> plan for private repos.

## Project layout

- `src/data/journey.ts` — all narrative content (edit the story here).
- `src/components/chapters/` — the five narrative chapters.
- `src/three/` — the 3D scene, shaders, and network geometry.
- `src/store/scroll.ts`, `src/hooks/` — scroll progress and device-capability handling.

See `docs/agent-context.md` and `AGENTS.md` for architecture and contributor notes.
