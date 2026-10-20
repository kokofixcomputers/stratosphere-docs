import { StratButton } from "@/components/ui/StratButton";
import StratPill from "@/components/ui/StratPill";
import StratosphereLogo from "@/components/ui/StratosphereLogo";
import SafariBrowser from "@/components/ui/SafariBrowser";
import GitHubStats from "@/components/ui/GitHubStats";
import { githubUrl, site, wingsUrl } from "@/lib/site";
import type { Metadata } from "next";
import {
  BookOpenIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CubeIcon,
  CodeBracketIcon,
  ArrowPathRoundedSquareIcon,
  CircleStackIcon,
  GlobeAltIcon,
  MoonIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  openGraph: {
    images: [{ url: "/stratosphere_firstlook.jpeg" }],
  },
};

const highlights = [
  {
    title: "Install server software in one click",
    description:
      "Paper, Purpur, Spigot, Fabric, Quilt, Forge, NeoForge or Velocity — pick a version and a build, and the panel stops the server, swaps the jar and updates the egg variables for you.",
    icon: <RocketLaunchIcon className="w-5 h-5" />,
  },
  {
    title: "Mods and plugins built in",
    description:
      "Browse Modrinth and CurseForge from the server's Content page and install mods, plugins, data packs, resource packs, worlds and modpacks straight onto the node.",
    icon: <CubeIcon className="w-5 h-5" />,
  },
  {
    title: "See and change player inventories",
    description:
      "Operators, whitelist, hearts, hunger and levels in the panel. Open a shulker box, move a stack between slots or empty a slot — the change is written back to the world.",
    icon: <UsersIcon className="w-5 h-5" />,
  },
  {
    title: "A file manager that does not block",
    description:
      "Archives, extractions, imports and downloads run as jobs on the node, with a progress box in the corner. Close the page and come back tomorrow — it kept going.",
    icon: <ArrowPathRoundedSquareIcon className="w-5 h-5" />,
  },
  {
    title: "Custom domains for every server",
    description:
      "Players join with play.example.com instead of an IP and a port. One command installs the router, the panel manages the DNS records and the certificates.",
    icon: <GlobeAltIcon className="w-5 h-5" />,
  },
  {
    title: "Idle servers sleep, players wake them",
    description:
      "Auto sleep gives the memory of an empty server back to the node and starts it again when someone tries to join. CPU burst lets a running server spend saved CPU on a spike.",
    icon: <MoonIcon className="w-5 h-5" />,
  },
  {
    title: "Users create their own servers",
    description:
      "A guided wizard with software, version, node ping and adjustable specs, with per-user limits and defaults that admins set in .env.",
    icon: <UserGroupIcon className="w-5 h-5" />,
  },
  {
    title: "Roles, extensions and light/dark",
    description:
      "Split the admin area with roles, add pages and hooks with extensions, and pick the light or dark theme — the whole panel follows it, Monaco and the console included.",
    icon: <WrenchScrewdriverIcon className="w-5 h-5" />,
  },
];

const pillars = [
  {
    value: "MIT",
    label: "licensed",
    detail: "Free and open source, like the Pterodactyl panel it builds on.",
    icon: <CodeBracketIcon className="w-4 h-4" />,
  },
  {
    value: "8",
    label: "server softwares",
    detail: "Java server software installable from the panel, plus any custom jar.",
    icon: <CubeIcon className="w-4 h-4" />,
  },
  {
    value: "2",
    label: "content sources",
    detail: "Modrinth and CurseForge, with dependencies and update detection.",
    icon: <CircleStackIcon className="w-4 h-4" />,
  },
  {
    value: "1",
    label: "panel to learn",
    detail: "Everything you used in Pterodactyl keeps working the same way.",
    icon: <ShieldCheckIcon className="w-4 h-4" />,
  },
];

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const Page = () => {
  return (
    <>
      {/* hero */}
      <section className="relative w-full overflow-hidden bg-[#09090b]">
        <div className="brand-glow absolute inset-x-0 top-0 h-[70vh] pointer-events-none" />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative container mx-auto px-6 pt-36 pb-20 lg:pt-44 lg:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
            <div>
              <StratPill
                variant="default"
                leftChild={<RocketLaunchIcon className="w-3.5 h-3.5" />}
              >
                Open source · a Pterodactyl fork for Minecraft
              </StratPill>

              <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.25rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white">
                Minecraft servers,{" "}
                <span className="text-brand">managed properly</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                {site.name} keeps everything that makes Pterodactyl good — the
                isolated containers, Wings, the permissions, the API — and adds
                a modern interface with the Minecraft tools you would otherwise
                install plugins for.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-start">
                <StratButton
                  variant="primary"
                  size="large"
                  href={`${site.docsPath}/getting-started`}
                  isArrow
                >
                  <BookOpenIcon className="w-5 h-5" /> Get Started
                </StratButton>

                <div className="flex flex-col items-center gap-2">
                  <StratButton
                    variant="quaternary"
                    size="large"
                    href={githubUrl}
                    external
                  >
                    <GitHubIcon /> Star on GitHub
                  </StratButton>
                  <GitHubStats />
                </div>
              </div>
            </div>

            <div className="lg:pl-4">
              <SafariBrowser
                src="/panelscreenshots/stratosphere-server.png"
                width={1920}
                height={1080}
                alt={`${site.name} server management interface`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* pillars */}
      <section className="relative w-full border-t border-white/5 bg-[#09090b]">
        <div className="container mx-auto px-6 py-20 md:py-24">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.label}
                className="rounded-2xl border border-white/5 bg-white/[0.015] p-6 transition-colors hover:border-white/10"
              >
                <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  {pillar.icon}
                </div>
                <p className="font-display text-4xl font-extrabold tracking-[-0.03em] text-white">
                  {pillar.value}
                </p>
                <p className="mt-1 text-sm font-medium text-brand">
                  {pillar.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/40">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* highlights */}
      <section className="w-full border-t border-white/5 bg-[#09090b]">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="mb-4 text-sm font-medium text-white/40">
                Why {site.name}
              </p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                The tools a Minecraft server actually needs
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-white/50">
                Everything below is part of the panel. No marketplace add-ons,
                no third-party scripts glued onto the file manager.
              </p>

              <div className="mt-8">
                <StratButton
                  variant="quaternary"
                  href={`${site.docsPath}/features`}
                  isArrow
                >
                  Browse the features
                </StratButton>
                <StratButton
                  variant="quaternary"
                  href={`${site.docsPath}/comparison`}
                >
                  Compare with other panels
                </StratButton>
              </div>
            </div>

            <ol className="divide-y divide-white/5 border-y border-white/5">
              {highlights.map((highlight, index) => (
                <li
                  key={highlight.title}
                  className="group flex gap-6 py-6 transition-colors"
                >
                  <span className="font-mono text-sm text-white/25 group-hover:text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-brand">{highlight.icon}</span>
                      <h3 className="font-display font-semibold text-white">
                        {highlight.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">
                      {highlight.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* install */}
      <section className="w-full border-t border-white/5 bg-[#09090b]">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-2 font-mono text-xs text-white/30">
                  /var/www/pterodactyl
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/70">
                <code>
                  <span className="text-white/30"># back up, then extract the release over your panel</span>
                  {`\n`}
                  <span className="text-brand">curl -L</span>
                  {` https://github.com/${site.github.owner}/${site.github.repo}/releases/download/nightly/panel.tar.gz | `}
                  <span className="text-brand">sudo tar -xzv</span>
                  {`\n`}
                  <span className="text-brand">sudo composer install</span>
                  {` --no-dev --optimize-autoloader\n`}
                  <span className="text-brand">sudo php artisan migrate</span>
                  {` --seed --force\n`}
                  <span className="text-brand">sudo php artisan queue:restart</span>
                </code>
              </pre>
            </div>

            <div>
              <p className="mb-4 text-sm font-medium text-white/40">
                Install or update
              </p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                On top of a normal{" "}
                <span className="text-brand">Pterodactyl</span> setup
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-white/50">
                Get a base panel and Wings running with any Pterodactyl guide or
                community installer, then extract a Stratosphere archive over
                it. The archive never touches your{" "}
                <code className="font-mono text-brand">.env</code>, your
                database or your server files.
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-white/50">
                Only want the newest interface?{" "}
                <code className="font-mono text-brand">
                  php artisan p:update-ui
                </code>{" "}
                swaps the interface folders and keeps a rollback copy.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <StratButton
                  variant="primary"
                  href={`${site.docsPath}/getting-started/installation`}
                  isArrow
                >
                  Installation Guide
                </StratButton>
                <StratButton
                  variant="quaternary"
                  href={`${site.docsPath}/getting-started/updating`}
                >
                  Updating
                </StratButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* open source */}
      <section className="w-full border-t border-white/5 bg-[#09090b]">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 text-sm font-medium text-white/40">
                Transparent development
              </p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                Fully <span className="text-brand">open source</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-white/50">
                The panel is public and MIT licensed. Audit it, contribute to
                it, or extend it without touching its files using{" "}
                <a
                  href={`${site.docsPath}/admin/extensions`}
                  className="text-brand hover:underline"
                >
                  extensions
                </a>
                . The Wings fork, the router and the helper plugin are open too.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <StratButton variant="quaternary" href={githubUrl} external>
                  <GitHubIcon /> View on GitHub
                </StratButton>
                <StratButton variant="quaternary" href={wingsUrl} external>
                  <BoltIcon className="w-5 h-5" /> Stratosphere Wings
                </StratButton>
              </div>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/40">
                Curious how it lines up against Pterodactyl, Pelican or
                Hydrodactyl?{" "}
                <a
                  href={`${site.docsPath}/comparison`}
                  className="text-brand hover:underline"
                >
                  Read the full comparison
                </a>
                .
              </p>
            </div>

            <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-black/60 lg:block">
              <div className="border-b border-white/5 bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-white/30">
                console output · the helper talking to the panel
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/40">
                <code>
                  <span className="text-green-400/70">
                    [17:23:31 INFO]: [Stratosphere] ::stratpanel:: {"{"}&quot;event&quot;:&quot;handshake&quot;,&quot;version&quot;:&quot;1.0.0&quot;,&quot;protocol&quot;:9{"}"}
                  </span>
                  {`\n`}
                  <span className="text-green-400/70">
                    [17:23:31 INFO]: [Stratosphere] ::stratpanel:: {"{"}&quot;event&quot;:&quot;players&quot;,&quot;players&quot;:[{"{"}&quot;name&quot;:&quot;Steve&quot;{"}"}]{"}"}
                  </span>
                  {`\n`}
                  <span className="text-white/30">
                    [17:23:40 INFO]: Steve joined the game
                  </span>
                  {`\n`}
                  <span className="text-green-400/70">
                    [17:23:40 INFO]: [Stratosphere] ::stratpanel:: {"{"}&quot;event&quot;:&quot;player-join&quot;,&quot;name&quot;:&quot;Steve&quot;{"}"}
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="w-full border-t border-white/5 bg-[#09090b]">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="brand-glow relative overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center md:px-16">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/50">
              Install {site.name} over your panel, point Wings at it, and manage
              your Minecraft servers from one place.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <StratButton
                variant="primary"
                size="large"
                href={`${site.docsPath}/getting-started/installation`}
                isArrow
              >
                <BookOpenIcon className="w-5 h-5" /> Read the Docs
              </StratButton>
              <StratButton variant="quaternary" size="large" href={githubUrl} external>
                <GitHubIcon /> View Source
              </StratButton>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/40">
              <span className="inline-flex items-center gap-2">
                <DocumentTextIcon className="w-4 h-4 text-brand" /> MIT licensed
              </span>
              <a
                href={`${site.docsPath}/developing`}
                className="inline-flex items-center gap-2 transition-colors hover:text-brand"
              >
                <CodeBracketIcon className="w-4 h-4 text-brand" /> Developer docs
              </a>
              <a
                href={`${site.docsPath}/changelog`}
                className="inline-flex items-center gap-2 transition-colors hover:text-brand"
              >
                <ArrowPathRoundedSquareIcon className="w-4 h-4 text-brand" /> Changelog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="w-full border-t border-white/5 bg-[#09090b]">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
          <div className="flex items-center gap-3">
            <StratosphereLogo className="h-6 w-6 text-brand" />
            <span className="text-sm text-white/40">
              © {new Date().getFullYear()} {site.name} and its contributors.
              Not affiliated with Pterodactyl.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={site.docsPath}
              className="text-sm text-white/40 transition-colors hover:text-brand"
            >
              Documentation
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 transition-colors hover:text-brand"
            >
              GitHub
            </a>
            <a
              href={`${githubUrl}/blob/1.0-develop/LICENSE.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 transition-colors hover:text-brand"
            >
              License
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Page;
