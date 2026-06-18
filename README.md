# portfolio-builder

[![CI](https://github.com/techtitans-chas/portfolio-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/techtitans-chas/portfolio-builder/actions/workflows/ci.yml)

A fullstack TypeScript monorepo project for a drag-and-drop portfolio site builder where users create a portfolio page using customizable content blocks.

## Workspaces

| Package    | Description                             |
| ---------- | --------------------------------------- |
| `frontend` | Nuxt 4 app with Nuxt UI                 |
| `backend`  | Hono API on Node.js                     |
| `shared`   | Shared Zod schemas and TypeScript types |

## Getting started

See the [docs/](docs/) folder:

- [docs/MONOREPO_SETUP.md](docs/MONOREPO_SETUP.md) — local development setup
- [docs/DEPLOY (Netcup).md](<docs/DEPLOY%20(Netcup).md>) — deploying to Netcup Plesk
- [docs/DEPLOY (Docker).md](<docs/DEPLOY%20(Docker).md>) — deploying with Docker Compose
- [docs/AUTHENTICATION.md](docs/AUTHENTICATION.md) — auth flow overview
- [docs/BLOCKS.md](docs/BLOCKS.md) — adding new page builder blocks

## Code quality

```bash
pnpm lint          # ESLint across the whole repo
pnpm lint:fix      # auto-fix ESLint issues
pnpm format        # Prettier format
pnpm format:check  # Prettier check (used in CI)
pnpm typecheck     # tsc --noEmit across all workspaces
```
