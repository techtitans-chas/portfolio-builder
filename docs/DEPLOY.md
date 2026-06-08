# Deployment Guide

This project deploys as two Docker-based web services (backend + frontend) plus a managed PostgreSQL database on [Render](https://render.com). Images are built by GitHub Actions on every push to `main`, published to [Docker Hub](https://hub.docker.com), and then pulled by Render — Render never builds the images itself.

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
       ├── docker-backend ──► builds Dockerfile.backend
       │                  ──► pushes to Docker Hub: <you>/portfolio-builder-backend:<sha>
       │                  ──► Render deploy hook (imgURL=<sha>) ──► portfolio-builder-backend
       └── docker-frontend ─► builds Dockerfile.frontend
                          ──► pushes to Docker Hub: <you>/portfolio-builder-frontend:<sha>
                          ──► Render deploy hook (imgURL=<sha>) ──► portfolio-builder-frontend

Render
  ├── portfolio-builder-backend  (Hono API, port 3111) — pulls prebuilt image from Docker Hub
  ├── portfolio-builder-frontend (Nuxt SSR, port 3000) — pulls prebuilt image from Docker Hub
  └── portfolio-builder-db       (PostgreSQL 17, managed)
```

---

## One-time setup

### 1. Create a Docker Hub account and repositories

1. Sign up or log in at [hub.docker.com](https://hub.docker.com)
2. Create two **public** repositories:
   - `<your-username>/portfolio-builder-backend`
   - `<your-username>/portfolio-builder-frontend`
3. Generate an access token: **Account Settings → Security → New Access Token**
   - Scope: **Read & Write**
   - Save the token — you'll need it for GitHub secrets

---

### 2. Update `render.yaml` with your Docker Hub username

Open `render.yaml` and replace both occurrences of `DOCKER_USERNAME` with your actual Docker Hub username:

```yaml
image:
  url: docker.io/your-actual-username/portfolio-builder-backend:latest
```

```yaml
image:
  url: docker.io/your-actual-username/portfolio-builder-frontend:latest
```

Commit and push this change.

---

### 3. Add GitHub repository secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**.

Add all of the following:

| Secret                        | Value                                                         |
| ----------------------------- | ------------------------------------------------------------- |
| `DOCKER_USERNAME`             | Your Docker Hub username                                      |
| `DOCKER_PASSWORD`             | The access token you generated (not your password)            |
| `RENDER_DEPLOY_HOOK_BACKEND`  | Deploy hook URL from the Render backend service (see step 5)  |
| `RENDER_DEPLOY_HOOK_FRONTEND` | Deploy hook URL from the Render frontend service (see step 5) |

---

### 4. Connect the repository to Render via Blueprint

1. In the Render dashboard, click **New** (or **Create new service**) and choose **Blueprint**
2. Connect your GitHub account and select this repository
3. Render detects `render.yaml` and previews three resources:
   - `portfolio-builder-db` — PostgreSQL 17 managed database
   - `portfolio-builder-backend` — Hono API (pulls from Docker Hub)
   - `portfolio-builder-frontend` — Nuxt SSR (pulls from Docker Hub)
4. Click **Apply** — resources are created but services won't be healthy yet (Docker images haven't been pushed yet and env vars are still missing)

---

### 5. Get Render deploy hook URLs

For each web service (backend and frontend):

1. Go to the service in the Render dashboard
2. Navigate to **Settings → Deploy Hook**
3. Copy the hook URL and save it as the corresponding GitHub secret (`RENDER_DEPLOY_HOOK_BACKEND` / `RENDER_DEPLOY_HOOK_FRONTEND`)

---

### 6. Generate required secrets

```bash
# Generate BETTER_AUTH_SECRET (run locally)
openssl rand -base64 32
```

---

### 7. Set environment variables in Render

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

### 8. Run database migrations

Once the backend service is running, apply migrations using the external database URL.

Get it from: Render database dashboard → **Connect → External Database URL**

```bash
DATABASE_URL="<external-connection-string>" pnpm db:migrate

# Optional: seed initial data
DATABASE_URL="<external-connection-string>" pnpm db:seed
```

---

### 9. Trigger the first deploy

Push any commit to `main` (or re-run the workflow manually in the **Actions** tab). GitHub Actions will:

1. Run lint, typecheck, and build checks in parallel
2. Build and push both Docker images to Docker Hub
3. Ping each Render deploy hook with the exact image SHA, triggering a pull and redeploy

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

Each service has its own dedicated Dockerfile at the repo root.

| Image               | Dockerfile            | Docker Hub tag                       |
| ------------------- | --------------------- | ------------------------------------ |
| Backend (Hono API)  | `Dockerfile.backend`  | `<you>/portfolio-builder-backend`    |
| Frontend (Nuxt SSR) | `Dockerfile.frontend` | `<you>/portfolio-builder-frontend`   |

Each push produces two tags:

- `:latest` — always points to the most recent build
- `:<git-sha>` — pinned to the exact commit, used by the deploy hook for precise rollout

The deploy hook URL includes an `imgURL` query parameter with the SHA tag, so Render always pulls the image that matches the commit that triggered the build — not whatever `:latest` happens to be at pull time.

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

Local dev is unaffected by the production Dockerfiles — `docker-compose.yml` overrides the CMD with dev-mode hot-reloading:

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
