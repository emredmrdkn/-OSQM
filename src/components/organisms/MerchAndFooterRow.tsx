'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { MerchProduct } from '@/types/merch';

export const MerchAndFooterRow: React.FC = () => {
  const { products, openWaitlistModal } = useAppStore();

  const handleProductClick = (product: MerchProduct) => {
    openWaitlistModal(product);
  };

  return (
    <div className="w-full h-full min-h-0 px-3 sm:px-6 py-1 flex flex-col justify-between border-t border-[#E5E2D9] bg-[#F8F6F0] overflow-hidden select-none">
      {/* Top Part: Compact Merch Strip */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 flex-1 min-h-0 py-0.5">
        {/* Left: Brand Title & CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div>
            <h4 className="font-[family-name:var(--font-bebas)] text-base sm:text-lg lg:text-xl font-black uppercase tracking-tight text-[#141414] leading-none">
              WEAR THE REALITY.
            </h4>
            <p className="hidden md:block font-[family-name:var(--font-caveat)] text-xs text-gray-600 leading-none mt-0.5">
              Merch for the priced-out generation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => products[0] && openWaitlistModal(products[0])}
            className="rounded-full bg-[#FFE600] px-3 py-1 text-[10px] sm:text-xs font-bold text-[#141414] shadow-xs transition-all hover:bg-[#F5DC00] hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Visit Merch Store →
          </button>
        </div>

        {/* Right: 4 Products in a Single Row + Handwritten Note */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto sm:overflow-x-visible">
          {/* Product 1: 0 SQM TEE */}
          <button
            type="button"
            onClick={() => products[0] && handleProductClick(products[0])}
            className="flex items-center gap-1.5 p-1 rounded-lg bg-white border border-gray-200 shadow-2xs hover:scale-105 transition-transform cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 rounded-sm bg-gray-100 flex items-center justify-center font-[family-name:var(--font-bebas)] text-[9px] font-bold text-[#141414] border border-gray-200">
              0SQM
            </div>
            <div className="text-left leading-none pr-1">
              <span className="block font-black text-[9px] text-[#141414]">0 SQM TEE</span>
              <span className="text-[9px] font-bold text-gray-500">A$49</span>
            </div>
          </button>

          {/* Product 2: WEN 1M²? HOODIE */}
          <button
            type="button"
            onClick={() => products[1] && handleProductClick(products[1])}
            className="flex items-center gap-1.5 p-1 rounded-lg bg-white border border-gray-200 shadow-2xs hover:scale-105 transition-transform cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 rounded-sm bg-[#141414] flex items-center justify-center font-[family-name:var(--font-bebas)] text-[8px] font-bold text-white">
              WEN?
            </div>
            <div className="text-left leading-none pr-1">
              <span className="block font-black text-[9px] text-[#141414]">HOODIE</span>
              <span className="text-[9px] font-bold text-gray-500">A$89</span>
            </div>
          </button>

          {/* Product 3: 0SQM CAP */}
          <button
            type="button"
            onClick={() => products[2] && handleProductClick(products[2])}
            className="flex items-center gap-1.5 p-1 rounded-lg bg-white border border-gray-200 shadow-2xs hover:scale-105 transition-transform cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 rounded-sm bg-gray-800 flex items-center justify-center font-[family-name:var(--font-bebas)] text-[8px] font-bold text-white">
              CAP
            </div>
            <div className="text-left leading-none pr-1">
              <span className="block font-black text-[9px] text-[#141414]">0SQM CAP</span>
              <span className="text-[9px] font-bold text-gray-500">A$39</span>
            </div>
          </button>

          {/* Product 4: SAME DREAM TOTE */}
          <button
            type="button"
            onClick={() => products[3] && handleProductClick(products[3])}
            className="flex items-center gap-1.5 p-1 rounded-lg bg-white border border-gray-200 shadow-2xs hover:scale-105 transition-transform cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 rounded-sm bg-[#F0ECE1] flex items-center justify-center font-[family-name:var(--font-caveat)] text-[8px] font-bold text-[#141414] border border-gray-200">
              TOTE
            </div>
            <div className="text-left leading-none pr-1">
              <span className="block font-black text-[9px] text-[#141414]">TOTE</span>
              <span className="text-[9px] font-bold text-gray-500">A$29</span>
            </div>
          </button>

          {/* Handwritten Note */}
          <div className="hidden xl:block pl-2 border-l border-gray-300">
            <p className="font-[family-name:var(--font-caveat)] text-xs font-bold text-gray-700 rotate-[-1deg] whitespace-nowrap">
              Can&apos;t wear a house.<br />But you can wear this. ☺
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Part: Single-Line Footer */}
      <footer className="border-t border-[#E5E2D9] pt-1 flex items-center justify-between text-[10px] text-gray-600 shrink-0">
        {/* Left: Brand & Tagline */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-[family-name:var(--font-marker)] text-xs font-black text-[#141414]">
            $<span className="text-[#FFE600]">0</span>SQM
          </Link>
          <span className="text-gray-400">|</span>
          <span className="font-medium text-gray-500 hidden sm:inline">Big dreams. Small balance.</span>
        </div>

        {/* Center: Legal & Info Links */}
        <div className="flex items-center gap-2 sm:gap-4 font-bold text-gray-700">
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
          <a href="#whitepaper" className="hover:text-black transition-colors">Whitepaper</a>
          <a href="#tokenomics" className="hover:text-black transition-colors">Tokenomics</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>

        {/* Right: Social & Note */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[#141414]">
            <a
              href="https://x.com/Own0SQM"
              target="_blank"
              rel="noreferrer"
              className="p-0.5 hover:text-black transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          <span className="font-[family-name:var(--font-caveat)] text-xs font-bold text-gray-700 hidden sm:inline">
            Same dream. Different budget. ☺
          </span>
        </div>
      </footer>
    </div>
  );
};
