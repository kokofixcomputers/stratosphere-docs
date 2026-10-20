import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import StratosphereLogo from '@/components/ui/StratosphereLogo';
import { githubUrl, site } from '@/lib/site';

/**
 * Shared layout configurations
 */
export const baseOptions: BaseLayoutProps = {
  disableThemeSwitch: true,
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <StratosphereLogo className="h-6 w-6 shrink-0 text-brand" />
        <span className="font-display font-semibold tracking-tight">{site.name}</span>
      </div>
    ),
  },
  links: [
    {
      icon: <BookOpenIcon className="w-4 h-4" />,
      text: 'Docs',
      url: site.docsPath,
      active: 'nested-url',
    },
  ],
  githubUrl,
};
