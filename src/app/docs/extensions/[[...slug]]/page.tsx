import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultMdxComponents, { createRelativeLink } from 'fumadocs-ui/mdx';
import { extensionsSource } from '@/lib/source';
import { site } from '@/lib/site';

interface PageParams {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const page = extensionsSource.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{
        enabled: true,
        style: 'clerk',
      }}
      lastUpdate={page.data.lastModified ? new Date(page.data.lastModified) : undefined}
      editOnGithub={{
        owner: site.github.owner,
        repo: site.github.docsRepo,
        sha: 'main',
        path: `content/extensions/${page.file.path}`,
      }}
      full={page.data.full}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={{
            ...defaultMdxComponents,
            a: createRelativeLink(extensionsSource, page),
            Tabs,
            Tab,
            Card,
            Cards,
            Steps,
            Step,
            Accordions,
            Accordion,
            Files,
            File,
            Folder,
            TypeTable,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return extensionsSource.generateParams();
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = extensionsSource.getPage(slug);

  if (!page) return {};

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
