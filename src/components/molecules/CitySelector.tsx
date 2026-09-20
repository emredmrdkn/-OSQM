'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface CitySelectorProps {
  className?: string;
}

export const CitySelector: React.FC<CitySelectorProps> = ({ className }) => {
  const { cities, selectedCityId, setSelectedCityId } = useAppStore();

  return (
    <div className={cn('w-full flex flex-col gap-2', className)}>
      <label
        htmlFor="city-select"
        className="text-xs font-black uppercase tracking-wider text-[#141414] flex items-center justify-between"
      >
        <span>Select Your City</span>
        <span className="text-[10px] text-[#666666] font-normal normal-case">
          (Where you are priced out)
        </span>
      </label>

      {/* Styled Dropdown */}
      <div className="relative w-full">
        <select
          id="city-select"
          value={selectedCityId}
          onChange={(e) => setSelectedCityId(e.target.value)}
          className="w-full appearance-none bg-white text-[#141414] font-bold text-base px-3 py-2.5 pr-10 border border-[#141414] shadow-[2px_2px_0px_#141414] focus:outline-none focus:shadow-[3px_3px_0px_#FFE600] focus:border-[#141414] cursor-pointer transition-all"
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id} className="text-[#141414] font-medium">
              {city.flagEmoji} {city.name}, {city.country} ({city.currency})
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#141414]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* Quick City Tabs */}
      <div className="flex flex-wrap gap-1.5 mt-1">
        {cities.map((city) => {
          const isSelected = city.id === selectedCityId;
          return (
            <button
              key={city.id}
              type="button"
              onClick={() => setSelectedCityId(city.id)}
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold border transition-all cursor-pointer select-none',
                isSelected
                  ? 'bg-[#FFE600] text-[#141414] border-[#141414] shadow-[2px_2px_0px_#141414] -translate-x-0.5 -translate-y-0.5 font-black'
                  : 'bg-white text-[#555555] border-[#D1CCC0] hover:border-[#141414] hover:text-[#141414]'
              )}
            >
              <span>{city.flagEmoji}</span>
              <span>{city.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
