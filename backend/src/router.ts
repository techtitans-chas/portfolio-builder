import { Hono } from 'hono';
import auth from './endpoints/auth/_routes.js';

const router = new Hono().basePath('/api').route('/auth', auth);

export type AppRouter = typeof router;
export default router;
