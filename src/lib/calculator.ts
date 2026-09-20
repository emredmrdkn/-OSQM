import { CityConfig, HyperLocalItem } from '@/types/city';
import {
  RealityCheckResult,
  PhysicalMetaphor,
  BrutalTimeline,
} from '@/types/calculator';

/**
 * Static Physical Metaphor Library
 * Maps calculated square metres to relatable, satirical physical objects.
 */
export const PHYSICAL_METAPHORS: PhysicalMetaphor[] = [
  {
    rangeMin: 0,
    rangeMax: 0.05,
    title: 'An iPad Pro Box',
    description: 'Do not attempt to stand up or take a deep breath.',
    iconName: 'Smartphone',
  },
  {
    rangeMin: 0.05,
    rangeMax: 0.18,
    title: 'A Size 11 Shoebox',
    description: 'Perfect for storing exactly one shoe. No laces.',
    iconName: 'Package',
  },
  {
    rangeMin: 0.18,
    rangeMax: 0.45,
    title: 'A Welcome Doormat',
    description: 'Technically, you have arrived. You just cannot enter.',
    iconName: 'Square',
  },
  {
    rangeMin: 0.45,
    rangeMax: 0.85,
    title: 'Top of a Front-Loader Washing Machine',
    description: 'An actual luxury studio amenity in this housing market.',
    iconName: 'WashingMachine',
  },
  {
    rangeMin: 0.85,
    rangeMax: 1.30,
    title: 'A Classic Telephone Booth',
    description: 'Historic, cramped, zero Wi-Fi, smells slightly damp.',
    iconName: 'PhoneCall',
  },
  {
    rangeMin: 1.30,
    rangeMax: 2.00,
    title: 'A Single Wardrobe or Yoga Mat',
    description: 'Namaste priced out. Keep your elbows strictly tucked in.',
    iconName: 'DoorClosed',
  },
  {
    rangeMin: 2.00,
    rangeMax: 3.50,
    title: 'A Standard Double Mattress',
    description: 'Hope you and your CFO Corgi enjoy sleeping upright.',
    iconName: 'Bed',
  },
  {
    rangeMin: 3.50,
    rangeMax: 999999,
    title: 'A Luxury Walk-in Closet',
    description: 'Still not a house, but your dog can finally lie down.',
    iconName: 'Sparkles',
  },
];

/**
 * Resolves the physical metaphor based on the affordable sqm.
 */
export function getPhysicalMetaphor(affordableSqm: number): PhysicalMetaphor {
  const match = PHYSICAL_METAPHORS.find(
    (m) => affordableSqm >= m.rangeMin && affordableSqm < m.rangeMax
  );
  return match || PHYSICAL_METAPHORS[PHYSICAL_METAPHORS.length - 1];
}

/**
 * Computes the Brutal Timeline:
 * How many unspent net working hours, days, and months are required to afford 1 m² of land.
 */
export function computeBrutalTimeline(city: CityConfig): BrutalTimeline {
  const hoursTo1Sqm = Math.round(city.pricePerSqm / Math.max(1, city.averageHourlyWage));
  const daysTo1Sqm = Math.round(hoursTo1Sqm / 8);
  const monthsTo1Sqm = Number((hoursTo1Sqm / (8 * 21.67)).toFixed(1));
  
  // Years of full-time annual salary required to purchase median house outright
  const annualSalary = city.averageHourlyWage * 8 * 260; // 52 weeks * 5 days
  const yearsToMedianHouse = Number((city.medianHousePrice / Math.max(1, annualSalary)).toFixed(1));

  let formattedTimeline = `${hoursTo1Sqm.toLocaleString()} working hours (${monthsTo1Sqm} months of 100% saved salary) to own 1 m²`;

  return {
    hoursTo1Sqm,
    daysTo1Sqm,
    monthsTo1Sqm,
    yearsToMedianHouse,
    formattedTimeline,
  };
}

/**
 * Pure Functional Calculation Engine:
 * Converts user deposit and city configuration into an exhaustive RealityCheckResult.
 */
export function computeReality(city: CityConfig, deposit: number): RealityCheckResult {
  const safeDeposit = Math.max(0, Number.isFinite(deposit) ? deposit : 0);
  const divisor = city.landValuePerSqm && city.landValuePerSqm > 0 ? city.landValuePerSqm : city.pricePerSqm;
  const rawSqm = safeDeposit / Math.max(1, divisor);
  const affordableSqm = Number(rawSqm.toFixed(2));
  const formattedSqm = `${affordableSqm.toFixed(2)} m²`;

  // 1. Resolve Physical Metaphor
  const physicalMetaphor = getPhysicalMetaphor(affordableSqm);

  // 2. Resolve Primary Hyper-Local Item (e.g. Avocado Toast in Sydney, Pint in London)
  const primaryItem: HyperLocalItem =
    city.hyperLocalItems[0] || {
      id: 'default',
      name: 'Coffee',
      unitPrice: 5,
      unitName: 'Cups of Coffee',
      emoji: '☕',
      description: 'Standard caffeine fix.',
    };

  const hyperLocalCount = Math.floor(safeDeposit / Math.max(0.01, primaryItem.unitPrice));
  const comparisonText = `In ${city.name}: ${formattedSqm} OR ${hyperLocalCount.toLocaleString()} ${primaryItem.unitName}.`;

  // 3. Compute Brutal Timeline
  const brutalTimeline = computeBrutalTimeline(city);

  return {
    city,
    savingsAmount: safeDeposit,
    affordableSqm,
    formattedSqm,
    physicalMetaphor,
    primaryHyperLocal: {
      item: primaryItem,
      count: hyperLocalCount,
      comparisonText,
    },
    brutalTimeline,
    hopePercentage: 0,
    generatedAt: new Date().toISOString(),
  };
}
