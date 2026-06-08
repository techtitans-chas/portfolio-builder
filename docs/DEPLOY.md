# Deployment Guide

This project deploys as two Docker-based web services (backend + frontend) plus a managed PostgreSQL database on [Render](https://render.com). Images are built by GitHub Actions and published to [Docker Hub](https://hub.docker.com) on every push to `main`.

---

## Architecture overview

```
GitHub push to main
       │
       ▼
GitHub Actions (ci.yml)
  ├── lint & typecheck & build  (run on every PR and push)
  │
  └── on push to main only:
       ├── docker-backend ──► Docker Hub: <you>/portfolio-builder-backend
       │                              └──► Render deploy hook ──► portfolio-builder-backend
       └── docker-frontend ─► Docker Hub: <you>/portfolio-builder-frontend
                                      └──► Render deploy hook ──► portfolio-builder-frontend

Render
  ├── portfolio-builder-backend  (Hono API, port 3111)
  ├── portfolio-builder-frontend (Nuxt SSR, port 3000)
  └── portfolio-builder-db       (PostgreSQL 17, managed)
```

---

## One-time setup

### 1. Create a Docker Hub account and repositories

1. Sign up or log in at [hub.docker.com](https://hub.docker.com)
2. Create two **public** repositories (or private if you have a paid plan):
   - `<your-username>/portfolio-builder-backend`
   - `<your-username>/portfolio-builder-frontend`
3. Generate an access token: **Account Settings → Security → New Access Token**
   - Scope: **Read & Write**
   - Save the token — you'll need it for GitHub secrets

---

### 2. Add GitHub repository secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**.

Add all of the following:

| Secret                        | Value                                                         |
| ----------------------------- | ------------------------------------------------------------- |
| `DOCKER_USERNAME`             | Your Docker Hub username                                      |
| `DOCKER_PASSWORD`             | The access token you generated (not your password)            |
| `RENDER_DEPLOY_HOOK_BACKEND`  | Deploy hook URL from the Render backend service (see step 4)  |
| `RENDER_DEPLOY_HOOK_FRONTEND` | Deploy hook URL from the Render frontend service (see step 4) |

---

### 3. Connect the repository to Render

1. In the Render dashboard, click **New → Blueprint**
2. Connect your GitHub account and select this repository
3. Render detects `render.yaml` and previews three resources:
   - `portfolio-builder-db` — PostgreSQL 17 managed database
   - `portfolio-builder-backend` — Hono API (Docker)
   - `portfolio-builder-frontend` — Nuxt SSR (Docker)
4. Click **Apply** — resources are created but services won't be healthy yet (env vars and Docker images are still missing)

---

### 4. Get Render deploy hook URLs

For each web service (backend and frontend):

1. Go to the service in the Render dashboard
2. Navigate to **Settings → Deploy Hook**
3. Copy the hook URL and save it as the corresponding GitHub secret (`RENDER_DEPLOY_HOOK_BACKEND` / `RENDER_DEPLOY_HOOK_FRONTEND`)

---

### 5. Generate required secrets

```bash
# Generate BETTER_AUTH_SECRET (run locally)
openssl rand -base64 32
```

---

### 6. Set environment variables in Render

#### Backend service (`portfolio-builder-backend`)

**Settings → Environment** in the Render dashboard:

| Variable               | Value                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | Output from `openssl rand -base64 32`                                              |
| `BETTER_AUTH_URL`      | Your backend's Render URL, e.g. `https://portfolio-builder-backend.onrender.com`   |
| `FRONTEND_URL`         | Your frontend's Render URL, e.g. `https://portfolio-builder-frontend.onrender.com` |
| `RESEND_API_KEY`       | Your Resend API key (leave blank to disable email)                                 |
| `R2_ACCOUNT_ID`        | Cloudflare account ID (leave blank to disable file uploads)                        |
| `R2_ACCESS_KEY_ID`     | R2 access key                                                                      |
| `R2_SECRET_ACCESS_KEY` | R2 secret key                                                                      |
| `R2_BUCKET_NAME`       | Your R2 bucket name                                                                |
| `R2_PUBLIC_URL`        | Public bucket URL, e.g. `https://pub-abc123.r2.dev`                                |

> `DATABASE_URL` is automatically injected by Render from the managed database — no action needed.

#### Frontend service (`portfolio-builder-frontend`)

| Variable              | Value                                                                            |
| --------------------- | -------------------------------------------------------------------------------- |
| `NUXT_PUBLIC_API_URL` | Your backend's public URL, e.g. `https://portfolio-builder-backend.onrender.com` |
| `NUXT_API_URL`        | Same as above (on Render, SSR and client-side use the same URL)                  |
| `FRONTEND_URL`        | Your frontend's Render URL                                                       |

---

### 7. Run database migrations

Once the backend service is running, apply migrations using the external database URL.

Get it from: Render database dashboard → **Connect → External Database URL**

```bash
DATABASE_URL="<external-connection-string>" pnpm db:migrate

# Optional: seed initial data
DATABASE_URL="<external-connection-string>" pnpm db:seed
```

---

### 8. Trigger the first deploy

Push any commit to `main` (or re-run the workflow manually in the **Actions** tab). GitHub Actions will:

1. Run lint, typecheck, and build checks in parallel
2. Build and push both Docker images to Docker Hub
3. Ping the Render deploy hooks to trigger a redeploy of each service

Visit `https://<your-backend-url>/api/health` — it should return `{"status":"healthy"}` once the backend is up.

---

## CI/CD pipeline details

The pipeline is defined in [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).

### Triggers

| Event                         | Jobs that run                                                      |
| ----------------------------- | ------------------------------------------------------------------ |
| Pull request targeting `main` | `lint`, `typecheck`, `build`                                       |
| Push to `main`                | `lint`, `typecheck`, `build` → `docker-backend`, `docker-frontend` |

### Job flow

```
lint ──┐
       ├──► docker-backend  ──► push to Docker Hub ──► trigger Render backend
typecheck ─┤
       ├──► docker-frontend ──► push to Docker Hub ──► trigger Render frontend
build ─┘
```

The two Docker jobs run in parallel once all three check jobs pass. A failed lint or typecheck blocks the deploy.

### Docker images

Both images are built with `docker/build-push-action` using the multi-stage [`Dockerfile`](../Dockerfile) at the repo root.

| Image               | Docker Hub tag                     | Dockerfile target |
| ------------------- | ---------------------------------- | ----------------- |
| Backend (Hono API)  | `<you>/portfolio-builder-backend`  | `backend`         |
| Frontend (Nuxt SSR) | `<you>/portfolio-builder-frontend` | `frontend`        |

Each push produces two tags:

- `:latest` — always points to the most recent build
- `:<git-sha>` — pinned to the exact commit, useful for rollbacks

Registry-based layer caching (`buildcache` tag) is used to keep build times fast on repeat runs.

---

## Subsequent deploys

Every push to `main` automatically rebuilds and redeploys both services. No manual steps needed unless you add new database migrations.

For new migrations after a deploy:

```bash
DATABASE_URL="<external-connection-string>" pnpm db:migrate
```

---

## Local development (Docker)

Local dev is unaffected by the production Dockerfile — `docker-compose.yml` overrides the CMD with dev-mode hot-reloading:

```bash
cp .env.example .env        # fill in your local secrets
docker compose up --build
```

| Service    | URL                   |
| ---------- | --------------------- |
| Frontend   | http://localhost:3000 |
| Backend    | http://localhost:3111 |
| PostgreSQL | localhost:5433        |

```bash
pnpm db:migrate    # apply migrations to local DB
pnpm db:seed       # optional: seed initial data
```
