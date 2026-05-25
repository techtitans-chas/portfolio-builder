# portfolio-builder

A fullstack TypeScript monorepo with a Nuxt frontend, Hono backend, and shared types/schemas.

## Workspaces

| Package    | Description                             |
| ---------- | --------------------------------------- |
| `frontend` | Nuxt 4 app with Nuxt UI                 |
| `backend`  | Hono API on Node.js                     |
| `shared`   | Shared Zod schemas and TypeScript types |

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
