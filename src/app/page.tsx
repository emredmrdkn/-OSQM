import type { Metadata } from 'next';
import { StageContainer } from '@/components/layout/StageContainer';
import { StageHeader } from '@/components/stage/Header';
import { StageHero } from '@/components/stage/Hero';
import { StageRealityCheck } from '@/components/stage/RealityCheck';
import { StageMeetJustinAndCities } from '@/components/stage/MeetJustinAndCities';
import { StageMerch } from '@/components/stage/Merch';
import { StageFooter } from '@/components/stage/Footer';
import { ShareModal } from '@/components/organisms/ShareModal';
import { WaitlistModal } from '@/components/organisms/WaitlistModal';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const city = typeof params.city === 'string' ? params.city : 'Sydney';
  const sqm = typeof params.sqm === 'string' ? params.sqm : '5.21';
  const deposit = typeof params.deposit === 'string' ? params.deposit : '25,000';

  const ogImageUrl = `/api/og?city=${encodeURIComponent(city)}&sqm=${encodeURIComponent(sqm)}&deposit=${encodeURIComponent(deposit)}`;

  return {
    title: `$0SQM — You Can Afford ${sqm} m² of ${city.toUpperCase()}`,
    description: `Official $0SQM Reality Check. With ${deposit} in savings, see how many microscopic square metres you own.`,
    openGraph: {
      title: `$0SQM — I can afford ${sqm} m² of ${city.toUpperCase()}`,
      description: `Official $0SQM Housing Reality Check. Same dream. Different budget.`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${sqm} m² in ${city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `$0SQM — I can afford ${sqm} m² of ${city.toUpperCase()}`,
      description: `Official $0SQM Housing Reality Check. Same dream. Different budget.`,
      images: [ogImageUrl],
    },
  };
}

export default function HomePage() {
  return (
    <main>
      <StageContainer>
        {/* Header (y 0–66, hero fotoğrafının ÜSTÜNDE, şeffaf) */}
        <StageHeader />

        {/* Hero (y 0–515, tam genişlik fotoğraf, alt kenar yırtık kâğıt) */}
        <StageHero />

        {/* Reality Check (y 515–885) */}
        <StageRealityCheck />

        {/* Meet Justin + Same Cities (y 885–1205) */}
        <StageMeetJustinAndCities />

        {/* Merch (y 1205–1450) */}
        <StageMerch />

        {/* Footer (y 1450–1536) */}
        <StageFooter />

        {/* Global Modals */}
        <ShareModal />
        <WaitlistModal />
      </StageContainer>
    </main>
  );
}
