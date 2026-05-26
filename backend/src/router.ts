import { Hono } from 'hono';
import auth from './endpoints/auth/_routes.js';
import { indexGet } from './endpoints/index.get.js';
import { healthGet } from './endpoints/health.get.js';

const router = new Hono()
  .basePath('/api')
  .route('/auth', auth)
  .get('/health', ...healthGet)
  .get('/', ...indexGet);

export type AppRouter = typeof router;
export default router;
