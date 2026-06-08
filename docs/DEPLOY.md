# Deployment Guide (Netcup Plesk)

This project deploys to **Netcup webhost** — a shared **Plesk** host with **no Docker**. The two Node apps (Hono backend + Nuxt SSR frontend) run under Plesk's Node.js (Phusion Passenger), each on its own subdomain, both pulling from the **same Git repo** via Plesk Git deployment. The database is the **MySQL 8** instance included with the package.

Because the host can't build a pnpm monorepo (no Docker, awkward `workspace:*` resolution, limited memory), **build artifacts are committed to the `deploy` branch** and the server only runs `node`.

---

## Architecture overview

```
Local / CI:  pnpm build  ──►  frontend/.output  +  backend/dist (esbuild bundle)
                              │
                              ▼  committed to the `deploy` branch
Plesk Git deployment (tracks `deploy`)
  ├── <FRONTEND URL>   → Application Root: frontend,      Startup: .output/server/index.mjs
  └── <BACKEND URL> → Application Root: backend/dist, Startup: server.js
                              │
                              ▼
                       MySQL 8 (utf8mb4)   ← included with Netcup package
                       Database: <DBNAME>
```

The backend is bundled with esbuild into a single `dist/server.js` (see [`backend/build.mjs`](../backend/build.mjs)). Only the **native** modules `sharp` and `mysql2` are left external — they ship platform-specific binaries that must be installed on the Linux server.

---

## ⚠️ Critical: the database MUST be utf8mb4

The Netcup MySQL server defaults to `latin1`/`cp1252`. If the database is created with that charset, emoji and many non-ASCII characters (`åäö`, etc.) in portfolio content will be **corrupted**. The connection already forces `utf8mb4` (see [`backend/src/db/client.ts`](../backend/src/db/client.ts)), but the **database itself** must also be utf8mb4.

In phpMyAdmin run once, before migrating:

```sql
ALTER DATABASE `<DBNAME>` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## ⚠️ Critical: DATABASE_URL special characters

If the database password contains special characters (e.g. `#` or `&`), they **must** be percent-encoded in the `DATABASE_URL`:

- `#` → `%23`
- `&` → `%26`
- `@` → `%40`

Example: `mysql://user:p%23ssw%26rd@host:3306/dbname`

---

## One-time setup

### 1. Subdomains in Plesk

Both subdomains already exist:
— frontend
— backend

### 2. Git deployment (per subdomain)

Plesk → **Git** → repository URL, branch **`deploy`**. Both subdomains point at the same repo and branch.

### 3. Node.js configuration (per subdomain)

Plesk → **Node.js** for each subdomain:

| Field                        | Frontend                   | Backend                  |
| ---------------------------- | -------------------------- | ------------------------ |
| **Node.js version**          | 22                         | 22                       |
| **Application Root**         | `frontend`                 | `backend/dist`           |
| **Application Startup File** | `.output/server/index.mjs` | `server.js`              |
| **Document Root**            | `frontend/.output/public`  | `backend/dist/public`    |
| **Run Node.js commands**     | _(leave empty)_            | `npm install --omit=dev` |

> `.output` and `dist/` are not in the repo on `main` but **are** committed on `deploy`. Plesk finds them after pulling.
>
> The frontend `.output` is fully self-contained — no npm install needed.

### 4. Environment variables (per subdomain)

Plesk → Node.js → **Custom environment variables**.

Generate the auth secret: `openssl rand -base64 32`

**Backend:**

| Variable               | Value                                                                           |
| ---------------------- | ------------------------------------------------------------------------------- |
| `DATABASE_URL`         | `mysql://user:pass@host:3306/dbname` (percent-encode special chars in password) |
| `BETTER_AUTH_SECRET`   | output of `openssl rand -base64 32`                                             |
| `BETTER_AUTH_URL`      | `<BACKEND URL>`                                                                 |
| `FRONTEND_URL`         | `<FRONTEND URL>`                                                                |
| `RESEND_API_KEY`       | Resend API key (omit to disable email)                                          |
| `R2_ACCOUNT_ID`        | Cloudflare account ID (omit to disable uploads)                                 |
| `R2_ACCESS_KEY_ID`     | R2 access key                                                                   |
| `R2_SECRET_ACCESS_KEY` | R2 secret key                                                                   |
| `R2_BUCKET_NAME`       | R2 bucket name                                                                  |
| `R2_PUBLIC_URL`        | e.g. `https://pub-abc123.r2.dev`                                                |

**Frontend:**

| Variable              | Value            |
| --------------------- | ---------------- |
| `NUXT_PUBLIC_API_URL` | `<BACKEND URL>`  |
| `NUXT_API_URL`        | `<BACKEND URL>`  |
| `FRONTEND_URL`        | `<FRONTEND URL>` |
| `NUXT_HOST`           | `0.0.0.0`        |

> `NUXT_PUBLIC_API_URL` and `NUXT_API_URL` are **baked into the frontend bundle at build time**. Changing them in Plesk after building has no effect — you must rebuild and push.

### 5. Build and commit artifacts

On your machine with Node 22 + pnpm:

```bash
pnpm install
pnpm --filter @portfolio-builder/shared build   # shared package must build first

pnpm build:backend    # → backend/dist/server.js + backend/dist/package.json
pnpm build:frontend   # → frontend/.output (production URLs baked in)
```

The `build:frontend` script in the root `package.json` already includes the correct production env vars. Do not use the plain `pnpm --filter frontend build` for deploys — it will bake in `localhost` URLs.

Then commit to the `deploy` branch:

```bash
git checkout deploy
git merge main                         # bring in source changes
pnpm --filter @portfolio-builder/shared build
pnpm build:backend
pnpm build:frontend
git add backend/dist frontend/.output
git commit -m "build: deploy artifacts"
git push
```

### 6. Native modules on the server (`sharp` + `mysql2`)

The backend bundle externalizes `sharp` and `mysql2`. A minimal `backend/dist/package.json` listing only those two is committed alongside `server.js`.

In the backend subdomain's Plesk **Run Node.js commands** field, set:

```
npm install --omit=dev
```

This runs from the Application Root (`backend/dist`) and installs the Linux-x64 binaries. Run it once after first deploy, and again any time `sharp` or `mysql2` versions change.

### 7. Run database migrations

Migrations are run from your local machine (Plesk has no pnpm):

```bash
DATABASE_URL="mysql://user:pass@host:3306/<database>" pnpm db:migrate
```

**Alternatively via phpMyAdmin:**

1. Run the `ALTER DATABASE` utf8mb4 statement (see above) first.
2. phpMyAdmin → select database → **Import** → upload the `.sql` file from [`backend/migrations/`](../backend/migrations/).

> If the migration SQL contains Drizzle breakpoint markers (`--> statement-breakpoint`), remove them before importing in phpMyAdmin — it does not understand them.

### 8. First deploy checklist

After pushing the `deploy` branch and configuring both apps:

1. Backend: pull → click **npm install** button → restart
2. Frontend: pull → restart (no npm install)
3. Check `<BACKEND URL>/api/health` → `{"status":"healthy","db":"connected"}`
4. Check `<FRONTEND URL>` → SSR frontend loads

---

## Subsequent deploys

### Backend only (source change, no frontend change):

```bash
git checkout deploy
git merge main
pnpm build:backend
git add backend/dist
git commit -m "build: backend"
git push
```

Then on Plesk: backend subdomain → pull → restart. No npm install needed unless `sharp`/`mysql2` versions changed.

### Frontend only:

```bash
git checkout deploy
git merge main
pnpm --filter @portfolio-builder/shared build
pnpm build:frontend
git add frontend/.output
git commit -m "build: frontend"
git push
```

Then on Plesk: frontend subdomain → pull → restart.

### Both:

```bash
git checkout deploy
git merge main
pnpm --filter @portfolio-builder/shared build
pnpm build:backend
pnpm build:frontend
git add backend/dist frontend/.output
git commit -m "build: deploy artifacts"
git push
```

### New database migrations:

```bash
DATABASE_URL="mysql://user:pass@host:3306/dbname" pnpm db:migrate
```

---

## Local development

```bash
pnpm install
cp .env.example .env     # fill in DATABASE_URL etc.
pnpm db:migrate
pnpm db:seed             # optional
pnpm dev                 # frontend :3000, backend :3111
```

For a local MySQL matching production:

```bash
docker run -d --name pb-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=portfolio_builder \
  -e MYSQL_USER=pb \
  -e MYSQL_PASSWORD=pbpw \
  -p 3307:3306 mysql:8.0 \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci
# DATABASE_URL="mysql://pb:pbpw@127.0.0.1:3307/portfolio_builder"
```

---

## Notes

- **Session cookies** are set with `Domain=.<DOMAIN>.com`, `SameSite=None`, `Secure` so they work across `starta.` and `starta-api.` subdomains. The Nuxt SSR server forwards the cookie to the backend via `useRequestHeaders(['cookie'])` in the auth middleware.
- **The `deploy` branch** has `frontend/.output/` and `backend/dist/` un-gitignored (`.gitignore` on that branch carves them out). The `main` branch gitignores them as usual.
- **Phusion Passenger** injects `PORT` at runtime. The backend reads `process.env.PORT` and passes it to `serve()`.
- The old Docker path (`Dockerfile.*`) is not used for Netcup, but the Dockerfiles still work for local `docker-compose` if desired.
