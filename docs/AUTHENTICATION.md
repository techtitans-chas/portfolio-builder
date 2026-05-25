# Authentication

Authentication is handled by [better-auth](https://better-auth.com/) on the backend, using email/password credentials with mandatory email verification.

## Environment variables

Add these to your root `.env` (see `.env.example`):

```bash
BETTER_AUTH_SECRET=   # Random secret — generate with: openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3111   # URL of the backend API
RESEND_API_KEY=       # API key from resend.com (free tier works)
FRONTEND_URL=http://localhost:3000
```

## How it works

### Registration

1. User submits the register form (`/register`) with name, email, password, and a portfolio URL slug.
2. The frontend sends `POST /api/auth/register` to the backend.
3. The backend validates the request using the shared Zod schema (`@portfolio-builder/shared/schemas`), checks for duplicate email and slug, then calls better-auth's `signUpEmail` to create the user.
4. better-auth hashes the password and stores the user in the `users` table.
5. better-auth sends a verification email via Resend. The link points to `GET /api/auth/verify-email?token=...&callbackURL=/verified`.
6. A `portfolios` record is created and linked to the new user.
7. The user lands on the `/verify-email` holding page until they click the link.

### Email verification

1. User clicks the link in the email.
2. better-auth validates the token, sets `email_verified = true` on the user, and redirects to `FRONTEND_URL/verified`.
3. The `/verified` page confirms success and links to `/login`.

If the email didn't arrive, the `/verify-email` page has a resend form that calls `POST /api/auth/send-verification-email`.

### Login

1. User submits the login form (`/login`).
2. The frontend sends `POST /api/auth/sign-in/email` directly to better-auth's built-in endpoint with `credentials: 'include'`.
3. better-auth validates credentials and sets an `httpOnly` session cookie.
4. On success the user is redirected to `/admin`.
5. On failure a generic "Invalid email or password" message is shown (no field enumeration).

### Logout

1. The "Logout" button in the admin layout sends `POST /api/auth/sign-out` with `credentials: 'include'`.
2. better-auth destroys the session server-side and clears the cookie.
3. The user is redirected to `/`.

### Route protection

A global Nuxt middleware (`app/middleware/auth.global.ts`) runs on every navigation. For any route under `/admin/*` it calls `GET /api/auth/get-session` to check the current session:

| Session state | Redirect |
|---|---|
| No session / request fails | `/login` |
| Session exists but email not verified | `/verify-email` |
| Session valid and email verified | Allowed through |

## Database tables

better-auth manages four tables. Do not modify their columns — better-auth owns the schema for these:

| Table | Purpose |
|---|---|
| `users` | User accounts (`id` is a text string, not UUID — better-auth generates its own IDs) |
| `sessions` | Active sessions |
| `accounts` | OAuth provider accounts (unused for now, required by better-auth) |
| `verifications` | Email verification tokens |

The `portfolios` table is ours and has a `user_id` text foreign key referencing `users.id`.

## API routes

| Method | Path | Handler | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/register` | Custom (`register.post.ts`) | Validates, creates user + portfolio |
| `POST` | `/api/auth/sign-in/email` | better-auth | Credential login, sets session cookie |
| `POST` | `/api/auth/sign-out` | better-auth | Destroys session, clears cookie |
| `GET` | `/api/auth/verify-email` | better-auth | Validates token, marks email verified |
| `POST` | `/api/auth/send-verification-email` | better-auth | Resends verification email |
| `GET` | `/api/auth/get-session` | better-auth | Returns current session or 401 |

Custom routes are registered before the better-auth catch-all in `server.ts`, so Hono matches them first.

## Shared validation

The register form schema (`registerSchema`) lives in `shared/schemas/auth.ts` and is imported by both the backend endpoint and the frontend form. This ensures validation rules are identical on both ends — if you change a rule, it applies everywhere.

Login validation is frontend-only (a simple email + non-empty password check) since the backend delegates entirely to better-auth.
