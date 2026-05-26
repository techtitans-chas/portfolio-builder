import type { Context } from 'hono';
import type { PaginationParams } from './query.js';

export type JsonApiRelationship = {
  data?: { type: string; id: string } | Array<{ type: string; id: string }> | null;
  links?: Record<string, string>;
  meta?: Record<string, unknown>;
};

export type JsonApiResourceObject = {
  id: string;
  [key: string]: unknown;
};

type JsonApiDocumentOptions = {
  links?: Record<string, string>;
  meta?: Record<string, unknown>;
};

export type JsonApiErrorObject = {
  status: string;
  title: string;
  detail?: string;
  meta?: unknown;
};

export type JsonApiDocument = {
  data?: JsonApiResourceObject | JsonApiResourceObject[] | null;
  links?: Record<string, string>;
  meta?: Record<string, unknown>;
  errors?: JsonApiErrorObject[];
};

export function sendJsonApi(c: Context, doc: JsonApiDocument, status = 200) {
  c.header('Content-Type', 'application/vnd.api+json');
  return c.json(doc, status as 200);
}

export function resourceFromRecord(
  _type: string,
  record: Record<string, unknown>,
  options?: {
    idKey?: string;
    fields?: string[];
    attributes?: string[];
    relationships?: Record<string, unknown>;
    links?: Record<string, string>;
    meta?: Record<string, unknown>;
  },
): JsonApiResourceObject {
  const idKey = options?.idKey ?? 'id';
  const idValue = record[idKey];

  if (idValue === undefined || idValue === null) {
    throw new Error(`Missing id field '${idKey}'`);
  }

  const id = String(idValue);

  const fields = options?.fields ?? options?.attributes;

  const flatFields = fields
    ? Object.fromEntries(
        fields
          .filter(field => field !== idKey)
          .filter(field => field in record)
          .map(field => [field, record[field]]),
      )
    : Object.fromEntries(Object.entries(record).filter(([key]) => key !== idKey));

  return {
    id,
    ...flatFields,
    ...(options?.relationships ? options.relationships : {}),
    ...(options?.links ? { links: options.links } : {}),
    ...(options?.meta ? { meta: options.meta } : {}),
  };
}

export function collectionDocument(
  data: JsonApiResourceObject[],
  options?: JsonApiDocumentOptions,
): JsonApiDocument {
  return {
    data,
    ...(options?.links ? { links: options.links } : {}),
    ...(options?.meta ? { meta: options.meta } : {}),
  };
}

export function resourceDocument(
  data: JsonApiResourceObject | null,
  options?: JsonApiDocumentOptions,
): JsonApiDocument {
  return {
    data,
    ...(options?.links ? { links: options.links } : {}),
    ...(options?.meta ? { meta: options.meta } : {}),
  };
}

export function paginationLinks(
  c: Context,
  pagination: PaginationParams,
  total: number,
): Record<string, string> {
  const totalPages = Math.max(1, Math.ceil(total / pagination.limit));
  const url = new URL(c.req.url);

  const setPage = (pageNumber: number) => {
    const params = new URLSearchParams(url.search);
    params.set('page[number]', String(pageNumber));
    params.set('page[size]', String(pagination.limit));
    return `${url.pathname}?${params.toString()}`;
  };

  return {
    self: setPage(pagination.page),
    first: setPage(1),
    last: setPage(totalPages),
    ...(pagination.page > 1 ? { prev: setPage(pagination.page - 1) } : {}),
    ...(pagination.page < totalPages ? { next: setPage(pagination.page + 1) } : {}),
  };
}

export function paginationMeta(total: number, pagination: PaginationParams) {
  return {
    total,
    page: pagination.page,
    pageSize: pagination.limit,
    pageCount: Math.ceil(total / pagination.limit),
  };
}

export function errorDocument(
  status: number,
  title: string,
  detail?: string,
  meta?: unknown,
): JsonApiDocument {
  return {
    errors: [
      {
        status: String(status),
        title,
        ...(detail ? { detail } : {}),
        ...(meta !== undefined ? { meta } : {}),
      },
    ],
  };
}
