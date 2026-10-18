import type { Metadata } from 'next';
import Link from 'next/link';
import { ListingRealityChecker } from '@/components/organisms/ListingRealityChecker';
import { ArrowLeft } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0sqm.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '$0SQM — Listing Reality Check | Sydney Rentals',
  description:
    'Found a place you cannot afford? Paste the Domain or rental listing. We will do the emotional damage with real Sydney median rent data, upfront bond costs, and a transparent Reality Score.',
  openGraph: {
    title: '$0SQM — Listing Reality Check',
    description: 'Found a place you cannot afford? Paste the listing. We will do the emotional damage.',
    url: `${siteUrl}/listing-reality`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '$0SQM — Listing Reality Check',
    description: 'Paste the listing. We will calculate the emotional damage.',
  },
};

export default function ListingRealityPage() {
  return (
    <main className="min-h-screen bg-[#F7F4ED] text-neutral-950 pb-16">
      {/* Top Navigation Bar */}
      <header className="border-b-2 border-neutral-950 bg-[#FAF9F5] px-4 py-3 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase text-neutral-700 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>&larr; Back to 0SQM Calculator</span>
          </Link>

          <Link href="/" className="flex items-center text-xl font-marker font-bold leading-none">
            <span>$</span>
            <span className="text-[#FFE600] bg-neutral-950 px-1 py-0.5 rounded-xs mr-0.5 text-sm">
              0
            </span>
            <span>SQM</span>
          </Link>
        </div>
      </header>

      {/* Main Checker Section */}
      <div className="max-w-3xl mx-auto pt-6">
        <ListingRealityChecker />
      </div>
    </main>
  );
}
