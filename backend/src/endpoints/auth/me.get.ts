import { factory } from '../../lib/factory.js';

export const meGet = factory.createHandlers(c => {
  return c.json({ message: 'Me endpoint — not yet implemented' }, 501);
});
