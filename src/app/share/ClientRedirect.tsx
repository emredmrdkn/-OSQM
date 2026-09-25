'use client';

import { useEffect } from 'react';

export default function ClientRedirect() {
  useEffect(() => {
    // Client-side redirect for human visitors so Twitterbot/crawlers can see the metadata in raw HTML
    window.location.replace('/#reality');
  }, []);

  return null;
}
