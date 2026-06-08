import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { factory } from '../../lib/factory.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const themesDir = join(__dirname, '../../themes');

export const themesGet = factory.createHandlers(async c => {
  const files = await readdir(themesDir);
  const jsonFiles = files.filter(f => f.endsWith('.json'));

  const themes = await Promise.all(
    jsonFiles.map(async file => {
      const raw = await readFile(join(themesDir, file), 'utf-8');
      return JSON.parse(raw);
    }),
  );

  return c.json({ themes });
});
