'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { MerchProduct } from '@/types/merch';
import { Diamond, Truck, Heart } from 'lucide-react';

export const MerchSection: React.FC = () => {
  const { products, openWaitlistModal } = useAppStore();

  const handleProductClick = (product: MerchProduct) => {
    openWaitlistModal(product);
  };

  return (
    <section id="merch" className="bg-[#F8F6F0] py-16 md:py-24 border-t border-[#E5E2D9]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Title, Subtitle, CTA & Value Props (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl font-black uppercase tracking-tight text-[#141414]">
                WEAR THE REALITY.
              </h2>
              <p className="font-[family-name:var(--font-caveat)] text-2xl text-gray-700 mt-1">
                Merch for the generation that&apos;s priced out.
              </p>
            </div>

            <div>
              <button
                onClick={() => {
                  if (products.length > 0) openWaitlistModal(products[0]);
                }}
                className="rounded-full bg-[#FFE600] px-6 py-3 text-xs font-bold text-[#141414] shadow-xs transition-all hover:bg-[#F5DC00] hover:scale-105 active:scale-95"
              >
                Visit Merch Store →
              </button>
            </div>

            {/* Value Props */}
            <div className="pt-4 space-y-3 font-[family-name:var(--font-jakarta)] text-xs text-gray-700">
              <div className="flex items-center gap-3">
                <Diamond className="w-4 h-4 text-[#141414] shrink-0" />
                <span>High quality materials</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#141414] shrink-0" />
                <span>Australia-wide shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-[#141414] shrink-0" />
                <span>Every purchase supports the community</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Merch Items in Clean Grid (lg:col-span-8) */}
          <div className="lg:col-span-8 relative">
            {/* Top Handwritten Arrow over Hoodie */}
            <div className="hidden sm:flex absolute -top-8 left-[32%] z-20 items-center gap-1 pointer-events-none">
              <span className="font-[family-name:var(--font-caveat)] text-xl font-bold text-[#141414]">
                WEN 1M²?
              </span>
              <svg className="w-6 h-6 text-[#141414] stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <path d="M5 5 Q 15 15, 18 18" />
                <path d="M12 18 L 18 18 L 18 12" />
              </svg>
            </div>

            {/* 4 Products Horizontal Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {/* Product 1: 0 SQM TEE */}
              <div
                onClick={() => products[0] && handleProductClick(products[0])}
                className="group cursor-pointer text-center flex flex-col items-center"
              >
                <div className="relative aspect-square w-full rounded-xl bg-white p-4 shadow-xs border border-gray-200 transition-transform group-hover:scale-105 flex flex-col items-center justify-center">
                  <div className="text-center font-[family-name:var(--font-bebas)]">
                    <p className="text-sm tracking-wider font-bold text-[#141414]">0 SQM</p>
                    <p className="text-sm tracking-wider font-bold text-[#141414]">OWNED</p>
                    <div className="mx-auto mt-1 w-6 h-6 border-2 border-[#141414] relative flex items-center justify-center">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[8px] border-b-[#141414]" />
                      <span className="text-[10px] font-bold text-[#141414]">:(</span>
                    </div>
                  </div>
                </div>
                <h4 className="mt-3 text-xs font-black uppercase text-[#141414]">
                  0 SQM TEE
                </h4>
                <p className="text-xs font-bold text-gray-700">A$49</p>
                <div className="mt-1.5 flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-gray-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#141414]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8D2C2]" />
                </div>
              </div>

              {/* Product 2: WEN 1M²? HOODIE */}
              <div
                onClick={() => products[1] && handleProductClick(products[1])}
                className="group cursor-pointer text-center flex flex-col items-center"
              >
                <div className="relative aspect-square w-full rounded-xl bg-white p-4 shadow-xs border border-gray-200 transition-transform group-hover:scale-105 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-lg bg-[#141414] flex flex-col items-center justify-center text-white shadow-xs">
                    <p className="text-[10px] font-bold font-[family-name:var(--font-bebas)] tracking-wider text-white">WEN 1M²?</p>
                    <div className="w-4 h-4 border border-white relative flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">:(</span>
                    </div>
                  </div>
                </div>
                <h4 className="mt-3 text-xs font-black uppercase text-[#141414]">
                  WEN 1M²? HOODIE
                </h4>
                <p className="text-xs font-bold text-gray-700">A$89</p>
                <div className="mt-1.5 flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#141414]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8E8B82]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B4436]" />
                </div>
              </div>

              {/* Product 3: 0SQM CAP */}
              <div
                onClick={() => products[2] && handleProductClick(products[2])}
                className="group cursor-pointer text-center flex flex-col items-center"
              >
                <div className="relative aspect-square w-full rounded-xl bg-white p-4 shadow-xs border border-gray-200 transition-transform group-hover:scale-105 flex items-center justify-center">
                  <div className="w-16 h-12 rounded-t-full bg-[#141414] flex items-center justify-center text-white shadow-xs">
                    <span className="font-[family-name:var(--font-bebas)] text-xs font-black tracking-widest text-white">
                      $0SQM
                    </span>
                  </div>
                </div>
                <h4 className="mt-3 text-xs font-black uppercase text-[#141414]">
                  0SQM CAP
                </h4>
                <p className="text-xs font-bold text-gray-700">A$39</p>
                <div className="mt-1.5 flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#141414]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#666666]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1F2B3E]" />
                </div>
              </div>

              {/* Product 4: SAME DREAM TOTE */}
              <div
                onClick={() => products[3] && handleProductClick(products[3])}
                className="group cursor-pointer text-center flex flex-col items-center"
              >
                <div className="relative aspect-square w-full rounded-xl bg-white p-4 shadow-xs border border-gray-200 transition-transform group-hover:scale-105 flex items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-xs bg-[#F0ECE1] border border-gray-300 p-1 flex items-center justify-center shadow-xs">
                    <p className="font-[family-name:var(--font-caveat)] text-[10px] font-bold text-[#141414] leading-tight">
                      Same dream.<br />Different budget.
                    </p>
                  </div>
                </div>
                <h4 className="mt-3 text-xs font-black uppercase text-[#141414]">
                  SAME DREAM TOTE
                </h4>
                <p className="text-xs font-bold text-gray-700">A$29</p>
                <div className="mt-1.5 flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F0ECE1] border border-gray-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8D2C2]" />
                </div>
              </div>
            </div>

            {/* Far Right Handwritten Note */}
            <div className="mt-6 text-right">
              <p className="font-[family-name:var(--font-caveat)] text-xl font-bold text-[#141414] leading-tight rotate-[-2deg]">
                Can&apos;t wear a house.<br />
                But you can wear this. ☺
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
