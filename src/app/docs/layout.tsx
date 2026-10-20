import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { GithubInfoClient } from '@/components/ui/GithubInfoClient';
import { site } from '@/lib/site';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={source.pageTree}
      disableThemeSwitch
      sidebar={{
        defaultOpenLevel: 1,
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
