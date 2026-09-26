import type { Metadata } from 'next';
import V2Page from './v2/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0sqm.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '$0SQM — The Australian Dream Still Starts at 0m²',
  description: 'Real data. Real prices. Same result. The viral Australian housing reality check.',
  openGraph: {
    title: '$0SQM — The Australian Dream Still Starts at 0m²',
    description: 'The Australian dream still starts at zero square metres. Same dream. Different budget.',
    type: 'website',
    images: [
      {
        url: '/images/reality-score-card.png',
        width: 1200,
        height: 630,
        alt: '$0SQM Reality Score Card',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '$0SQM — The Australian Dream Still Starts at 0m²',
    description: 'I saved $25,000 and officially own 0 SQM in Sydney. Same dream. Different budget.',
    site: '@Own0SQM',
    creator: '@Own0SQM',
    images: ['https://0sqm.com/images/reality-score-card.png'],
  },
};

export default function HomePage() {
  return <V2Page />;
}

