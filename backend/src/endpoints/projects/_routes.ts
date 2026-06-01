import { Hono } from 'hono';
import { projectsGet } from './index.get.js';
import { projectsPost } from './index.post.js';
import { projectPatch } from './[id].patch.js';
import { projectDelete } from './[id].delete.js';

const projects = new Hono()
  .get('/', ...projectsGet)
  .post('/', ...projectsPost)
  .patch('/:id', ...projectPatch)
  .delete('/:id', ...projectDelete);

export default projects;
