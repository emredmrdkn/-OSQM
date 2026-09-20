import { CityConfig, HyperLocalItem } from './city';

export interface RealityCheckInput {
  cityId: string;
  savingsAmount: number;
}

export interface BrutalTimeline {
  hoursTo1Sqm: number;
  daysTo1Sqm: number;
  monthsTo1Sqm: number;
  yearsToMedianHouse: number;
  formattedTimeline: string;
}

export interface PhysicalMetaphor {
  title: string;
  description: string;
  rangeMin: number;
  rangeMax: number;
  iconName?: string;
}

export interface RealityCheckResult {
  city: CityConfig;
  savingsAmount: number;
  affordableSqm: number;
  formattedSqm: string;
  physicalMetaphor: PhysicalMetaphor;
  primaryHyperLocal: {
    item: HyperLocalItem;
    count: number;
    comparisonText: string;
  };
  brutalTimeline: BrutalTimeline;
  hopePercentage: number;
  generatedAt: string;
}
