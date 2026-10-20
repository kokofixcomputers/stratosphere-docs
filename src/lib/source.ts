import { docs, extensions } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createElement } from 'react';
import { icons } from 'lucide-react';
import StratosphereLogo from '@/components/ui/StratosphereLogo';
import BlueprintLogo from '@/components/ui/BlueprintLogo';
import ElytraLogo from '@/components/ui/ElytraLogo';

function icon(icon: string | undefined) {
  if (!icon) {
    return;
  }
  switch (icon) {
    case 'stratosphere':
      return StratosphereLogo({ className: 'size-6 text-brand' });
    case 'blueprint':
      return BlueprintLogo();
    case 'elytra':
      return ElytraLogo();
  }

  if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
}

// `loader()` also assign a URL to your pages
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon,
});

/**
 * Extension authoring lives at `/docs/extensions`, with a sidebar of its own.
 * Slugs are generated from `content/extensions`, so the base URL carries the
 * whole prefix and `index` becomes `/docs/extensions` rather than a nested page.
 */
export const extensionsSource = loader({
  baseUrl: '/docs/extensions',
  source: extensions.toFumadocsSource(),
  icon,
});
