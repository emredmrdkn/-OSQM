'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';

const cityImages: Record<string, string> = {
  sydney: '/images/design/city-sydney.jpg',
  london: '/images/design/city-london.jpg',
  toronto: '/images/design/city-toronto.jpg',
  vancouver: '/images/design/city-vancouver.jpg',
  newyork: '/images/design/city-newyork.jpg',
};

export const StageRealityCheck: React.FC = () => {
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
  } = useAppStore();

  const [inputVal, setInputVal] = useState(depositAmount.toLocaleString());

  const selectedCity = cities.find((c) => c.id === selectedCityId) || cities[0];

  useEffect(() => {
    setInputVal(depositAmount.toLocaleString());
  }, [depositAmount]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `$0SQM — ${result.formattedSqm} of ${selectedCity.name.toUpperCase()}`;
    }
  }, [result.formattedSqm, selectedCity.name]);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const num = raw === '' ? 0 : parseInt(raw, 10);
    setInputVal(num === 0 ? '' : num.toLocaleString());
    setDepositAmount(num);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  const isUSD = currencyMode === 'USD';
  const rate = isUSD ? (selectedCity.usdExchangeRate || 0.65) : 1;
  const currencyPrefix = isUSD ? 'US$' : selectedCity.currencySymbol;

  const formatPrice = (val: number) => {
    const converted = Math.round(val * rate);
    return `${currencyPrefix}${converted.toLocaleString()}`;
  };

  return (
    <section className="absolute top-[515px] left-0 w-[1024px] h-[370px] select-none pointer-events-auto">
      {/* Başlık "SQM REALITY CHECK™": x 40–385, y 530–568 (local y 15) */}
      <h2
        className="absolute left-[40px] top-[15px] font-[family-name:var(--font-marker)] text-[32px] font-black text-[#141414] leading-none"
        style={{ transform: 'rotate(-0.8deg)' }}
      >
        SQM REALITY CHECK™
      </h2>

      {/* Altında "Real data. Real prices. Same result.": x 41, y 580 (local y 62), 17px */}
      <p className="absolute left-[41px] top-[62px] font-[family-name:var(--font-jakarta)] text-[16px] font-bold text-gray-700 leading-none">
        Real data. Real prices. Same result.
      </p>

      {/* Sağda "Last updated: 15 Sep 2026": x 752, y 563 (local y 45), 10px gri */}
      <span className="absolute left-[752px] top-[45px] font-[family-name:var(--font-jakarta)] text-[10.5px] text-gray-500 font-medium">
        Last updated: {selectedCity.lastUpdated || '15 Sep 2026'}
      </span>

      {/* AUD/USD hap toggle: x 902–990, y 550–572 (local y 35), seçili olan siyah */}
      <div className="absolute left-[902px] top-[35px] w-[88px] h-[22px] bg-[#E5E0D4] rounded-full p-[2px] flex items-center justify-between text-[10px] font-bold">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setCurrencyMode('AUD')}
          className={`flex-1 h-full rounded-full transition-colors cursor-pointer ${
            currencyMode === 'AUD' ? 'bg-[#141414] text-white shadow-xs' : 'text-gray-600 hover:text-black'
          }`}
        >
          AUD
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setCurrencyMode('USD')}
          className={`flex-1 h-full rounded-full transition-colors cursor-pointer ${
            currencyMode === 'USD' ? 'bg-[#141414] text-white shadow-xs' : 'text-gray-600 hover:text-black'
          }`}
        >
          USD
        </button>
      </div>

      {/* Sol sütun: bayraklı 5 şehir listesi (x 40–180, local y 95 to 300) */}
      <div className="absolute left-[40px] top-[95px] w-[140px] flex flex-col gap-[5px]">
        {cities.map((city) => {
          const isSelected = city.id === selectedCityId;
          return (
            <button
              key={city.id}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setSelectedCityId(city.id)}
              className={`w-full h-[36px] flex items-center px-3 rounded-lg text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[#FBEDBE] text-[#141414] font-bold shadow-2xs'
                  : 'text-gray-700 hover:text-black font-semibold'
              }`}
            >
              <span className="mr-2.5 text-base">{city.flagEmoji}</span>
              <span className="font-[family-name:var(--font-jakarta)] text-[13.5px]">{city.name}</span>
            </button>
          );
        })}
      </div>

      {/* Orta Üst Kart: Şehir Detay Bilgileri (x 195–810, local y 95, w 615, h 145) */}
      <div className="absolute left-[195px] top-[95px] w-[615px] h-[145px] bg-white rounded-xl p-3.5 shadow-xs border border-gray-100 flex items-center gap-3.5">
        {/* Solda Şehir fotoğrafı (w 110, h 118) - Dinamik şehre göre değişir */}
        <div className="relative w-[110px] h-[118px] rounded-lg overflow-hidden shrink-0 border border-gray-100">
          <Image
            src={cityImages[selectedCity.id] || cityImages.sydney}
            alt={selectedCity.name}
            fill
            unoptimized
            priority
            className="object-cover"
            sizes="110px"
          />
        </div>

        {/* Dört Sütun Detay Bilgileri */}
        <div className="flex-1 flex flex-col justify-between h-full py-0.5">
          {/* Şehir Başlığı: SYDNEY marker 22px + Australia */}
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-marker)] text-[22px] font-black text-[#141414] leading-none">
              {selectedCity.name.toUpperCase()}
            </span>
            <span className="text-[12px] font-medium text-gray-500">
              {selectedCity.country}
            </span>
          </div>

          {/* Dört sütun, aralarında ince dikey çizgi */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100">
            {/* Sütun 1: Median House Price */}
            <div className="flex flex-col border-r border-gray-100 pr-2">
              <span className="text-[9.5px] uppercase font-bold text-gray-400 leading-tight">Median House Price</span>
              <span className="font-[family-name:var(--font-jakarta)] text-[14px] font-extrabold text-[#141414] mt-0.5">
                {formatPrice(selectedCity.medianHousePrice)}
              </span>
              <span className="text-[10px] font-bold text-[#16A34A] leading-tight mt-0.5">
                ↑ 4.1% (12m)
              </span>
            </div>

            {/* Sütun 2: Land Value (per sqm) */}
            <div className="flex flex-col border-r border-gray-100 pr-2">
              <span className="text-[9.5px] uppercase font-bold text-gray-400 leading-tight">Land Value (per sqm)</span>
              <span className="font-[family-name:var(--font-jakarta)] text-[14px] font-extrabold text-[#141414] mt-0.5">
                {formatPrice(selectedCity.landValuePerSqm || selectedCity.pricePerSqm)}
              </span>
              <span className="text-[9.5px] text-gray-400 leading-tight mt-0.5">
                per sqm (approx.)
              </span>
            </div>

            {/* Sütun 3: Typical Deposit (20%) */}
            <div className="flex flex-col border-r border-gray-100 pr-2">
              <span className="text-[9.5px] uppercase font-bold text-gray-400 leading-tight">Typical Deposit (20%)</span>
              <span className="font-[family-name:var(--font-jakarta)] text-[14px] font-extrabold text-[#141414] mt-0.5">
                {formatPrice(Math.round(selectedCity.medianHousePrice * 0.2))}
              </span>
            </div>

            {/* Sütun 4: Average Full-time Salary */}
            <div className="flex flex-col">
              <span className="text-[9.5px] uppercase font-bold text-gray-400 leading-tight">Average Full-time Salary</span>
              <span className="font-[family-name:var(--font-jakarta)] text-[14px] font-extrabold text-[#141414] mt-0.5">
                {formatPrice(selectedCity.averageSalary || 95000)}
              </span>
              <span className="text-[9.5px] text-gray-400 leading-tight mt-0.5">
                per year ({selectedCity.currency})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Orta Alt Kart 1: Hesaplayıcı (x 195–640, local y 252, w 445, h 90) */}
      <div className="absolute left-[195px] top-[252px] w-[445px] h-[90px] bg-white rounded-xl p-3 shadow-xs border border-gray-100 flex items-center justify-between">
        <div className="space-y-0.5 max-w-[200px]">
          <h4 className="font-[family-name:var(--font-marker)] text-[14px] font-black text-[#141414] leading-tight">
            HOW MUCH OF {selectedCity.name.toUpperCase()}<br />CAN YOU AFFORD?
          </h4>
          <p className="text-[9.5px] text-gray-500 font-medium leading-snug">
            Enter your savings to see how many square metres it could (theoretically) buy you.
          </p>
        </div>

        <form onSubmit={handleCalculate} className="flex items-center gap-2">
          {/* Input: w 125, h 38 */}
          <div className="relative w-[125px] h-[38px] flex items-center">
            <span className="absolute left-3 text-gray-500 font-bold text-xs">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={handleDepositChange}
              inputMode="decimal"
              className="w-full h-full rounded-lg border border-gray-300 bg-white pl-7 pr-2.5 text-[16px] font-bold text-[#141414] focus:outline-hidden focus:border-[#FFD452]"
              placeholder="25,000"
            />
          </div>


          {/* Siyah "Calculate" butonu: w 95, h 38 */}
          <button
            type="submit"
            className="w-[95px] h-[38px] rounded-lg bg-[#141414] text-white font-bold text-xs flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
          >
            Calculate
          </button>
        </form>
      </div>

      {/* Orta Alt Kart 2: Sonuç (x 652–810, local y 252, w 158, h 90) */}
      <div className="absolute left-[652px] top-[252px] w-[158px] h-[90px] bg-white rounded-xl p-3 shadow-xs border border-gray-100 flex flex-col justify-center">
        <span className="text-[9.5px] font-extrabold uppercase text-gray-400 tracking-wider">
          YOUR RESULT
        </span>
        <span className="font-[family-name:var(--font-marker)] text-[32px] font-black text-[#141414] leading-none my-0.5">
          {result.formattedSqm}
        </span>
        <span className="text-[11px] font-bold text-gray-600">
          of {selectedCity.name} land. *
        </span>
      </div>

      {/* Yapışkan not: orijinal yüksek kaliteli görsel, x 825–985, local y 95, w 160, h 165 */}
      <div className="absolute left-[825px] top-[95px] w-[160px] h-[165px] pointer-events-none drop-shadow-md">
        <Image
          src="/images/design/you-own-0sqm-note.png"
          alt="You Own 0 SQM - Different cities. Same portfolio."
          fill
          unoptimized
          priority
          className="object-contain"
          sizes="160px"
        />
      </div>

      {/* "It hurts, but it's honest." el yazısı: x 830–980, local y 280, w 150, h 50 */}
      <div
        className="absolute left-[830px] top-[280px] w-[150px] h-[50px] pointer-events-none origin-center text-center"
        style={{ transform: 'rotate(-8deg)' }}
      >
        <p className="font-[family-name:var(--font-caveat)] text-[21px] font-bold text-[#141414] leading-tight">
          &ldquo;It hurts, but it&apos;s honest.&rdquo;
        </p>
        <div className="w-24 h-[2px] bg-[#141414]/70 mx-auto mt-0.5 rounded-full" />
      </div>
    </section>
  );
};
