import { Hono } from 'hono';
import { portfolioGet } from './[id].get.js';
import { portfolioPatch } from './[id].patch.js';

const portfolios = new Hono()
  .get('/:slug', ...portfolioGet)
  .patch('/:id/settings', ...portfolioPatch);

export default portfolios;
