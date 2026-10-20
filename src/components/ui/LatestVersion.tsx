import { fetchLatestVersion } from '@/lib/github-releases';
import { site } from '@/lib/site';

export default async function LatestVersion({
  owner = site.github.owner,
  repo = site.github.repo,
  fallback = 'unknown',
}: {
  owner?: string;
  repo?: string;
  fallback?: string;
}) {
  const version = await fetchLatestVersion(owner, repo);

  return <span>{version ?? fallback}</span>;
}
