import { SuburbBenchmark } from '@/types/listingReality';

export const GREATER_SYDNEY_DEFAULT_BENCHMARK: SuburbBenchmark = {
  suburb: 'Greater Sydney',
  postcode: '2000',
  medianWeeklyRent: 740,
  medianWeeklyRentByBedrooms: {
    0: 550, // Studio
    1: 680,
    2: 820,
    3: 1100,
    4: 1450,
  },
  medianHouseholdWeeklyIncome: 2077, // ABS 2021 Census Greater Sydney median household income (~$108k/year)
  incomeSourceYear: 'ABS 2021 Census',
};

export const SYDNEY_SUBURB_BENCHMARKS: Record<string, SuburbBenchmark> = {
  sydney: {
    suburb: 'Sydney CBD',
    postcode: '2000',
    medianWeeklyRent: 850,
    medianWeeklyRentByBedrooms: { 0: 620, 1: 780, 2: 1050, 3: 1550 },
    medianHouseholdWeeklyIncome: 2146,
    incomeSourceYear: 'ABS 2021 Census',
  },
  surry_hills: {
    suburb: 'Surry Hills',
    postcode: '2010',
    medianWeeklyRent: 820,
    medianWeeklyRentByBedrooms: { 0: 580, 1: 720, 2: 980, 3: 1400 },
    medianHouseholdWeeklyIncome: 2350,
    incomeSourceYear: 'ABS 2021 Census',
  },
  bondi: {
    suburb: 'Bondi',
    postcode: '2026',
    medianWeeklyRent: 950,
    medianWeeklyRentByBedrooms: { 0: 650, 1: 820, 2: 1150, 3: 1750 },
    medianHouseholdWeeklyIncome: 2480,
    incomeSourceYear: 'ABS 2021 Census',
  },
  bondi_beach: {
    suburb: 'Bondi Beach',
    postcode: '2026',
    medianWeeklyRent: 1050,
    medianWeeklyRentByBedrooms: { 0: 700, 1: 890, 2: 1250, 3: 1900 },
    medianHouseholdWeeklyIncome: 2520,
    incomeSourceYear: 'ABS 2021 Census',
  },
  newtown: {
    suburb: 'Newtown',
    postcode: '2042',
    medianWeeklyRent: 750,
    medianWeeklyRentByBedrooms: { 0: 520, 1: 650, 2: 890, 3: 1250 },
    medianHouseholdWeeklyIncome: 2210,
    incomeSourceYear: 'ABS 2021 Census',
  },
  parramatta: {
    suburb: 'Parramatta',
    postcode: '2150',
    medianWeeklyRent: 650,
    medianWeeklyRentByBedrooms: { 0: 480, 1: 560, 2: 720, 3: 950 },
    medianHouseholdWeeklyIncome: 1820,
    incomeSourceYear: 'ABS 2021 Census',
  },
  chatswood: {
    suburb: 'Chatswood',
    postcode: '2067',
    medianWeeklyRent: 820,
    medianWeeklyRentByBedrooms: { 0: 590, 1: 710, 2: 950, 3: 1350 },
    medianHouseholdWeeklyIncome: 2180,
    incomeSourceYear: 'ABS 2021 Census',
  },
  manly: {
    suburb: 'Manly',
    postcode: '2095',
    medianWeeklyRent: 1000,
    medianWeeklyRentByBedrooms: { 0: 650, 1: 850, 2: 1200, 3: 1800 },
    medianHouseholdWeeklyIncome: 2750,
    incomeSourceYear: 'ABS 2021 Census',
  },
  marrickville: {
    suburb: 'Marrickville',
    postcode: '2204',
    medianWeeklyRent: 760,
    medianWeeklyRentByBedrooms: { 0: 510, 1: 660, 2: 880, 3: 1200 },
    medianHouseholdWeeklyIncome: 2190,
    incomeSourceYear: 'ABS 2021 Census',
  },
  redfern: {
    suburb: 'Redfern',
    postcode: '2016',
    medianWeeklyRent: 780,
    medianWeeklyRentByBedrooms: { 0: 550, 1: 690, 2: 920, 3: 1350 },
    medianHouseholdWeeklyIncome: 2280,
    incomeSourceYear: 'ABS 2021 Census',
  },
  paddington: {
    suburb: 'Paddington',
    postcode: '2021',
    medianWeeklyRent: 890,
    medianWeeklyRentByBedrooms: { 0: 600, 1: 750, 2: 1080, 3: 1600 },
    medianHouseholdWeeklyIncome: 2620,
    incomeSourceYear: 'ABS 2021 Census',
  },
  glebe: {
    suburb: 'Glebe',
    postcode: '2037',
    medianWeeklyRent: 760,
    medianWeeklyRentByBedrooms: { 0: 520, 1: 670, 2: 900, 3: 1300 },
    medianHouseholdWeeklyIncome: 2240,
    incomeSourceYear: 'ABS 2021 Census',
  },
  north_sydney: {
    suburb: 'North Sydney',
    postcode: '2060',
    medianWeeklyRent: 840,
    medianWeeklyRentByBedrooms: { 0: 600, 1: 740, 2: 1020, 3: 1500 },
    medianHouseholdWeeklyIncome: 2540,
    incomeSourceYear: 'ABS 2021 Census',
  },
  randwick: {
    suburb: 'Randwick',
    postcode: '2031',
    medianWeeklyRent: 820,
    medianWeeklyRentByBedrooms: { 0: 560, 1: 710, 2: 980, 3: 1450 },
    medianHouseholdWeeklyIncome: 2360,
    incomeSourceYear: 'ABS 2021 Census',
  },
  cronulla: {
    suburb: 'Cronulla',
    postcode: '2230',
    medianWeeklyRent: 780,
    medianWeeklyRentByBedrooms: { 0: 520, 1: 680, 2: 920, 3: 1380 },
    medianHouseholdWeeklyIncome: 2310,
    incomeSourceYear: 'ABS 2021 Census',
  },
};

export function findSuburbBenchmark(suburbInput?: string, postcodeInput?: string): SuburbBenchmark {
  if (!suburbInput && !postcodeInput) {
    return GREATER_SYDNEY_DEFAULT_BENCHMARK;
  }

  const cleanSuburb = (suburbInput || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  if (SYDNEY_SUBURB_BENCHMARKS[cleanSuburb]) {
    return SYDNEY_SUBURB_BENCHMARKS[cleanSuburb];
  }

  // Suburb name search by partial match
  const matchKey = Object.keys(SYDNEY_SUBURB_BENCHMARKS).find((key) => {
    const item = SYDNEY_SUBURB_BENCHMARKS[key];
    return (
      (suburbInput && item.suburb.toLowerCase().includes(suburbInput.toLowerCase().trim())) ||
      (postcodeInput && item.postcode === postcodeInput.trim())
    );
  });

  if (matchKey) {
    return SYDNEY_SUBURB_BENCHMARKS[matchKey];
  }

  // Fallback to Greater Sydney but with requested suburb name if present
  return {
    ...GREATER_SYDNEY_DEFAULT_BENCHMARK,
    suburb: suburbInput ? suburbInput.trim() : GREATER_SYDNEY_DEFAULT_BENCHMARK.suburb,
    postcode: postcodeInput ? postcodeInput.trim() : GREATER_SYDNEY_DEFAULT_BENCHMARK.postcode,
  };
}
