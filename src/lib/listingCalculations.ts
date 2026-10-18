import {
  NormalisedListing,
  SuburbBenchmark,
  ListingMetrics,
  RealityScore,
  RealityScoreBand,
  RealityScoreComponents,
} from '@/types/listingReality';

/**
 * Pure function: Computes the rent burden as a percentage of weekly household income.
 * Formula: (weeklyRent / weeklyHouseholdIncome) * 100
 */
export function calcRentBurden(weeklyRent: number, weeklyHouseholdIncome: number): number {
  if (weeklyHouseholdIncome <= 0 || weeklyRent <= 0) return 0;
  return Number(((weeklyRent / weeklyHouseholdIncome) * 100).toFixed(1));
}

/**
 * Pure function: Computes upfront cash required in NSW.
 * NSW Tenancy Law: Maximum 4 weeks bond + up to 2 weeks rent in advance = 6 weeks total.
 */
export function calcUpfrontNSW(weeklyRent: number): number {
  if (weeklyRent <= 0) return 0;
  return Math.round(weeklyRent * 6);
}

/**
 * Pure function: Computes the percentage difference between the listing rent and the suburb benchmark.
 * Formula: ((listingRent - benchmarkRent) / benchmarkRent) * 100
 */
export function calcLocalPremium(listingRent: number, benchmarkRent: number): number {
  if (benchmarkRent <= 0 || listingRent <= 0) return 0;
  return Number((((listingRent - benchmarkRent) / benchmarkRent) * 100).toFixed(1));
}

/**
 * Resolves the relevant benchmark rent using the bedroom hierarchy:
 * 1. Suburb median for specific bedroom count
 * 2. General suburb median weekly rent
 */
export function resolveBenchmarkRent(listing: NormalisedListing, benchmark: SuburbBenchmark): number {
  if (
    listing.bedrooms !== undefined &&
    benchmark.medianWeeklyRentByBedrooms &&
    benchmark.medianWeeklyRentByBedrooms[listing.bedrooms] !== undefined
  ) {
    return benchmark.medianWeeklyRentByBedrooms[listing.bedrooms];
  }
  return benchmark.medianWeeklyRent;
}

/**
 * Computes listing metrics given a listing, its benchmark, and optional custom user income.
 */
export function computeListingMetrics(
  listing: NormalisedListing,
  benchmark: SuburbBenchmark,
  customWeeklyIncome?: number
): ListingMetrics {
  const weeklyRent = listing.weeklyRent || 0;
  const householdIncomeUsed =
    customWeeklyIncome && customWeeklyIncome > 0
      ? customWeeklyIncome
      : benchmark.medianHouseholdWeeklyIncome;

  const benchmarkRent = resolveBenchmarkRent(listing, benchmark);
  const rentBurdenPercent = calcRentBurden(weeklyRent, householdIncomeUsed);
  const localPremiumPercent = weeklyRent > 0 ? calcLocalPremium(weeklyRent, benchmarkRent) : null;
  const upfrontCashNSW = calcUpfrontNSW(weeklyRent);
  const rentPerM2 =
    weeklyRent > 0 && listing.internalAreaM2 && listing.internalAreaM2 > 0
      ? Number((weeklyRent / listing.internalAreaM2).toFixed(2))
      : null;

  return {
    weeklyRent,
    rentBurdenPercent,
    localPremiumPercent,
    upfrontCashNSW,
    rentPerM2,
    householdIncomeUsed,
    isIncomeCustom: Boolean(customWeeklyIncome && customWeeklyIncome > 0),
  };
}

/**
 * Computes the 0-100 0SQM Reality Score.
 * Follows the transparent component breakdown and weighting rule from the blueprint:
 * - Local Value: 40 pts
 * - Rent Burden: 30 pts
 * - Upfront Cash: 15 pts
 * - Space Efficiency: 15 pts (if area is missing, reweighted proportionally across the first 3 components)
 */
export function calcRealityScore(
  metrics: ListingMetrics,
  listing: NormalisedListing,
  benchmark: SuburbBenchmark,
  userSavings?: number
): RealityScore {
  const weeklyRent = metrics.weeklyRent;

  // 1. Local Value Component (Base Max: 40 pts)
  // Premium <= -15% -> 40 pts
  // At benchmark (0%) -> 30 pts
  // Premium +15% -> 18 pts
  // Premium +30% -> 8 pts
  // Premium >= +50% -> 0 pts
  let localValueRaw = 30;
  if (metrics.localPremiumPercent !== null) {
    const prem = metrics.localPremiumPercent;
    if (prem <= -20) localValueRaw = 40;
    else if (prem <= 0) localValueRaw = 30 + (-prem / 20) * 10;
    else if (prem <= 40) localValueRaw = Math.max(0, 30 - (prem / 40) * 26);
    else localValueRaw = Math.max(0, 4 - ((prem - 40) / 20) * 4);
  }
  const localValueScore = Math.min(40, Math.max(0, localValueRaw));

  // 2. Rent Burden Component (Base Max: 30 pts)
  // Burden <= 25% (Affordable) -> 30 pts
  // 30% (Standard 30% rule) -> 24 pts
  // 40% (Rent Stress) -> 12 pts
  // 50% (Severe Stress) -> 4 pts
  // >= 65% -> 0 pts
  const burden = metrics.rentBurdenPercent;
  let rentBurdenRaw = 0;
  if (burden <= 25) rentBurdenRaw = 30;
  else if (burden <= 30) rentBurdenRaw = 30 - ((burden - 25) / 5) * 6;
  else if (burden <= 40) rentBurdenRaw = 24 - ((burden - 30) / 10) * 12;
  else if (burden <= 55) rentBurdenRaw = 12 - ((burden - 40) / 15) * 8;
  else if (burden <= 70) rentBurdenRaw = Math.max(0, 4 - ((burden - 55) / 15) * 4);
  else rentBurdenRaw = 0;
  const rentBurdenScore = Math.min(30, Math.max(0, rentBurdenRaw));

  // 3. Upfront Cash Component (Base Max: 15 pts)
  // Evaluates NSW upfront cash (6 weeks rent) against weekly income and optional user savings
  let upfrontRaw = 10;
  const ratioToIncome = metrics.upfrontCashNSW / Math.max(1, metrics.householdIncomeUsed);
  if (userSavings !== undefined && userSavings > 0) {
    const savingsRatio = userSavings / Math.max(1, metrics.upfrontCashNSW);
    if (savingsRatio >= 3) upfrontRaw = 15;
    else if (savingsRatio >= 1) upfrontRaw = 8 + (savingsRatio - 1) * 3.5;
    else upfrontRaw = Math.max(0, savingsRatio * 7);
  } else {
    // Rely on income multiplier: standard upfront is 6 weeks of rent.
    // If upfront is <= 1.5 weeks income -> 15 pts; <= 3 weeks -> 10 pts; > 4.5 weeks -> 4 pts
    if (ratioToIncome <= 1.5) upfrontRaw = 15;
    else if (ratioToIncome <= 2.5) upfrontRaw = 12;
    else if (ratioToIncome <= 3.5) upfrontRaw = 8;
    else upfrontRaw = Math.max(0, 8 - (ratioToIncome - 3.5) * 3);
  }
  const upfrontScore = Math.min(15, Math.max(0, upfrontRaw));

  // 4. Space Efficiency Component (Base Max: 15 pts)
  // Blueprint rule: If missing, set to null and reweight remaining components.
  const hasReliableArea = Boolean(listing.internalAreaM2 && listing.internalAreaM2 > 0);
  let spaceRaw: number | null = null;
  if (hasReliableArea && listing.internalAreaM2) {
    const rentPerM2 = metrics.rentPerM2 || (weeklyRent / listing.internalAreaM2);
    // Typical Sydney rental: $12 - $18 / m² / week
    if (rentPerM2 <= 12) spaceRaw = 15;
    else if (rentPerM2 <= 16) spaceRaw = 15 - ((rentPerM2 - 12) / 4) * 5;
    else if (rentPerM2 <= 22) spaceRaw = 10 - ((rentPerM2 - 16) / 6) * 6;
    else spaceRaw = Math.max(0, 4 - ((rentPerM2 - 22) / 8) * 4);
  }

  // Normalization logic if spaceEfficiency is null
  let totalScore: number;
  let normalizedWeights = {
    localValue: 40,
    rentBurden: 30,
    upfrontCash: 15,
    spaceEfficiency: 15,
  };

  if (spaceRaw === null) {
    // Base total of available weights is 85 pts (40 + 30 + 15).
    // Normalize to 100: multiplier = 100 / 85 = 1.17647
    const currentSum = localValueScore + rentBurdenScore + upfrontScore;
    totalScore = Math.round((currentSum / 85) * 100);
    normalizedWeights = {
      localValue: Number(((40 / 85) * 100).toFixed(1)),
      rentBurden: Number(((30 / 85) * 100).toFixed(1)),
      upfrontCash: Number(((15 / 85) * 100).toFixed(1)),
      spaceEfficiency: 0,
    };
  } else {
    totalScore = Math.round(localValueScore + rentBurdenScore + upfrontScore + spaceRaw);
  }

  totalScore = Math.max(0, Math.min(100, totalScore));

  // Band resolution
  let label: RealityScoreBand = 'Market Reality';
  let verdict = 'Standard Sydney housing market squeeze. Neither a miracle nor total ruin.';

  if (totalScore >= 80) {
    label = 'Rare W';
    verdict = 'Unusually strong value for Sydney. Double-check for structural mold or hidden 6am jackhammers.';
  } else if (totalScore >= 65) {
    label = 'Surprisingly Reasonable';
    verdict = 'A solid listing by Sydney standards. You might actually afford coffee after paying rent.';
  } else if (totalScore >= 45) {
    label = 'Market Reality';
    verdict = 'Pure Sydney equilibrium: aggressive bond, painful weekly bite, zero room for sudden emergencies.';
  } else if (totalScore >= 25) {
    label = 'Overpriced Shoebox';
    verdict = 'Your landlord is clearly funding their European yacht lease with this exact weekly rent.';
  } else {
    label = 'Emotional Damage';
    verdict = 'Catastrophic rent burden. Landlord wants your blood type, Netflix login, and firstborn soul.';
  }

  return {
    version: 'score_v1',
    total: totalScore,
    components: {
      localValue: Number(localValueScore.toFixed(1)),
      rentBurden: Number(rentBurdenScore.toFixed(1)),
      upfrontCash: Number(upfrontScore.toFixed(1)),
      spaceEfficiency: spaceRaw !== null ? Number(spaceRaw.toFixed(1)) : null,
    },
    label,
    verdict,
    normalizedWeights,
  };
}
