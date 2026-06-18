# Portfolio Builder — Local Development

A full-stack monorepo with a Hono backend and Nuxt frontend.

## Tech Stack

- **Backend**: [Hono](https://hono.dev) with TypeScript
- **Frontend**: [Nuxt 4](https://nuxt.com) with [Nuxt UI](https://ui.nuxt.com)
- **Database**: MySQL 8 (utf8mb4)
- **Shared**: Zod schemas and TypeScript types
- **Styling**: Tailwind CSS
- **Workspace Manager**: pnpm workspaces

## Project Structure

```
.
├── backend/             # Hono backend API
├── frontend/            # Nuxt frontend application
├── shared/              # Shared types and schemas (@portfolio-builder/shared)
├── docs/                # Documentation
├── package.json         # Root monorepo configuration
└── pnpm-workspace.yaml  # pnpm workspace configuration
```

---

## Docker (recommended)

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### Setup

```bash
cp .env.example .env
```

The only variable you **must** set manually is `BETTER_AUTH_SECRET`:

```bash
openssl rand -base64 32   # paste the output into .env
```

All other variables have working defaults for local development. See the env var table below for optional services (email, file uploads).

### Start

```bash
docker compose up
```

This builds the `base` image (Node 22 + pnpm, dependencies installed), then starts three services with source-mounted hot reload:

- **MySQL 8** on port `3307` (mapped to avoid conflicts with a local MySQL on `3306`)
- **Backend** on `http://localhost:3111` (waits for MySQL to be healthy)
- **Frontend** on `http://localhost:3000` (waits for backend to be healthy)

Run in the background:

```bash
docker compose up -d
```

### Migrations and seed

Run from the host — the commands connect to the MySQL container using `DATABASE_URL` from your `.env`:

```bash
pnpm db:migrate   # run after first start, and after any new migration
pnpm db:seed      # optional: creates two pre-verified dev accounts
```

Seed accounts:

| Name             | Email                              | Password    | Portfolio slug |
| ---------------- | ---------------------------------- | ----------- | -------------- |
| Martin Södersten | martin.sodersten@chasacademy.se    | Martin1234! | martin         |
| Ida Öhlén        | ida-alexandra.ohlen@chasacademy.se | Ida1234!    | ida            |

Re-running the seed is safe — existing users are skipped.

### Useful commands

```bash
docker compose down          # stop and remove containers
docker compose down -v       # also wipe the MySQL data volume
docker compose up --build    # rebuild the image after Dockerfile changes
```

> After `down -v`, run `pnpm db:migrate` (and optionally `pnpm db:seed`) again.

---

## Local Development (without Docker)

### Prerequisites

- Node.js 22+
- pnpm 9+
- A running MySQL 8 instance

### Setup

```bash
pnpm install
cp .env.example .env   # fill in DATABASE_URL and other required values
pnpm db:migrate
pnpm db:seed           # optional
pnpm dev               # frontend :3000 + backend :3111 concurrently
```

Individual services:

```bash
pnpm dev:frontend
pnpm dev:backend
```

---

## Environment Variables

| Variable              | Required    | Description                                                                                                         |
| --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`        | ✅          | MySQL connection string, e.g. `mysql://user:pass@127.0.0.1:3307/portfolio_builder`                                  |
| `BETTER_AUTH_SECRET`  | ✅          | Random secret — generate with `openssl rand -base64 32`                                                             |
| `BETTER_AUTH_URL`     | ✅          | Public URL of the backend API (e.g. `http://localhost:3111`)                                                        |
| `FRONTEND_URL`        | ✅          | Public URL of the frontend (e.g. `http://localhost:3000`)                                                           |
| `NUXT_PUBLIC_API_URL` | ✅          | Backend API URL used by the browser                                                                                 |
| `RESEND_API_KEY`      | ☑️ optional | Enables email sending. Without it, email features are silently disabled.                                            |
| `R2_*`                | ☑️ optional | Cloudflare R2 credentials. Without them, file uploads are disabled and the media gallery shows only default images. |

Both services validate their env vars at startup and exit immediately with a clear error message if a required variable is missing.

---

## Troubleshooting

### CORS errors

Ensure `NUXT_PUBLIC_API_URL` matches the backend URL (host and port).

### Type issues with the shared package

```bash
pnpm install
pnpm --filter @portfolio-builder/shared build
```
