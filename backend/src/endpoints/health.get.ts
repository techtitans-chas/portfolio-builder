import { sql } from 'drizzle-orm';
import { db } from '../db/client.js';
import { factory } from '../lib/factory.js';

export const healthGet = factory.createHandlers(async c => {
  let dbStatus: 'connected' | 'unreachable' = 'unreachable';
  try {
    await db.execute(sql`SELECT 1`);
    dbStatus = 'connected';
  } catch {
    // db unreachable — status stays 'unreachable'
  }

  const healthy = dbStatus === 'connected';
  return c.json(
    {
      status: healthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'portfolio-builder-backend',
      version: '0.1.0',
      db: dbStatus,
    },
    healthy ? 200 : 503,
  );
});
