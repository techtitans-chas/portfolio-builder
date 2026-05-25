import { Hono } from 'hono';
import { loginPost } from './login.post.js';
import { registerPost } from './register.post.js';
import { logoutPost } from './logout.post.js';
import { meGet } from './me.get.js';

const auth = new Hono()
  .post('/login', ...loginPost)
  .post('/register', ...registerPost)
  .post('/logout', ...logoutPost)
  .get('/me', ...meGet);

export default auth;
