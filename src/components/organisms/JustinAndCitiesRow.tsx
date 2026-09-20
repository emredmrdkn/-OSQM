'use client';

import React from 'react';
import Image from 'next/image';
import { Tape } from '@/components/atoms/Tape';

export const JustinAndCitiesRow: React.FC = () => {
  const cities = [
    {
      name: 'Sydney',
      flag: '🇦🇺',
      image: '/images/hero-sydney.jpg',
      caption: 'Different cities.\nSame feeling.',
      rotation: 'rotate-1',
      tape: 'clear' as const,
    },
    {
      name: 'London',
      flag: '🇬🇧',
      image: '/images/inspection-brochure.jpg',
      caption: 'Expensive\neverywhere.',
      rotation: '-rotate-1',
      tape: 'kraft' as const,
    },
    {
      name: 'Toronto',
      flag: '🇨🇦',
      image: '/images/justin-corgi-harbour.jpg',
      caption: 'Dreams for later.\nMemes for now.',
      rotation: 'rotate-2',
      tape: 'yellow' as const,
    },
    {
      name: 'Vancouver',
      flag: '🇨🇦',
      image: '/images/laundry-listing.jpg',
      caption: 'Rain & rent.\nNothing else.',
      rotation: '-rotate-2',
      tape: 'clear' as const,
    },
    {
      name: 'New York',
      flag: '🇺🇸',
      image: '/images/justin-camping.jpg',
      caption: 'Concrete jungle.\n0 m² owned.',
      rotation: 'rotate-1',
      tape: 'kraft' as const,
    },
  ];

  return (
    <section className="w-full h-full min-h-0 px-3 sm:px-6 py-1 lg:py-1.5 flex flex-col justify-between overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 h-full items-stretch min-h-0">
        {/* Left: Meet Justin Card (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200 p-2.5 sm:p-3 shadow-xs flex items-center justify-between gap-3 h-full min-h-0 overflow-hidden">
          <div className="space-y-1.5 flex-1 min-w-0">
            <h3 className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#141414] leading-none">
              MEET JUSTIN.
            </h3>
            <div className="font-[family-name:var(--font-jakarta)] text-[11px] sm:text-xs text-gray-700 leading-tight space-y-0.5">
              <p>Justin works. Justin saves.</p>
              <p>Justin pays rent.</p>
              <p className="font-bold text-[#141414]">Justin owns 0 SQM.</p>
              <p className="font-medium text-gray-500">His landlord is doing better.</p>
            </div>
            <div>
              <button
                type="button"
                className="rounded-full bg-[#FFE600] px-3.5 py-1 text-[11px] font-bold text-[#141414] shadow-xs transition-all hover:bg-[#F5DC00] hover:scale-105 active:scale-95 cursor-pointer"
              >
                Read Justin&apos;s story →
              </button>
            </div>
          </div>

          {/* Right: Taped Polaroid */}
          <div className="relative shrink-0 w-24 sm:w-28 -rotate-2 rounded-sm bg-white p-1.5 pb-3 shadow-md border border-gray-100 hover:rotate-0 transition-transform">
            <Tape variant="kraft" position="top-left" className="-top-2 left-2 z-10" />
            <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100 rounded-xs">
              <Image
                src="/images/justin-corgi-harbour.jpg"
                alt="Justin and Renty"
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
            <p className="mt-1 text-center font-[family-name:var(--font-caveat)] text-[10px] font-bold text-gray-800 leading-none">
              Still 0m², never 0 hope. ☺
            </p>
          </div>
        </div>

        {/* Right: Same Cities. Same Result. (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200 p-2 sm:p-2.5 shadow-xs flex flex-col justify-between h-full min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-1 shrink-0">
            <h3 className="font-[family-name:var(--font-bebas)] text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tight text-[#141414] leading-none">
              SAME CITIES. SAME RESULT.
            </h3>
            <span className="font-[family-name:var(--font-caveat)] text-xs sm:text-sm font-bold text-gray-700 rotate-[-1deg]">
              Big cities. Bigger dreams. Same result. ☺
            </span>
          </div>

          {/* 5 City Postcards Horizontal Grid */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 flex-1 min-h-0 items-stretch">
            {cities.map((city, idx) => (
              <div
                key={idx}
                className={`relative ${city.rotation} rounded-sm bg-white p-1 pb-1.5 shadow-xs border border-gray-100 flex flex-col justify-between hover:rotate-0 hover:scale-105 transition-all duration-150 min-h-0`}
              >
                <Tape variant={city.tape} position="top" className="-top-1.5 left-1/2 -translate-x-1/2 z-10" />

                <div className="relative flex-1 min-h-[50px] w-full overflow-hidden bg-gray-100 rounded-xs">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                  {/* 0 SQM Stamp */}
                  <div className="absolute bottom-1 right-1 bg-[#FFE600] border border-[#141414] px-1 py-0 font-[family-name:var(--font-bebas)] text-[9px] font-black text-[#141414] shadow-xs rotate-[-3deg]">
                    0 SQM
                  </div>
                </div>

                <div className="mt-1 flex items-center justify-between px-0.5">
                  <span className="font-bold text-[10px] text-[#141414] truncate">
                    {city.name}
                  </span>
                  <span className="text-[10px]">{city.flag}</span>
                </div>

                <p className="mt-0.5 text-center font-[family-name:var(--font-caveat)] text-[9px] font-bold text-gray-600 leading-tight whitespace-pre-line truncate">
                  {city.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
