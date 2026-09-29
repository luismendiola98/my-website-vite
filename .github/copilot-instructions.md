# Copilot Instructions

This portfolio is being migrated from Vite + React to Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Check the current files and `package.json` before assuming the migration is complete; existing Vite-era code may remain.

- For migration work, use the Next.js App Router and TypeScript. Prefer Server Components; add `"use client"` only when browser APIs, state, effects, or event handlers require it.
- Use Tailwind CSS and the repository's configured shadcn/ui components for migrated UI. Treat existing MUI and React Router code as legacy; do not extend those patterns in migrated areas.
- Preserve existing portfolio routes, content, metadata, accessibility, and dark-mode behavior as they are migrated. Keep changes scoped and avoid removing legacy files or dependencies unless the migration task requires it.
- Inspect the established app directory (`app/` or `src/app/`), Tailwind configuration, and `components.json` before choosing file locations or syntax.
- Check `package.json` and the lockfile before running commands or adding dependencies; use the configured scripts and package manager.

See [AGENTS.md](../AGENTS.md) for the project architecture, conventions, and validation guidance.
