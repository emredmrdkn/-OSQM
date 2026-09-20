'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';
import { Tape } from '@/components/atoms/Tape';

export const RealityCheckCalculator: React.FC = () => {
  const {
    cities,
    selectedCityId,
    depositAmount,
    result,
    currencyMode,
    setSelectedCityId,
    setDepositAmount,
    setCurrencyMode,
    calculate,
    openShareModal,
  } = useAppStore();

  const [displayInput, setDisplayInput] = useState(depositAmount.toLocaleString());

  const selectedCity = cities.find((c) => c.id === selectedCityId) || cities[0];

  // Keep display input synced with depositAmount
  useEffect(() => {
    setDisplayInput(depositAmount.toLocaleString());
  }, [depositAmount]);

  // Update browser tab title dynamically
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `$0SQM — ${result.formattedSqm} of ${selectedCity.name.toUpperCase()}`;
    }
  }, [result.formattedSqm, selectedCity.name]);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/[^0-9]/g, '');
    const num = rawDigits === '' ? 0 : parseInt(rawDigits, 10);
    setDisplayInput(num === 0 ? '' : num.toLocaleString());
    setDepositAmount(num);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  // Currency multiplier for AUD/USD toggle
  const isUSD = currencyMode === 'USD';
  const rate = isUSD ? (selectedCity.usdExchangeRate || 0.65) : 1;
  const currencyPrefix = isUSD ? 'US$' : selectedCity.currencySymbol;

  const formatPrice = (val: number) => {
    const converted = Math.round(val * rate);
    return `${currencyPrefix}${converted.toLocaleString()}`;
  };

  return (
    <section id="reality-check" className="w-full h-full min-h-0 px-3 sm:px-6 py-1 lg:py-1.5 flex flex-col justify-between overflow-hidden">
      {/* Header bar: Title, Last updated date & AUD/USD currency toggle */}
      <div className="flex items-center justify-between gap-2 shrink-0 mb-1">
        <div className="flex items-center gap-3">
          <h2 className="font-[family-name:var(--font-bebas)] text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-[#141414] leading-none">
            SQM REALITY CHECK™
          </h2>
          <span className="hidden sm:inline-block font-mono text-[11px] text-gray-500 font-medium">
            Last updated: {selectedCity.lastUpdated || '15 Sep 2026'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline font-[family-name:var(--font-caveat)] text-sm font-bold text-gray-600 rotate-[-1deg]">
            How much of {selectedCity.name} can you afford? ☺
          </span>

          {/* AUD / USD Currency Toggle */}
          <div className="flex items-center bg-gray-200/80 rounded-full p-0.5 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setCurrencyMode('AUD')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                currencyMode === 'AUD' ? 'bg-[#FFE600] text-[#141414] shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              AUD
            </button>
            <button
              type="button"
              onClick={() => setCurrencyMode('USD')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                currencyMode === 'USD' ? 'bg-[#FFE600] text-[#141414] shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              USD
            </button>
          </div>
        </div>
      </div>

      {/* Main Unified White Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 sm:p-2.5 shadow-xs flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 h-full items-stretch">
          {/* Col 1: Left 5 Cities Vertical Tabs (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-1 sm:gap-1.5 overflow-x-auto lg:overflow-x-visible lg:border-r border-gray-100 lg:pr-2.5 shrink-0">
            <span className="hidden lg:block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
              Select Metro
            </span>
            {cities.map((city) => {
              const isSelected = city.id === selectedCityId;
              return (
                <button
                  key={city.id}
                  onClick={() => setSelectedCityId(city.id)}
                  className={`flex-1 lg:flex-initial flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#FFE600] text-[#141414] font-bold shadow-xs'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium'
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-xs">
                    <span>{city.flagEmoji}</span>
                    <span>{city.name}</span>
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    {city.currency}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Col 2: Center Selected City Card & Calculator (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-between lg:border-r border-gray-100 lg:pr-2.5 gap-2 min-h-0">
            {/* Selected City Economics Stats Card */}
            <div className="rounded-lg bg-gray-50/80 p-2 border border-gray-100 flex items-center gap-2.5">
              <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 border border-gray-200">
                <Image
                  src={selectedCity.thumbnailImage || '/images/hero-sydney.jpg'}
                  alt={selectedCity.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 flex-1 text-[11px]">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-gray-400 leading-tight">Median Price</span>
                  <span className="font-bold text-[#141414]">{formatPrice(selectedCity.medianHousePrice)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-gray-400 leading-tight">Land / sqm</span>
                  <span className="font-bold text-[#141414]">{formatPrice(selectedCity.landValuePerSqm || selectedCity.pricePerSqm)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-gray-400 leading-tight">Deposit (20%)</span>
                  <span className="font-bold text-[#141414]">{formatPrice(Math.round(selectedCity.medianHousePrice * 0.2))}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-gray-400 leading-tight">Avg Salary</span>
                  <span className="font-bold text-[#141414]">{formatPrice(selectedCity.averageSalary || 96000)}</span>
                </div>
              </div>
            </div>

            {/* Calculator Input & Live Result Row */}
            <form onSubmit={handleCalculate} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full flex items-center">
                <span className="absolute left-3 text-gray-500 font-bold text-xs">{currencyPrefix}</span>
                <input
                  type="text"
                  value={displayInput}
                  onChange={handleDepositChange}
                  className="w-full rounded-lg border border-gray-300 bg-white pl-7 pr-3 py-1.5 text-xs font-bold text-[#141414] focus:border-[#FFE600] focus:outline-hidden"
                  placeholder="25,000"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-[#141414] px-4 py-1.5 text-center text-xs font-bold text-white shadow-xs transition-all hover:bg-black hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Calculate →
              </button>

              <div className="w-full sm:w-auto bg-[#FFE600] rounded-lg px-3 py-1 text-center font-[family-name:var(--font-bebas)] text-base font-black text-[#141414] whitespace-nowrap shadow-2xs">
                RESULT: {result.formattedSqm}
              </div>
            </form>
          </div>

          {/* Col 3: Right Yellow Sticky Note "YOU OWN 0 SQM" (lg:col-span-3) */}
          <div className="lg:col-span-3 relative rounded-xl bg-[#FFE600] p-2.5 shadow-sm border border-[#141414]/15 flex flex-col justify-between text-center rotate-1 hover:rotate-0 transition-transform">
            <Tape variant="kraft" position="top" className="-top-2 left-1/2 -translate-x-1/2 z-10" />

            <div>
              <span className="font-mono text-[9px] font-black uppercase text-gray-800 tracking-wider">
                Drop 01 Reality Audit
              </span>
              <h3 className="font-[family-name:var(--font-bebas)] text-3xl sm:text-4xl font-black text-[#141414] leading-none mt-0.5 tracking-tight">
                YOU OWN 0 SQM
              </h3>
              <p className="font-mono text-[10px] font-bold text-gray-800 uppercase">
                OF {selectedCity.name.toUpperCase()}
              </p>
            </div>

            <div className="my-1">
              <p className="font-[family-name:var(--font-caveat)] text-sm sm:text-base font-bold text-[#141414] leading-tight">
                &ldquo;It hurts, but it&apos;s honest.&rdquo; ☺
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#141414]/15">
              <button
                type="button"
                onClick={openShareModal}
                className="rounded-full bg-[#141414] px-3 py-0.5 text-[10px] font-bold text-white shadow-xs hover:bg-black transition-all cursor-pointer"
              >
                Share ↗
              </button>
              <span className="font-mono text-[9px] font-bold text-gray-700">
                {result.formattedSqm}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
