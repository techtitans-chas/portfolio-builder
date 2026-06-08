import { Hono } from 'hono';
import { mediaGet } from './index.get.js';
import { mediaPost } from './index.post.js';
import { mediaDelete } from './[id].delete.js';
import { mediaPatch } from './[id].patch.js';
import { uploadRateLimit } from '../../lib/uploadRateLimit.js';

const mediaRouter = new Hono()
  .get('/', ...mediaGet)
  .post('/', uploadRateLimit, ...mediaPost)
  .patch('/:id', ...mediaPatch)
  .delete('/:id', ...mediaDelete);

export default mediaRouter;
