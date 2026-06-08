import type { Context } from 'hono';
import type { Column } from 'drizzle-orm';
import { ilike } from 'drizzle-orm';

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export type PaginationParams = {
  offset: number;
  limit: number;
  page: number;
};

/** Reads `page` and `page[size]` query params. Defaults: page=1, limit=20, max limit=100. */
export function parsePagination(c: Context): PaginationParams {
  const page = Math.max(1, parseInt(c.req.query('page[number]') ?? '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query('page[size]') ?? '20', 10) || 20));
  return { offset: (page - 1) * limit, limit, page };
}

/** Shapes a paginated response envelope. */
export function paginatedResult<T>(data: T[], total: number, { page, limit }: PaginationParams) {
  return {
    data,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  };
}

// ---------------------------------------------------------------------------
// Field selection
// ---------------------------------------------------------------------------

/**
 * Parses `?fields[resourceType]=id,name,email` into a Drizzle `columns` object.
 *
 * Pass `allowedColumns` as a record of field name → Drizzle column so clients
 * can't request columns that don't exist on the table.
 *
 * Returns `undefined` when no `fields` param is given — Drizzle will then
 * return all columns (its default behaviour).
 *
 * Usage:
 *   const columns = parseFields(c, { id: users.id, name: users.name }, 'users');
 *   const rows = await db.select(columns ?? {}).from(users);
 */
export function parseFields<TColumns extends Record<string, Column>>(
  c: Context,
  allowedColumns: TColumns,
  resourceType?: string,
): Partial<TColumns> | undefined {
  const raw = resourceType ? c.req.query(`fields[${resourceType}]`) : undefined;
  if (!raw?.trim()) return undefined;

  const requested = raw.split(',').map(f => f.trim());
  const result: Partial<TColumns> = {};

  for (const field of requested) {
    if (field in allowedColumns) {
      result[field as keyof TColumns] = allowedColumns[field as keyof TColumns];
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

/** Returns the trimmed `search` query param, or undefined if absent/empty. */
export function parseSearch(c: Context, key = 'search'): string | undefined {
  const q = c.req.query(key);
  return q?.trim() || undefined;
}

/** Builds a Drizzle case-insensitive substring filter for a column. */
export function contains(column: Column, value: string) {
  return ilike(column, `%${value}%`);
}
