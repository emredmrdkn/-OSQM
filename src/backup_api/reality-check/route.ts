import { NextRequest, NextResponse } from 'next/server';
import { RealityCheckRequest, RealityCheckResponse } from '@/types/listingReality';
import { parseListingUrl, fetchDomainListing, mapManualToNormalisedListing } from '@/lib/listingAdapter';
import { findSuburbBenchmark } from '@/data/sydneyBenchmarks';
import { computeListingMetrics, calcRealityScore } from '@/lib/listingCalculations';

export async function POST(req: NextRequest) {
  try {
    const body: RealityCheckRequest = await req.json();
    const { url, manualListing, weeklyIncome, savings } = body;

    let listing;

    // 1. Manual Form input takes priority if provided
    if (manualListing && manualListing.weeklyRent && manualListing.suburb) {
      listing = mapManualToNormalisedListing({
        weeklyRent: manualListing.weeklyRent,
        suburb: manualListing.suburb,
        postcode: manualListing.postcode,
        bedrooms: manualListing.bedrooms,
        internalAreaM2: manualListing.internalAreaM2,
        listingUrl: url,
      });
    } else if (url) {
      // 2. Parse listing URL
      const parsed = parseListingUrl(url);

      if (!parsed.isSupported) {
        return NextResponse.json(
          {
            error: 'UNSUPPORTED_PROVIDER',
            message: parsed.error || 'Only Domain.com.au or Realestate.com.au links are supported.',
          },
          { status: 400 }
        );
      }

      if (parsed.provider === 'rea' || parsed.requiresManualFallback) {
        return NextResponse.json(
          {
            error: 'REA_MANUAL_FALLBACK_REQUIRED',
            message: 'RealEstate.com.au links require quick confirmation per platform terms.',
            provider: 'rea',
            listingId: parsed.listingId,
            cleanUrl: parsed.cleanUrl,
          },
          { status: 422 }
        );
      }

      if (parsed.provider === 'domain' && parsed.listingId) {
        listing = await fetchDomainListing(parsed.listingId, parsed.cleanUrl);
      }

      if (!listing) {
        return NextResponse.json(
          {
            error: 'LISTING_NOT_FOUND',
            message: 'Could not fetch listing automatically. Please enter rent and suburb manually.',
          },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'MISSING_INPUT', message: 'Please provide either a listing URL or manual details.' },
        { status: 400 }
      );
    }

    // 3. Resolve Suburb Benchmark
    const benchmarks = findSuburbBenchmark(listing.suburb, listing.postcode);

    // 4. Compute Metrics
    const metrics = computeListingMetrics(listing, benchmarks, weeklyIncome);

    // 5. Compute Reality Score
    const score = calcRealityScore(metrics, listing, benchmarks, savings);

    // 6. Formulate Data Quality assessment
    const missingFields: string[] = [];
    if (listing.quality.areaMissing) missingFields.push('internalAreaM2');
    if (listing.quality.priceUnclear) missingFields.push('weeklyRent');

    const shareId = `rc_${Math.random().toString(36).substring(2, 9)}`;

    const responseData: RealityCheckResponse = {
      shareId,
      listing,
      benchmarks,
      metrics,
      score,
      dataQuality: {
        status: missingFields.length === 0 ? 'complete' : 'partial',
        missingFields,
        notice: listing.quality.areaMissing
          ? 'Floor area unavailable — no fake maths today. Weights normalized.'
          : undefined,
      },
      cardUrl: `/r/${shareId}`,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(responseData);
  } catch (err: unknown) {
    console.error('Reality check calculation error:', err);
    return NextResponse.json(
      { error: 'CALCULATION_ERROR', message: 'Failed to process listing reality check.' },
      { status: 500 }
    );
  }
}
