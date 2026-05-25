# Portfolio Builder Monorepo

A full-stack monorepo with Hono backend and Nuxt frontend, configured for concurrent development.

## Tech Stack

- **Backend**: [Hono](https://hono.dev) with TypeScript
- **Frontend**: [Nuxt 4](https://nuxt.com) with [Nuxt UI](https://ui.nuxt.com)
- **Database**: PostgreSQL 17
- **Shared**: Zod schemas and TypeScript types
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Validation**: Zod
- **Workspace Manager**: pnpm workspaces
- **Containerization**: Docker + Docker Compose

## Project Structure

```
.
├── backend/             # Hono backend API
├── frontend/            # Nuxt frontend application
├── shared/              # Shared types and schemas (@portfolio-builder/shared)
├── package.json         # Root monorepo configuration
└── pnpm-workspace.yaml  # pnpm workspace configuration
```

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose (recommended)
- **Or** Node.js 18+ and pnpm 9+ for local development

---

### Docker (recommended)

Start all services — backend, frontend, and PostgreSQL — with a single command:

```bash
docker compose up
```

This will:

- Start **PostgreSQL** on port `5433` (mapped to avoid conflicts with a local Postgres on `5432`)
- Start the **Backend** on `http://localhost:3111` (waits for Postgres to be healthy)
- Start the **Frontend** on `http://localhost:3000` (waits for backend to be healthy)

Run in the background (detached):

```bash
docker compose up -d
```

Stop and remove containers:

```bash
docker compose down
```

Stop and remove containers **including the Postgres volume** (wipes data):

```bash
docker compose down -v
```

Rebuild images after code changes:

```bash
docker compose up --build
pnpm db:migrate

```

---

### Local Development (without Docker)

#### Installation

Install all dependencies from the root directory:

```bash
pnpm install
```

#### Development

Start both backend and frontend servers concurrently:

```bash
pnpm dev
```

This command will:

- Start the **Backend** on `http://localhost:3111`
- Start the **Frontend** on `http://localhost:3000`

> **Note:** You will need a running PostgreSQL instance and a valid `DATABASE_URL` in your `.env` file.

### Frontend Only

```bash
pnpm dev:frontend
```

### Backend Only

```bash
pnpm dev:backend
```

## Features

### Backend (`/backend`)

- **Hono API Framework**: Lightweight and performant
- **Health Endpoint**: `/health` - Returns backend status
- **CORS Enabled**: Configured for local frontend development
- **TypeScript**: Full type safety
- **Runtime**: Node.js via `@hono/node-server`, using `tsx` for development

### Frontend (`/frontend`)

- **Nuxt 4**: Modern Vue 3 framework
- **Nuxt UI**: Pre-built component library
- **Health Status Display**: Shows backend connection status
- **Pinia**: State management
- **Tailwind CSS**: Utility-first styling
- **Type-safe API client**: Composable-based API calls

### Shared (`/shared`)

- **Package name**: `@portfolio-builder/shared`
- **Schemas**: Zod validation schemas — import from `@portfolio-builder/shared/schemas`
- **Types**: TypeScript type definitions — import from `@portfolio-builder/shared/types`

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

```bash
cp .env.example .env
```

Key variables:

| Variable              | Default                 | Description            |
| --------------------- | ----------------------- | ---------------------- |
| `POSTGRES_USER`       | `postgres`              | Postgres username      |
| `POSTGRES_PASSWORD`   | `postgres`              | Postgres password      |
| `POSTGRES_DB`         | `portfolio_builder`     | Database name          |
| `PORT`                | `3111`                  | Backend port           |
| `NUXT_PUBLIC_API_URL` | `http://localhost:3111` | Frontend → backend URL |

## Database

### Migrations

Run migrations after first setup or after `docker compose down -v` (which wipes the database volume):

```bash
pnpm db:migrate
```

### Seeding

Seed the database with two pre-verified user accounts for development:

```bash
pnpm db:seed
```

| Name | Email | Password | Portfolio slug |
|---|---|---|---|
| Martin Södersten | martin.sodersten@chasacademy.se | Martin1234! | martin |
| Ida Öhlén | ida-alexandra.ohlen@chasacademy.se | Ida1234! | ida |

Both accounts are created with email already verified, so you can log in immediately without going through the email flow. Re-running the seed is safe — existing users are skipped.

To fully reset and reseed:

```bash
docker exec portfolio-builder-postgres-1 psql -U postgres -d portfolio_builder -c "DELETE FROM users;"
pnpm --filter backend db:seed
```

## API Endpoints

### Health Check

**GET** `/health`

Response:

```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "service": "portfolio-builder-backend",
  "version": "0.1.0"
}
```

## Troubleshooting

### Port already in use

The Docker Postgres is exposed on host port `5433` (not `5432`) to avoid conflicts with a locally installed Postgres. The backend container always connects on `5432` internally, so no config change is needed there.

If port `3111` or `3000` is already in use, override via `.env`:

```env
PORT=3112
```

Or stop the conflicting process and retry.

### CORS errors

Ensure `NUXT_PUBLIC_API_URL` matches your backend URL (host and port).

### Type issues with Shared package

Make sure all workspace dependencies are properly installed:

```bash
pnpm install
```
