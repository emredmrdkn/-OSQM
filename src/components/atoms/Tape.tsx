import React from 'react';
import { cn } from '@/lib/utils';

export interface TapeProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'custom';
  variant?: 'clear' | 'yellow' | 'kraft';
}

export const Tape: React.FC<TapeProps> = ({
  className,
  position = 'top',
  variant = 'clear',
  ...props
}) => {
  const positionStyles = {
    top: 'absolute -top-3 left-1/2 -translate-x-1/2 -rotate-1',
    'top-left': 'absolute -top-3 -left-3 -rotate-12',
    'top-right': 'absolute -top-3 -right-3 rotate-12',
    bottom: 'absolute -bottom-3 left-1/2 -translate-x-1/2 rotate-1',
    custom: '',
  }[position];

  const variantStyles = {
    clear: 'bg-white/75 border-l-2 border-r-2 border-dashed border-black/20 shadow-sm',
    yellow: 'bg-[#FFE600]/80 border-l-2 border-r-2 border-dashed border-black/30 shadow-sm',
    kraft: 'bg-[#E5D7B7]/85 border-l-2 border-r-2 border-dashed border-black/25 shadow-sm',
  }[variant];

  return (
    <div
      className={cn(
        'w-24 h-6 pointer-events-none z-10',
        positionStyles,
        variantStyles,
        className
      )}
      {...props}
    />
  );
};
