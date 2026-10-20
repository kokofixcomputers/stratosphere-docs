import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { GithubInfoClient } from '@/components/ui/GithubInfoClient';
import { site } from '@/lib/site';
import { Puzzle } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={source.pageTree}
      disableThemeSwitch
      sidebar={{
        defaultOpenLevel: 1,
        tabs: [
          {
            title: 'Stratosphere',
            url: '/docs/stratosphere',
            icon: (
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4">
                <path d="M3 23.5a13 13 0 0 1 26 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M9.5 23.5a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                <circle cx="16" cy="23.5" r="2.5" fill="currentColor" />
                <path d="M2 27.5h28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
              </svg>
            ),
          },
          {
            title: 'Extensions',
            url: '/docs/extensions',
            icon: <Puzzle className="size-4" />,
          },
        ],
        banner: (
          <div className="rounded-xl border border-fd-border bg-fd-card/60 p-3 text-xs text-fd-muted-foreground">
            New to Stratosphere? Start with the{' '}
            <a
              href={`${site.docsPath}/getting-started/installation`}
              className="text-brand hover:underline"
            >
              installation guide
            </a>
            .
          </div>
        ),
      }}
      links={[
        {
          type: 'custom',
          children: (
            <GithubInfoClient
              owner={site.github.owner}
              repo={site.github.repo}
              className="lg:-mx-2"
            />
          ),
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
