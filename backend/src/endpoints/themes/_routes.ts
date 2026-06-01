import { Hono } from 'hono';
import { themesGet } from './index.get.js';

const themes = new Hono().get('/', ...themesGet);

export default themes;
