import type { Metadata, Viewport } from 'next';
import { Permanent_Marker, Bebas_Neue, Caveat, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F7F4ED',
};


const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0sqm.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '$0SQM — The Australian Dream Still Starts at 0m²',
  description: 'Real data. Real prices. Same result. The viral Australian housing reality check. Calculate how many square metres your life savings affords in Sydney and beyond.',
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    '0sqm',
    '$0SQM',
    'zero square metres',
    'Australian housing crisis',
    'Sydney house prices',
    'Sydney property market',
    'housing affordability calculator',
    'Justin and Koogee',
    'property market satire',
    'Australia real estate reality check',
    'stamp duty calculator Sydney',
    'first home buyer reality check',
  ],
  authors: [{ name: 'Justin & Koogee' }],
  creator: 'Justin & Koogee',
  publisher: '$0SQM',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: '$0SQM — The Australian Dream Still Starts at 0m²',
    description: 'Calculate how many microscopic square metres your life savings affords in Sydney and beyond. Real data. Real prices. Same result.',
    siteName: '$0SQM',
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: 'https://0sqm.com/images/reality-score-card.png',
        width: 1448,
        height: 1086,
        alt: '$0SQM Reality Score Card',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '$0SQM — The Australian Dream Still Starts at 0m²',
    description: 'I saved $25,000 and officially own 0 SQM in Sydney. Same dream. Different budget.',
    site: '@Own0SQM',
    creator: '@Own0SQM',
    images: ['https://0sqm.com/images/reality-score-card.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: '$0SQM — The Australian Dream Still Starts at 0m²',
      description: 'Real data. Real prices. Same result. Calculate how many square metres of land your life savings affords.',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: '$0SQM',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/reality-score-card.png`,
      },
      sameAs: ['https://x.com/Own0SQM'],
    },
    {
      '@type': 'WebApplication',
      '@id': `${siteUrl}/#calculator`,
      name: '$0SQM Housing Reality Check Calculator',
      url: siteUrl,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'AUD',
      },
      description: 'Interactive satirical calculator comparing actual Australian property prices and stamp duties against personal savings.',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${permanentMarker.variable} ${bebasNeue.variable} ${caveat.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[#F8F6F0] text-[#141414] selection:bg-[#FFE600] selection:text-[#141414]">
        {children}
      </body>
    </html>
  );
}
