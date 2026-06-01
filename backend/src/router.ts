import { Hono } from 'hono';
import auth from './endpoints/auth/_routes.js';
import users from './endpoints/users/_routes.js';
import portfolios from './endpoints/portfolios/_routes.js';
import themes from './endpoints/themes/_routes.js';
import mediaRouter from './endpoints/media/_routes.js';
import projects from './endpoints/projects/_routes.js';
import experiences from './endpoints/experiences/_routes.js';
import pages from './endpoints/pages/_routes.js';
import blocks from './endpoints/blocks/_routes.js';
import { indexGet } from './endpoints/index.get.js';
import { healthGet } from './endpoints/health.get.js';

const router = new Hono()
  .basePath('/api')
  .route('/auth', auth)
  .route('/users', users)
  .route('/portfolios', portfolios)
  .route('/themes', themes)
  .route('/media', mediaRouter)
  .route('/projects', projects)
  .route('/experiences', experiences)
  .route('/portfolios/:portfolioId/pages', pages)
  .route('/portfolios/:portfolioId/pages/:pageId/blocks', blocks)
  .get('/health', ...healthGet)
  .get('/', ...indexGet);

export type AppRouter = typeof router;
export default router;
