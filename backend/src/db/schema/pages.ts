import { mysqlTable, varchar, text, boolean, real, datetime } from 'drizzle-orm/mysql-core';
import { portfolios } from './portfolios.js';

export const pages = mysqlTable('pages', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  portfolioId: varchar('portfolio_id', { length: 36 })
    .notNull()
    .references(() => portfolios.id, { onDelete: 'cascade' }),
  title: text('title')
    .notNull()
    .$defaultFn(() => ''),
  slug: varchar('slug', { length: 255 }).notNull(),
  isPublished: boolean('is_published').notNull().default(false),
  showInMenu: boolean('show_in_menu').notNull().default(true),
  sortOrder: real('sort_order').notNull().default(0),
  isMandatory: boolean('is_mandatory').notNull().default(false),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  seoOgImageUrl: text('seo_og_image_url'),
  createdAt: datetime('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});
