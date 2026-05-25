import type { Context } from 'hono';

export default async function indexGet(c: Context): Promise<Response> {
  return c.json({ message: 'Backend API is running' });
}
