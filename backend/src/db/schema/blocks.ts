import { mysqlTable, varchar, text, real, json, boolean, datetime } from 'drizzle-orm/mysql-core';
import { pages } from './pages.js';

export const blocks = mysqlTable('blocks', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  pageId: varchar('page_id', { length: 36 })
    .notNull()
    .references(() => pages.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  name: text('name'),
  sortOrder: real('sort_order').notNull().default(0),
  content: json('content')
    .notNull()
    .$defaultFn(() => ({})),
  styles: json('styles')
    .notNull()
    .$defaultFn(() => ({})),
  isVisible: boolean('is_visible').notNull().default(true),
  isMandatory: boolean('is_mandatory').notNull().default(false),
  createdAt: datetime('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});
