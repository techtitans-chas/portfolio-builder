import type { Context } from "hono";

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export type PaginationParams = {
  skip: number;
  take: number;
  page: number;
};

/** Reads `page` and `limit`/`pageSize` query params. Defaults: page=1, limit=20, max limit=100. */
export function parsePagination(c: Context): PaginationParams {
  const page = Math.max(
    1,
    parseInt(c.req.query("page[number]") ?? "1", 10) || 1,
  );
  const take = Math.min(
    100,
    Math.max(1, parseInt(c.req.query("page[size]") ?? "20", 10) || 20),
  );
  return { skip: (page - 1) * take, take, page };
}

/** Shapes a paginated response envelope. */
export function paginatedResult<T>(
  data: T[],
  total: number,
  { page, take }: PaginationParams,
) {
  return {
    data,
    total,
    page,
    limit: take,
    pages: Math.ceil(total / take),
  };
}

// ---------------------------------------------------------------------------
// Field selection
// ---------------------------------------------------------------------------

/**
 * Parses `?fields=id,name,email` into a Prisma `select` object.
 *
 * Pass `allowedFields` (the model's scalar field names) so clients can't
 * accidentally request relation fields or internal columns.
 *
 * Returns `undefined` when no `fields` param is given — Prisma will then
 * return all columns (its default behaviour).
 *
 * Usage:
 *   const select = parseFields(c, ["id", "name", "email", "phone"] as const);
 *   const customer = await prisma.customer.findUnique({ where: { id }, select });
 */
export function parseFields<const TField extends string>(
  c: Context,
  allowedFields: readonly TField[],
  resourceType?: string,
): Record<TField, true> | undefined {
  const raw = resourceType ? c.req.query(`fields[${resourceType}]`) : undefined;
  if (!raw?.trim()) return undefined;

  const requested = raw.split(",").map((f) => f.trim());
  const valid = requested.filter((f): f is TField =>
    (allowedFields as readonly string[]).includes(f),
  );

  if (valid.length === 0) return undefined;

  return Object.fromEntries(valid.map((f) => [f, true])) as Record<
    TField,
    true
  >;
}

/**
 * Parses nested field selection like `?select=id,title,components.id,components.measurements.quantity`
 * into a Prisma select object with proper nesting.
 *
 * Returns undefined when no `select` param is given.
 *
 * Usage:
 *   const select = parseNestedSelect(c);
 *   const recipe = await prisma.recipe.findUnique({ where: { id }, select });
 */
export function parseNestedSelect(
  c: Context,
  key = "select",
): Record<string, any> | undefined {
  const raw = c.req.query(key);
  if (!raw?.trim()) return undefined;

  const fieldPaths = raw
    .split(",")
    .map((f) => f.trim())
    .filter((f) => f.length > 0);
  if (fieldPaths.length === 0) return undefined;

  const select: Record<string, any> = {};

  for (const path of fieldPaths) {
    const parts = path.split(".");
    let current = select;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]!;
      const isLast = i === parts.length - 1;

      if (isLast) {
        current[part] = true;
      } else {
        if (!current[part] || typeof current[part] !== "object") {
          current[part] = {};
        }
        current = current[part] as Record<string, any>;
      }
    }
  }

  return select;
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

/** Returns the trimmed `search` query param, or undefined if absent/empty. */
export function parseSearch(c: Context, key = "search"): string | undefined {
  const q = c.req.query(key);
  return q?.trim() || undefined;
}

/** Builds a Prisma string filter for a case-insensitive substring match. */
export function contains(value: string) {
  return { contains: value };
}
