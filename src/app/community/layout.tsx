import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0sqm.com';

export const metadata: Metadata = {
  title: '0SQM Community — Global Housing Reality Check Leaderboard',
  description: 'See how cities around the world compare in the housing reality check. Sydney, London, Toronto, Tokyo, Melbourne and more.',
  alternates: {
    canonical: `${siteUrl}/community`,
  },
  openGraph: {
    title: '0SQM Community — Global Housing Reality Check Leaderboard',
    description: 'See how cities around the world compare in the housing reality check.',
    type: 'website',
    url: `${siteUrl}/community`,
    images: [
      {
        url: `${siteUrl}/images/og-card.jpg`,
        width: 1200,
        height: 630,
        alt: '$0SQM Community Leaderboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '0SQM Community — Global Housing Reality Check',
    description: 'See how cities around the world compare. Different cities. Same portfolio.',
    site: '@Own0SQM',
    creator: '@Own0SQM',
    images: [`${siteUrl}/images/og-card.jpg`],
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
