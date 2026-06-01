import { pgTable, uuid, text, boolean, jsonb, timestamp, real } from 'drizzle-orm/pg-core';
import { portfolios } from './portfolios.js';

export const experiences = pgTable('experiences', {
  id: uuid('id').primaryKey().defaultRandom(),
  portfolioId: uuid('portfolio_id')
    .notNull()
    .references(() => portfolios.id, { onDelete: 'cascade' }),
  title: text('title').notNull().default(''),
  place: text('place'),
  location: text('location'),
  time: text('time'),
  description: text('description'),
  isPublished: boolean('is_published').notNull().default(false),
  sortOrder: real('sort_order').notNull().default(0),
  tags: jsonb('tags').notNull().default([]),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
