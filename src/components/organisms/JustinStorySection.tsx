'use client';

import React from 'react';
import Image from 'next/image';
import { Tape } from '@/components/atoms/Tape';

export const JustinStorySection: React.FC = () => {
  return (
    <section id="meet-justin" className="bg-[#F8F6F0] py-12 md:py-16 border-t border-[#E5E2D9]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Parça 7: Meet Justin White Container Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Story Text & Yellow CTA (md:col-span-7) */}
            <div className="md:col-span-7 space-y-6">
              <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl font-black uppercase tracking-tight text-[#141414]">
                MEET JUSTIN.
              </h2>

              <div className="space-y-1.5 font-[family-name:var(--font-jakarta)] text-base text-gray-800 leading-relaxed font-medium">
                <p>Justin works.</p>
                <p>Justin saves.</p>
                <p>Justin pays rent.</p>
                <p>Justin watches property prices go up.</p>
                <p className="font-bold text-[#141414]">Justin owns 0 SQM.</p>
                <p className="py-2 text-gray-400">—</p>
                <p>Justin is doing great.</p>
                <p className="font-bold text-[#141414]">His landlord is doing better.</p>
              </div>

              <div>
                <button className="rounded-full bg-[#FFE600] px-6 py-3 text-xs font-bold text-[#141414] shadow-xs transition-all hover:bg-[#F5DC00] hover:scale-105 active:scale-95 cursor-pointer">
                  Read Justin&apos;s story →
                </button>
              </div>
            </div>

            {/* Right Column: Taped Polaroid Photo of Justin & Koogee (md:col-span-5) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative -rotate-2 rounded-sm bg-white p-3.5 pb-7 shadow-lg border border-gray-100 max-w-xs w-full transition-transform hover:rotate-0 duration-200">
                <Tape variant="kraft" position="top-left" className="-top-3 left-4 z-10" />
                <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100 rounded-xs">
                  <Image
                    src="/images/justin-corgi-harbour.jpg"
                    alt="Justin and Koogee looking over Sydney Harbour"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
                <p className="mt-3 text-center font-[family-name:var(--font-caveat)] text-base font-bold text-gray-800 leading-tight">
                  Still 0m², but never 0 hope. ☺
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
