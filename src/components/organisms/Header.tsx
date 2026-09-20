'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openShareModal } = useAppStore();

  const navLinks = [
    { label: 'Home', active: true },
    { label: 'The Dream', active: false },
    { label: 'Reality Check', active: false },
    { label: 'The Journey', active: false },
    { label: 'Community', active: false },
    { label: 'Merch', active: false },
    { label: 'About', active: false },
  ];

  return (
    <header className="w-full shrink-0 bg-[#F8F6F0] border-b border-[#E5E2D9] z-30 select-none">
      <div className="mx-auto flex h-12 lg:h-13 max-w-7xl items-center justify-between px-3 sm:px-5">
        {/* Brand Logo: $0SQM with yellow 0 */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-[family-name:var(--font-marker)] text-2xl sm:text-3xl tracking-tight text-[#141414]">
            $<span className="text-[#FFE600] drop-shadow-[1px_1px_0px_#141414]">0</span>SQM
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                link.active
                  ? 'bg-[#FFE600] text-[#141414] shadow-xs'
                  : 'text-gray-700 hover:text-black hover:bg-black/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Social Icons & Yellow Pill CTA "Join on X →" */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[#141414]">
            {/* X (Twitter) Icon */}
            <a
              href="https://x.com/Own0SQM"
              target="_blank"
              rel="noreferrer"
              className="p-1 text-gray-700 hover:text-black transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          <button
            onClick={openShareModal}
            className="rounded-full bg-[#FFE600] px-3.5 py-1 text-xs font-bold text-[#141414] shadow-xs transition-all hover:bg-[#F5DC00] hover:scale-105 active:scale-95 cursor-pointer"
          >
            Join on X →
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#141414] lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E5E2D9] bg-[#F8F6F0] p-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2 text-left text-xs font-bold ${
                  link.active
                    ? 'bg-[#FFE600] text-[#141414] rounded-lg'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
