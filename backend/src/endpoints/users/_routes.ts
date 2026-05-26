import { Hono } from 'hono';
import { meGet } from './me.get.js';
import { mePatch } from './me.patch.js';

const users = new Hono().get('/me', ...meGet).patch('/me', ...mePatch);

export default users;
