# Deployment Guide (Netcup Plesk)

This project deploys to **Netcup webhost 4000** — a shared **Plesk** host with **no Docker**. The two Node apps (Hono backend + Nuxt SSR frontend) run under Plesk's Node.js (Phusion Passenger), each on its own subdomain, both pulling from the **same Git repo** via Plesk Git deployment. The database is the **MySQL 8** instance included with the package.

Because the host can't build a pnpm monorepo (no Docker, awkward `workspace:*` resolution, limited memory), **build artifacts are committed to a dedicated `deploy` branch** and the server only runs `node`.

---

## Architecture overview

```
Local / CI:  pnpm build  ──►  frontend/.output  +  backend/dist (esbuild bundle)
                              │
                              ▼  committed to the `deploy` branch
Plesk Git deployment (tracks `deploy`)
  ├── app.<domain>  → Application Root: frontend, startup: .output/server/index.mjs   (Nuxt SSR)
  └── api.<domain>  → Application Root: backend/dist, startup: server.js              (Hono API)
                              │
                              ▼
                       MySQL 8 (utf8mb4)   ← included with Netcup package
```

The backend is bundled with esbuild into a single `dist/server.js` (see [`backend/build.mjs`](../backend/build.mjs)). Only the **native** modules `sharp` and `mysql2` are left external — they ship platform-specific binaries that must be installed on the Linux server, not bundled from a dev machine.

---

## ⚠️ Critical: the database MUST be utf8mb4

The Netcup MySQL server defaults to `latin1`/`cp1252`. If the database is created with that charset, emoji and many non-ASCII characters (`åäö`, etc.) in portfolio content will be **corrupted**. The connection already forces `utf8mb4` (see [`backend/src/db/client.ts`](../backend/src/db/client.ts)), but the **database itself** must also be utf8mb4.

In phpMyAdmin (or Plesk → Databases) run once, before migrating:

```sql
ALTER DATABASE `your_db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## One-time setup

### 1. Create the two subdomains in Plesk

Create `app.<domain>` (or use the apex domain) for the frontend and `api.<domain>` for the backend.

### 2. Configure Git deployment (per subdomain)

For **each** subdomain: Plesk → **Git** → add this repository, set the deployed branch to **`deploy`**, and enable automatic deployment on push if desired. Both subdomains point at the same repo/branch.

### 3. Configure Node.js (per subdomain)

Plesk → **Node.js** for each subdomain:

| Field                     | Frontend (`app.`)            | Backend (`api.`)   |
| ------------------------- | ---------------------------- | ------------------ |
| **Application Root**      | `frontend`                   | `backend/dist`     |
| **Application Startup File** | `.output/server/index.mjs` | `server.js`        |
| **Run Node.js commands**  | _(none — `.output` is self-contained)_ | `npm install --omit=dev` (see step 6) |

> The startup files don't exist in the repo until you build — they're committed artifacts (step 5). `.output` is a hidden folder.

### 4. Set environment variables (per subdomain)

Plesk → Node.js → **Custom environment variables**.

Generate the auth secret locally: `openssl rand -base64 32`

**Backend (`api.`):**

| Variable               | Value                                                       |
| ---------------------- | ----------------------------------------------------------- |
| `DATABASE_URL`         | `mysql://user:pass@host:3306/dbname` (from Plesk Databases) |
| `BETTER_AUTH_SECRET`   | output of `openssl rand -base64 32`                         |
| `BETTER_AUTH_URL`      | `https://api.<domain>`                                      |
| `FRONTEND_URL`         | `https://app.<domain>`                                      |
| `RESEND_API_KEY`       | Resend key (blank to disable email)                         |
| `R2_ACCOUNT_ID`        | Cloudflare account ID (blank to disable uploads)            |
| `R2_ACCESS_KEY_ID`     | R2 access key                                               |
| `R2_SECRET_ACCESS_KEY` | R2 secret key                                               |
| `R2_BUCKET_NAME`       | R2 bucket name                                              |
| `R2_PUBLIC_URL`        | e.g. `https://pub-abc123.r2.dev`                            |

**Frontend (`app.`):**

| Variable              | Value                                                  |
| --------------------- | ------------------------------------------------------ |
| `NUXT_PUBLIC_API_URL` | `https://api.<domain>` (used by the browser)           |
| `NUXT_API_URL`        | `https://api.<domain>` (used by SSR; no internal network on Plesk, so same URL) |
| `FRONTEND_URL`        | `https://app.<domain>`                                 |
| `NUXT_HOST`           | `0.0.0.0`                                               |

### 5. Build artifacts and commit them to `deploy`

On your machine (or in CI), with Node 22 + pnpm 11.1.3:

```bash
pnpm install
pnpm --filter @portfolio-builder/shared build
NUXT_PUBLIC_API_URL=https://api.<domain> \
  NUXT_API_URL=https://api.<domain> \
  FRONTEND_URL=https://app.<domain> \
  NUXT_PRERENDER=true \
  NODE_OPTIONS=--max-old-space-size=4096 \
  pnpm --filter frontend build        # → frontend/.output
pnpm --filter backend build           # → backend/dist/server.js + backend/dist/package.json
```

On the `deploy` branch, `dist/` and `.output/` are **not** gitignored (they are on `main`). Commit them:

```bash
git checkout deploy
git merge main                       # bring in source changes
# rebuild as above, then:
git add -f frontend/.output backend/dist
git commit -m "build: deploy artifacts"
git push                             # Plesk pulls and restarts both apps
```

### 6. Native modules on the server (`sharp` + `mysql2`)

The backend bundle externalizes `sharp` and `mysql2`; the build emits a minimal `backend/dist/package.json` listing only those two. The server needs their **Linux-x64** binaries.

**Preferred** — let Plesk install them. In the backend subdomain's **Run Node.js commands**, run (from the Application Root `backend/dist`):

```
npm install --omit=dev
```

**Fallback** — if the Plesk hook can't run `npm install` (no npm / no outbound access): install the Linux binaries on a matching Linux x64 environment and commit `backend/dist/node_modules` to the `deploy` branch as well (`git add -f backend/dist/node_modules`). Do **not** commit macOS binaries — they won't run on the server.

> **Verify which path applies before relying on it:** test whether the "Run Node.js commands" field can run `npm install` on your Netcup plan.

### 7. Run database migrations

> Migrations are **not** run on Plesk (Plesk has `npm` but no `pnpm`, and no project tooling). They run either from your own machine or directly through phpMyAdmin. Pick the route that matches your DB access.

**Which route?** Check the DB host in Plesk → Databases. A `localhost` / `127.0.0.1` / private `10.x.x.x` host means external connections are off → use Route A. A public hostname/IP means Route B may work.

**Route A — phpMyAdmin (no tooling, always works):**

1. phpMyAdmin → select your database → **SQL** tab → run the `utf8mb4` `ALTER DATABASE` (see the utf8mb4 section above) **first**.
2. → **Import** tab → upload [`backend/migrations/0000_nebulous_layla_miller.sql`](../backend/migrations/) → **Go**. This creates all 11 tables.
3. Seeding uses Node, so it only works with an external connection (Route B). Otherwise skip it and let the app create data.

**Route B — from your machine (only if the DB is reachable externally):**

```bash
DATABASE_URL="mysql://user:pass@host:3306/dbname" pnpm db:migrate
DATABASE_URL="mysql://user:pass@host:3306/dbname" pnpm db:seed   # optional
```

> Note: the migration filename above may differ if the schema is regenerated — use the latest `.sql` file in [`backend/migrations/`](../backend/migrations/).

### 8. First deploy

Push the `deploy` branch (step 5). Plesk pulls and restarts both apps. Then:

```
https://api.<domain>/api/health   →  {"status":"healthy","db":"connected"}
https://app.<domain>/             →  the SSR frontend, fetching from the API
```

---

## Subsequent deploys

1. Merge/develop on `main`.
2. Check out `deploy`, merge `main`, rebuild artifacts (step 5), commit, push.
3. New DB migrations: `DATABASE_URL=… pnpm db:migrate` against the Netcup database.

A small helper script can automate the build-and-commit; until then the steps above are the source of truth.

---

## Local development

Unchanged — local dev still uses Postgres-or-MySQL via your `.env`:

```bash
pnpm install
cp .env.example .env     # fill in DATABASE_URL etc.
pnpm db:migrate
pnpm db:seed             # optional
pnpm dev                 # frontend :3000, backend :3111
```

For a local MySQL matching production:

```bash
docker run -d --name pb-mysql -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=portfolio_builder -e MYSQL_USER=pb -e MYSQL_PASSWORD=pbpw \
  -p 3307:3306 mysql:8.0 \
  --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
# DATABASE_URL="mysql://pb:pbpw@127.0.0.1:3307/portfolio_builder"
```

---

## Notes on the migration from Render/Postgres

- The database moved from **PostgreSQL to MySQL 8**. Schema uses `varchar(36)` UUID primary keys (generated app-side via `crypto.randomUUID()`), `json` columns, `datetime` timestamps, and `bigint` byte counters. better-auth runs with `provider: 'mysql'` and keeps `varchar(255)` ids.
- MySQL has no `RETURNING`; insert/update/delete endpoints generate the id app-side (or re-select) to return the affected row.
- The old Docker/Render path (`Dockerfile.*`, `render.yaml`, the Docker jobs in CI) is no longer used for Netcup. The Dockerfiles still work for local `docker-compose` if desired.
