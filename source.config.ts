import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

/**
 * The panel documentation.
 */
export const docs = defineDocs({
  dir: 'content/docs',
});

/**
 * Extension authoring. A collection of its own so it can be served from
 * `/docs/extensions` with its own sidebar, rather than nested in the panel tree.
 */
export const extensions = defineDocs({
  dir: 'content/extensions',
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
