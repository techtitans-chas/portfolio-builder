import { eq, sql, and, inArray } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { users, appStorage, media, portfolios, pages, blocks } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest } from '../../utils/errorHandling.js';
import { deleteFromR2, keyFromUrl } from '../../lib/r2.js';

/**
 * Recursively walks a JSON value and replaces every string equal to `url`
 * with null. Returns the new value and a boolean indicating whether anything changed.
 */
function scrubUrl(value: unknown, url: string): { result: unknown; changed: boolean } {
  if (value === url) {
    return { result: null, changed: true };
  }
  if (Array.isArray(value)) {
    let changed = false;
    const result = value.map(item => {
      const r = scrubUrl(item, url);
      if (r.changed) changed = true;
      return r.result;
    });
    return { result, changed };
  }
  if (value !== null && typeof value === 'object') {
    let changed = false;
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const r = scrubUrl(v, url);
      if (r.changed) changed = true;
      result[k] = r.result;
    }
    return { result, changed };
  }
  return { result: value, changed: false };
}

export const mediaDelete = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) throw unauthorized();

  const id = c.req.param('id');
  if (!id) throw badRequest('Missing media id');

  const [file] = await db
    .select()
    .from(media)
    .where(and(eq(media.id, id), eq(media.userId, session.user.id)));

  if (!file) throw notFound('Media not found');

  // Find all blocks belonging to this user so we can scrub the URL from their content.
  const userPortfolios = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(eq(portfolios.userId, session.user.id));

  const portfolioIds = userPortfolios.map(p => p.id);

  const affectedBlocks =
    portfolioIds.length > 0
      ? await db
          .select({ id: blocks.id, content: blocks.content })
          .from(blocks)
          .innerJoin(pages, eq(blocks.pageId, pages.id))
          .where(inArray(pages.portfolioId, portfolioIds))
      : [];

  // Determine which blocks actually reference the deleted URL.
  const blocksToUpdate = affectedBlocks
    .map(block => {
      const { result, changed } = scrubUrl(block.content, file.url);
      return changed ? { id: block.id, content: result } : null;
    })
    .filter(b => b !== null);

  const key = keyFromUrl(file.url);
  if (key) await deleteFromR2(key);

  await db.transaction(async tx => {
    await tx.delete(media).where(eq(media.id, id));

    await tx
      .update(users)
      .set({
        storageBytesUsed: sql`GREATEST(0, ${users.storageBytesUsed} - ${file.sizeBytes})`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    await tx
      .update(appStorage)
      .set({
        totalBytesUsed: sql`GREATEST(0, ${appStorage.totalBytesUsed} - ${file.sizeBytes})`,
        updatedAt: new Date(),
      })
      .where(eq(appStorage.id, 1));

    for (const block of blocksToUpdate) {
      await tx
        .update(blocks)
        .set({ content: block.content as Record<string, unknown>, updatedAt: new Date() })
        .where(eq(blocks.id, block.id));
    }
  });

  return c.json({ success: true });
});
