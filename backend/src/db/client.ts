import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.js';

const url = process.env['DATABASE_URL'];

if (!url) {
  console.error('DATABASE_URL is not set — cannot connect to the database');
  process.exit(1);
}

const queryClient = postgres(url);

export const db = drizzle(queryClient, { schema });
