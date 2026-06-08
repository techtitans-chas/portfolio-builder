// Esbuild bundle for Plesk (no Docker) deployment.
//
// Bundles the backend + @portfolio-builder/shared + pure-JS deps into a single
// dist/server.js so the server doesn't need a pnpm workspace install. Native
// modules (sharp, mysql2) are externalized — they ship platform-specific
// binaries that must be installed on the Linux server, not bundled from macOS.
//
// Run: pnpm --filter backend build
import { build } from 'esbuild';
import { writeFileSync, readFileSync } from 'node:fs';

const NATIVE_DEPS = ['sharp', 'mysql2'];

await build({
  entryPoints: ['src/server.ts'],
  outfile: 'dist/server.js',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  // Native modules: keep external so the server uses its own Linux-x64 binaries.
  // better-auth and drizzle are pure JS and safe to bundle.
  external: NATIVE_DEPS,
  // ESM interop: let bundled CJS deps use require() at runtime.
  banner: {
    js: "import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);",
  },
  logLevel: 'info',
});

// Emit a minimal dist/package.json so the Plesk deploy hook can install ONLY the
// externalized native modules (Linux-x64 binaries) — not the whole dependency
// tree. `npm install --omit=dev` run from dist/ on the server picks these up.
const srcPkg = JSON.parse(readFileSync('package.json', 'utf8'));
const deployPkg = {
  name: 'backend',
  type: 'module',
  private: true,
  main: 'server.js',
  scripts: { start: 'node server.js' },
  dependencies: Object.fromEntries(NATIVE_DEPS.map(d => [d, srcPkg.dependencies[d]])),
};
writeFileSync('dist/package.json', JSON.stringify(deployPkg, null, 2) + '\n');
console.log('Wrote dist/package.json with native deps:', NATIVE_DEPS.join(', '));

