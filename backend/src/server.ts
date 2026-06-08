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
// Passenger injects PORT automatically; fall back to 3111 for local dev.
const PORT = parseInt(process.env.PORT ?? env.PORT ?? '3111', 10);

const app = new Hono();

app.use('*', cors(corsOptions));
app.use(prettyJSON());
app.onError(onError);

app.route('/', router);
app.on(['GET', 'POST', 'OPTIONS'], '/api/auth/*', c => auth.handler(c.req.raw));

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
  },
);

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
