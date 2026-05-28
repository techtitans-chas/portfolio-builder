import { Hono } from 'hono';
import { portfolioGet } from './[id].get.js';

const portfolios = new Hono().get('/:slug', ...portfolioGet);

export default portfolios;
