import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      prefixNode,
      suffixNode,
      label,
      error,
      helperText,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold uppercase tracking-wider text-[#141414]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {prefixNode && (
            <div className="absolute left-3 flex items-center pointer-events-none text-sm font-black text-[#141414]">
              {prefixNode}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full bg-white text-[#141414] font-bold text-base px-3 py-2.5 border border-[#141414] shadow-[2px_2px_0px_#141414] placeholder:text-[#888888] placeholder:font-normal focus:outline-none focus:shadow-[3px_3px_0px_#FFE600] focus:border-[#141414] transition-all disabled:opacity-50 disabled:bg-[#F0EEE6]',
              prefixNode ? 'pl-9' : '',
              suffixNode ? 'pr-12' : '',
              error ? 'border-red-600 shadow-[2px_2px_0px_#DC2626]' : '',
              className
            )}
            {...props}
          />
          {suffixNode && (
            <div className="absolute right-3 flex items-center text-xs font-bold text-[#666666]">
              {suffixNode}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs font-bold text-red-600 tracking-tight">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className="text-xs text-[#666666] font-medium">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
