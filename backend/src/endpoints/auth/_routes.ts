import { Hono } from 'hono';
import { registerPost } from './register.post.js';

const auth = new Hono().post('/register', ...registerPost);

export default auth;
