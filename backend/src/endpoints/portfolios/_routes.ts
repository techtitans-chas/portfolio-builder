import { Hono } from 'hono';
import { portfolioGet } from './[id].get.js';
import { portfolioPatch } from './[id].patch.js';
import { portfolioProjectsGet } from './[slug].projects.get.js';
import { portfolioExperiencesGet } from './[slug].experiences.get.js';
import { portfolioPagesGet } from './[slug].pages.get.js';
import { portfolioPageBlocksGet } from './[slug].pages.[pageSlug].blocks.get.js';

const portfolios = new Hono()
  .get('/:slug/pages/:pageSlug/blocks', ...portfolioPageBlocksGet)
  .get('/:slug/pages', ...portfolioPagesGet)
  .get('/:slug/projects', ...portfolioProjectsGet)
  .get('/:slug/experiences', ...portfolioExperiencesGet)
  .get('/:slug', ...portfolioGet)
  .patch('/:id/settings', ...portfolioPatch);

export default portfolios;
