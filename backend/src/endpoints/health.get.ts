import { sql } from 'drizzle-orm';
import { db } from '../db/client.js';
import { factory } from '../lib/factory.js';
import { r2 } from '../lib/r2.js';
import { resendEnabled } from '../lib/resend.js';

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
      features: {
        storage: r2 !== null,
        email: resendEnabled,
      },
    },
    healthy ? 200 : 503,
  );
});
