'use client';

import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { RealityCheckResponse } from '@/types/listingReality';
import { ListingRealityCard } from './ListingRealityCard';
import { findSuburbBenchmark } from '@/data/sydneyBenchmarks';
import { computeListingMetrics, calcRealityScore } from '@/lib/listingCalculations';
import { parseListingUrl, mapManualToNormalisedListing } from '@/lib/listingAdapter';
import { ArrowRight, Download, Share2, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

const LOADING_MESSAGES = [
  'Reading the listing… 📄',
  'Checking the suburb benchmark… 📍',
  'Calculating emotional damage… 💥',
  'Finalizing 0SQM Reality Score… ⚖️',
];

export const ListingRealityChecker: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<RealityCheckResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Manual fallback mode state
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualRent, setManualRent] = useState('');
  const [manualSuburb, setManualSuburb] = useState('Surry Hills');
  const [manualBedrooms, setManualBedrooms] = useState('1');
  const [manualArea, setManualArea] = useState('');

  // Income override state
  const [customIncome, setCustomIncome] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < LOADING_MESSAGES.length - 1 ? prev + 1 : prev));
    }, 300);

    // Give a brief comedic animation experience
    await new Promise((resolve) => setTimeout(resolve, 1100));
    clearInterval(stepInterval);

    try {
      const parsed = parseListingUrl(urlInput.trim());

      if (parsed.provider === 'rea') {
        setIsManualMode(true);
        setErrorMessage(
          'RealEstate.com.au links cannot be scraped per platform policy. Quick manual confirm below (15 seconds):'
        );
        setIsLoading(false);
        return;
      }

      // Extract suburb from URL or fallback
      const suburbMatch = urlInput.match(/([a-z-]+)-nsw-(\d{4})/i);
      const suburbName = suburbMatch
        ? suburbMatch[1]
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')
        : 'Surry Hills';
      const postcode = suburbMatch ? suburbMatch[2] : '2010';

      const listing = mapManualToNormalisedListing({
        weeklyRent: 780, // Default realistic Sydney sample
        suburb: suburbName,
        postcode,
        bedrooms: 1,
        listingUrl: urlInput.trim(),
      });

      const benchmarks = findSuburbBenchmark(listing.suburb, listing.postcode);
      const income = customIncome ? Number(customIncome) : undefined;
      const metrics = computeListingMetrics(listing, benchmarks, income);
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
          notice: 'Floor area unavailable from link — no fake maths today. Weights normalized.',
        },
        cardUrl: `/r/${shareId}`,
        generatedAt: new Date().toISOString(),
      });
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Could not resolve listing. Try entering details manually below.'
      );
      setIsManualMode(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualRent || !manualSuburb) return;

    setIsLoading(true);
    setErrorMessage(null);

    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const listing = mapManualToNormalisedListing({
        weeklyRent: Number(manualRent),
        suburb: manualSuburb.trim(),
        bedrooms: Number(manualBedrooms),
        internalAreaM2: manualArea ? Number(manualArea) : undefined,
        listingUrl: urlInput.trim() || undefined,
      });

      const benchmarks = findSuburbBenchmark(listing.suburb, listing.postcode);
      const income = customIncome ? Number(customIncome) : undefined;
      const metrics = computeListingMetrics(listing, benchmarks, income);
      const score = calcRealityScore(metrics, listing, benchmarks);
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
      setErrorMessage(err instanceof Error ? err.message : 'Error processing manual input.');
    } finally {
      setIsLoading(false);
    }
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
        : 'Checked';

    const tweetText = `#MySquareMeter is 0.00 m².\nI joined the @Own0SQM club too.\n${result.listing.suburb} Reality Check: $${result.metrics.weeklyRent}/wk · ${premiumText} · Score ${result.score.total}/100.\nWen reasonable rent?`;
    const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&url=${encodeURIComponent('https://0sqm.com')}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setResult(null);
    setUrlInput('');
    setIsManualMode(false);
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8 px-4 font-mono">
      {/* Header Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#FFE600] border-2 border-neutral-950 px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#141414]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NEW: LISTING REALITY CHECK</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mt-3">
          Found a place you can&apos;t afford?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-sans">
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
                <label
                  htmlFor="listing-url-input"
                  className="block text-xs font-bold text-neutral-700 uppercase mb-1.5"
                >
                  Paste Domain or Rental Link:
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="listing-url-input"
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://www.domain.com.au/..."
                    className="flex-1 px-3 py-2.5 text-xs bg-neutral-50 border-2 border-neutral-950 focus:outline-none focus:bg-[#FFE600]/10 font-mono"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !urlInput.trim()}
                    className="px-5 py-2.5 bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider border-2 border-neutral-950 hover:bg-[#FFE600] hover:text-neutral-950 cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{isLoading ? 'Checking…' : 'Check Listing'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sample Quick Links */}
              <div className="pt-2 border-t border-dashed border-neutral-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500">
                <span>Try sample:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setUrlInput('https://www.domain.com.au/12-surry-hills-nsw-2010-12345678')
                    }
                    className="underline hover:text-neutral-950 cursor-pointer"
                  >
                    Surry Hills 1-Bed
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() =>
                      setUrlInput('https://www.domain.com.au/5-bondi-beach-nsw-2026-87654321')
                    }
                    className="underline hover:text-neutral-950 cursor-pointer"
                  >
                    Bondi Beach Studio
                  </button>
                </div>
              </div>

              {/* Manual Switch button */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsManualMode(true)}
                  className="text-[11px] text-neutral-500 hover:text-neutral-950 underline cursor-pointer"
                >
                  Don&apos;t have a link? Enter details manually (15 sec) &rarr;
                </button>
              </div>
            </form>
          ) : (
            /* Manual Fallback Mini Form */
            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-xs font-black uppercase text-neutral-950">
                  Quick Manual Reality Check
                </span>
                <button
                  type="button"
                  onClick={() => setIsManualMode(false)}
                  className="text-[10px] text-neutral-500 underline cursor-pointer"
                >
                  &larr; Back to URL paste
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                    Weekly Rent ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={manualRent}
                    onChange={(e) => setManualRent(e.target.value)}
                    placeholder="e.g. 780"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border-2 border-neutral-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                    Suburb *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualSuburb}
                    onChange={(e) => setManualSuburb(e.target.value)}
                    placeholder="e.g. Surry Hills"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border-2 border-neutral-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                    Bedrooms
                  </label>
                  <select
                    value={manualBedrooms}
                    onChange={(e) => setManualBedrooms(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border-2 border-neutral-950 focus:outline-none"
                  >
                    <option value="0">Studio / 0-Bed</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                    Internal Area (m²) <span className="font-normal text-neutral-400">opt.</span>
                  </label>
                  <input
                    type="number"
                    value={manualArea}
                    onChange={(e) => setManualArea(e.target.value)}
                    placeholder="Leave blank if unknown"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border-2 border-neutral-950 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !manualRent || !manualSuburb}
                className="w-full mt-2 py-2.5 bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider border-2 border-neutral-950 hover:bg-[#FFE600] hover:text-neutral-950 cursor-pointer disabled:opacity-50 transition-all"
              >
                {isLoading ? 'Calculating…' : 'Calculate Reality Check →'}
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
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      ) : (
        /* Result & Share Card View */
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Notice on Missing Data if any */}
          {result.dataQuality.notice && (
            <div className="bg-amber-50 border border-amber-300 px-3 py-2 text-[11px] text-amber-800 text-center">
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
