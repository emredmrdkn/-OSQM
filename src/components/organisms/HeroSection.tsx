'use client';

import React from 'react';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';

export const HeroSection: React.FC = () => {
  const { openShareModal } = useAppStore();

  return (
    <section className="relative w-full h-full min-h-0 flex flex-col justify-between px-3 sm:px-6 py-1 lg:py-1.5 overflow-hidden">
      {/* Top Content Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 shrink-0 mb-1">
        <div className="space-y-0.5">
          <div className="flex items-center gap-3">
            <h1 className="font-[family-name:var(--font-marker)] text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-none tracking-tight text-[#141414]">
              $<span className="text-[#FFE600] drop-shadow-[1px_1px_0px_#141414]">0</span>SQM
            </h1>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-[family-name:var(--font-bebas)] text-lg sm:text-xl lg:text-2xl font-black tracking-wide text-[#141414]">
                THE AUSTRALIAN DREAM STILL STARTS AT
              </span>
              <span className="bg-[#FFE600] text-[#141414] font-[family-name:var(--font-bebas)] text-lg sm:text-xl lg:text-2xl font-black px-2 py-0.2 rounded-md shadow-xs">
                0m²
              </span>
            </div>
          </div>

          <p className="font-[family-name:var(--font-jakarta)] text-xs lg:text-[13px] text-gray-700 max-w-2xl font-medium leading-tight">
            Justin works. Justin saves. Justin pays rent. Justin watches property prices go up. Justin owns 0 SQM. Same dream. Different budget.
          </p>
        </div>

        <div className="shrink-0 self-start sm:self-auto">
          <button
            onClick={openShareModal}
            className="rounded-full bg-[#FFE600] px-4 py-1.5 text-xs font-bold text-[#141414] shadow-xs transition-all hover:bg-[#F5DC00] hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Follow the journey on X →
          </button>
        </div>
      </div>

      {/* Justin & Corgi Cover Photo Banner with Real HTML Handwritten Notes */}
      <div className="relative w-full flex-1 min-h-[140px] sm:min-h-[180px] overflow-hidden rounded-xl border border-gray-200 shadow-xs">
        <Image
          src="/images/hero-sydney.jpg"
          alt="Justin and Koogee the Corgi looking over Sydney Harbour"
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="(max-width: 1720px) 100vw, 1600px"
        />

        {/* Top Right Handwritten Annotation */}
        <div className="absolute top-2 right-3 sm:top-3 sm:right-5 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] text-right pointer-events-none">
          <p className="font-[family-name:var(--font-caveat)] text-lg sm:text-2xl lg:text-3xl font-black text-white leading-tight rotate-[3deg]">
            Good views. Better plans. ☺
          </p>
        </div>

        {/* Bottom Right Handwritten Annotation */}
        <div className="absolute bottom-2 right-3 sm:bottom-3 sm:right-5 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] text-right pointer-events-none">
          <p className="font-[family-name:var(--font-caveat)] text-sm sm:text-xl lg:text-2xl font-bold text-white leading-tight rotate-[-2deg]">
            Same sky. Same dream.<br className="hidden sm:inline" /> Different budget.
          </p>
        </div>
      </div>
    </section>
  );
};
