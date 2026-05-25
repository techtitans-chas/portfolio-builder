FROM node:22-alpine AS base

RUN corepack enable && corepack prepare pnpm@11.1.3 --activate

WORKDIR /app

COPY .npmrc pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY shared/package.json ./shared/
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
# nuxt prepare (postinstall hook) needs nuxt.config.ts to exist at install time
COPY frontend/nuxt.config.ts ./frontend/

RUN pnpm install --frozen-lockfile

# ── Backend target ────────────────────────────────────────────────────────────
FROM base AS backend
EXPOSE 3111
CMD ["pnpm", "--filter", "backend", "dev"]

# ── Frontend target ───────────────────────────────────────────────────────────
FROM base AS frontend
COPY shared/ ./shared/
COPY frontend/ ./frontend/
ENV NUXT_HOST=0.0.0.0
EXPOSE 3000
CMD ["pnpm", "--filter", "frontend", "dev"]
