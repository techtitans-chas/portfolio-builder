import { factory } from '../../lib/factory.js';

// Login is handled directly by better-auth at POST /api/auth/sign-in/email.
// This stub is kept so the router compiles; it is never reached in practice
// because better-auth's handler is mounted after the custom router.
export const loginPost = factory.createHandlers(c => {
  return c.json({ message: 'Use POST /api/auth/sign-in/email' }, 404);
});
