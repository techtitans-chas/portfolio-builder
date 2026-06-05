# portfolio-builder

[![CI](https://github.com/techtitans-chas/portfolio-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/techtitans-chas/portfolio-builder/actions/workflows/ci.yml)

A fullstack TypeScript monorepo with a Nuxt frontend, Hono backend, and shared types/schemas.

## Workspaces

| Package    | Description                             |
| ---------- | --------------------------------------- |
| `frontend` | Nuxt 4 app with Nuxt UI                 |
| `backend`  | Hono API on Node.js                     |
| `shared`   | Shared Zod schemas and TypeScript types |

## Environment setup

Copy the example file and fill in your values before starting any service:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | ✅ | Random secret — generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | ✅ | Public URL of the backend API |
| `FRONTEND_URL` | ✅ | Public URL of the frontend |
| `NUXT_PUBLIC_API_URL` | ✅ | Backend API URL used by the browser |
| `RESEND_API_KEY` | ☑️ optional | Enables email sending. Without it, email features are silently disabled. |
| `R2_*` | ☑️ optional | Cloudflare R2 credentials. Without them, file uploads are disabled and the media gallery shows only default images. |

Both services validate their env vars at startup and exit immediately with a clear error message if a required variable is missing.

## Development

```bash
pnpm install
pnpm dev          # starts both frontend and backend
pnpm dev:frontend
pnpm dev:backend
```

## Code quality

```bash
pnpm lint          # ESLint across the whole repo
pnpm lint:fix      # auto-fix ESLint issues
pnpm format        # Prettier format
pnpm format:check  # Prettier check (used in CI)
pnpm typecheck     # tsc --noEmit across all workspaces
```

## ESLint disable conventions

Suppress a rule for a **single line** only when there is a documented reason:

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- third-party callback types are untyped
function wrap(cb: any) { ... }
```

Suppress for an **entire file** only when the file is auto-generated or a legitimate boundary:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any -- generated file */
```

**Never** use a bare `// eslint-disable` without naming the specific rule and a reason.
