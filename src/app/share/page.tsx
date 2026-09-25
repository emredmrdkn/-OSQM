import type { Metadata } from 'next';
import ClientRedirect from './ClientRedirect';

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

function sanitize(val: string | undefined, maxLen = 40, fallback = ''): string {
  if (!val) return fallback;
  return val.replace(/[<>"'&]/g, '').trim().slice(0, maxLen);
}

function buildQuery(params: {
  city: string;
  state: string;
  sqm: string;
  savings: string;
  currency: string;
  symbol: string;
}): string {
  const q = new URLSearchParams();
  q.set('city', params.city);
  q.set('state', params.state);
  q.set('sqm', params.sqm);
  q.set('savings', params.savings);
  q.set('currency', params.currency);
  q.set('symbol', params.symbol);
  return q.toString();
}

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://0sqm.com.au';
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const raw = await searchParams;
  const city = sanitize(raw.city, 30, 'Sydney');
  const state = sanitize(raw.state, 10, 'NSW');
  const sqm = sanitize(raw.sqm, 12, '0.00');
  const savings = sanitize(raw.savings, 15, '25,000');
  const currency = sanitize(raw.currency, 8, 'AUD');
  const symbol = sanitize(raw.symbol, 4, '$');

  const siteUrl = getSiteUrl();
  const query = buildQuery({ city, state, sqm, savings, currency, symbol });
  const canonicalUrl = `${siteUrl}/share?${query}`;
  const ogImageUrl = `${siteUrl}/api/og?${query}`;

  const title = `My ${city} Reality Score: 0 SQM`;
  const description = `${sqm}m² in theory. 0m² in reality.`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${title} | $0SQM`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
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
      title,
      description,
      site: '@Own0SQM',
      creator: '@Own0SQM',
      images: [ogImageUrl],
    },
  };
}

export default async function SharePage({ searchParams }: Props) {
  const raw = await searchParams;
  const city = sanitize(raw.city, 30, 'Sydney');
  const state = sanitize(raw.state, 10, 'NSW');
  const sqm = sanitize(raw.sqm, 12, '0.00');
  const savings = sanitize(raw.savings, 15, '25,000');
  const currency = sanitize(raw.currency, 8, 'AUD');
  const symbol = sanitize(raw.symbol, 4, '$');

  const query = buildQuery({ city, state, sqm, savings, currency, symbol });
  const ogImageUrl = `/api/og?${query}`;

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#141414] flex flex-col items-center justify-center p-4">
      {/* Client-side redirect: sends human browsers to /#reality, while Twitterbot/crawlers read the server HTML */}
      <ClientRedirect />

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-[#E6E2D8] p-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black mb-2">
          $<span className="text-[#FFD452]">0</span>SQM Reality Score
        </h1>
        <p className="text-sm text-neutral-600 mb-6">
          {city}, {state} · {sqm} m² in theory · 0 m² in reality
        </p>

        {/* Dynamic Card Preview */}
        <div className="rounded-xl overflow-hidden border border-[#E6E2D8] shadow-sm mb-6 bg-[#FAF9F5]">
          <img
            src={ogImageUrl}
            alt={`$0SQM Reality Score - ${city}`}
            className="w-full h-auto object-contain"
          />
        </div>

        <a
          href="/#reality"
          className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-full bg-[#FFD452] font-black text-sm tracking-wide text-[#141414] shadow-[0_4px_0_rgba(20,20,20,0.16)] hover:brightness-105 transition-all"
        >
          Check How Much You Can Afford →
        </a>
      </div>
    </div>
  );
}
