import { Hono } from 'hono';
import auth from './endpoints/auth/_routes.js';
import users from './endpoints/users/_routes.js';
import portfolios from './endpoints/portfolios/_routes.js';
import projects from './endpoints/projects/_routes.js';
import experiences from './endpoints/experiences/_routes.js';
import { indexGet } from './endpoints/index.get.js';
import { healthGet } from './endpoints/health.get.js';

const router = new Hono()
  .basePath('/api')
  .route('/auth', auth)
  .route('/users', users)
  .route('/portfolios', portfolios)
  .route('/projects', projects)
  .route('/experiences', experiences)
  .get('/health', ...healthGet)
  .get('/', ...indexGet);

export type AppRouter = typeof router;
export default router;
