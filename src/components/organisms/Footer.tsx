'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8F6F0] border-t border-[#E5E2D9] py-12 text-[#141414]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main Footer Row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left: Brand Logo & Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link href="/" className="font-[family-name:var(--font-bebas)] text-3xl font-black text-[#141414]">
              $<span className="text-[#FFE600] drop-shadow-[1px_1px_0px_#141414]">0</span>SQM
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="font-[family-name:var(--font-jakarta)] text-xs text-gray-600 font-medium">
              Big dreams. Small balance.
            </span>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex items-center gap-6 text-xs font-bold text-gray-700">
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>

          {/* Right: Social Icons & Signature */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-[#141414]">
              <a
                href="https://x.com/Own0SQM"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <span className="font-[family-name:var(--font-caveat)] text-base font-bold text-gray-700">
              Same dream. Different budget. ☺
            </span>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
          <p>&copy; 2026 $0SQM. All rights reserved.</p>
          <p>Not financial advice. Just reality.</p>
        </div>
      </div>
    </footer>
  );
};
