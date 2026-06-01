import { Hono } from 'hono';
import { blocksGet } from './index.get.js';
import { blocksPost } from './index.post.js';
import { blockPatch } from './[blockId].patch.js';
import { blockDelete } from './[blockId].delete.js';

const blocks = new Hono()
  .get('/', ...blocksGet)
  .post('/', ...blocksPost)
  .patch('/:blockId', ...blockPatch)
  .delete('/:blockId', ...blockDelete);

export default blocks;
