import React from 'react';
import { cn } from '@/lib/utils';

export interface BrutalistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  variant?: 'default' | 'stressed' | 'chill' | 'gold';
}

export const BrutalistCard = React.forwardRef<HTMLDivElement, BrutalistCardProps>(
  (
    {
      className,
      children,
      interactive = false,
      elevation = 'md',
      bordered = true,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const elevationStyles = {
      none: '',
      sm: 'shadow-[2px_2px_0px_#141414]',
      md: 'shadow-[3px_3px_0px_#141414]',
      lg: 'shadow-[5px_5px_0px_#141414]',
    }[elevation];

    const variantStyles = {
      default: 'bg-white border-[#141414]',
      stressed:
        'bg-white border-[#141414] hover:border-red-600 hover:shadow-[5px_5px_0px_#DC2626]',
      chill:
        'bg-white border-[#141414] hover:border-[#FFE600] hover:shadow-[5px_5px_0px_#FFE600]',
      gold:
        'bg-[#FFFDF5] border-[#141414] shadow-[4px_4px_0px_#FFE600]',
    }[variant];

    const interactiveStyles = interactive
      ? 'hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#141414] transition-all duration-150 cursor-pointer'
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          'group relative text-[#141414] p-5',
          bordered ? 'border' : '',
          variantStyles,
          elevationStyles,
          interactiveStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BrutalistCard.displayName = 'BrutalistCard';
