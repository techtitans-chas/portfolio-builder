# Deployment Guide (Docker)

This guide covers what's needed to deploy this project to any host that supports Docker Compose: a VPS, a cloud VM, etc. The app runs as three containers: MySQL 8, the Hono backend, and the Nuxt SSR frontend.

> **Note:** The codebase currently has some values hardcoded for the Netcup deployment. The sections below call out exactly what needs to change before deploying to a different domain.

---

## Required code changes

Before deploying to a new domain, two backend files need to be updated.

### `backend/src/lib/cors.ts`

The CORS allowlist has the production domain hardcoded alongside the env-var-driven entries. Replace the hardcoded URLs with your own, or better — make the list fully dynamic:

```ts
const allowed = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3111',
  'http://0.0.0.0:3000',
];
```

### `backend/src/lib/auth.ts`

Three hardcoded values need updating:

**1. `trustedOrigins`** — remove or replace the starlitepixels.com entries:

```ts
trustedOrigins: [
  process.env.BETTER_AUTH_URL ?? 'http://localhost:3111',
  process.env.FRONTEND_URL ?? 'http://localhost:3000',
  'http://0.0.0.0:3000',
],
```

**2. `crossSubDomainCookies.domain`** — set this to your domain, or read it from an env var. If frontend and backend are on the same domain (e.g. behind a reverse proxy), you can disable cross-subdomain cookies entirely:

```ts
crossSubDomainCookies: {
  enabled: process.env.NODE_ENV === 'production',
  domain: process.env.COOKIE_DOMAIN,   // e.g. '.yourdomain.com'
},
```

**3. Email `from` address** — update both `sendResetPassword` and `sendVerificationEmail` to use your own verified Resend sender domain:

```ts
from: 'Your App <noreply@yourdomain.com>',
```

---

## Architecture

```
Internet
  └── Reverse proxy (nginx / Caddy / Traefik)
        ├── yourdomain.com        → frontend container :3000
        └── api.yourdomain.com    → backend container  :3111
              └── MySQL container :3306 (internal only)
```

The containers talk to each other on an internal Docker network. Only the frontend and backend ports are exposed to the proxy; MySQL is never exposed to the internet.

---

## docker-compose.yml changes for production

The existing `docker-compose.yml` is set up for local development (source-mounted, hot reload). For production you'll want to:

1. **Use the production build targets** instead of `base`:

```yaml
backend:
  build:
    context: .
    target: backend # builds dist/server.js

frontend:
  build:
    context: .
    target: frontend # builds .output/
```

2. **Remove the source volume mounts** — in production the image should contain the built app, not mount your local source tree.

3. **Pass env vars via a `.env` file or your host's secret manager** rather than hardcoding them in the compose file.

4. **Don't expose MySQL externally** — remove or omit the `ports` entry on the `mysql` service; the backend reaches it via the internal network name `mysql`.

---

## Environment variables

Set these on the host (`.env` file or host secret manager):

**Backend:**

| Variable               | Description                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`         | `mysql://user:pass@mysql:3306/portfolio_builder` (use the internal service name `mysql`)              |
| `BETTER_AUTH_SECRET`   | Random secret — `openssl rand -base64 32`                                                             |
| `BETTER_AUTH_URL`      | Public URL of the backend, e.g. `https://api.yourdomain.com`                                          |
| `FRONTEND_URL`         | Public URL of the frontend, e.g. `https://yourdomain.com`                                             |
| `COOKIE_DOMAIN`        | Root domain for cross-subdomain cookies, e.g. `.yourdomain.com` (if using the env var approach above) |
| `RESEND_API_KEY`       | Resend API key (omit to disable email)                                                                |
| `R2_ACCOUNT_ID`        | Cloudflare R2 account ID (omit to disable uploads)                                                    |
| `R2_ACCESS_KEY_ID`     | R2 access key                                                                                         |
| `R2_SECRET_ACCESS_KEY` | R2 secret key                                                                                         |
| `R2_BUCKET_NAME`       | R2 bucket name                                                                                        |
| `R2_PUBLIC_URL`        | Public R2 URL, e.g. `https://pub-abc123.r2.dev`                                                       |

**Frontend:**

| Variable              | Description                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `NUXT_PUBLIC_API_URL` | Backend URL as seen by the **browser**, e.g. `https://api.yourdomain.com`                                |
| `NUXT_API_URL`        | Backend URL as seen by the **SSR server** — can be the internal service name, e.g. `http://backend:3111` |
| `FRONTEND_URL`        | Public URL of the frontend                                                                               |
| `NUXT_HOST`           | `0.0.0.0`                                                                                                |

> `NUXT_PUBLIC_API_URL` and `NUXT_API_URL` are baked into the frontend bundle at build time. If you change them you must rebuild the image.

---

## First deploy checklist

1. Apply the code changes above and rebuild the images
2. `docker compose up -d`
3. Run migrations: `docker compose exec backend pnpm db:migrate` (or connect externally with `DATABASE_URL`)
4. Confirm `https://api.yourdomain.com/api/health` returns `{"status":"healthy","db":"connected"}`
5. Confirm the frontend loads at `https://yourdomain.com`
