import { pgTable, uuid, text, boolean, jsonb, timestamp, real } from 'drizzle-orm/pg-core';
import { portfolios } from './portfolios.js';

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  portfolioId: uuid('portfolio_id')
    .notNull()
    .references(() => portfolios.id, { onDelete: 'cascade' }),
  title: text('title').notNull().default(''),
  description: text('description'),
  time: text('time'),
  isPublished: boolean('is_published').notNull().default(false),
  sortOrder: real('sort_order').notNull().default(0),
  links: jsonb('links').notNull().default([]),
  previewImageUrl: text('preview_image_url'),
  tags: jsonb('tags').notNull().default([]),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
