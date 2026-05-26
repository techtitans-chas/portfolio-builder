import { Hono } from 'hono';
import { registerPost } from './register.post.js';
import { meGet } from './me.get.js';

const auth = new Hono().post('/register', ...registerPost).get('/me', ...meGet);

export default auth;
