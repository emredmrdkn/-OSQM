import React from 'react';
import { RealityCheckResult } from '@/types/calculator';
import { cn } from '@/lib/utils';
import { Clock, ShieldAlert } from 'lucide-react';

export interface ShareableRealityCardProps {
  result: RealityCheckResult;
  className?: string;
  id?: string;
}

export const ShareableRealityCard = React.forwardRef<HTMLDivElement, ShareableRealityCardProps>(
  ({ result, className, id = 'shareable-reality-card' }, ref) => {
    const { city, savingsAmount, affordableSqm, physicalMetaphor, primaryHyperLocal, brutalTimeline } =
      result;

    return (
      <div
        id={id}
        ref={ref}
        className={cn(
          'w-full max-w-[800px] aspect-[1.91/1] bg-[#F8F6F0] text-[#141414] border-4 md:border-8 border-[#141414] shadow-[8px_8px_0px_#141414] p-5 md:p-8 flex flex-col justify-between select-none relative overflow-hidden',
          className
        )}
      >

        {/* Top Header Bar */}
        <div className="flex items-center justify-between z-10 border-b-2 border-[#141414] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl md:text-5xl font-black tracking-tighter font-[family-name:var(--font-bebas)] text-[#141414]">
              $<span className="text-[#FFE600] drop-shadow-[1px_1px_0px_#141414]">0</span>SQM
            </span>
            <span className="hidden sm:inline-block text-[11px] font-black uppercase tracking-widest text-[#555555] ml-2 border-l border-[#141414] pl-2">
              Reality Check™
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#FFE600] text-[#141414] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] px-2.5 py-1 text-[10px] md:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 -rotate-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Certified $0SQM Resident</span>
            </div>
          </div>
        </div>

        {/* Main Verdict & Punchline */}
        <div className="my-auto py-2 z-10 text-center flex flex-col items-center">
          <p className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#666666] mb-1">
            Official Housing Reality Verdict
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-[#141414] font-[family-name:var(--font-bebas)] leading-[0.9]">
            YOU CAN AFFORD{' '}
            <span className="bg-[#FFE600] px-2 border border-[#141414] shadow-[2px_2px_0px_#141414] text-[#141414]">
              {affordableSqm.toFixed(2)} m²
            </span>{' '}
            OF {city.name.toUpperCase()}
          </h2>

          {/* Physical Metaphor */}
          <div className="mt-2.5 inline-flex items-center gap-2 bg-white border border-[#141414] shadow-[2px_2px_0px_#141414] px-3.5 py-1.5 rotate-1">
            <span className="text-sm md:text-base font-extrabold text-[#141414] font-[family-name:var(--font-caveat)] tracking-wide">
              &ldquo;{physicalMetaphor.title}&rdquo;
            </span>
            <span className="text-[11px] text-[#777777] hidden md:inline">
              — {physicalMetaphor.description}
            </span>
          </div>
        </div>

        {/* Breakdown Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 z-10 pt-2 border-t-2 border-[#141414]">
          <div className="bg-white border border-[#141414] p-2 md:p-2.5 shadow-[2px_2px_0px_#141414] text-left">
            <p className="text-[9px] md:text-[10px] font-black uppercase text-[#666666]">
              Deposit vs. Median
            </p>
            <p className="text-xs md:text-sm font-extrabold text-[#141414] truncate">
              {city.currencySymbol}
              {savingsAmount.toLocaleString()} / {city.currencySymbol}
              {(city.medianHousePrice / 1000000).toFixed(2)}M
            </p>
          </div>

          <div className="bg-white border border-[#141414] p-2 md:p-2.5 shadow-[2px_2px_0px_#141414] text-left">
            <p className="text-[9px] md:text-[10px] font-black uppercase text-[#666666] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              <span>Time-To-1m²</span>
            </p>
            <p className="text-xs md:text-sm font-extrabold text-[#141414] truncate">
              {brutalTimeline.hoursTo1Sqm.toLocaleString()} Work Hours
            </p>
          </div>

          <div className="bg-[#FFFDF5] border border-[#141414] p-2 md:p-2.5 shadow-[2px_2px_0px_#141414] text-left">
            <p className="text-[9px] md:text-[10px] font-black uppercase text-[#666666]">
              Boomer Index
            </p>
            <p className="text-xs md:text-sm font-extrabold text-[#141414] truncate">
              {primaryHyperLocal.item.emoji} {primaryHyperLocal.count.toLocaleString()}{' '}
              {primaryHyperLocal.item.unitName.split(' ')[0]}
            </p>
          </div>
        </div>

        {/* Bottom Footer Watermark */}
        <div className="flex items-center justify-between text-[10px] md:text-xs font-bold text-[#666666] z-10 pt-2">
          <span className="flex items-center gap-1">
            <span>Approved by Koogee</span>
            <span className="text-amber-500">🐶 (Stress: 0%)</span>
          </span>
          <span className="font-mono uppercase tracking-wider text-[#141414] font-black">
            0sqm.com
          </span>
        </div>
      </div>
    );
  }
);

ShareableRealityCard.displayName = 'ShareableRealityCard';
