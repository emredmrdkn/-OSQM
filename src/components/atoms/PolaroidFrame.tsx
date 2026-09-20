import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Tape } from './Tape';

export interface PolaroidFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  caption?: string;
  subCaption?: string;
  rotation?: 'left' | 'right' | 'none' | number;
  tapePosition?: 'top' | 'top-left' | 'top-right' | 'none';
  variant?: 'default' | 'stressed' | 'chill';
  hoverOverlay?: React.ReactNode;
  badge?: React.ReactNode;
}

export const PolaroidFrame: React.FC<PolaroidFrameProps> = ({
  className,
  src,
  alt,
  caption,
  subCaption,
  rotation = 'none',
  tapePosition = 'top',
  variant = 'default',
  hoverOverlay,
  badge,
  ...props
}) => {
  let rotationClass = '';
  let inlineTransform: React.CSSProperties = {};

  if (typeof rotation === 'number') {
    inlineTransform = { transform: `rotate(${rotation}deg)` };
  } else if (rotation === 'left') {
    rotationClass = '-rotate-2';
  } else if (rotation === 'right') {
    rotationClass = 'rotate-2';
  }

  const variantHoverBorder = {
    default: 'hover:border-[#141414] hover:shadow-[6px_6px_0px_#141414]',
    stressed:
      'hover:border-red-600 hover:shadow-[6px_6px_0px_#DC2626] hover:-rotate-1 transition-all',
    chill:
      'hover:border-[#FFE600] hover:shadow-[6px_6px_0px_#FFE600] hover:rotate-1 transition-all',
  }[variant];

  return (
    <div
      style={inlineTransform}
      className={cn(
        'group relative bg-white border border-[#141414] shadow-[4px_4px_0px_#141414] p-3 pb-5 transition-all duration-200 hover:scale-[1.02] hover:z-20 cursor-pointer select-none',
        rotationClass,
        variantHoverBorder,
        className
      )}
      {...props}
    >
      {tapePosition !== 'none' && (
        <Tape position={tapePosition} className="z-10" />
      )}

      {badge && (
        <div className="absolute top-2 right-2 z-20 transition-transform duration-200 group-hover:scale-110">
          {badge}
        </div>
      )}

      {/* Photo Frame with Hover Overlay */}
      <div className="relative w-full overflow-hidden border border-[#141414]/20 bg-[#F0EEE6] aspect-[4/3]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Dynamic Hover Layer (Stressed Scribbles / Chill Sparkles) */}
        {hoverOverlay && (
          <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center justify-center">
            {hoverOverlay}
          </div>
        )}
      </div>

      {/* Handwritten Caption */}
      {caption && (
        <p className="mt-3 text-center text-lg md:text-xl font-bold text-[#141414] font-[family-name:var(--font-caveat)] leading-tight tracking-wide">
          {caption}
        </p>
      )}

      {subCaption && (
        <p className="text-center text-xs font-bold text-[#666666] uppercase tracking-wider mt-1">
          {subCaption}
        </p>
      )}
    </div>
  );
};
