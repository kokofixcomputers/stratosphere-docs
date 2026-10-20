'use client';

import Link from 'next/link';
import { useState } from 'react';
import { parseBlocks, renderBlocks } from './markdown';
import type { ReleaseSummary } from '@/lib/github-releases';
import { site } from '@/lib/site';


export default function ChangelogList({ releases }: { releases: ReleaseSummary[] }) {

  const visible = releases;

  return (
    <section className="space-y-6">
      {visible.length ? (
        <div className="space-y-6">
          {visible.map((release) => (
            <article key={release.tagName} className="rounded-3xl border border-fd-border bg-fd-app-bg/80 p-6">
              <div>
                <p className="text-sm text-fd-muted-foreground">
                  {release.publishedAt ? new Date(release.publishedAt).toLocaleDateString() : 'Unknown date'}
                </p>
                <h3 className="font-display text-xl font-semibold">{release.tagName}</h3>
              </div>

              <div className="mt-6 text-sm leading-6 text-fd-foreground">
                {release.body ? (
                  renderBlocks(parseBlocks(release.body))
                ) : (
                  <p className="text-sm text-fd-muted-foreground">No details available.</p>
                )}
              </div>
            </article>
          ))}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`${site.docsPath}/changelog/history`}
              className="inline-flex items-center justify-center rounded-2xl border border-fd-border bg-fd-app-bg/80 px-4 py-3 text-sm font-medium transition hover:bg-fd-muted/40"
            >
              Full version history
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-fd-border bg-fd-app-bg/80 p-6 text-sm text-fd-muted-foreground">
          No tagged releases yet. The panel is currently published as{' '}
          <strong className="font-semibold text-fd-foreground">nightly</strong>{' '}
          builds every time <code className="font-mono text-brand">1.0-develop</code>{' '}
          changes —{' '}
          <a
            href={`https://github.com/${site.github.owner}/${site.github.repo}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            see the releases page
          </a>{' '}
          for those. Tagged releases appear here automatically once they are
          published.
        </div>
      )
      }
    </section >
  );
}
