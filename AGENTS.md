# AGENTS.md

## Project overview

This repository is a personal website/portfolio being migrated from Vite + React to Next.js, TypeScript, Tailwind CSS, and shadcn/ui. The checked-in application may still contain Vite-era code; inspect the current files and `package.json` before assuming the migration is complete.

## Key architecture

- Target routing uses the Next.js App Router under `app/` (or `src/app/` if that is the established layout); route segments and layouts replace React Router configuration.
- Keep reusable UI in the project's existing component directories. shadcn/ui components are local source files, commonly under `components/ui/`; follow `components.json` and existing conventions when adding them.
- Use Tailwind CSS utilities and the existing global stylesheet/configuration for styling. Avoid introducing new MUI components in migrated areas; treat existing MUI usage as legacy until migration work explicitly removes it.
- Preserve portfolio content and shared data from `src/setup/` when migrating, relocating it only as needed by the established Next.js structure.
- Static assets for hosting belong in `public/` unless the framework-specific usage calls for importing them.

## Working conventions

- Use TypeScript (`.ts`/`.tsx`) for new or migrated code and define useful types for component props and shared data; do not add `any` where a concrete type is practical.
- Prefer Next.js Server Components by default. Add the `"use client"` directive only for components that need client-side state/effects, event handlers, or browser APIs.
- Add pages and navigation using the App Router conventions; do not add React Router routes to migrated Next.js code.
- Use shadcn/ui and Tailwind patterns already present in the repository before introducing another component or styling system. Keep generated shadcn components editable and consistent with local conventions.
- Preserve dark-mode behavior during migration, replacing the Vite-era `localStorage` implementation with an approach compatible with the final Next.js rendering model where necessary.
- Keep the site lightweight and static-hosting/deployment friendly; verify framework and hosting constraints before adding server-only features or dependencies.

## Commands

- Check `package.json` before running commands because scripts may change during migration.
- Expected Next.js commands are `npm run dev`, `npm run build`, and `npm run lint`; run the configured typecheck script (often `npm run typecheck`) when available.
- Install dependencies with the repository's package manager and lockfile; do not switch package managers without a clear reason.

## Validation

Run the smallest relevant configured checks and report any unavailable gates:
- Run the lint script for TypeScript/TSX, routing, component, or styling changes.
- Run the production build to verify Next.js routes and server/client boundaries.
- Run the configured typecheck script when available; do not assume linting performs type checking.

## Notes for AI agents

- Inspect the actual tree and configuration before choosing `app/` versus `src/app/`, Tailwind version-specific syntax, or shadcn component paths.
- During migration, keep changes scoped and preserve existing portfolio routes, content, metadata, and accessibility behavior.
- Do not remove Vite-era code or dependencies as unrelated cleanup; remove them only as part of the requested migration and after confirming they are no longer used.
