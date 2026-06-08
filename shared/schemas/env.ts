import { z } from 'zod';

// ---------------------------------------------------------------------------
// Backend environment schema
// ---------------------------------------------------------------------------

export const backendEnvSchema = z.object({
  // Server
  PORT: z.string().optional(),

  // Database — required, backend cannot start without it
  DATABASE_URL: z.string().min(1),

  // Auth — required
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().min(1),
  FRONTEND_URL: z.string().min(1),

  // Email — optional, disables email features when absent
  RESEND_API_KEY: z.string().optional(),

  // Cloudflare R2 — all-or-nothing: either all three are set or none
  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET_NAME: z.string().optional(),
  R2_PUBLIC_URL: z.string().optional(),
});

export type BackendEnv = z.infer<typeof backendEnvSchema>;

// ---------------------------------------------------------------------------
// Frontend environment schema
// ---------------------------------------------------------------------------

export const frontendEnvSchema = z.object({
  // Public API URL used by the browser
  NUXT_PUBLIC_API_URL: z.string().optional(),
  // Server-side API URL (Docker / SSR) — falls back to NUXT_PUBLIC_API_URL
  NUXT_API_URL: z.string().optional(),
  FRONTEND_URL: z.string().optional(),
});

export type FrontendEnv = z.infer<typeof frontendEnvSchema>;
