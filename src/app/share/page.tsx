'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ClientRedirect from './ClientRedirect';

function ShareContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  if (type === 'listing') {
    const suburb = searchParams.get('suburb') || 'Sydney';
    const rent = searchParams.get('rent') || '750';
    const score = searchParams.get('score') || '42';
    const label = searchParams.get('label') || 'Market Reality';

    return (
      <div className="min-h-screen bg-[#F8F6F0] text-[#141414] flex flex-col items-center justify-center p-4 font-mono">
        <ClientRedirect />

        <div className="max-w-md w-full bg-white border-2 border-neutral-950 p-6 text-center shadow-[6px_6px_0px_#141414]">
          <h1 className="text-2xl font-black mb-1">
            $<span className="text-[#FFE600] bg-neutral-950 px-1 py-0.5 rounded-xs mr-0.5">0</span>SQM
          </h1>
          <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-4">
            LISTING REALITY CHECK
          </p>

          <div className="bg-neutral-50 border border-neutral-300 p-4 rounded-xs mb-5">
            <p className="text-lg font-black text-neutral-950">
              {suburb}: ${rent} / week
            </p>
            <p className="text-sm font-bold text-neutral-700 mt-1">
              Reality Score: <span className="text-black font-black">{score}/100</span> ({label})
            </p>
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

  const city = searchParams.get('city') || 'Sydney';
  const state = searchParams.get('state') || 'NSW';
  const sqm = searchParams.get('sqm') || '0.00';

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#141414] flex flex-col items-center justify-center p-4">
      <ClientRedirect />

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-[#E6E2D8] p-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black mb-2">
          $<span className="text-[#FFD452]">0</span>SQM Reality Score
        </h1>
        <p className="text-sm text-neutral-600 mb-6">
          {city}, {state} · {sqm} m² in theory · 0 m² in reality
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

export default function SharePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F6F0]" />}>
      <ShareContent />
    </Suspense>
  );
}
