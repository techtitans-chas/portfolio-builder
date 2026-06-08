import type { MiddlewareHandler } from 'hono';
import { auth } from './auth.js';
import { tooManyRequests } from '../utils/errorHandling.js';

const WINDOW_MS = 60_000; // 1 minute
const MAX_UPLOADS = 8; // per user per window

// key → [timestamp, ...] sliding log of request times
const log = new Map<string, number[]>();

export const uploadRateLimit: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) return next(); // unauthenticated → auth middleware will reject later

  const key = session.user.id;
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  const timestamps = (log.get(key) ?? []).filter(t => t > cutoff);
  if (timestamps.length >= MAX_UPLOADS) {
    const retryAfter = Math.ceil((timestamps[0]! - cutoff) / 1000);
    c.header('Retry-After', String(retryAfter));
    throw tooManyRequests(
      `Upload limit reached — max ${MAX_UPLOADS} uploads per minute. Try again in ${retryAfter}s.`,
    );
  }

  timestamps.push(now);
  log.set(key, timestamps);

  return next();
};
