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
    canonical: `${siteUrl}/`,
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
    'housing affordability calculator Australia',
    'how much land can I afford Sydney',
    'Australian Dream housing',
    'property deposit calculator NSW',
    'Melbourne house prices vs Sydney',
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
        url: 'https://0sqm.com/images/og-card.jpg',
        width: 1200,
        height: 630,
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
    images: ['https://0sqm.com/images/og-card.jpg'],
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
      alternateName: 'Zero Square Metres',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/reality-score-card.png`,
      },
      foundingDate: '2026',
      foundingLocation: {
        '@type': 'Place',
        name: 'Sydney, Australia',
      },
      description: 'The viral Australian housing reality check. Real data, real prices, same result.',
      knowsAbout: [
        'Australian housing affordability',
        'Sydney property market',
        'Housing crisis calculator',
        'First home buyer reality check',
      ],
      sameAs: [
        'https://x.com/Own0SQM',
        'https://instagram.com/own0sqm',
        'https://tiktok.com/@own0sqm',
        'https://youtube.com/@own0sqm',
      ],
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
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much land can I buy in Sydney with $25,000?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Based on current median land values of $4,800/m², $25,000 affords approximately 5.21 m² of theoretical land in Sydney — roughly the size of a walk-in closet.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the median house price in Sydney in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'As of August 2026, the median house price in Sydney is approximately $1,490,000 according to Cotality data.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the $0SQM Reality Check?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '$0SQM is a viral housing affordability calculator that shows how many square metres of land your savings can buy in major Australian and global cities. It uses real median house prices, land values, and stamp duty data.',
          },
        },
      ],
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
