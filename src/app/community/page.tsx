'use client';

import { ArrowRight, ChevronRight, ChevronLeft, MapPin, Home, Users } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { CITIES_DATA } from "@/data/cities";

/* ─── Community City Cards Data (Matching design mockup) ─── */
const communityCards = [
  {
    city: "SYDNEY",
    image: "/images/community/city-sydney.jpg",
    sqm: "0.11",
    timeAgo: "2h ago",
    flag: "🇦🇺",
    avatar: "/images/community/avatar_sydney.png",
    rotation: "-rotate-2 sm:-rotate-1",
  },
  {
    city: "LONDON",
    image: "/images/community/city-london.jpg",
    sqm: "0.08",
    timeAgo: "5h ago",
    flag: "🇬🇧",
    avatar: "/images/community/avatar_london.png",
    rotation: "rotate-1 sm:rotate-2",
  },
  {
    city: "TORONTO",
    image: "/images/community/city-toronto.jpg",
    sqm: "0.16",
    timeAgo: "9h ago",
    flag: "🇨🇦",
    avatar: "/images/community/avatar_toronto.png",
    rotation: "-rotate-1",
  },
  {
    city: "TOKYO",
    image: "/images/community/city-tokyo.jpg",
    sqm: "0.23",
    timeAgo: "12h ago",
    flag: "🇯🇵",
    avatar: "/images/community/avatar_tokyo.png",
    rotation: "rotate-2",
  },
  {
    city: "MELBOURNE",
    image: "/images/community/city-sydney.jpg",
    sqm: "0.09",
    timeAgo: "1d ago",
    flag: "🇦🇺",
    avatar: "/images/community/avatar_sydney.png",
    rotation: "-rotate-2",
  },
  {
    city: "VANCOUVER",
    image: "/images/community/city-vancouver.jpg",
    sqm: "0.12",
    timeAgo: "1d ago",
    flag: "🇨🇦",
    avatar: "/images/community/avatar_toronto.png",
    rotation: "rotate-1",
  },
  {
    city: "NEW YORK",
    image: "/images/community/city-newyork.jpg",
    sqm: "0.06",
    timeAgo: "2d ago",
    flag: "🇺🇸",
    avatar: "/images/community/avatar_london.png",
    rotation: "-rotate-1",
  },
  {
    city: "ISTANBUL",
    image: "/images/community/city-istanbul.jpg",
    sqm: "0.42",
    timeAgo: "2d ago",
    flag: "🇹🇷",
    avatar: "/images/community/avatar_tokyo.png",
    rotation: "rotate-2",
  },
];

export default function CommunityPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [xFollowers, setXFollowers] = useState<number>(46);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => { if (el) el.removeEventListener("scroll", checkScroll); };
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-[#141414] overflow-x-hidden flex flex-col justify-between selection:bg-[#FFD452] selection:text-[#141414]">
      {/* ══════════ 1. HEADER (NAVBAR) ══════════ */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E5E0D4] bg-[#F8F6F0]/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-marker), 'Permanent Marker', cursive" }}
          >
            $<span className="text-[#FFD452]">0</span>SQM
          </a>

          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            {[
              ["Home", "/"],
              ["The Dream", "/#dream"],
              ["Reality Check", "/#reality"],
              ["Meet Justin", "/#journey"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="hover:underline decoration-[#FFD452] decoration-4 underline-offset-8 transition-colors text-[#141414]/85 hover:text-[#141414]"
              >
                {label}
              </a>
            ))}

            {/* Active Community Tab with signature brush underline */}
            <span className="relative font-bold text-[#141414] py-1">
              Community
              <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-[#FFD452] rounded-full shadow-xs" />
            </span>

            {[
              ["Merch", "/#merch"],
              ["About", "/#journey"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="hover:underline decoration-[#FFD452] decoration-4 underline-offset-8 transition-colors text-[#141414]/85 hover:text-[#141414]"
              >
                {label}
              </a>
            ))}

            {/* Social Icons */}
            <div className="flex items-center gap-3 ml-2 text-[#141414]/80">
              <a href="https://x.com/Own0SQM" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-[#141414] transition-colors">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/own0sqm" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#141414] transition-colors">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://tiktok.com/@own0sqm" target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-[#141414] transition-colors">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://youtube.com/@own0sqm" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[#141414] transition-colors">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>

            <a
              href="/#reality"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-[#FFD452] px-5 py-2 text-sm font-black text-[#141414] shadow-[0_3px_0_rgba(20,20,20,0.18)] hover:brightness-105 active:translate-y-0.5 active:shadow-none transition-all"
            >
              Join the Generation <ArrowRight className="size-4 stroke-[2.5]" />
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#141414]"
            aria-label="Toggle menu"
          >
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-[#E5E0D4] bg-[#F8F6F0] px-4 py-4 md:hidden flex flex-col gap-3 font-bold text-sm">
            <a href="/" className="py-1">Home</a>
            <a href="/#dream" className="py-1">The Dream</a>
            <a href="/#reality" className="py-1">Reality Check</a>
            <a href="/#journey" className="py-1">Meet Justin</a>
            <span className="py-1 text-[#FFD452] font-black">Community</span>
            <a href="/#merch" className="py-1">Merch</a>
            <a
              href="/#reality"
              className="mt-2 inline-flex justify-center items-center gap-2 rounded-full bg-[#FFD452] px-5 py-2.5 text-sm font-black text-[#141414]"
            >
              Join the Generation <ArrowRight className="size-4" />
            </a>
          </div>
        )}
      </header>

      {/* ══════════ 2. HERO SECTION (MATCHING DESIGN MOCKUP) ══════════ */}
      <section className="relative pt-16 overflow-hidden bg-[#F8F6F0]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col lg:flex-row items-start justify-between min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] pt-8 sm:pt-12 pb-10 sm:pb-14">
            
            {/* Left Content Area */}
            <div className="relative z-20 max-w-xl pt-2 sm:pt-6">
              {/* Category Pill with Yellow Highlighter */}
              <div className="inline-block relative">
                <span
                  className="text-base sm:text-lg text-[#141414] font-black tracking-wider uppercase inline-block -rotate-1"
                  style={{ fontFamily: "var(--font-marker), 'Permanent Marker', cursive" }}
                >
                  COMMUNITY
                </span>
                <div className="h-2 w-full bg-[#FFD452] -mt-1.5 -rotate-2 rounded-sm" />
              </div>

              {/* Bold Main Headline */}
              <h1
                className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight uppercase text-[#141414]"
                style={{ fontFamily: "var(--font-marker), 'Permanent Marker', cursive" }}
              >
                THE <span className="text-[#FFD452]">0</span>SQM
                <br />
                CLUB.
              </h1>

              {/* Sub-Headline */}
              <p
                className="mt-3 text-lg sm:text-xl font-bold uppercase tracking-wider text-[#141414]/90"
                style={{ fontFamily: "var(--font-marker), 'Permanent Marker', cursive" }}
              >
                DIFFERENT CITIES. SAME DREAM.
              </p>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base text-[#141414]/80 leading-relaxed max-w-md font-medium">
                A global community sharing how many square metres our savings can theoretically buy — and how far the dream of owning a home still feels.
              </p>

              {/* CTA Button */}
              <div className="mt-6 sm:mt-8">
                <a
                  href="https://x.com/Own0SQM"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFD452] px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-black text-[#141414] shadow-[0_4px_0_rgba(20,20,20,0.18)] hover:brightness-105 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  Join the 0SQM Club <ArrowRight className="size-4 stroke-[3]" />
                </a>
              </div>
            </div>

            {/* Right Hero Visual: Justin wearing "0 SQM OWNED" with Koogee overlooking Sydney Harbour */}
            <div className="w-full lg:w-[62%] xl:w-[65%] mt-8 lg:mt-0 lg:absolute lg:right-0 lg:bottom-0 lg:top-8 flex items-end justify-center lg:justify-end z-10 pointer-events-none select-none">
              <div className="relative w-full max-w-[680px] lg:max-w-none h-auto flex justify-end">
                <img
                  src="/images/community/justin_hero_fade.png"
                  alt="Justin wearing 0 SQM OWNED shirt sitting with Koogee overlooking Sydney Harbour Opera House and Harbour Bridge"
                  className="w-full lg:w-auto h-auto max-h-[460px] sm:max-h-[520px] lg:max-h-[580px] object-contain object-bottom"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ 3. COMMUNITY CITY CARDS (POLAROIDS CAROUSEL) ══════════ */}
      <section className="relative bg-[#F8F6F0] -mt-6 sm:-mt-10 lg:-mt-14 z-30 pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Scroll buttons */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scroll("left")}
                className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center size-10 rounded-full bg-white shadow-xl border border-[#E5E0D4] hover:bg-[#FFD452] active:scale-95 transition-all cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="size-5 stroke-[2.5]" />
              </button>
            )}

            {canScrollRight && (
              <button
                type="button"
                onClick={() => scroll("right")}
                className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center size-10 rounded-full bg-white shadow-xl border border-[#E5E0D4] hover:bg-[#FFD452] active:scale-95 transition-all cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="size-5 stroke-[2.5]" />
              </button>
            )}

            {/* Cards Carousel Container */}
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-6 px-2 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {communityCards.map((card) => (
                <div
                  key={card.city}
                  className={`flex-shrink-0 w-[210px] sm:w-[230px] snap-start ${card.rotation} transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-30`}
                >
                  {/* Polaroid Frame */}
                  <div className="bg-white p-2.5 pb-3 shadow-[0_8px_20px_-3px_rgba(20,20,20,0.12),0_4px_8px_-2px_rgba(20,20,20,0.06)] border border-[#E8E3D7] rounded-xs cursor-pointer group">
                    {/* City Photo with Permanent Marker City Name */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 rounded-xs">
                      <img
                        src={card.image}
                        alt={`${card.city} city submission`}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span
                        className="absolute top-2 left-2 text-white font-black text-sm tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                        style={{ fontFamily: "var(--font-marker), 'Permanent Marker', cursive" }}
                      >
                        {card.city}
                      </span>
                    </div>

                    {/* Yellow Highlighter Box for SQM Result */}
                    <div className="mt-3">
                      <span
                        className="inline-block bg-[#FFD452] px-3.5 py-1 text-lg sm:text-xl font-black text-[#141414] rounded-xs shadow-2xs"
                        style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif" }}
                      >
                        {card.sqm} m²
                      </span>
                    </div>

                    {/* Bottom Metadata: Avatar & Time Ago */}
                    <div className="mt-2 flex items-center justify-between px-0.5">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={card.avatar}
                          alt="User avatar"
                          className="size-5 rounded-full object-cover border border-[#E5E0D4] shadow-2xs"
                        />
                      </div>
                      <span className="text-[11px] text-[#737373] font-medium font-sans">
                        {card.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 4. STATS COUNTER BAR ══════════ */}
      <section className="border-y border-[#E5E0D4] bg-[#F8F6F0] py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E0D4]">
            
            {/* 1. Members (Live X Followers) */}
            <div className="flex flex-col items-center text-center px-4">
              <Users className="size-8 text-[#141414] stroke-[1.6]" />
              <span className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#141414]">
                {xFollowers.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#737373] mt-0.5">
                MEMBERS
              </span>
            </div>

            {/* 2. Cities (Dynamic Site Cities Count) */}
            <div className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0">
              <MapPin className="size-8 text-[#141414] stroke-[1.6]" />
              <span className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#141414]">
                {CITIES_DATA.length}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#737373] mt-0.5">
                CITIES
              </span>
            </div>

            {/* 3. Average Owned */}
            <div className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0">
              <Home className="size-8 text-[#141414] stroke-[1.6]" />
              <span className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#141414]">
                0.00 m²
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#737373] mt-0.5">
                AVERAGE OWNED
              </span>
            </div>

            {/* 4. Koogee */}
            <div className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0">
              <div className="h-8 flex items-center justify-center">
                <img
                  src="/images/community/corgi_stat_clean.png"
                  alt="Koogee the Corgi"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <span className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#141414]">
                1
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#737373] mt-0.5">
                KOOGEE
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ 5. HOW MUCH CAN YOU AFFORD? (STICKER & CTA) ══════════ */}
      <section className="bg-[#F8F6F0] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            
            {/* Left Column: Heading, Button, Curved Arrow */}
            <div className="text-center lg:text-left flex-1 max-w-lg">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.92] tracking-tight text-[#141414]"
                style={{ fontFamily: "var(--font-marker), 'Permanent Marker', cursive" }}
              >
                HOW MUCH
                <br />
                <span className="relative inline-block">
                  CAN YOU AFFORD?
                  <span className="absolute -bottom-2 left-0 right-0 h-2 bg-[#FFD452] rounded-full -rotate-1 -z-10" />
                </span>
              </h2>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <a
                  href="/#reality"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFD452] px-7 py-3.5 text-sm sm:text-base font-black text-[#141414] shadow-[0_4px_0_rgba(20,20,20,0.18)] hover:brightness-105 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  Check Your Reality <ArrowRight className="size-4 stroke-[3]" />
                </a>

                {/* Hand-drawn curved arrow pointing to the card */}
                <div className="hidden lg:block text-[#141414]">
                  <svg width="60" height="35" viewBox="0 0 60 35" fill="none">
                    <path
                      d="M4 26C18 10 36 8 52 18"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M44 10L54 18L44 26"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column: Physical Reality Card Sticker */}
            <div className="flex-shrink-0 rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer">
              <img
                src="/images/community/reality_card_sticker.png"
                alt="$0SQM Sydney Reality Check Card: I can afford 0.11 m²"
                className="w-[240px] sm:w-[270px] h-auto drop-shadow-xl select-none"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ 6. FOOTER ══════════ */}
      <footer className="border-t border-[#E5E0D4] bg-[#F8F6F0] py-6 sm:py-8 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-marker), 'Permanent Marker', cursive" }}
            >
              $<span className="text-[#FFD452]">0</span>SQM
            </span>
            <span className="text-xs text-[#737373] font-medium">
              Same dream. Different budget.
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-[#141414]">
            <a href="https://x.com/Own0SQM" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-[#FFD452] transition-colors">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com/own0sqm" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#FFD452] transition-colors">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://tiktok.com/@own0sqm" target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-[#FFD452] transition-colors">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
            <a href="https://youtube.com/@own0sqm" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[#FFD452] transition-colors">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>

          {/* Legal / Reality Note */}
          <span className="text-[10px] sm:text-xs text-[#737373] font-medium text-center sm:text-right">
            Not financial advice.<br className="sm:hidden" /> Just reality.
          </span>
        </div>
      </footer>
    </main>
  );
}
