'use client';

import React from 'react';
import { CityConfig } from '@/types/city';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface ComparisonCardProps {
  city: CityConfig;
  className?: string;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ city, className }) => {
  const { depositAmount, selectedCityId, setSelectedCityId } = useAppStore();
  const isSelected = city.id === selectedCityId;

  // Calculate sqm for this specific city using the shared deposit amount
  const affordableSqm = (depositAmount / Math.max(1, city.pricePerSqm)).toFixed(2);

  return (
    <button
      type="button"
      onClick={() => setSelectedCityId(city.id)}
      className={cn(
        'w-full text-left p-3 border transition-all flex items-center justify-between cursor-pointer select-none group',
        isSelected
          ? 'bg-[#FFE600] border-[#141414] shadow-[3px_3px_0px_#141414] -translate-x-0.5 -translate-y-0.5'
          : 'bg-white border-[#141414] shadow-[2px_2px_0px_#141414] hover:shadow-[3px_3px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5',
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-xl">{city.flagEmoji}</span>
        <div>
          <h4 className="font-extrabold text-sm uppercase text-[#141414] tracking-tight leading-none">
            {city.name}
          </h4>
          <p className="text-[11px] font-medium text-[#666666] mt-0.5">
            {city.currencySymbol}
            {city.pricePerSqm.toLocaleString()} / m²
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-right">
        <div>
          <span className="font-black text-sm text-[#141414] tracking-tight">
            {affordableSqm} m²
          </span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-[#141414] transition-transform group-hover:translate-x-0.5" />
      </div>
    </button>
  );
};
