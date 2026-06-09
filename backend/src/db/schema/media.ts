import { mysqlTable, varchar, text, bigint, datetime } from 'drizzle-orm/mysql-core';
import { users } from './users.js';

export const media = mysqlTable('media', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  filename: text('filename').notNull(),
  fileType: text('file_type').notNull(),
  sizeBytes: bigint('size_bytes', { mode: 'number' }).notNull(),
  purpose: text('purpose'),
  createdAt: datetime('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});
