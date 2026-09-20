'use client';

import React from 'react';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';

export const StageMerch: React.FC = () => {
  const { products, openWaitlistModal } = useAppStore();

  return (
    <section className="absolute top-[1205px] left-0 w-[1024px] h-[245px] bg-[#EDE6DE] select-none pointer-events-auto overflow-hidden">
      {/* Sol Sütun: Başlık, Açıklama, Buton, Güven Rozetleri (x 46, y 25) */}
      <div className="absolute left-[46px] top-[22px] w-[185px]">
        <h2 className="font-[family-name:var(--font-marker)] text-[34px] font-black uppercase text-[#141414] leading-[0.95] tracking-tight">
          WEAR THE<br />REALITY.
        </h2>
        <p className="font-[family-name:var(--font-jakarta)] text-[12px] font-medium text-gray-700 mt-2 leading-snug">
          Merch for the generation that&apos;s priced out.
        </p>

        {/* Buton: Visit Merch Store → */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => products[0] && openWaitlistModal(products[0])}
          aria-label="Visit Merch Store"
          className="mt-4 px-4 py-2 bg-[#FFD452] hover:bg-[#ffcd38] text-[#141414] font-[family-name:var(--font-jakarta)] font-bold text-[12.5px] rounded-full shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>Visit Merch Store</span>
          <span>→</span>
        </button>

        {/* 3 Güven Rozeti */}
        <div className="mt-4 space-y-1 text-[9.5px] text-gray-600 font-[family-name:var(--font-jakarta)] font-medium">
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-gray-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 3h12l4 6-10 12L2 9z" />
            </svg>
            <span>High quality materials</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-gray-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span>Australia-wide shipping</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-gray-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span>Every purchase supports community</span>
          </div>
        </div>
      </div>

      {/* 4 Merch Ürünü */}
      {/* 1. Ürün: 0 SQM OWNED TEE (x 238–395, y 10) */}
      <div
        onClick={() => products[0] && openWaitlistModal(products[0])}
        aria-label="0 SQM Tee"
        className="absolute left-[238px] top-[8px] w-[165px] h-[225px] flex flex-col items-center cursor-pointer group z-10"
      >
        <div className="relative w-full h-[170px]">
          <Image
            src="/images/design/merch-tee.png"
            alt="0 SQM Tee"
            fill
            unoptimized
            priority
            className="object-contain transition-transform group-hover:scale-105"
            sizes="165px"
          />
        </div>
        <span className="font-[family-name:var(--font-jakarta)] text-[10px] font-bold text-[#141414] uppercase mt-1">
          0 SQM OWNED™ TEE
        </span>
        <span className="font-[family-name:var(--font-jakarta)] text-[10px] font-semibold text-gray-600">
          A$49
        </span>
        {/* Renk Noktaları */}
        <div className="flex items-center gap-1 mt-1">
          <span className="w-2 h-2 rounded-full bg-white border border-gray-300" />
          <span className="w-2 h-2 rounded-full bg-[#8A8D8F]" />
          <span className="w-2 h-2 rounded-full bg-[#D4C3B3]" />
        </div>
      </div>

      {/* 2. Ürün: STILL 0 SQM HOODIE (x 395–565, y 8) */}
      <div
        onClick={() => products[1] && openWaitlistModal(products[1])}
        aria-label="Still 0 SQM Hoodie"
        className="absolute left-[395px] top-[8px] w-[170px] h-[225px] flex flex-col items-center cursor-pointer group z-0"
      >
        <div className="relative w-full h-[170px]">
          <Image
            src="/images/design/merch-hoodie.png"
            alt="Still 0 SQM Hoodie"
            fill
            unoptimized
            priority
            className="object-contain transition-transform group-hover:scale-105"
            sizes="170px"
          />
        </div>
        <span className="font-[family-name:var(--font-jakarta)] text-[10px] font-bold text-[#141414] uppercase mt-1">
          STILL 0 SQM HOODIE
        </span>
        <span className="font-[family-name:var(--font-jakarta)] text-[10px] font-semibold text-gray-600">
          A$89
        </span>
        {/* Renk Noktaları */}
        <div className="flex items-center gap-1 mt-1">
          <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
          <span className="w-2 h-2 rounded-full bg-[#5A5D60]" />
          <span className="w-2 h-2 rounded-full bg-[#C8B8A6]" />
        </div>
      </div>

      {/* 3. Ürün: $0SQM CAP (x 575–685, y 25) */}
      <div
        onClick={() => products[2] && openWaitlistModal(products[2])}
        aria-label="$0SQM Cap"
        className="absolute left-[575px] top-[22px] w-[112px] h-[205px] flex flex-col items-center cursor-pointer group z-10"
      >
        <div className="relative w-full h-[125px]">
          <Image
            src="/images/design/merch-cap.png"
            alt="$0SQM Cap"
            fill
            unoptimized
            priority
            className="object-contain transition-transform group-hover:scale-105"
            sizes="112px"
          />
        </div>
        <span className="font-[family-name:var(--font-jakarta)] text-[10px] font-bold text-[#141414] uppercase mt-3">
          $0SQM CAP
        </span>
        <span className="font-[family-name:var(--font-jakarta)] text-[10px] font-semibold text-gray-600">
          A$39
        </span>
        {/* Renk Noktaları */}
        <div className="flex items-center gap-1 mt-1">
          <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
          <span className="w-2 h-2 rounded-full bg-[#2C3E50]" />
        </div>
      </div>

      {/* 4. Ürün: HIGH RENTS TOTE (x 688–825, y 8) */}
      <div
        onClick={() => products[3] && openWaitlistModal(products[3])}
        aria-label="High Rents Tote"
        className="absolute left-[688px] top-[8px] w-[135px] h-[225px] flex flex-col items-center cursor-pointer group z-10"
      >
        <div className="relative w-full h-[170px]">
          <Image
            src="/images/design/merch-tote.png"
            alt="High Rents Tote"
            fill
            unoptimized
            priority
            className="object-contain transition-transform group-hover:scale-105"
            sizes="135px"
          />
        </div>
        <span className="font-[family-name:var(--font-jakarta)] text-[10px] font-bold text-[#141414] uppercase mt-1">
          SAME DREAM TOTE
        </span>
        <span className="font-[family-name:var(--font-jakarta)] text-[10px] font-semibold text-gray-600">
          A$29
        </span>
        {/* Renk Noktaları */}
        <div className="flex items-center gap-1 mt-1">
          <span className="w-2 h-2 rounded-full bg-[#E5D7C5] border border-gray-300" />
          <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
        </div>
      </div>

      {/* Sağ Taraf: El Yazısı Not + Ok (x 835, y 25) */}
      <div
        className="absolute left-[835px] top-[25px] w-[145px] pointer-events-none origin-top-left"
        style={{ transform: 'rotate(-4deg)' }}
      >
        <p className="font-[family-name:var(--font-caveat)] text-[23px] font-bold text-[#141414] leading-[1.1]">
          Can&apos;t wear<br />a house.<br />Cam wear this.
        </p>
        <div className="text-[26px] mt-0.5 text-[#141414] leading-none">☺</div>

        {/* Hand-drawn style curved arrow pointing to the tote bag */}
        <svg
          className="w-16 h-10 text-[#141414] mt-1 -ml-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 60 40"
        >
          <path d="M 50 10 Q 30 35 10 25" />
          <path d="M 10 25 L 18 20" />
          <path d="M 10 25 L 16 32" />
        </svg>
      </div>
    </section>
  );
};
