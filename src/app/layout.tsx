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

export const metadata: Metadata = {
  title: '$0SQM — The Zero Square Metre Generation',
  description: 'Same dream. Different budget. The viral satirical housing reality calculator and streetwear drop.',
  openGraph: {
    title: '$0SQM — The Zero Square Metre Generation',
    description: 'Calculate how many microscopic square metres your life savings affords in Sydney, London, NYC and more.',
    siteName: '$0SQM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '$0SQM — The Zero Square Metre Generation',
    description: 'Same dream. Different budget. Calculate your reality.',
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
