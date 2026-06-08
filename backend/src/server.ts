import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { validateBackendEnv } from './lib/validateEnv.js';
import { corsOptions } from './lib/cors.js';
import { onError } from './utils/errorHandling.js';
import { auth } from './lib/auth.js';
import router from './router.js';

const env = validateBackendEnv();
const PORT = parseInt(env.PORT ?? '3111', 10);

const app = new Hono();

app.use('*', cors(corsOptions));
app.use(prettyJSON());
app.onError(onError);

app.route('/', router);
app.on(['GET', 'POST', 'OPTIONS'], '/api/auth/*', c => auth.handler(c.req.raw));

// Passenger expects a CommonJS export of the request handler.
// When run directly with `node server.js`, start the HTTP server instead.
if (require.main === module) {
  const server = serve({
    fetch: app.fetch,
    port: PORT,
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

// Passenger integration: export the fetch handler
module.exports = app.fetch;
