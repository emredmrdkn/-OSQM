'use client';

import React from 'react';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';

export const StageHero: React.FC = () => {
  const { openShareModal } = useAppStore();

  return (
    <section className="hero-section select-none">
      {/* Desktop Stage Full-Width Backdrop (Hidden on mobile via CSS) */}
      <div className="hero-stage-backdrop">
        <Image
          src="/images/design/hero_stage_backdrop.jpg"
          alt="Sydney Harbour Panorama"
          fill
          priority
          unoptimized
          className="object-cover"
          sizes="4024px"
        />
      </div>

      {/* Hero Photo Box: 4/3 edge-to-edge on mobile, 1024x515 absolute on desktop */}
      <div className="hero-photo-box">
        <Image
          src="/images/design/hero.jpg"
          alt="Justin and Koogee the Corgi looking over Sydney Harbour - $0SQM"
          fill
          priority
          unoptimized
          className="hero-photo-img"
          sizes="(min-width: 768px) 1024px, 100vw"
        />

        {/* Top-Right Handwritten Note: in photo corner on mobile, design pos on desktop */}
        <div className="hero-note-topright font-['Permanent_Marker',cursive] pointer-events-none whitespace-nowrap">
          GOOD VIEWS.
          <br />
          BETTER PLANS.
        </div>

        {/* Bottom-Right Handwritten Note: in photo corner on mobile, design pos on desktop */}
        <div className="hero-note-botright font-['Caveat',cursive] pointer-events-none whitespace-nowrap">
          Same sky.
          <br />
          Same dream.
          <br />
          Different budget.
        </div>
      </div>

      {/* Hero Content Block: In flow below photo on mobile, absolute at design coords on desktop */}
      <div className="hero-flow-body">
        {/* Hero Logo */}
        <div className="hero-logo-el pointer-events-none">
          <Image
            src="/images/design/hero_logo.png"
            alt="$0SQM"
            width={285}
            height={85}
            priority
            unoptimized
            className="w-full h-full object-contain object-left"
          />
        </div>

        {/* Headline */}
        <div className="hero-headline-el pointer-events-none">
          <h1 className="font-['Bebas_Neue',sans-serif] text-[28px] md:text-[34px] tracking-wide text-[#141414] leading-[0.95] whitespace-nowrap">
            THE AUSTRALIAN DREAM
          </h1>
          <div className="font-['Bebas_Neue',sans-serif] text-[28px] md:text-[34px] tracking-wide text-[#141414] leading-[0.95] whitespace-nowrap flex items-center gap-1.5 mt-1">
            <span>STILL STARTS AT</span>
            <span className="bg-[#FFD452] text-[#141414] px-2 py-0.5 rounded-xs inline-block -rotate-1 text-[24px] md:text-[28px] font-black whitespace-nowrap">
              0m²
            </span>
          </div>
        </div>

        {/* Paragraph */}
        <p className="hero-para-el text-[#222222] font-medium pointer-events-none">
          Just a guy, a dog, and a very expensive housing market. Documenting the journey from 0.00m² to a place we can call home.
        </p>

        {/* Yellow Button "Follow the journey on X →" */}
        <button
          type="button"
          onClick={openShareModal}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="Follow the journey on X"
          className="hero-btn-el bg-[#FFD452] text-[#141414] text-xs md:text-[13px] font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm -rotate-1 cursor-pointer hover:bg-[#ffcd38] active:scale-95 transition-all whitespace-nowrap z-20"
        >
          <span>Follow the journey on X</span>
          <span>&rarr;</span>
        </button>
      </div>
    </section>
  );
};



