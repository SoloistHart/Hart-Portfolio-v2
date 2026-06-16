# Agent Instructions

RhoHart is a story-driven, interactive portfolio (single continuous scroll narrative: Curiosity → Systems → Impact) built as a client-side single-page app.

## Current project context

- Project name: Hart-Portfolio-v2 (RhoHart portfolio)
- Framework/runtime: React 18 + TypeScript on Vite.
- Styling: TailwindCSS v3.
- 3D / motion: Three.js + @react-three/fiber + @react-three/drei (custom GLSL shaders), GSAP + ScrollTrigger.
- Package manager: npm (see `package-lock.json`).

## How to work in this repository

1. Story first, experience second, technology third — every feature must reinforce the Curiosity → Systems → Impact narrative.
2. Narrative content lives in `src/data/journey.ts`; the 3D scene lives in `src/three/`; chapters live in `src/components/chapters/`.
3. Update this file and `docs/agent-context.md` whenever project structure, setup commands, or verification commands change.
4. Avoid committing generated artifacts, dependency directories, local environment files, or secrets.
5. Prefer small, focused commits that explain the intent of each change.

## Expected setup and verification

```sh
# Install dependencies
npm install

# Run the app locally (Vite dev server on http://localhost:5173)
npm run dev

# Verify changes (type-check + production build, then lint)
npm run build
npm run lint
```

## Repository hygiene

- Use `.env.example` to document required environment variables without committing secret values.
- Keep README instructions user-facing and keep detailed agent/build context in `docs/agent-context.md`.
- Add or revise `.gitignore` entries when adopting new tools that create local output.

## Cursor Cloud specific instructions

- This is a client-side Vite + React SPA. Standard commands are in `package.json` (`dev`, `build`, `lint`, `typecheck`); the update script (`npm install`) already runs on startup, so dependencies are installed before each session.
- Run the app with `npm run dev` (Vite, host `0.0.0.0`, port `5173`). There is no backend, database, or required secret — everything renders in the browser.
- `npm run build` runs `tsc -b` first, so type errors fail the build. There is currently no automated test suite; verify changes with `npm run build` + `npm run lint` and manual browser testing.
- The 3D scene reads scroll progress from a plain singleton store (`src/store/scroll.ts`) inside `useFrame` to avoid per-frame React re-renders — do not convert scroll progress to React state in the render path.
- WebGL gotcha: the network uses raw GLSL in `src/three/NeuralNetwork.tsx`. Avoid GLSL reserved words (e.g. `active`) as identifiers, and keep `precision` consistent between vertex/fragment shaders for shared uniforms, or shaders silently fail to compile.
- Graceful degradation lives in `src/hooks/useDeviceCapability.ts`: low-power devices get a lighter scene and no-WebGL / reduced-motion users get a CSS-only static backdrop. Test responsive/reduced-motion paths when touching the scene.
- The build emits a >500 kB JS chunk (Three.js); the bundle-size warning is expected and non-blocking.
