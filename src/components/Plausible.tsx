'use client';

import { useEffect } from 'react';
import { site } from '@/lib/site';

export default function Plausible() {
  useEffect(() => {
    import('@plausible-analytics/tracker').then(({ init }) => {
      init({
        domain: new URL(site.url).host,
        endpoint: 'https://plausible.prpl.wtf/api/event',
      });
    });
  }, []);

  return null;
}
