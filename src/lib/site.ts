/**
 * Single source of truth for Stratosphere branding.
 *
 * Change `url`, `panelHost` and `github` here and the metadata, sitemap,
 * navigation, GitHub buttons and release fetching all follow.
 */
export const site = {
  name: 'Stratosphere',
  shortDescription:
    'Stratosphere is a Minecraft-focused game server panel built on Pterodactyl, with a modern interface and the Minecraft tools you would otherwise install plugins for.',
  /** TODO: replace with the real production domain. */
  url: 'https://stratosphere.dev',
  /** TODO: replace with the real panel host shown on the landing page. */
  panelHost: 'panel.stratosphere.dev',
  /** TODO: replace with the real docs domain (used in the sitemap once `url` is set). */
  docsPath: '/docs/stratosphere',
  license: 'MIT',
  github: {
    owner: 'kokofixcomputers',
    repo: 'StratPanel',
    docsRepo: 'stratosphere-docs',
  },
  wingsRepo: 'stratwings',
} as const;

export const githubUrl = `https://github.com/${site.github.owner}/${site.github.repo}`;
export const githubDocsUrl = `https://github.com/${site.github.owner}/${site.github.docsRepo}`;
export const wingsUrl = `https://github.com/${site.github.owner}/${site.wingsRepo}`;
