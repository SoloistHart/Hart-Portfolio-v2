# Agent Instructions

This repository is in its initial scaffold state. Treat the stack as undecided until project files are added.

## Current project context

- Project name: Hart-Portfolio-v2
- Current status: repository initialized with documentation and contributor scaffolding only.
- Framework/runtime: not selected yet.
- Package manager: not selected yet.

## How to work in this repository

1. Inspect the tree before making assumptions about the technology stack.
2. Keep new tooling aligned with the first real framework or runtime introduced.
3. Update this file and `docs/agent-context.md` whenever project structure, setup commands, or verification commands change.
4. Avoid committing generated artifacts, dependency directories, local environment files, or secrets.
5. Prefer small, focused commits that explain the intent of each change.

## Expected setup and verification

Until the application stack is chosen, there are no install, build, lint, or test commands.

When those commands are introduced, document them here using this format:

```sh
# Install dependencies
<command>

# Run the app locally
<command>

# Verify changes
<command>
```

## Repository hygiene

- Use `.env.example` to document required environment variables without committing secret values.
- Keep README instructions user-facing and keep detailed agent/build context in `docs/agent-context.md`.
- Add or revise `.gitignore` entries when adopting new tools that create local output.
