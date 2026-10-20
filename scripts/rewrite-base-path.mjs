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

// Every rule is anchored to something that only appears immediately before an
// absolute path we generate, so no ordinary page content is ever touched:
//
//  - attributes:      src="/...", href="/..."
//  - JSON strings:    \"/docs/... inside the RSC payloads
//  - markdown links:  ](/docs/... inside the .txt search sources
//  - minified code:   ="/api/search" as a default parameter
const rules = [
  // Asset and page attributes.
  { re: /(\b(?:src|href|srcSet|poster)=")(\/(?!\/)[^"]*")/g, to: `$1${prefix}$2` },

  // Absolute /docs/... links inside the JSON payloads and markdown sources.
  { re: /(\\")(\/docs\/)/g, to: `$1${prefix}$2` },
  { re: /(\\')(\/docs\/)/g, to: `$1${prefix}$2` },
  { re: /(\]\(\/docs\/)/g, to: `](${prefix}/docs/` },

  // JSON payloads that are not string-escaped, i.e. the fumadocs search index
  // and the RSC flight data: a quoted path that starts a JSON array or value.
  { re: /(")(\/docs\/[^"]*")/g, to: `$1${prefix}$2` },

  // Minified code that fetches the fumadocs search index.
  { re: /(=\s*")(\/api\/search")/g, to: `$1${prefix}$2` },
  { re: /(=\s*')(\/api\/search')/g, to: `$1${prefix}$2` },
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

// Fail loudly rather than shipping a site with links into nowhere.
const leftovers = [];
for (const file of targets) {
  const text = readFileSync(file, 'utf8');
  const attr = /(?:src|href|srcSet|poster)="(\/[^"]*)"/g;
  let match;
  while ((match = attr.exec(text))) {
    const value = match[1];
    if (value.startsWith('//')) continue;
    if (value !== `${prefix}/` && !value.startsWith(`${prefix}/`)) {
      leftovers.push(`${file} -> ${value}`);
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
