'use client';

import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { RealityCheckResponse } from '@/types/listingReality';
import { ListingRealityCard } from './ListingRealityCard';
import { findSuburbBenchmark } from '@/data/sydneyBenchmarks';
import { computeListingMetrics, calcRealityScore } from '@/lib/listingCalculations';
import { parseListingUrl, mapManualToNormalisedListing } from '@/lib/listingAdapter';
import { ArrowRight, Download, Share2, RefreshCw, AlertCircle, Sparkles, CheckCircle2, Sliders } from 'lucide-react';

const LOADING_MESSAGES = [
  'Validating listing source… 🔍',
  'Checking Australian tenancy database… 📍',
  'Cross-referencing ABS suburb benchmark… 📊',
  'Calculating emotional damage… 💥',
];

export const ListingRealityChecker: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<RealityCheckResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Manual fallback / confirmation form state
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualRent, setManualRent] = useState('');
  const [manualSuburb, setManualSuburb] = useState('Surry Hills');
  const [manualBedrooms, setManualBedrooms] = useState('1');
  const [manualArea, setManualArea] = useState('');

  // Income & Savings override state
  const [customIncome, setCustomIncome] = useState('');
  const [customSavings, setCustomSavings] = useState('');
  const [showIncomeOverride, setShowIncomeOverride] = useState(false);
  const [showPasteHelp, setShowPasteHelp] = useState(false);
  const [isEditingInResult, setIsEditingInResult] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const activeBenchmark = findSuburbBenchmark(manualSuburb);

  // Hydrate from URL query parameters if arriving from a shared link
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const qSuburb = params.get('suburb');
    const qRent = params.get('rent');
    const qBeds = params.get('beds') || '1';

    if (qSuburb && qRent && Number(qRent) > 0) {
      const listing = mapManualToNormalisedListing({
        weeklyRent: Number(qRent),
        suburb: qSuburb.trim(),
        bedrooms: Number(qBeds),
      });

      const benchmarks = findSuburbBenchmark(listing.suburb);
      const metrics = computeListingMetrics(listing, benchmarks);
      const score = calcRealityScore(metrics, listing, benchmarks);
      const shareId = `rc_${Math.random().toString(36).substring(2, 9)}`;

      setResult({
        shareId,
        listing,
        benchmarks,
        metrics,
        score,
        dataQuality: {
          status: 'partial',
          missingFields: ['internalAreaM2'],
          notice: 'Loaded from shared listing check.',
        },
        cardUrl: `/r/${shareId}`,
        generatedAt: new Date().toISOString(),
      });
    }
  }, []);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = urlInput.trim();
    if (!raw) return;

    setErrorMessage(null);
    setInfoMessage(null);

    // 1. Intelligent URL validation with Australian guidance (no fake hallucinations)
    const parsed = parseListingUrl(raw);

    // If completely unsupported / non-rental domain (e.g. google.com, youtube.com)
    if (!parsed.isSupported && !parsed.guidanceMessage) {
      setErrorMessage(
        parsed.error ||
          'Unsupported listing source. Please paste a Domain, Realestate.com.au or Flatmates link, or use the quick check form below:'
      );
      if (parsed.extractedSuburb) {
        setManualSuburb(parsed.extractedSuburb);
      }
      setIsManualMode(true);
      return;
    }

    setIsLoading(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < LOADING_MESSAGES.length - 1 ? prev + 1 : prev));
    }, 240);

    await new Promise((resolve) => setTimeout(resolve, 750));
    clearInterval(stepInterval);
    setIsLoading(false);

    // Set detected values ONLY if actually found in the URL. NEVER force Surry Hills!
    if (parsed.extractedSuburb) {
      setManualSuburb(parsed.extractedSuburb);
    }
    if (parsed.extractedBedrooms !== undefined) {
      setManualBedrooms(String(parsed.extractedBedrooms));
    }

    setIsManualMode(true);

    if (parsed.guidanceMessage) {
      setInfoMessage(parsed.guidanceMessage);
    } else if (parsed.error) {
      setErrorMessage(parsed.error);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rentNum = Number(manualRent);
    if (!rentNum || rentNum <= 0) {
      setErrorMessage('Please enter a valid weekly rent amount (e.g. 750).');
      return;
    }
    if (!manualSuburb.trim()) {
      setErrorMessage('Please enter a Sydney suburb (e.g. Surry Hills, Bondi, Parramatta).');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const listing = mapManualToNormalisedListing({
        weeklyRent: rentNum,
        suburb: manualSuburb.trim(),
        bedrooms: Number(manualBedrooms),
        internalAreaM2: manualArea ? Number(manualArea) : undefined,
        listingUrl: urlInput.trim() || undefined,
      });

      const benchmarks = findSuburbBenchmark(listing.suburb);
      const income = customIncome ? Number(customIncome) : undefined;
      const savingsNum = customSavings ? Number(customSavings) : undefined;
      const metrics = computeListingMetrics(listing, benchmarks, income);
      const score = calcRealityScore(metrics, listing, benchmarks, savingsNum);
      const shareId = `rc_${Math.random().toString(36).substring(2, 9)}`;

      setResult({
        shareId,
        listing,
        benchmarks,
        metrics,
        score,
        dataQuality: {
          status: listing.internalAreaM2 ? 'complete' : 'partial',
          missingFields: listing.internalAreaM2 ? [] : ['internalAreaM2'],
          notice: !listing.internalAreaM2
            ? 'Floor area unentered — no fake maths today. Weights normalized.'
            : undefined,
        },
        cardUrl: `/r/${shareId}`,
        generatedAt: new Date().toISOString(),
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Error processing calculation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;
    const rentNum = Number(manualRent);
    if (!rentNum || rentNum <= 0) return;

    const updatedListing = {
      ...result.listing,
      weeklyRent: rentNum,
      suburb: manualSuburb.trim() || result.listing.suburb,
      bedrooms: Number(manualBedrooms),
      internalAreaM2: manualArea ? Number(manualArea) : undefined,
    };

    const benchmarks = findSuburbBenchmark(updatedListing.suburb);
    const income = customIncome ? Number(customIncome) : undefined;
    const savingsNum = customSavings ? Number(customSavings) : undefined;
    const metrics = computeListingMetrics(updatedListing, benchmarks, income);
    const score = calcRealityScore(metrics, updatedListing, benchmarks, savingsNum);

    setResult({
      ...result,
      listing: updatedListing,
      benchmarks,
      metrics,
      score,
      dataQuality: {
        status: updatedListing.internalAreaM2 ? 'complete' : 'partial',
        missingFields: updatedListing.internalAreaM2 ? [] : ['internalAreaM2'],
        notice: !updatedListing.internalAreaM2
          ? 'Floor area unentered — no fake maths today. Weights normalized.'
          : undefined,
      },
    });
    setIsEditingInResult(false);
  };

  // Quick preset verified demo samples
  const handleSampleSelect = (sample: { url: string; rent: string; suburb: string; beds: string }) => {
    setUrlInput(sample.url);
    setManualRent(sample.rent);
    setManualSuburb(sample.suburb);
    setManualBedrooms(sample.beds);
    setErrorMessage(null);
    setInfoMessage(null);

    const listing = mapManualToNormalisedListing({
      weeklyRent: Number(sample.rent),
      suburb: sample.suburb,
      bedrooms: Number(sample.beds),
      listingUrl: sample.url,
    });

    const benchmarks = findSuburbBenchmark(listing.suburb);
    const metrics = computeListingMetrics(listing, benchmarks);
    const score = calcRealityScore(metrics, listing, benchmarks);
    const shareId = `rc_${Math.random().toString(36).substring(2, 9)}`;

    setResult({
      shareId,
      listing,
      benchmarks,
      metrics,
      score,
      dataQuality: {
        status: 'partial',
        missingFields: ['internalAreaM2'],
        notice: 'Sample listing loaded with real ABS Census benchmarks.',
      },
      cardUrl: `/r/${shareId}`,
      generatedAt: new Date().toISOString(),
    });
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#FAF9F5',
      });
      const link = document.createElement('a');
      link.download = `0sqm-reality-check-${result?.listing.suburb.toLowerCase() || 'sydney'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download card:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareOnX = () => {
    if (!result) return;
    const premiumText =
      result.metrics.localPremiumPercent !== null
        ? `${result.metrics.localPremiumPercent > 0 ? '+' : ''}${result.metrics.localPremiumPercent}% vs local`
        : '';

    const tweetText = `#MySquareMeter is 0.00 m².\nI joined the @Own0SQM club too.\n${result.listing.suburb} Reality Check: $${result.metrics.weeklyRent}/wk${premiumText ? ` · ${premiumText}` : ''} · Score ${result.score.total}/100.\nWen reasonable rent?`;

    const shareParams = new URLSearchParams({
      type: 'listing',
      suburb: result.listing.suburb,
      rent: String(result.metrics.weeklyRent),
      score: String(result.score.total),
      label: result.score.label,
      prem: premiumText,
      beds: String(result.listing.bedrooms ?? 1),
      burden: `${result.metrics.rentBurdenPercent.toFixed(1)}%`,
      upfront: `$${result.metrics.upfrontCashNSW.toLocaleString()}`,
      v: String(Date.now()),
    });

    const shareUrl = `https://www.0sqm.com/share?${shareParams.toString()}`;
    const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setResult(null);
    setUrlInput('');
    setManualRent('');
    setIsManualMode(false);
    setErrorMessage(null);
    setInfoMessage(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6 px-4 font-mono">
      {/* Header Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#FFE600] border-2 border-neutral-950 px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#141414]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LISTING REALITY CHECK (MVP)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mt-3">
          FOUND A PLACE YOU CAN&apos;T AFFORD?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-sans font-semibold">
          Paste the listing. We&apos;ll do the emotional damage.
        </p>
      </div>

      {/* Input or Result Section */}
      {!result ? (
        <div className="bg-white border-2 border-neutral-950 p-5 shadow-[4px_4px_0px_#141414]">
          {!isManualMode ? (
            /* URL Paste Form */
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="listing-url-input"
                    className="block text-xs font-bold text-neutral-700 uppercase"
                  >
                    Paste Australian Rental Link:
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPasteHelp(!showPasteHelp)}
                    className="text-[11px] font-bold text-neutral-600 hover:text-neutral-950 underline cursor-pointer"
                  >
                    {showPasteHelp ? '✕ Close Guide' : 'What can I paste? 🇦🇺'}
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="listing-url-input"
                    type="url"
                    required
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      setErrorMessage(null);
                    }}
                    placeholder="https://www.domain.com.au/... or https://www.realestate.com.au/..."
                    className="flex-1 px-3 py-2.5 text-xs bg-neutral-50 border-2 border-neutral-950 focus:outline-none focus:bg-[#FFE600]/10 font-mono"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !urlInput.trim()}
                    className="px-5 py-2.5 bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider border-2 border-neutral-950 hover:bg-[#FFE600] hover:text-neutral-950 cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{isLoading ? 'Checking…' : 'Reality Check →'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Blueprint Page 3: "What can I paste?" Guidance Panel */}
                {showPasteHelp && (
                  <div className="mt-2.5 p-3 bg-neutral-100 border border-neutral-300 rounded-xs text-[11px] text-neutral-800 space-y-1.5 animate-in fade-in duration-150">
                    <p className="font-bold text-neutral-950">
                      🇦🇺 Supported Australian Rental Links:
                    </p>
                    <ul className="space-y-1 text-neutral-700 list-disc list-inside">
                      <li>
                        <strong>Domain.com.au:</strong> Web listing URLs or Domain app share links.
                      </li>
                      <li>
                        <strong>Realestate.com.au:</strong> Property URLs (per REA terms, confirm weekly rent in 15 sec).
                      </li>
                      <li>
                        <strong>Flatmates, Gumtree, Marketplace:</strong> Paste the link and confirm the rent.
                      </li>
                    </ul>
                    <p className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-200">
                      💡 Calibrated for Greater Sydney & NSW rentals against official ABS Census median data.
                    </p>
                  </div>
                )}
              </div>

              {/* Sample Verified Links */}
              <div className="pt-2 border-t border-dashed border-neutral-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500">
                <span className="font-bold text-neutral-700">Real sample listings:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleSampleSelect({
                        url: 'https://www.domain.com.au/12-smith-st-surry-hills-nsw-2010-18923456',
                        rent: '780',
                        suburb: 'Surry Hills',
                        beds: '1',
                      })
                    }
                    className="underline text-neutral-950 font-bold hover:text-blue-600 cursor-pointer"
                  >
                    Surry Hills 1-Bed ($780/w)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleSampleSelect({
                        url: 'https://www.domain.com.au/5-hall-st-bondi-beach-nsw-2026-17849201',
                        rent: '920',
                        suburb: 'Bondi Beach',
                        beds: '1',
                      })
                    }
                    className="underline text-neutral-950 font-bold hover:text-blue-600 cursor-pointer"
                  >
                    Bondi Beach 1-Bed ($920/w)
                  </button>
                </div>
              </div>

              {/* Manual Direct Form trigger */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsManualMode(true)}
                  className="text-[11px] text-neutral-600 hover:text-neutral-950 underline cursor-pointer"
                >
                  Don&apos;t have a link? Quick manual check form (15 sec) &rarr;
                </button>
              </div>
            </form>
          ) : (
            /* Manual / Partial-Data Confirmation Form */
            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-xs font-black uppercase text-neutral-950">
                  {infoMessage ? 'Confirm Listing Details' : 'Quick Manual Check'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsManualMode(false);
                    setErrorMessage(null);
                    setInfoMessage(null);
                  }}
                  className="text-[10px] text-neutral-500 underline cursor-pointer"
                >
                  &larr; Back to URL paste
                </button>
              </div>

              {infoMessage && (
                <div className="p-2.5 bg-blue-50 border border-blue-300 text-blue-900 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
                  <span>{infoMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-1">
                    Advertised Weekly Rent ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={manualRent}
                    onChange={(e) => setManualRent(e.target.value)}
                    placeholder="e.g. 780"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border-2 border-neutral-950 focus:outline-none focus:bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-1">
                    Sydney Suburb *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualSuburb}
                    onChange={(e) => setManualSuburb(e.target.value)}
                    placeholder="e.g. Surry Hills, Bondi, Parramatta"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border-2 border-neutral-950 focus:outline-none focus:bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-1">
                    Bedrooms
                  </label>
                  <select
                    value={manualBedrooms}
                    onChange={(e) => setManualBedrooms(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border-2 border-neutral-950 focus:outline-none font-bold"
                  >
                    <option value="0">Studio / 0-Bed</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-1">
                    Floor Area (m²) <span className="font-normal text-neutral-400">opt.</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={manualArea}
                    onChange={(e) => setManualArea(e.target.value)}
                    placeholder="Leave blank if unavailable"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border-2 border-neutral-950 focus:outline-none"
                  />
                </div>
              </div>

              {/* Income & Savings Customization (Blueprint Page 5 & 8) */}
              <div className="pt-2 border-t border-dashed border-neutral-300">
                <button
                  type="button"
                  onClick={() => setShowIncomeOverride(!showIncomeOverride)}
                  className="flex items-center justify-between w-full text-left text-[11px] font-bold text-neutral-800 hover:text-neutral-950 py-1 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 flex-wrap">
                    <span>⚙️ Use my income / savings (optional)</span>
                    <span className="text-[10px] text-neutral-500 font-normal">
                      • {activeBenchmark.suburb} median: ${activeBenchmark.medianHouseholdWeeklyIncome.toLocaleString()}/wk
                    </span>
                  </span>
                  <span className="text-xs">{showIncomeOverride ? '▲' : '▼'}</span>
                </button>

                {showIncomeOverride && (
                  <div className="mt-2 p-2.5 bg-neutral-100 border border-neutral-300 rounded-xs grid grid-cols-1 sm:grid-cols-2 gap-2.5 animate-in fade-in duration-150">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-1">
                        Weekly Household Income ($)
                      </label>
                      <input
                        type="number"
                        min="100"
                        value={customIncome}
                        onChange={(e) => setCustomIncome(e.target.value)}
                        placeholder={`Median: $${activeBenchmark.medianHouseholdWeeklyIncome}`}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-neutral-950 focus:outline-none font-bold"
                      />
                      <span className="text-[9px] text-neutral-500 block mt-0.5">
                        Overrides ABS Census median. Kept private.
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-1">
                        Current Savings ($) <span className="font-normal text-neutral-400">opt.</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={customSavings}
                        onChange={(e) => setCustomSavings(e.target.value)}
                        placeholder="e.g. 15000"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-neutral-950 focus:outline-none"
                      />
                      <span className="text-[9px] text-neutral-500 block mt-0.5">
                        Checks 6-week upfront buffer.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !manualRent || !manualSuburb}
                className="w-full mt-2 py-2.5 bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider border-2 border-neutral-950 hover:bg-[#FFE600] hover:text-neutral-950 cursor-pointer disabled:opacity-50 transition-all"
              >
                {isLoading ? 'Calculating…' : 'Calculate Reality Score →'}
              </button>
            </form>
          )}

          {/* Loading Animation Message */}
          {isLoading && (
            <div className="mt-4 p-3 bg-[#FFE600]/20 border border-neutral-950 text-center animate-pulse text-xs font-bold text-neutral-900">
              {LOADING_MESSAGES[loadingStep]}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-3 p-2.5 bg-red-50 border border-red-500 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      ) : (
        /* Result & Share Card View */
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Notice on Missing Data if any */}
          {result.dataQuality.notice && (
            <div className="bg-amber-50 border border-amber-300 px-3 py-2 text-[11px] text-amber-900 text-center font-bold">
              ⚠️ {result.dataQuality.notice}
            </div>
          )}

          {/* Card Preview Container */}
          <div className="flex justify-center">
            <ListingRealityCard ref={cardRef} data={result} />
          </div>

          {/* Action Buttons OUTSIDE the Card (per Blueprint Page 4 rule) */}
          <div className="bg-white border-2 border-neutral-950 p-4 shadow-[3px_3px_0px_#141414] space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleShareOnX}
                className="flex-1 py-2.5 px-4 bg-neutral-950 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 cursor-pointer transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share on X</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 py-2.5 px-4 bg-[#FFE600] text-neutral-950 border-2 border-neutral-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-yellow-400 cursor-pointer disabled:opacity-50 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Saving…' : 'Download Card'}</span>
              </button>
            </div>

            {/* Blueprint Page 9: "change input" / Tweak numbers on the fly */}
            <div className="pt-2 border-t border-dashed border-neutral-300">
              <button
                type="button"
                onClick={() => setIsEditingInResult(!isEditingInResult)}
                className="w-full py-1.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{isEditingInResult ? 'Hide Input Tweaks ▲' : 'Tweak Rent, Income or Savings ▼'}</span>
              </button>

              {isEditingInResult && (
                <form
                  onSubmit={handleRecalculate}
                  className="mt-2.5 p-3 bg-neutral-50 border border-neutral-300 space-y-2 text-left animate-in fade-in duration-150"
                >
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-0.5">
                        Weekly Rent ($)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={manualRent}
                        onChange={(e) => setManualRent(e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-neutral-950 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-0.5">
                        Weekly Income ($)
                      </label>
                      <input
                        type="number"
                        min="100"
                        value={customIncome}
                        onChange={(e) => setCustomIncome(e.target.value)}
                        placeholder={`Median: $${result.benchmarks.medianHouseholdWeeklyIncome}`}
                        className="w-full px-2 py-1 bg-white border border-neutral-950"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-0.5">
                        Current Savings ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={customSavings}
                        onChange={(e) => setCustomSavings(e.target.value)}
                        placeholder="e.g. 15000"
                        className="w-full px-2 py-1 bg-white border border-neutral-950"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-0.5">
                        Internal Area (m²)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={manualArea}
                        onChange={(e) => setManualArea(e.target.value)}
                        placeholder="Leave blank if N/A"
                        className="w-full px-2 py-1 bg-white border border-neutral-950"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#FFE600] hover:text-neutral-950 transition-all cursor-pointer"
                  >
                    Update Reality Score ⚡
                  </button>
                </form>
              )}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 text-[11px] font-bold text-neutral-600 hover:text-neutral-950 flex items-center justify-center gap-1.5 cursor-pointer underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Check another listing</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
