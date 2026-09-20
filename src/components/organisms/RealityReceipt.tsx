'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/atoms/Button';
import { getTwitterShareUrl } from '@/lib/share';
import { Share2, Sparkles } from 'lucide-react';

export const RealityReceipt: React.FC = () => {
  const { result, isReceiptVisible, openShareModal } = useAppStore();

  if (!isReceiptVisible) return null;

  const { city, savingsAmount, affordableSqm, formattedSqm, physicalMetaphor, primaryHyperLocal, brutalTimeline } =
    result;

  const twitterUrl = getTwitterShareUrl(result);

  return (
    <div className="w-full max-w-md mx-auto my-6 animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Receipt Body */}
      <div className="bg-white border-x border-t border-[#141414] shadow-[4px_4px_0px_#141414] p-5 pb-3 font-mono text-left relative">
        {/* Header */}
        <div className="text-center pb-4 border-b-2 border-dashed border-[#141414]">
          <h3 className="text-2xl font-black tracking-tight font-[family-name:var(--font-bebas)] text-[#141414]">
            *** $0SQM REALITY RECEIPT ***
          </h3>
          <p className="text-[11px] text-[#666666] uppercase mt-0.5">
            Store #001 · {city.name.toUpperCase()} BRANCH
          </p>
          <p className="text-[10px] text-[#888888] mt-0.5">
            {new Date().toLocaleDateString('en-AU', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        {/* Itemized Breakdown */}
        <div className="py-3 space-y-2 text-xs border-b border-dashed border-[#141414]">
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-[#555555]">DEPOSIT ENTERED:</span>
            <span className="font-black text-[#141414]">
              {city.currencySymbol}
              {savingsAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="font-bold text-[#555555]">MEDIAN HOUSE:</span>
            <span className="font-black text-[#141414]">
              {city.currencySymbol}
              {city.medianHousePrice.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="font-bold text-[#555555]">RATE PER SQM:</span>
            <span className="font-black text-[#141414]">
              {city.currencySymbol}
              {city.pricePerSqm.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-baseline pt-1 border-t border-dashed border-[#EAE5D9]">
            <span className="font-bold text-[#555555]">TIME-TO-1M²:</span>
            <span className="font-black text-red-600">
              {brutalTimeline.hoursTo1Sqm} WORKING HOURS
            </span>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="font-bold text-[#555555]">100% SALARY REQUIRED:</span>
            <span className="font-bold text-[#141414]">
              {brutalTimeline.monthsTo1Sqm} MONTHS
            </span>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="font-bold text-[#555555]">HOPE ALLOCATED:</span>
            <span className="font-black text-[#141414]">0.00%</span>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="font-bold text-[#555555]">TAX / STAMP DUTY:</span>
            <span className="font-black text-[#141414]">LOL</span>
          </div>
        </div>

        {/* Highlight Result Total Box */}
        <div className="my-3 bg-[#FFE600] border border-[#141414] p-3 text-center shadow-[2px_2px_0px_#141414]">
          <p className="text-[10px] font-black uppercase tracking-wider text-[#141414]">
            TOTAL AFFORDABLE REAL ESTATE
          </p>
          <p className="text-3xl font-black text-[#141414] tracking-tight my-0.5">
            {formattedSqm}
          </p>
          <p className="text-xs font-bold text-[#141414] font-[family-name:var(--font-caveat)]">
            &ldquo;{physicalMetaphor.title}&rdquo;
          </p>
        </div>

        {/* Hyper-Local Boomer Equivalent */}
        <div className="p-2.5 bg-[#F8F6F0] border border-[#141414] text-xs flex items-center justify-between">
          <span className="font-bold text-[#141414]">
            {primaryHyperLocal.item.emoji} {primaryHyperLocal.item.unitName}:
          </span>
          <span className="font-black text-[#141414]">
            {primaryHyperLocal.count.toLocaleString()} units
          </span>
        </div>

        {/* Satirical Barcode & Closing Statement */}
        <div className="mt-4 pt-3 border-t border-dashed border-[#141414] text-center">
          <div className="tracking-[4px] font-mono text-[11px] text-[#141414] font-black">
            ||| | | |||| | ||| |||| | || |
          </div>
          <p className="text-[10px] text-[#888888] uppercase mt-1">
            ESTIMATED SETTLEMENT DATE: NEVER · THANK YOU FOR RENTING
          </p>
        </div>
      </div>

      {/* Jagged Bottom Edge */}
      <div className="receipt-tear-bottom w-full shadow-[0px_4px_0px_#141414]" />

      {/* Action Triggers */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
        <Button
          variant="primary"
          size="md"
          fullWidth
          icon={<Sparkles className="w-4 h-4" />}
          onClick={openShareModal}
        >
          Generate Shareable Card
        </Button>

        <Button
          variant="dark"
          size="md"
          fullWidth
          icon={<Share2 className="w-4 h-4" />}
          onClick={() => window.open(twitterUrl, '_blank')}
        >
          Share on X
        </Button>
      </div>
    </div>
  );
};
