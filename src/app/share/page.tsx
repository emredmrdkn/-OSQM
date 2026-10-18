import type { Metadata } from 'next';
import { Suspense } from 'react';
import ClientRedirect from './ClientRedirect';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface Props {
  searchParams: SearchParams;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.0sqm.com';

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const type = typeof params.type === 'string' ? params.type : undefined;

  if (type === 'listing') {
    const suburb = typeof params.suburb === 'string' ? params.suburb : 'Surry Hills';
    const rent = typeof params.rent === 'string' ? params.rent : '700';
    const score = typeof params.score === 'string' ? params.score : '83';
    const label = typeof params.label === 'string' ? params.label : 'Rare W';
    const prem = typeof params.prem === 'string' ? params.prem : '';
    const beds = typeof params.beds === 'string' ? params.beds : '1';
    const burden = typeof params.burden === 'string' ? params.burden : '';
    const upfront = typeof params.upfront === 'string' ? params.upfront : '';

    const ogParams = new URLSearchParams({
      suburb,
      rent,
      score,
      label,
      prem,
      beds,
      burden,
      upfront,
    });

    const ogImageUrl = `${siteUrl}/api/og/listing?${ogParams.toString()}`;
    const title = `${suburb} Rental Reality Check: $${rent}/wk (Score ${score}/100) | $0SQM`;
    const description = `${suburb}, NSW: $${rent}/week${prem ? ` · ${prem}` : ''} · Reality Score ${score}/100 (${label}). Upfront bond: ${upfront || '$' + (Number(rent) * 6).toLocaleString()}. Check your rental on $0SQM.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${siteUrl}/share?type=listing&${ogParams.toString()}`,
        type: 'website',
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${suburb} Listing Reality Check Card`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImageUrl],
        site: '@Own0SQM',
        creator: '@Own0SQM',
      },
    };
  }

  // Default savings check metadata
  return {
    title: '$0SQM — The Australian Dream Still Starts at 0m²',
    description: 'Calculate how many microscopic square metres your life savings affords in Sydney and beyond. Real data. Real prices. Same result.',
    openGraph: {
      title: '$0SQM — The Australian Dream Still Starts at 0m²',
      description: 'Real data. Real prices. Same result. Calculate your square metres in Sydney.',
      images: [
        {
          url: 'https://0sqm.com/images/og-card.jpg',
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
      images: ['https://0sqm.com/images/og-card.jpg'],
      site: '@Own0SQM',
      creator: '@Own0SQM',
    },
  };
}

export default async function SharePage({ searchParams }: Props) {
  const params = await searchParams;
  const type = typeof params.type === 'string' ? params.type : undefined;

  if (type === 'listing') {
    const suburb = typeof params.suburb === 'string' ? params.suburb : 'Sydney';
    const rent = typeof params.rent === 'string' ? params.rent : '750';
    const score = typeof params.score === 'string' ? params.score : '83';
    const label = typeof params.label === 'string' ? params.label : 'Rare W';
    const prem = typeof params.prem === 'string' ? params.prem : '';

    return (
      <div className="min-h-screen bg-[#F8F6F0] text-[#141414] flex flex-col items-center justify-center p-4 font-mono">
        <Suspense fallback={null}>
          <ClientRedirect />
        </Suspense>

        <div className="max-w-md w-full bg-white border-2 border-neutral-950 p-6 text-center shadow-[6px_6px_0px_#141414]">
          <h1 className="text-2xl font-black mb-1">
            $<span className="text-[#FFE600] bg-neutral-950 px-1 py-0.5 rounded-xs mr-0.5">0</span>SQM
          </h1>
          <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-4">
            LISTING REALITY CHECK
          </p>

          <div className="bg-neutral-50 border border-neutral-300 p-4 rounded-xs mb-5">
            <p className="text-xl font-black text-neutral-950">
              {suburb}, NSW
            </p>
            <p className="text-base font-bold text-neutral-800 mt-1">
              ${rent} / week {prem ? `(${prem})` : ''}
            </p>
            <div className="mt-3 pt-3 border-t border-neutral-200">
              <span className="text-xs uppercase font-bold text-neutral-500">Reality Score</span>
              <p className="text-2xl font-black text-neutral-950 mt-0.5">
                {score}/100 <span className="text-sm font-bold text-neutral-700">({label})</span>
              </p>
            </div>
          </div>

          <a
            href="/listing-reality"
            className="inline-flex items-center justify-center w-full py-3 px-6 bg-[#FFE600] font-black text-xs uppercase tracking-wider text-neutral-950 border-2 border-neutral-950 shadow-[2px_2px_0px_#141414] hover:bg-yellow-400 transition-all"
          >
            Check Your Own Rental Listing →
          </a>
        </div>
      </div>
    );
  }

  const city = typeof params.city === 'string' ? params.city : 'Sydney';
  const state = typeof params.state === 'string' ? params.state : 'NSW';
  const sqm = typeof params.sqm === 'string' ? params.sqm : '0.00';

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#141414] flex flex-col items-center justify-center p-4">
      <Suspense fallback={null}>
        <ClientRedirect />
      </Suspense>

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-[#E6E2D8] p-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black mb-2">
          $<span className="text-[#FFD452]">0</span>SQM Reality Score
        </h1>
        <p className="text-sm text-neutral-600 mb-6">
          {city}, {state} &bull; {sqm} m² in theory &bull; 0 m² in reality
        </p>

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
