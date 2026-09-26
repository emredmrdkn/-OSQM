'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ClientRedirect from './ClientRedirect';

function ShareContent() {
  const searchParams = useSearchParams();
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
