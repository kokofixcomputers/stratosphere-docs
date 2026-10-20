'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { useSearchContext } from 'fumadocs-ui/provider';
import StratosphereLogo from '@/components/ui/StratosphereLogo';
import { githubUrl, site } from '@/lib/site';

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export function Navbar() {
  const pathname = usePathname();
  const { setOpenSearch } = useSearchContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border transition-all duration-300 ease-out ${
          scrolled
            ? 'border-white/10 bg-[#18181b]/70 px-4 py-2.5 shadow-xl shadow-black/40 backdrop-blur-2xl backdrop-saturate-150'
            : 'border-transparent bg-transparent px-2 py-2'
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white transition-colors hover:text-brand"
        >
          <StratosphereLogo className="h-6 w-6 shrink-0 text-brand" />
          <span className="font-display text-[15px] font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href={site.docsPath}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              pathname?.startsWith('/docs')
                ? 'bg-brand/10 text-brand'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <BookOpenIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Docs</span>
          </Link>

          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
          >
            <GitHubIcon />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
        </div>

        <button
          onClick={() => setOpenSearch(true)}
          className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] py-1.5 pl-3 pr-2 text-sm text-white/40 transition-all hover:border-white/10 hover:bg-white/[0.06] hover:text-white/60"
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
          <span className="hidden text-white/40 md:inline">Search...</span>
          <kbd className="hidden rounded border border-white/[0.06] bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/30 md:inline">
            Ctrl K
          </kbd>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
