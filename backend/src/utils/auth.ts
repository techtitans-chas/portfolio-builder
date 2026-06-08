// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * JWT payload.
 * exp is a Unix timestamp in seconds (standard JWT claim).
 */
export interface AuthPayload {
  sub: string;
  role?: string;
  permissions?: string[];
  email?: string;
  exp: number;
}

/**
 * Typed Hono environment — passed to createFactory<AppEnv>() and
 * createMiddleware<AppEnv>() so c.get/set are fully type-safe.
 */
export type AppEnv = {
  Variables: {
    user: AuthPayload;
  };
};
