import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sql } from 'drizzle-orm';
import { db } from './db/client.js';

const app = new Hono();

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:3000',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type'],
  }),
);

// Root endpoint
app.get('/', c => {
  return c.json({ message: 'Backend API is running' });
});

// Health check endpoint
app.get('/health', async c => {
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

const port = parseInt(process.env.PORT ?? '3111', 10);
serve(
  {
    fetch: app.fetch,
    port,
  },
  info => {
    console.log(`Backend server is running on http://localhost:${info.port}`);
  },
);
