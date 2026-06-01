import { Hono } from 'hono';
import { pagesGet } from './index.get.js';
import { pagesPost } from './index.post.js';
import { pagePatch } from './[pageId].patch.js';
import { pageDelete } from './[pageId].delete.js';
import { pagesReorder } from './reorder.patch.js';

const pages = new Hono()
  .get('/', ...pagesGet)
  .post('/', ...pagesPost)
  .patch('/reorder', ...pagesReorder)
  .patch('/:pageId', ...pagePatch)
  .delete('/:pageId', ...pageDelete);

export default pages;
