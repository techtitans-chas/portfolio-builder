import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema/index.js';

const url = process.env['DATABASE_URL'];

if (!url) {
  console.error('DATABASE_URL is not set — cannot connect to the database');
  process.exit(1);
}

// Force utf8mb4 — the Netcup MySQL server defaults to latin1/cp1252, which would
// corrupt emoji and many non-ASCII characters in portfolio content.
const pool = mysql.createPool({ uri: url, charset: 'utf8mb4' });

export const db = drizzle(pool, { schema, mode: 'default' });
