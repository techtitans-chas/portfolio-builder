import { mysqlTable, varchar, text, datetime, boolean, bigint, int } from 'drizzle-orm/mysql-core';

// better-auth generates string IDs (longer than 36 chars) for these tables, so
// the id/foreign-key columns use varchar(255), not the varchar(36) used for our
// own crypto.randomUUID() primary keys elsewhere.

export const users = mysqlTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  storageBytesUsed: bigint('storage_bytes_used', { mode: 'number' }).notNull().default(0),
  createdAt: datetime('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});

/** Singleton row (id = 1) tracking total R2 usage across all users. */
export const appStorage = mysqlTable('app_storage', {
  id: int('id').primaryKey().default(1),
  totalBytesUsed: bigint('total_bytes_used', { mode: 'number' }).notNull().default(0),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});

export const sessions = mysqlTable('sessions', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: datetime('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: datetime('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});

export const accounts = mysqlTable('accounts', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accessTokenExpiresAt: datetime('access_token_expires_at'),
  refreshTokenExpiresAt: datetime('refresh_token_expires_at'),
  scope: text('scope'),
  idToken: text('id_token'),
  password: text('password'),
  createdAt: datetime('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});

export const verifications = mysqlTable('verifications', {
  id: varchar('id', { length: 255 }).primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: datetime('expires_at').notNull(),
  createdAt: datetime('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updated_at')
    .notNull()
    .$defaultFn(() => new Date()),
});
