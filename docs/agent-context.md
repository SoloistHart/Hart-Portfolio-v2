# Agent Context

Durable context for the RhoHart portfolio. Update this file whenever structure, setup, or verification changes.

## Snapshot

- **Product:** RhoHart — a premium, story-driven, interactive portfolio. One continuous scroll tells the narrative **Curiosity → Systems → Impact**; it is an experience, not a project list.
- **Type:** Client-side single-page app (no backend, no database, no required secrets).
- **Stack:** React 18 + TypeScript + Vite, TailwindCSS v3, Three.js + @react-three/fiber + @react-three/drei (custom GLSL), GSAP + ScrollTrigger.
- **Package manager:** npm (`package-lock.json` committed).

## Project structure

| Path | Purpose |
| --- | --- |
| `src/main.tsx` / `src/App.tsx` | Entry point and page composition. |
| `src/data/journey.ts` | All narrative copy (hero, roles, projects, impact, future). Story lives here. |
| `src/components/chapters/` | The five narrative chapters (Curiosity, Learning, Systems, Impact, Future). |
| `src/components/` | Shared UI: `Reveal` (enter reveals), `AnimatedText` (word-by-word heading reveals), `Parallax` (scrubbed drift), `ProgressRail`, `Intro`. |
| `src/hooks/useSmoothScroll.ts` | Dependency-free iOS-style inertia scroll (desktop wheel only; off for touch/reduced-motion). |
| `src/three/` | 3D scene: `Scene` (canvas + orbit camera rig + static fallback), `Centerpiece` (morphing GLSL hero object), `NeuralNetwork` (ambient field), `buildNetwork` (geometry), `pointer` (shared pointer state). |
| `src/components/Cursor.tsx`, `Magnetic.tsx` | Desktop-only custom cursor + magnetic hovers (off on touch/reduced-motion). |
| `src/store/scroll.ts` | Framework-agnostic scroll-progress store read by the scene each frame. |
| `src/hooks/` | `useScrollProgress` (scroll → store) and `useDeviceCapability` (render tier). |

## Setup and verification commands

```sh
npm install        # install dependencies
npm run dev        # Vite dev server -> http://localhost:5173
npm run build      # tsc -b (type-check) + vite build
npm run lint       # eslint, zero warnings allowed
npm run typecheck  # type-check only
```

## Architecture notes

- **Scroll drives everything.** `useScrollProgress` writes normalized progress (0..1) into `scrollStore`; the 3D scene reads it inside `useFrame` (no React re-render). Chapter changes are the only thing that re-renders React from scroll.
- **The scene is the story.** The neural network grows left→right (nodes "born" by X position), edges carry data-flow pulses (strongest in the Systems stage), and color shifts cyan → indigo → orange across the journey. The camera pans across the network so it feels like travelling through an evolving system.
- **Graceful degradation.** `useDeviceCapability` picks `high` / `low` / `static` tiers. `static` (no WebGL or reduced-motion) renders a CSS-only backdrop so the story survives without 3D.
- **GLSL care.** Shaders are raw GLSL strings; avoid reserved words as identifiers and keep precision consistent between stages for shared uniforms.

## Verification log

| Area | Command | Notes |
| --- | --- | --- |
| Type-check + build | `npm run build` | Fails on TS errors; emits an expected >500 kB Three.js chunk. |
| Lint | `npm run lint` | Zero warnings allowed. |
| Manual | `npm run dev` | Scroll through all five chapters; confirm 3D renders and text stays legible. |
| Repository scaffold | `git status --short --branch` | Confirms branch state and changed files. |
