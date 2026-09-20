import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{
    city?: string;
    state?: string;
    sqm?: string;
    savings?: string;
    currency?: string;
    symbol?: string;
    note?: string;
  }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const city = params.city || 'Sydney';
  const state = params.state || 'NSW';
  const sqm = params.sqm || '0.00';
  const savings = params.savings || '25,000';
  const symbol = params.symbol || '$';
  const currency = params.currency || 'AUD';
  const note = params.note || 'Different city. Same portfolio.';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://0sqm.com.au';

  const ogImageUrl = `${siteUrl}/api/og?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&sqm=${encodeURIComponent(sqm)}&savings=${encodeURIComponent(savings)}&currency=${encodeURIComponent(currency)}&symbol=${encodeURIComponent(symbol)}&note=${encodeURIComponent(note)}`;

  return {
    title: `My ${city} Reality Score: 0 SQM | $0SQM`,
    description: `${sqm}m² in theory. 0m² in reality. Different city. Same portfolio. 🙂 #0SQM`,
    openGraph: {
      title: `My ${city} Reality Score: 0 SQM`,
      description: `${sqm}m² in theory. 0m² in reality. Different city. Same portfolio. 🙂 #0SQM`,
      type: 'website',
      url: `${siteUrl}/share`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `$0SQM Reality Score Card - ${city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `My ${city} Reality Score: 0 SQM`,
      description: `${sqm}m² in theory. 0m² in reality. Different city. Same portfolio. 🙂 #0SQM`,
      site: '@Own0SQM',
      creator: '@Own0SQM',
      images: [ogImageUrl],
    },
  };
}

export default function SharePage() {
  // When a user clicks through the card from Twitter/X, redirect them to the interactive calculator
  redirect('/v2#reality');
}
