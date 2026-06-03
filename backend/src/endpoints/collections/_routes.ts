import { Hono } from 'hono';
import { collectionsGet } from './index.get.js';
import { collectionsPost } from './index.post.js';
import { collectionGet } from './[id].get.js';
import { collectionPatch } from './[id].patch.js';
import { collectionDelete } from './[id].delete.js';

const collectionsRouter = new Hono()
  .get('/', ...collectionsGet)
  .post('/', ...collectionsPost)
  .get('/:id', ...collectionGet)
  .patch('/:id', ...collectionPatch)
  .delete('/:id', ...collectionDelete);

export default collectionsRouter;
