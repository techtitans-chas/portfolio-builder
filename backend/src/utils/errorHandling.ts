import type { Context } from 'hono';
import { z } from 'zod';
import { errorDocument, sendJsonApi } from './jsonApi.js';

// ---------------------------------------------------------------------------
// AppError — throw this anywhere in a handler
// ---------------------------------------------------------------------------

export class AppError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.data = data;
  }
}

// ---------------------------------------------------------------------------
// Throw helpers — intent-revealing, one-liners in handlers
// ---------------------------------------------------------------------------

export const notFound = (msg = 'Not found') => new AppError(404, msg);

export const badRequest = (msg = 'Bad request', data?: unknown) => new AppError(400, msg, data);

export const unauthorized = (msg = 'Unauthorized') => new AppError(401, msg);

export const forbidden = (msg = 'Forbidden') => new AppError(403, msg);

export const conflict = (msg = 'Conflict') => new AppError(409, msg);

export const unprocessable = (msg = 'Unprocessable', data?: unknown) =>
  new AppError(422, msg, data);

// ---------------------------------------------------------------------------
// Body parsing helper — use instead of c.req.json() directly
// ---------------------------------------------------------------------------

/** Parses the JSON request body, throwing a 400 AppError on malformed JSON. */
export async function parseBody<T = Record<string, unknown>>(c: Context): Promise<T> {
  try {
    return (await c.req.json()) as T;
  } catch {
    throw badRequest('Request body must be valid JSON');
  }
}

// ---------------------------------------------------------------------------
// Global Hono onError handler
// Register once: api.onError(onError)
// ---------------------------------------------------------------------------

function isPostgresError(err: unknown): err is { code: string } {
  return typeof err === 'object' && err !== null && 'code' in err && typeof (err as { code: unknown }).code === 'string';
}

export function onError(err: unknown, c: Context) {
  // Known app error — use its status directly
  if (err instanceof AppError) {
    return sendJsonApi(c, errorDocument(err.status, err.message, undefined, err.data), err.status);
  }

  // Zod validation error
  if (err instanceof z.ZodError) {
    return sendJsonApi(c, errorDocument(400, 'Validation failed', undefined, err.issues), 400);
  }

  // Postgres errors (from the 'postgres' driver)
  if (isPostgresError(err)) {
    switch (err.code) {
      case '23505': // unique_violation
        return sendJsonApi(c, errorDocument(409, 'A record with that value already exists'), 409);
      case '23503': // foreign_key_violation
        return sendJsonApi(c, errorDocument(400, 'Related record not found'), 400);
      case '23502': // not_null_violation
        return sendJsonApi(c, errorDocument(400, 'Missing required field'), 400);
    }
  }

  // Unexpected — log and return 500
  console.error('[Unhandled error]', err);
  return sendJsonApi(c, errorDocument(500, 'Internal server error'), 500);
}

// ---------------------------------------------------------------------------
// Legacy compatibility — used by auth/admin handlers not yet on Hono
// ---------------------------------------------------------------------------

/** @deprecated Use `throw notFound() / badRequest() / ...` with Hono's onError instead. */
export function handleApiError(error: unknown, context: string): never {
  if (error instanceof z.ZodError) {
    throw new AppError(400, 'Validation failed', error.issues);
  }
  if (error instanceof AppError) throw error;
  console.error(`[${context}]`, error);
  throw new AppError(500, 'Internal server error');
}
