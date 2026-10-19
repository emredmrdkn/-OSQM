'use client';

import React from 'react';
import { RealityCheckResponse } from '@/types/listingReality';

interface ListingRealityCardProps {
  data: RealityCheckResponse;
  id?: string;
}

export const ListingRealityCard = React.forwardRef<HTMLDivElement, ListingRealityCardProps>(
  ({ data, id }, ref) => {
    const { listing, benchmarks, metrics, score, dataQuality } = data;

    const getScoreBadgeColor = (band: string) => {
      switch (band) {
        case 'Rare W':
          return 'bg-emerald-400 text-neutral-950 border-emerald-950';
        case 'Surprisingly Reasonable':
          return 'bg-lime-300 text-neutral-950 border-lime-950';
        case 'Market Reality':
          return 'bg-[#FFE600] text-neutral-950 border-neutral-950';
        case 'Overpriced Shoebox':
          return 'bg-orange-400 text-neutral-950 border-orange-950';
        case 'Emotional Damage':
        default:
          return 'bg-red-500 text-white border-red-950';
      }
    };

    return (
      <div
        ref={ref}
        id={id}
        className="w-full max-w-[480px] bg-[#FAF9F5] border-2 border-neutral-950 shadow-[6px_6px_0px_#141414] p-6 text-neutral-950 font-mono select-none relative overflow-hidden"
        style={{ minHeight: '600px' }}
      >
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#FFE600] border-b-2 border-neutral-950" />

        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-neutral-950 pb-4 pt-2">
          <div>
            <div className="flex items-center text-3xl font-black tracking-tight leading-none">
              <span>$</span>
              <span className="text-[#FFE600] bg-neutral-950 px-1 py-0.5 rounded-xs mr-0.5">0</span>
              <span>SQM</span>
            </div>
            <p className="text-[10px] font-bold tracking-widest text-neutral-600 uppercase mt-1">
              LISTING REALITY CHECK
            </p>
          </div>

          <div className="text-right">
            <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-neutral-200 border border-neutral-950 px-2 py-0.5">
              NSW RENTALS
            </span>
            <p className="text-[9px] text-neutral-500 mt-1">
              {new Date(data.generatedAt).toLocaleDateString('en-AU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Listing Info Banner */}
        <div className="py-4 border-b border-dashed border-neutral-400">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <h3 className="text-xl font-black text-neutral-950 tracking-tight leading-tight">
                {listing.suburb}, NSW {listing.postcode || ''}
              </h3>
              <p className="text-xs text-neutral-600 font-sans mt-0.5">
                {listing.bedrooms ? `${listing.bedrooms} Bedroom ` : ''}
                {listing.propertyType ? `${listing.propertyType} ` : 'Rental '}
                {listing.provider !== 'manual' ? `• via ${listing.provider.toUpperCase()}` : ''}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-neutral-950 leading-none">
                ${metrics.weeklyRent.toLocaleString()}
              </span>
              <span className="text-xs text-neutral-500 block">/ week</span>
            </div>
          </div>
        </div>

        {/* Score & Verdict Hero */}
        <div className="my-5 bg-white border-2 border-neutral-950 p-4 shadow-[3px_3px_0px_#141414]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
              0SQM REALITY SCORE
            </span>
            <span
              className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 border ${getScoreBadgeColor(
                score.label
              )}`}
            >
              {score.label}
            </span>
          </div>

          <div className="flex items-baseline gap-2 my-2">
            <span className="text-5xl font-black text-neutral-950 tracking-tighter">
              {score.total}
            </span>
            <span className="text-xl font-bold text-neutral-400">/ 100</span>
          </div>

          {/* Verdict Box */}
          <p className="text-xs font-sans italic text-neutral-800 border-t border-neutral-200 pt-2 mt-2 leading-relaxed">
            &ldquo;{score.verdict}&rdquo;
          </p>
        </div>

        {/* Metrics Table */}
        <div className="space-y-2.5 text-xs border-b-2 border-neutral-950 pb-5">
          <div className="flex justify-between items-center py-1 border-b border-dashed border-neutral-300">
            <span className="font-bold text-neutral-600">LOCAL COMPARISON:</span>
            <span
              className={`font-black ${
                metrics.localPremiumPercent && metrics.localPremiumPercent > 0
                  ? 'text-red-600'
                  : 'text-emerald-700'
              }`}
            >
              {metrics.localPremiumPercent !== null
                ? `${metrics.localPremiumPercent > 0 ? '+' : ''}${metrics.localPremiumPercent}% vs local median`
                : 'Benchmark unavailable'}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-dashed border-neutral-300">
            <span className="font-bold text-neutral-600">RENT BURDEN:</span>
            <span
              className={`font-black ${
                metrics.rentBurdenPercent > 35 ? 'text-red-600' : 'text-neutral-950'
              }`}
            >
              {metrics.rentBurdenPercent}% {metrics.isIncomeCustom ? 'of your income' : 'of local income'}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-dashed border-neutral-300">
            <span className="font-bold text-neutral-600">UPFRONT CASH (NSW):</span>
            <span className="font-black text-neutral-950">
              ${metrics.upfrontCashNSW.toLocaleString()}{' '}
              <span className="text-[10px] text-neutral-500 font-normal">(4w bond + 2w adv)</span>
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="font-bold text-neutral-600">VERIFIED SPACE:</span>
            <span className="font-black text-neutral-950">
              {listing.internalAreaM2
                ? `${listing.internalAreaM2} m² ($${metrics.rentPerM2}/m²)`
                : 'Area unavailable (no fake maths)'}
            </span>
          </div>
        </div>

        {/* Score Component Breakdown Bar */}
        <div className="mt-4 pt-1">
          <div className="flex justify-between items-center mb-1.5">
            <p className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">
              SCORE COMPONENTS
            </p>
            {score.components.spaceEfficiency === null && (
              <span className="text-[9px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-xs font-bold">
                Weights normalized (Area N/A)
              </span>
            )}
          </div>
          <div
            className={`grid ${
              score.components.spaceEfficiency !== null ? 'grid-cols-4' : 'grid-cols-3'
            } gap-1.5 text-[10px] text-center font-bold`}
          >
            <div className="bg-neutral-100 border border-neutral-300 p-1 rounded-xs">
              <span className="text-neutral-500 block text-[9px]">LOCAL VALUE</span>
              <span>
                {score.components.localValue} / {score.normalizedWeights.localValue}
              </span>
            </div>
            <div className="bg-neutral-100 border border-neutral-300 p-1 rounded-xs">
              <span className="text-neutral-500 block text-[9px]">RENT BURDEN</span>
              <span>
                {score.components.rentBurden} / {score.normalizedWeights.rentBurden}
              </span>
            </div>
            <div className="bg-neutral-100 border border-neutral-300 p-1 rounded-xs">
              <span className="text-neutral-500 block text-[9px]">UPFRONT CASH</span>
              <span>
                {score.components.upfrontCash} / {score.normalizedWeights.upfrontCash}
              </span>
            </div>
            {score.components.spaceEfficiency !== null && (
              <div className="bg-neutral-100 border border-neutral-300 p-1 rounded-xs">
                <span className="text-neutral-500 block text-[9px]">SPACE EFF.</span>
                <span>
                  {score.components.spaceEfficiency} / {score.normalizedWeights.spaceEfficiency}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer / Attributions */}
        <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-[9px] text-neutral-500">
          <span>
            {metrics.isIncomeCustom
              ? 'User Income Override • 0sqm.com'
              : `${benchmarks.incomeSourceYear} • 0sqm.com`}
          </span>
          <span className="font-bold">Not financial advice. Just reality.</span>
        </div>
      </div>
    );
  }
);

ListingRealityCard.displayName = 'ListingRealityCard';
