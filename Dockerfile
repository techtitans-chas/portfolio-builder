FROM node:22-alpine AS base

RUN apk upgrade --no-cache && corepack enable && corepack prepare pnpm@11.1.3 --activate

WORKDIR /app

COPY .npmrc pnpm-workspace.yaml pnpm-lock.yaml package.json tsconfig.base.json ./
COPY shared/package.json ./shared/
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
# nuxt prepare (postinstall hook) needs nuxt.config.ts to exist at install time
COPY frontend/nuxt.config.ts ./frontend/

RUN pnpm install --frozen-lockfile

# ── Backend target ────────────────────────────────────────────────────────────
FROM base AS backend
COPY shared/ ./shared/
COPY backend/ ./backend/
RUN pnpm --filter backend build
EXPOSE 3111
CMD ["node", "./backend/dist/server.js"]

# ── Frontend target ───────────────────────────────────────────────────────────
FROM base AS frontend
COPY shared/ ./shared/
COPY frontend/ ./frontend/
ENV NUXT_HOST=0.0.0.0
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV NUXT_PRERENDER=true
RUN pnpm --filter frontend build
EXPOSE 3000
CMD ["node", "./frontend/.output/server/index.mjs"]
