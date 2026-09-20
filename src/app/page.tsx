import type { Metadata } from 'next';
import V2Page from './v2/page';

export const metadata: Metadata = {
  title: '$0SQM — The Australian Dream Still Starts at 0m²',
  description: 'Real data. Real prices. Same result. The viral Australian housing reality check.',
  openGraph: {
    title: '$0SQM — The Australian Dream Still Starts at 0m²',
    description: 'The Australian dream still starts at zero square metres. Same dream. Different budget.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Own0SQM',
    creator: '@Own0SQM',
  },
};

export default function HomePage() {
  return <V2Page />;
}

