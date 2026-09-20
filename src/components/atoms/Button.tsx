import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-100 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs uppercase',
      md: 'px-5 py-2.5 text-sm uppercase',
      lg: 'px-7 py-3.5 text-base uppercase font-extrabold',
    }[size];

    const variantStyles = {
      primary:
        'bg-[#FFE600] text-[#141414] border border-[#141414] shadow-[3px_3px_0px_#141414] hover:shadow-[4px_4px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#141414]',
      dark:
        'bg-[#141414] text-[#FFFFFF] border border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#262626] hover:shadow-[4px_4px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#141414]',
      outline:
        'bg-white text-[#141414] border border-[#141414] shadow-[3px_3px_0px_#141414] hover:bg-[#F8F6F0] hover:shadow-[4px_4px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#141414]',
      ghost:
        'bg-transparent text-[#141414] border border-transparent hover:border-[#141414] hover:bg-[#FFE600]/20 active:bg-[#FFE600]/40',
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          sizeStyles,
          variantStyles,
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      >
        {children}
        {icon && <span className="ml-2 inline-flex items-center">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
