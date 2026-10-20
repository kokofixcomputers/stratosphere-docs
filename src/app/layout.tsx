import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import SearchDialog from '@/components/search';
import Plausible from '@/components/Plausible';
import { JetBrains_Mono, Manrope, Space_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { site } from '@/lib/site';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.shortDescription,
  icons: {
    icon: '/favicon.svg',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans flex flex-col min-h-screen bg-[#09090b]">
        <Plausible />
        <RootProvider
          search={{
            SearchDialog,
          }}
          theme={{
            enabled: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
