import { Hono } from 'hono';
import { mediaGet } from './index.get.js';
import { mediaPost } from './index.post.js';
import { mediaDelete } from './[id].delete.js';

const mediaRouter = new Hono()
  .get('/', ...mediaGet)
  .post('/', ...mediaPost)
  .delete('/:id', ...mediaDelete);

export default mediaRouter;
