// Rewrite absolute URLs in the exported static site so it can be served from a
// subpath (for example https://user.github.io/repo/) instead of a domain root.
//
// Next.js `output: "export"` has no `basePath` here, and setting one would break
// the Cloudflare deploy in wrangler.toml, which serves the same `out/` folder
// from a domain root. So the rewrite runs on the exported files instead, and
// only in the Pages workflow.
//
// Usage: node scripts/rewrite-base-path.mjs repo-name

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const raw = process.argv[2] ?? '';
const base = raw.replace(/^\/+|\/+$/g, '');

if (!base) {
  console.error('Usage: node scripts/rewrite-base-path.mjs <base-path>');
  process.exit(1);
}

if (!/^[\w.-]+(\/[\w.-]+)*$/.test(base)) {
  console.error(`Refusing to rewrite: "${raw}" is not a plain path segment.`);
  process.exit(1);
}

const prefix = `/${base}`;
const outDir = 'out';

// A Next.js export writes the same absolute paths in several shapes, and every
// one of them has to move or the client breaks in a specific way:
//
//  - attributes:      <script src="/_next/...">, <link href="/docs/...">
//  - quoted strings:  the turbopack runtime resolves every lazy chunk from a
//                     hard-coded "/_next/", and the RSC flight payloads name
//                     the page and its chunks as "/docs/..." and "/_next/..."
//  - escaped strings: \"/_next/...\" and \"/docs/...\" inside the flight data
//  - markdown links:  ](/docs/...) inside the .txt search sources
//
// Anchoring on a leading quote or attribute `=` and requiring the value to
// start with one of our own path roots is what keeps page prose untouched.
const escaped = `\\\\"`; // \" as it appears literally in the flight payload
const escapedSingle = `\\\\'`; // \' likewise
const roots = `(?:\\/_next\\/|\\/docs\\/|\\/api\\/search|\\/panelscreenshots\\/|\\/favicon\\.(?:svg|ico))`;

const rules = [
  // src="/...", href="/...", content="/..."
  {
    re: /(\b(?:src|href|srcSet|poster|content)=")(\/(?!\/)[^"]*")/g,
    to: `$1${prefix}$2`,
  },

  // "/_next/...", "/docs/...", "/api/search" as a plain JS/JSON string.
  { re: new RegExp(`(")(${roots})`, 'g'), to: `$1${prefix}$2` },
  // '...' the same, for single-quoted bundles.
  { re: new RegExp(`(')(${roots})`, 'g'), to: `$1${prefix}$2` },
  // \"...\" escaped inside the RSC flight payload.
  { re: new RegExp(`(${escaped})(${roots})`, 'g'), to: `$1${prefix}$2` },
  { re: new RegExp(`(${escapedSingle})(${roots})`, 'g'), to: `$1${prefix}$2` },

  // Root link: href="/" and href='/'.
  { re: /(\bhref=")\/(?=")/g, to: `$1${prefix}/` },
  { re: /(\bhref=')\/(?=')/g, to: `$1${prefix}/` },

  // Markdown links in the .txt search sources: ](/docs/...
  { re: /(\]\(\/docs\/)/g, to: `](${prefix}/docs/` },

  // Minified default parameters that fetch the search index: ="/api/search".
  { re: /(=\s*")(\/api\/search")/g, to: `$1${prefix}$2` },
  { re: /(=\s*')(\/api\/search')/g, to: `$1${prefix}$2` },

  // The router fetches RSC payloads such as /docs/x/__next._tree.txt while
  // navigating. Move the path so the request resolves under the prefix.
  { re: /(["'])(\/[^"']*?\/__next\.)/g, to: `$1${prefix}$2` },
];

// Files that legitimately contain font and licence URLs are skipped. These are
// the only two shapes that carry absolute URLs we do not generate.
const isFontOrLicence = (file) => /\.(woff2?|ttf|otf|eot)$/.test(file) || /LICENSE/.test(file);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

const files = walk(outDir);
const targets = files.filter((file) => !isFontOrLicence(file));

let changed = 0;

for (const file of targets) {
  const before = readFileSync(file, 'utf8');
  let after = before;

  for (const rule of rules) {
    after = after.replace(rule.re, rule.to);
  }

  if (after !== before) {
    writeFileSync(file, after);
    changed += 1;
  }
}

// Fail loudly rather than shipping a site with links into nowhere. This has to
// look at every shape the rewrite handles, not just attributes: the original
// bug here was a client bundle whose "/_next/" runtime prefix stayed at the
// domain root, so pages rendered but the router, sidebar and search all broke.
const leftovers = [];
const residual = [
  /(?:src|href|srcSet|poster|content)="(\/[^"]*)"/g, // attributes
  /"(?:\/_next\/|\/docs\/|\/api\/search|\/panelscreenshots\/)/g, // plain strings
  /'(?:\/_next\/|\/docs\/|\/api\/search|\/panelscreenshots\/)/g, // single-quoted
  /\\"(?:\/_next\/|\/docs\/)/g, // escaped flight data
];

for (const file of targets) {
  const text = readFileSync(file, 'utf8');

  // Attribute values must be `prefix/...` or `prefix` itself.
  const attr = /(?:src|href|srcSet|poster|content)="(\/[^"]*)"/g;
  let match;
  while ((match = attr.exec(text))) {
    const value = match[1];
    if (value.startsWith('//')) continue;
    if (value !== `${prefix}/` && !value.startsWith(`${prefix}/`)) {
      leftovers.push(`${file} -> ${value}`);
      break;
    }
  }

  // Any remaining bare root path in a string is a client-side break.
  for (const re of residual.slice(1)) {
    re.lastIndex = 0;
    const found = re.exec(text);
    if (found) {
      leftovers.push(`${file} -> ${found[0]}`);
      break;
    }
  }
}

console.log(`Rewrote ${changed} files under ${prefix}`);

if (leftovers.length) {
  console.error(`\n${leftovers.length} file(s) still point outside the prefix:`);
  for (const line of leftovers.slice(0, 20)) console.error(`  ${line}`);
  process.exit(1);
}
