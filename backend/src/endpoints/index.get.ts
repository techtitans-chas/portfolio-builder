import { factory } from '../lib/factory.js';

export const indexGet = factory.createHandlers(async c => {
  return c.json({ message: 'Backend API is running' });
});
