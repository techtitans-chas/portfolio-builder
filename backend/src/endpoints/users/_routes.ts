import { Hono } from 'hono';
import { meGet } from './me.get.js';
import { mePatch } from './me.patch.js';
import { meDelete } from './me.delete.js';
import { meAvatarPost } from './me.avatar.post.js';
import { meAvatarPatch } from './me.avatar.patch.js';

const users = new Hono()
  .get('/me', ...meGet)
  .patch('/me', ...mePatch)
  .delete('/me', ...meDelete)
  .post('/me/avatar', ...meAvatarPost)
  .patch('/me/avatar', ...meAvatarPatch);

export default users;
