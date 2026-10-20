// Compiles source.config.ts to .source/source.config.mjs.
//
// Why this exists: `fumadocs-mdx` (the postinstall CLI) compiles the config and
// then wipes the whole .source directory before regenerating index.ts, so
// .source/source.config.mjs is left missing afterwards. The MDX loader imports
// that file without compiling it first (and caches a failed import), so a build
// or dev server can die with:
//   Cannot find module '.../.source/source.config.mjs'
// Running this after `fumadocs-mdx` (postinstall) and before Next starts
// (predev/prebuild) keeps that file in place.

const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');

const root = path.resolve(__dirname, '..');

/** esbuild is a dependency of fumadocs-mdx, so resolve it through that package. */
function findEsbuild() {
  const resolvers = [
    () => createRequire(require.resolve('fumadocs-mdx'))('esbuild'),
    () => require('esbuild'),
    () => {
      // Fallback: newest esbuild inside pnpm's virtual store.
      const pnpmDir = path.join(root, 'node_modules/.pnpm');
      const dir = fs
        .readdirSync(pnpmDir)
        .filter((entry) => entry.startsWith('esbuild@'))
        .sort()
        .pop();
      if (!dir) throw new Error('no esbuild package in node_modules/.pnpm');
      return require(path.join(pnpmDir, dir, 'node_modules/esbuild'));
    },
  ];

  for (const resolve of resolvers) {
    try {
      return resolve();
    } catch {
      // try the next resolver
    }
  }

  return null;
}

const esbuild = findEsbuild();

if (!esbuild) {
  console.error('Could not find esbuild. Make sure dependencies are installed.');
  process.exit(1);
}

esbuild
  .build({
    absWorkingDir: root,
    entryPoints: ['source.config.ts'],
    bundle: true,
    outdir: '.source',
    target: 'node18',
    write: true,
    platform: 'node',
    format: 'esm',
    packages: 'external',
    outExtension: { '.js': '.mjs' },
    allowOverwrite: true,
  })
  .catch((error) => {
    console.error('Failed to compile source.config.ts:', error);
    process.exit(1);
  });
