// Re-export inferred Drizzle Select/Insert types here as tables are added.
// Example (once a `users` table exists in the schema):
//
//   import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
//   import type { users } from '@portfolio-builder/backend/db/schema';
//
//   export type User = InferSelectModel<typeof users>;
//   export type NewUser = InferInsertModel<typeof users>;
