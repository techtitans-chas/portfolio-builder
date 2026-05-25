import { factory } from '../../lib/factory.js';

// Logout is handled directly by better-auth at POST /api/auth/sign-out.
// This stub is kept so the router compiles; it is never reached in practice.
export const logoutPost = factory.createHandlers(c => {
  return c.json({ message: 'Use POST /api/auth/sign-out' }, 404);
});
