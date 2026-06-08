import { mysqlTable, varchar, text, boolean, json, datetime, real } from 'drizzle-orm/mysql-core';
import { portfolios } from './portfolios.js';

export const collections = mysqlTable('collections', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  portfolioId: varchar('portfolio_id', { length: 36 })
    .notNull()
    .references(() => portfolios.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  name: text('name')
    .notNull()
    .$defaultFn(() => ''),
  sortOrder: real('sort_order').notNull().default(0),
  createdAt: datetime('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});

export const collectionItems = mysqlTable('collection_items', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  collectionId: varchar('collection_id', { length: 36 })
    .notNull()
    .references(() => collections.id, { onDelete: 'cascade' }),
  data: json('data')
    .notNull()
    .$defaultFn(() => ({})),
  pageBody: text('page_body'),
  isPublished: boolean('is_published').notNull().default(false),
  sortOrder: real('sort_order').notNull().default(0),
  createdAt: datetime('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});
