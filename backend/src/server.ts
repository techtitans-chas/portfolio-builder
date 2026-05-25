import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { corsOptions } from './lib/cors.js';
import { onError } from './utils/errorHandling.js';
import { auth } from './lib/auth.js';
import router from './router.js';
import indexGet from './endpoints/index.get.js';
import healthGet from './endpoints/health.get.js';

const PORT = parseInt(process.env.PORT ?? '3111', 10);

async function startServer(): Promise<void> {
  const app = new Hono();

  app.use('*', cors(corsOptions));
  app.use(prettyJSON());
  app.onError(onError);

  app.get('/', indexGet);
  app.get('/health', healthGet);
  app.route('/', router);
  app.on(['GET', 'POST', 'OPTIONS'], '/api/auth/*', c => auth.handler(c.req.raw));

  const server = serve({
    fetch: app.fetch,
    port: Number(PORT),
  });

  console.log(`Backend API running on http://localhost:${PORT}`);

  process.on('SIGINT', () => {
    server.close();
    process.exit(0);
  });
  process.on('SIGTERM', () => {
    server.close(err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      process.exit(0);
    });
  });
}

startServer().catch(error => {
  console.error('Failed to start backend API', error);
  process.exit(1);
});
