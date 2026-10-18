'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ClientRedirect() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'listing') {
      const suburb = searchParams.get('suburb') || '';
      const rent = searchParams.get('rent') || '';
      const beds = searchParams.get('beds') || '';
      window.location.replace(
        `/listing-reality?suburb=${encodeURIComponent(suburb)}&rent=${encodeURIComponent(rent)}&beds=${encodeURIComponent(beds)}`
      );
    } else {
      window.location.replace('/#reality');
    }
  }, [searchParams]);

  return null;
}
