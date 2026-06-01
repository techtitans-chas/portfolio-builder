import { pgTable, uuid, text, boolean, real, timestamp } from 'drizzle-orm/pg-core';
import { portfolios } from './portfolios.js';

export const pages = pgTable('pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  portfolioId: uuid('portfolio_id')
    .notNull()
    .references(() => portfolios.id, { onDelete: 'cascade' }),
  title: text('title').notNull().default(''),
  slug: text('slug').notNull(),
  isPublished: boolean('is_published').notNull().default(false),
  showInMenu: boolean('show_in_menu').notNull().default(true),
  sortOrder: real('sort_order').notNull().default(0),
  isMandatory: boolean('is_mandatory').notNull().default(false),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  seoOgImageUrl: text('seo_og_image_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
