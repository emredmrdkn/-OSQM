import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'yellow' | 'dark' | 'stamp' | 'outline' | 'red';
  size?: 'sm' | 'md' | 'lg';
  rotation?: 'none' | 'left' | 'right';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  children,
  variant = 'yellow',
  size = 'md',
  rotation = 'none',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] tracking-wider',
    md: 'px-3 py-1 text-xs tracking-wider',
    lg: 'px-4 py-1.5 text-sm tracking-widest',
  }[size];

  const variantStyles = {
    yellow:
      'bg-[#FFE600] text-[#141414] border border-[#141414] font-black uppercase shadow-[2px_2px_0px_#141414]',
    dark:
      'bg-[#141414] text-white border border-[#141414] font-black uppercase shadow-[2px_2px_0px_#FFE600]',
    stamp:
      'bg-white text-[#141414] border-2 border-[#141414] font-black uppercase tracking-widest shadow-[2px_2px_0px_#141414]',
    outline:
      'bg-transparent text-[#141414] border border-[#141414] font-bold uppercase',
    red:
      'bg-red-600 text-white border border-[#141414] font-black uppercase shadow-[2px_2px_0px_#141414]',
  }[variant];

  const rotationStyles = {
    none: '',
    left: '-rotate-2',
    right: 'rotate-2',
  }[rotation];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center select-none',
        sizeStyles,
        variantStyles,
        rotationStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
