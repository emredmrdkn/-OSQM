'use client';

import React from 'react';
import Image from 'next/image';

export const StageFooter: React.FC = () => {
  return (
    <footer className="absolute top-[1450px] left-0 w-[1024px] h-[86px] select-none pointer-events-auto">
      {/* Logo: x 36–113 (w 77, h 24), y 1475 (local y 25) */}
      <div className="absolute left-[36px] top-[25px] w-[77px] h-[24px] flex items-center">
        <Image
          src="/images/design/logo.png"
          alt="$0SQM"
          width={77}
          height={24}
          unoptimized
          priority
          className="object-contain"
        />
      </div>

      {/* "Big dreams. Small balance.": x 133, y 1482 (local y 32), 11px */}
      <span className="absolute left-[133px] top-[32px] font-[family-name:var(--font-jakarta)] text-[11px] font-medium text-gray-500 whitespace-nowrap">
        Big dreams. Small balance.
      </span>

      {/* Linkler: About x 343, FAQ 402, Whitepaper 447, Tokenomics 535, Contact 622, y 1482 (local y 32) */}
      <nav className="absolute top-[32px] font-[family-name:var(--font-jakarta)] text-[11.5px] font-bold text-gray-700">
        <a href="#about" className="absolute left-[343px] hover:text-black transition-colors whitespace-nowrap">
          About
        </a>
        <a href="#faq" className="absolute left-[402px] hover:text-black transition-colors whitespace-nowrap">
          FAQ
        </a>
        <a href="#whitepaper" className="absolute left-[447px] hover:text-black transition-colors whitespace-nowrap">
          Whitepaper
        </a>
        <a href="#tokenomics" className="absolute left-[535px] hover:text-black transition-colors whitespace-nowrap">
          Tokenomics
        </a>
        <a href="#contact" className="absolute left-[622px] hover:text-black transition-colors whitespace-nowrap">
          Contact
        </a>
      </nav>

      {/* X ikonu: x 820, y 1480 (local y 30) */}
      <a
        href="https://x.com/Own0SQM"
        target="_blank"
        rel="noreferrer"
        className="absolute left-[820px] top-[30px] text-gray-800 hover:text-black transition-colors"
        aria-label="X (Twitter)"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Sağda el yazısı: "Same dream. Different budget." -8° eğik + sarı fırça çizgisi: x 877–985, y 1475–1510 (local x 877, y 25) */}
      <div
        className="absolute left-[877px] top-[22px] w-[115px] pointer-events-none origin-top-left"
        style={{ transform: 'rotate(-8deg)' }}
      >
        <p className="font-[family-name:var(--font-caveat)] text-[14px] font-bold text-[#141414] leading-tight">
          Same dream.<br />Different budget.
        </p>
        <div className="w-20 h-[3px] bg-[#FFD452] rounded-full mt-0.5" />
      </div>
    </footer>
  );
};
