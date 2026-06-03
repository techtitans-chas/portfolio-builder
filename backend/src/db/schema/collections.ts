import { pgTable, uuid, text, boolean, jsonb, timestamp, real } from 'drizzle-orm/pg-core';
import { portfolios } from './portfolios.js';

export const collections = pgTable('collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  portfolioId: uuid('portfolio_id')
    .notNull()
    .references(() => portfolios.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  name: text('name').notNull().default(''),
  sortOrder: real('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const collectionItems = pgTable('collection_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  collectionId: uuid('collection_id')
    .notNull()
    .references(() => collections.id, { onDelete: 'cascade' }),
  data: jsonb('data').notNull().default({}),
  isPublished: boolean('is_published').notNull().default(false),
  sortOrder: real('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
