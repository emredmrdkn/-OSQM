'use client';

import React from 'react';
import Image from 'next/image';
import { Tape } from '@/components/atoms/Tape';

export const GlobalCitiesGrid: React.FC = () => {
  const cityPostcards = [
    {
      name: 'Sydney',
      country: 'Australia',
      flag: '🇦🇺',
      imageSrc: '/images/cities/sydney.jpg',
      rotation: 'rotate-1',
      tapeVariant: 'clear' as const,
      tapePos: 'top-right' as const,
      caption: 'Different cities.\nSame feeling.',
    },
    {
      name: 'London',
      country: 'United Kingdom',
      flag: '🇬🇧',
      imageSrc: '/images/cities/london.jpg',
      rotation: '-rotate-1',
      tapeVariant: 'kraft' as const,
      tapePos: 'top' as const,
      caption: 'Expensive\neverywhere.',
    },
    {
      name: 'Toronto',
      country: 'Canada',
      flag: '🇨🇦',
      imageSrc: '/images/cities/toronto.jpg',
      rotation: 'rotate-2',
      tapeVariant: 'yellow' as const,
      tapePos: 'top-left' as const,
      caption: 'Dreams for later.\nMemes for now.',
    },
    {
      name: 'Vancouver',
      country: 'Canada',
      flag: '🇨🇦',
      imageSrc: '/images/cities/vancouver.jpg',
      rotation: '-rotate-2',
      tapeVariant: 'clear' as const,
      tapePos: 'top-right' as const,
      caption: 'Rain & rent.\nNothing else.',
    },
    {
      name: 'New York',
      country: 'United States',
      flag: '🇺🇸',
      imageSrc: '/images/cities/new-york.jpg',
      rotation: 'rotate-1',
      tapeVariant: 'kraft' as const,
      tapePos: 'top' as const,
      caption: 'Concrete jungle.\n0 m² owned.',
    },
  ];

  return (
    <section className="bg-[#F8F6F0] py-12 md:py-16 border-t border-[#E5E2D9]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#141414]">
              SAME CITIES. SAME RESULT.
            </h2>
            <p className="font-[family-name:var(--font-caveat)] text-2xl font-bold text-gray-700 mt-1 rotate-[-1deg]">
              Big cities. Bigger dreams. Same result. ☺
            </p>
          </div>

          <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mt-2 sm:mt-0">
            GLOBAL HOUSING REALITY AUDIT // 5 METROS
          </span>
        </div>

        {/* 5 City Postcards Horizontal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {cityPostcards.map((city, idx) => (
            <div
              key={idx}
              className={`relative ${city.rotation} rounded-sm bg-white p-2.5 pb-4 shadow-md border border-gray-100 hover:rotate-0 hover:scale-105 transition-all duration-200 flex flex-col justify-between`}
            >
              <Tape variant={city.tapeVariant} position={city.tapePos} className="-top-3 z-10" />

              <div>
                <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100 rounded-xs">
                  <Image
                    src={city.imageSrc}
                    alt={city.name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  {/* 0 SQM Stamp Badge */}
                  <div className="absolute bottom-2 right-2 bg-[#FFE600] border border-[#141414] px-1.5 py-0.5 font-[family-name:var(--font-bebas)] text-xs font-black text-[#141414] shadow-xs rotate-[-3deg]">
                    0 SQM
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#141414]">
                    {city.name}
                  </h4>
                  <span className="text-xs" title={city.country}>
                    {city.flag}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-center font-[family-name:var(--font-caveat)] text-xs font-bold text-gray-700 leading-tight whitespace-pre-line">
                {city.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
