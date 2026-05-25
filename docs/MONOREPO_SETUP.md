# Portfolio Builder Monorepo

A full-stack monorepo with Hono backend and Nuxt frontend, configured for concurrent development.

## Tech Stack

- **Backend**: [Hono](https://hono.dev) with TypeScript
- **Frontend**: [Nuxt 4](https://nuxt.com) with [Nuxt UI](https://ui.nuxt.com)
- **Shared**: Zod schemas and TypeScript types
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Validation**: Zod
- **Workspace Manager**: pnpm workspaces

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

- Node.js 18+ (LTS recommended)
- pnpm 9+

### Installation

Install all dependencies from the root directory:

```bash
pnpm install
```

This will install dependencies for all workspaces (backend, frontend, shared).

### Development

Start both backend and frontend servers concurrently:

```bash
pnpm dev
```

This command will:

- Start the **Backend** on `http://localhost:3001`
- Start the **Frontend** on `http://localhost:3000`

The frontend will automatically fetch the health status from the backend every 30 seconds.

### Building

Build all packages:

```bash
pnpm build
```

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

Create a `.env.local` file in the `frontend` directory (or set `NUXT_PUBLIC_API_URL`):

```env
NUXT_PUBLIC_API_URL=http://localhost:3001
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

If port 3001 or 3000 is already in use:

**Backend** (change port in `backend/src/index.ts`):

```typescript
const port = 3002; // Change to different port
```

**Frontend** (pass port when running):

```bash
pnpm --filter frontend dev -- -p 3001
```

### CORS errors

Ensure the frontend's `NUXT_PUBLIC_API_URL` environment variable matches your backend URL.

### Type issues with Shared package

Make sure all workspace dependencies are properly installed:

```bash
pnpm install
```
