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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://0sqm.com.au';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '$0SQM — The Australian Dream Still Starts at 0m²',
  description: 'Real data. Real prices. Same result. The viral Australian housing reality check.',
  openGraph: {
    title: '$0SQM — The Australian Dream Still Starts at 0m²',
    description: 'Calculate how many microscopic square metres your life savings affords in Sydney and beyond.',
    siteName: '$0SQM',
    type: 'website',
    images: [
      {
        url: '/api/og',
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
    images: ['/api/og'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${permanentMarker.variable} ${bebasNeue.variable} ${caveat.variable} ${jakarta.variable}`}>
      <body className="antialiased min-h-screen bg-[#F8F6F0] text-[#141414] selection:bg-[#FFE600] selection:text-[#141414]">
        {children}
      </body>
    </html>
  );
}
