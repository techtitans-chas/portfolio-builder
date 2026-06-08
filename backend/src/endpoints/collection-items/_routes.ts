import { Hono } from 'hono';
import { collectionItemsGet } from './index.get.js';
import { collectionItemsPost } from './index.post.js';
import { collectionItemPatch } from './[itemId].patch.js';
import { collectionItemDelete } from './[itemId].delete.js';

const collectionItemsRouter = new Hono()
  .get('/', ...collectionItemsGet)
  .post('/', ...collectionItemsPost)
  .patch('/:itemId', ...collectionItemPatch)
  .delete('/:itemId', ...collectionItemDelete);

export default collectionItemsRouter;
