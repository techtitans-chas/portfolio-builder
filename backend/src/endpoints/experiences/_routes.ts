import { Hono } from 'hono';
import { experiencesGet } from './index.get.js';
import { experiencesPost } from './index.post.js';
import { experiencePatch } from './[id].patch.js';
import { experienceDelete } from './[id].delete.js';

const experiences = new Hono()
  .get('/', ...experiencesGet)
  .post('/', ...experiencesPost)
  .patch('/:id', ...experiencePatch)
  .delete('/:id', ...experienceDelete);

export default experiences;
