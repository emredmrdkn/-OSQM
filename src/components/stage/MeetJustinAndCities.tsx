'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const StageMeetJustinAndCities: React.FC = () => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const cityPostcards = [
    {
      name: 'Sydney',
      image: '/images/design/city-sydney.jpg',
      rotation: '-1deg',
    },
    {
      name: 'London',
      image: '/images/design/city-london.jpg',
      rotation: '1deg',
    },
    {
      name: 'Toronto',
      image: '/images/design/city-toronto.jpg',
      rotation: '-1deg',
    },
    {
      name: 'Vancouver',
      image: '/images/design/city-vancouver.jpg',
      rotation: '1deg',
    },
    {
      name: 'New York',
      image: '/images/design/city-newyork.jpg',
      rotation: '-1deg',
    },
  ];

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsStoryModalOpen(false);
      }
    };
    if (isStoryModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isStoryModalOpen]);

  return (
    <section className="absolute top-[885px] left-0 w-[1024px] h-[320px] select-none pointer-events-auto">
      {/* 1. SOL SÜTUN: MEET JUSTIN METNİ (x 36, y 15, w 200, h 285) */}
      <div className="absolute left-[36px] top-[15px] w-[200px] flex flex-col justify-between h-[285px]">
        <div>
          <h3 className="font-[family-name:var(--font-marker)] text-[32px] font-black uppercase text-neutral-900 leading-none">
            Meet Justin.
          </h3>

          <div className="mt-3 font-[family-name:var(--font-jakarta)] text-[14.5px] font-medium text-neutral-800 leading-[1.3] space-y-0.5">
            <p>Justin works.</p>
            <p>Justin saves.</p>
            <p>Justin pays rent.</p>
            <p>Justin watches property</p>
            <p className="leading-tight">prices go up.</p>
            <p className="font-bold text-neutral-950 pt-0.5">Justin owns 0 SQM.</p>
          </div>

          <div className="w-12 h-[1.5px] bg-neutral-300 my-2.5 rounded-full" />

          <div className="font-[family-name:var(--font-jakarta)] text-[14px] text-neutral-700 leading-snug space-y-0.5">
            <p>Justin is doing great.</p>
            <p className="font-bold text-neutral-950">His landlord is doing better.</p>
          </div>
        </div>

        {/* Buton: Read Justin's story → */}
        <button
          type="button"
          onClick={() => setIsStoryModalOpen(true)}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="Read Justin's story"
          className="w-[172px] h-[36px] rounded-xl bg-[#FFD452] hover:bg-[#F5BF26] active:scale-95 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <span>Read Justin&apos;s story</span>
          <span className="text-sm font-bold transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* 2. ORTA SÜTUN: JUSTIN POLAROID (x 246, y 15, w 210, h 285) */}
      <div className="absolute left-[246px] top-[15px] w-[210px] h-[285px] flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[200px]">
          {/* Masking tape on top right */}
          <div className="absolute -top-3 right-4 w-20 h-6 masking-tape -rotate-6 z-20 pointer-events-none rounded-xs" />

          {/* Polaroid Card Frame */}
          <div className="bg-white p-2.5 pb-4 rounded-xs polaroid-card border border-neutral-200/80 -rotate-1 hover:rotate-0">
            {/* Photo container */}
            <div className="relative w-full h-[180px] overflow-hidden bg-neutral-100 rounded-xs">
              <Image
                src="/images/design/justin-polaroid.jpg"
                alt="Justin and Koogee the Corgi overlooking Sydney Harbour"
                fill
                unoptimized
                priority
                className="object-cover object-center"
                sizes="200px"
              />

              {/* Shirt doodle badge: 0 SQM OWNED + Sad House */}
              <div className="absolute bottom-2.5 right-2.5 bg-white/92 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs border border-neutral-300 -rotate-2 select-none pointer-events-none text-center">
                <div className="font-[family-name:var(--font-marker)] text-[10px] text-neutral-900 leading-none">0 SQM</div>
                <div className="font-[family-name:var(--font-marker)] text-[8px] text-neutral-700 leading-tight">OWNED</div>
                <svg className="w-3.5 h-3.5 mx-auto mt-0.5 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="14" r="0.8" fill="currentColor" />
                  <circle cx="15" cy="14" r="0.8" fill="currentColor" />
                  <path strokeLinecap="round" d="M10 18c.6-.7 1.4-1 2-1s1.4.3 2 1" />
                </svg>
              </div>
            </div>

            {/* Handwritten Quote Caption */}
            <div className="mt-2.5 text-center leading-tight">
              <p className="font-[family-name:var(--font-caveat)] text-neutral-900 text-[17px] font-bold tracking-wide -rotate-1">
                Still 0m²,
              </p>
              <p className="font-[family-name:var(--font-caveat)] text-neutral-900 text-[17px] font-bold tracking-wide -rotate-1">
                but never 0 hope.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SAĞ SÜTUN: SAME CITIES CARDS & FOOTER (x 472, y 15, w 520, h 285) */}
      <div className="absolute left-[472px] top-[15px] w-[520px] h-[285px] flex flex-col justify-between">
        {/* Başlık ve Sarı Fırça Çizgisi */}
        <div>
          <div className="inline-block relative">
            <h3 className="font-[family-name:var(--font-marker)] text-[23px] font-black uppercase text-neutral-900 leading-none tracking-normal">
              SAME CITIES. SAME RESULT.
            </h3>
            {/* Sarı fırça alt çizgi SVG */}
            <svg className="w-full h-2.5 mt-1 text-[#FFD452]" viewBox="0 0 320 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7.5C65 3.5 180 2 317 6.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* 5 Şehir Polaroid Kartı Tek Sırada */}
        <div className="flex gap-2.5 items-start justify-between">
          {cityPostcards.map((city, idx) => (
            <div
              key={idx}
              className="w-[94px] bg-white p-1.5 pb-2.5 rounded-xs polaroid-card border border-neutral-200/80 flex flex-col items-center cursor-pointer origin-top-center"
              style={{ transform: `rotate(${city.rotation})` }}
            >
              {/* Fotoğraf */}
              <div className="relative w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  unoptimized
                  priority
                  className="object-cover"
                  sizes="94px"
                />
              </div>

              {/* Şehir Adı */}
              <h4 className="font-[family-name:var(--font-jakarta)] font-bold text-neutral-800 text-[11px] leading-none mt-1.5 mb-1 text-center">
                {city.name}
              </h4>

              {/* Sarı 0 SQM etiketi */}
              <span className="inline-block font-[family-name:var(--font-marker)] text-[9.5px] text-neutral-950 bg-[#FFD452] px-2 py-0.5 rounded-xs shadow-2xs -rotate-1">
                0 SQM
              </span>
            </div>
          ))}
        </div>

        {/* Alt Satır: El Yazısı Alıntı ve Gülen Yüz İkonu */}
        <div className="flex items-end justify-between pt-1">
          {/* El yazısı blok + kavisli alt çizgi */}
          <div className="relative pl-1 select-none">
            <div className="font-[family-name:var(--font-caveat)] text-[19px] text-neutral-900 font-bold leading-[1.15] -rotate-3">
              <p>Big cities.</p>
              <p className="pl-2">Bigger dreams.</p>
              <p className="pl-4">Same result.</p>
            </div>
            {/* Kavisli alt çizgi SVG */}
            <svg className="w-18 h-2 ml-10 mt-0.5 text-neutral-900" viewBox="0 0 80 10" fill="none">
              <path d="M3 6.5C24 3.5 54 2.5 77 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Daire içinde gülen yüz ikonu */}
          <div className="pr-1 pb-0.5">
            <div
              className="w-10 h-10 rounded-full border-[2.2px] border-neutral-900 flex items-center justify-center text-neutral-900 bg-white/40 hover:rotate-12 transition-transform duration-200 cursor-pointer shadow-2xs"
              title="Keep smiling :)"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9.5" />
                <circle cx="9" cy="9.5" r="0.75" fill="currentColor" />
                <circle cx="15" cy="9.5" r="0.75" fill="currentColor" />
                <path d="M8 14.5s1.5 2.5 4 2.5 4-2.5 4-2.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== JUSTIN'S STORY POPUP MODAL ==================== */}
      {isStoryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsStoryModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF8F5] max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-300 relative animate-in zoom-in-95 duration-200"
          >
            {/* Kapat Butonu */}
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(false)}
              aria-label="Close story modal"
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900 p-1 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="font-[family-name:var(--font-marker)] text-2xl text-neutral-900 mb-2">
              JUSTIN&apos;S STORY
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-4">
              Sydney • London • Toronto • Vancouver • New York
            </p>

            <div className="space-y-3 text-neutral-700 text-sm leading-relaxed font-[family-name:var(--font-jakarta)]">
              <p>
                Across the world&apos;s most vibrant metropolitan cities, average housing costs have skyrocketed by over <strong>300%</strong> compared to median salaries over the past two decades.
              </p>
              <p>
                Justin works 50 hours a week, saves every month, and lives responsibly. Yet in every major city, the dream of owning a home drifts further away each year.
              </p>
              <div className="bg-[#FFD452]/25 border-l-4 border-[#FFD452] p-3 rounded-r-lg font-medium text-neutral-900">
                &ldquo;The average young professional now needs 24 years just to save a standard 20% downpayment in these 5 cities.&rdquo;
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsStoryModalOpen(false)}
                className="bg-neutral-950 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
