export interface HyperLocalItem {
  id: string;
  name: string;
  unitPrice: number;
  unitName: string;
  emoji: string;
  description: string;
}

export interface CityConfig {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  currency: 'AUD' | 'USD' | 'GBP' | 'CAD';
  currencySymbol: string;
  localCurrencyName: string;
  localCurrencyPrice: number;
  medianHousePrice: number;
  pricePerSqm: number;
  landValuePerSqm?: number;
  averageHourlyWage: number;
  averageSalary?: number;
  standardDepositPercent: number;
  lastUpdated?: string;
  source?: string;
  thumbnailImage?: string;
  usdExchangeRate?: number;
  hyperLocalItems: HyperLocalItem[];
  satiricalNotes: {
    minRange: string;
    midRange: string;
    highRange: string;
  };
}
