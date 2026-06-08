import { mysqlTable, varchar, text, boolean, json, datetime } from 'drizzle-orm/mysql-core';
import { users } from './users.js';

export const portfolios = mysqlTable('portfolios', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 500 })
    .notNull()
    .default(''),
  description: text('description'),
  ogImageUrl: text('og_image_url'),
  themeSettings: json('theme_settings'),
  seoMeta: json('seo_meta'),
  isPublished: boolean('is_published').notNull().default(false),
  publishedAt: datetime('published_at'),
  createdAt: datetime('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});
