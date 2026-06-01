import { pgTable, uuid, text, real, jsonb, boolean, timestamp } from 'drizzle-orm/pg-core';
import { pages } from './pages.js';

export const blocks = pgTable('blocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  pageId: uuid('page_id')
    .notNull()
    .references(() => pages.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  sortOrder: real('sort_order').notNull().default(0),
  content: jsonb('content').notNull().default({}),
  styles: jsonb('styles').notNull().default({}),
  isVisible: boolean('is_visible').notNull().default(true),
  isMandatory: boolean('is_mandatory').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
