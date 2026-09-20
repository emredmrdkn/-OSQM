'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';

export const StageHeader: React.FC = () => {
  const { openShareModal } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header-container select-none pointer-events-auto">
      {/* Logo: In stage mode absolute at x: 36, y: 16. In flow mode left-aligned with min 44x44 touch target */}
      <Link
        href="/"
        className="min-w-[44px] min-h-[44px] flex items-center cursor-pointer z-50"
        aria-label="0SQM Home"
        style={{
          // Stage mode coordinates overridden in CSS for desktop
        }}
      >
        <div className="w-[100px] h-[32px] flex items-center">
          <Image
            src="/images/design/logo.png"
            alt="$0SQM"
            width={100}
            height={32}
            priority
            unoptimized
            className="object-contain"
          />
        </div>
      </Link>

      {/* Stage Mode Nav Links: x 216, y 22 (Hidden on mobile via CSS) */}
      <nav className="header-stage-nav absolute top-[22px] left-[216px] items-center gap-[18px] text-[13px] text-[#141414] font-medium tracking-tight">
        <a
          href="#top"
          className="relative px-2 py-0.5 font-bold cursor-pointer"
        >
          <span className="absolute inset-0 bg-[#FBEDBE] rounded-xs -rotate-1 -z-10" />
          Home
        </a>
        <a
          href="#reality-check"
          className="hover:opacity-70 transition-opacity cursor-pointer"
        >
          The Dream
        </a>
        <a
          href="#reality-check"
          className="hover:opacity-70 transition-opacity cursor-pointer"
        >
          Reality Check
        </a>
        <a
          href="#meet-justin"
          className="hover:opacity-70 transition-opacity cursor-pointer"
        >
          The Journey
        </a>
        <a
          href="#meet-justin"
          className="hover:opacity-70 transition-opacity cursor-pointer"
        >
          Community
        </a>
        <a
          href="#merch"
          className="hover:opacity-70 transition-opacity cursor-pointer"
        >
          Merch
        </a>
        <a
          href="#footer"
          className="hover:opacity-70 transition-opacity cursor-pointer"
        >
          About
        </a>
      </nav>

      {/* Stage Mode Social Icons: X at x 785 (Hidden on mobile via CSS) */}
      <div className="header-stage-social">
        <a
          href="https://x.com/Own0SQM"
          target="_blank"
          rel="noreferrer"
          className="absolute left-[820px] top-[21px] w-[18px] h-[18px] text-[#141414] hover:opacity-70 transition-opacity flex items-center justify-center cursor-pointer"
          aria-label="X (Twitter)"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>

        {/* Stage Yellow Button "Join on X →": x 860, y 14, w 116, h 36 */}
        <button
          type="button"
          onClick={openShareModal}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="Join on X"
          className="absolute left-[860px] top-[14px] w-[116px] h-[36px] bg-[#FFD452] text-[#141414] text-[13px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:bg-[#ffcd38] transition-colors shadow-xs"
        >
          <span>Join on X</span>
          <span>&rarr;</span>
        </button>

      {/* Flow Mode Mobile Right Controls (Hidden on desktop via CSS) */}
      <div className="header-mobile-right z-50">
        <button
          type="button"
          onClick={openShareModal}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="Join on X"
          className="min-h-[44px] min-w-[44px] px-3.5 bg-[#FFD452] text-[#141414] text-xs font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-95 transition-transform"
        >
          <span>Join on X</span>
          <span>&rarr;</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          className="w-[44px] h-[44px] bg-white/80 backdrop-blur-xs text-[#141414] border border-black/10 rounded-xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        >
          {mobileMenuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full px-4 pt-2 pb-6 bg-[#F7F4ED]/95 backdrop-blur-md border-b border-black/10 shadow-lg flex flex-col gap-1 z-40 md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center px-4 rounded-lg font-bold text-sm text-[#141414] bg-[#FBEDBE]"
          >
            Home
          </a>
          <a
            href="#reality-check"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center px-4 rounded-lg font-semibold text-sm text-[#141414] hover:bg-black/5"
          >
            The Dream
          </a>
          <a
            href="#reality-check"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center px-4 rounded-lg font-semibold text-sm text-[#141414] hover:bg-black/5"
          >
            Reality Check
          </a>
          <a
            href="#meet-justin"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center px-4 rounded-lg font-semibold text-sm text-[#141414] hover:bg-black/5"
          >
            The Journey
          </a>
          <a
            href="#meet-justin"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center px-4 rounded-lg font-semibold text-sm text-[#141414] hover:bg-black/5"
          >
            Community
          </a>
          <a
            href="#merch"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center px-4 rounded-lg font-semibold text-sm text-[#141414] hover:bg-black/5"
          >
            Merch
          </a>
          <a
            href="#footer"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center px-4 rounded-lg font-semibold text-sm text-[#141414] hover:bg-black/5"
          >
            About
          </a>

          <div className="flex items-center gap-4 px-4 pt-3 mt-2 border-t border-black/10">
            <a
              href="https://x.com/Own0SQM"
              target="_blank"
              rel="noreferrer"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#141414]"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};


