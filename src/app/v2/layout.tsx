import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '$0SQM — The Australian Dream',
  description: 'Real data. Real prices. Same result. Explore what your savings buy in Sydney and beyond.',
  openGraph: {
    title: '$0SQM — The Australian Dream',
    description: 'The Australian dream still starts at zero square metres.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Own0SQM',
    creator: '@Own0SQM',
  },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="v2-container min-h-screen bg-background text-foreground font-[family-name:var(--font-jakarta)]">
      {children}
    </div>
  );
}
