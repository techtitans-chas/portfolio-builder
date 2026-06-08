import { createServer } from 'node:http';
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

// Passenger expects an http.Server or Express-style (req, res) export.
// We build a plain Node http.Server wrapping the Hono fetch handler.
const server = createServer(async (req, res) => {
  // Convert Node IncomingMessage → Web Request
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const body = chunks.length ? Buffer.concat(chunks) : undefined;

  const url = `http://${req.headers.host}${req.url}`;
  const init: RequestInit = {
    method: req.method ?? 'GET',
    headers: req.headers as Record<string, string>,
  };
  if (body?.length) init.body = body;
  const webReq = new Request(url, init);

  const webRes = await app.fetch(webReq);

  res.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => res.setHeader(key, value));
  const buf = await webRes.arrayBuffer();
  res.end(Buffer.from(buf));
});

// Passenger integration: export the http.Server
module.exports = server;

// When run directly with `node server.js`, bind to port
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
  });

  process.on('SIGINT', () => { server.close(); process.exit(0); });
  process.on('SIGTERM', () => { server.close(() => process.exit(0)); });
}
