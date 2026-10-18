export type ListingProvider = 'domain' | 'rea' | 'manual';
export type ListingObjective = 'rent' | 'sale';

export interface ListingQualityFlags {
  sourceFetchedAt: string;
  areaMissing: boolean;
  priceUnclear: boolean;
  benchmarkWeak: boolean;
}

export interface NormalisedListing {
  provider: ListingProvider;
  providerListingId?: string;
  listingUrl?: string;
  objective: ListingObjective; // MVP: 'rent'
  headline?: string;
  address?: string;
  suburb: string;
  postcode?: string;
  state: string; // e.g. 'NSW'
  weeklyRent: number | null; // null if 'contact agent' or unclear
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string; // 'apartment' | 'house' | 'unit' | 'studio'
  internalAreaM2?: number; // only if verified/reliable
  quality: ListingQualityFlags;
}

export interface SuburbBenchmark {
  suburb: string;
  postcode: string;
  medianWeeklyRent: number;
  medianWeeklyRentByBedrooms?: Record<number, number>; // e.g. { 1: 650, 2: 850, 3: 1200 }
  medianHouseholdWeeklyIncome: number; // ABS Census 2021/2026 baseline
  incomeSourceYear: string;
}

export interface ListingMetrics {
  weeklyRent: number;
  rentBurdenPercent: number; // weeklyRent / income * 100
  localPremiumPercent: number | null; // (listingRent - benchmarkRent) / benchmarkRent * 100
  upfrontCashNSW: number; // 4 weeks bond + 2 weeks advance (6 weeks total)
  rentPerM2: number | null; // weeklyRent / internalAreaM2 if reliable
  householdIncomeUsed: number;
  isIncomeCustom: boolean;
}

export type RealityScoreBand =
  | 'Rare W'
  | 'Surprisingly Reasonable'
  | 'Market Reality'
  | 'Overpriced Shoebox'
  | 'Emotional Damage';

export interface RealityScoreComponents {
  localValue: number; // max 40
  rentBurden: number; // max 30
  upfrontCash: number; // max 15
  spaceEfficiency: number | null; // max 15 (null if areaMissing)
}

export interface RealityScore {
  version: 'score_v1';
  total: number; // 0 - 100
  components: RealityScoreComponents;
  label: RealityScoreBand;
  verdict: string;
  normalizedWeights: {
    localValue: number;
    rentBurden: number;
    upfrontCash: number;
    spaceEfficiency: number;
  };
}

export interface RealityCheckRequest {
  url?: string;
  manualListing?: {
    weeklyRent: number;
    suburb: string;
    postcode?: string;
    bedrooms?: number;
    internalAreaM2?: number;
  };
  weeklyIncome?: number;
  savings?: number;
}

export interface RealityCheckResponse {
  shareId: string;
  listing: NormalisedListing;
  benchmarks: SuburbBenchmark;
  metrics: ListingMetrics;
  score: RealityScore;
  dataQuality: {
    status: 'complete' | 'partial' | 'fallback';
    missingFields: string[];
    notice?: string;
  };
  cardUrl?: string;
  generatedAt: string;
}
