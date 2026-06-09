/// <reference types="node" />
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './migrations',
  dialect: 'mysql',
  dbCredentials: {
    url:
      process.env['DATABASE_URL'] ??
      (() => {
        throw new Error('DATABASE_URL is not set');
      })(),
  },
});
