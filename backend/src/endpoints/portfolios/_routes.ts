import { Hono } from 'hono';
import { portfolioGet } from './[id].get.js';
import { portfolioPatch } from './[id].patch.js';
import { portfolioPagesGet } from './[slug].pages.get.js';
import { portfolioPageBlocksGet } from './[slug].pages.[pageSlug].blocks.get.js';
import { portfolioCollectionItemsGet } from './[slug].collections.[collectionType].get.js';
import { portfolioCollectionItemGet } from './[slug].collections.[collectionType].[itemId].get.js';
import { portfolioCollectionByIdGet } from './[slug].collections.by-id.[collectionId].get.js';

const portfolios = new Hono()
  .get('/:slug/pages/:pageSlug/blocks', ...portfolioPageBlocksGet)
  .get('/:slug/pages', ...portfolioPagesGet)
  .get('/:slug/collections/by-id/:collectionId', ...portfolioCollectionByIdGet)
  .get('/:slug/collections/:collectionType/:itemId', ...portfolioCollectionItemGet)
  .get('/:slug/collections/:collectionType', ...portfolioCollectionItemsGet)
  .get('/:slug', ...portfolioGet)
  .patch('/:id/settings', ...portfolioPatch);

export default portfolios;
