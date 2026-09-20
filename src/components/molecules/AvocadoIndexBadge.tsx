import React from 'react';
import { HyperLocalItem } from '@/types/city';
import { cn } from '@/lib/utils';

export interface AvocadoIndexBadgeProps {
  item: HyperLocalItem;
  count: number;
  className?: string;
}

export const AvocadoIndexBadge: React.FC<AvocadoIndexBadgeProps> = ({
  item,
  count,
  className,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 bg-[#FFFDF5] border border-[#141414] shadow-[2px_2px_0px_#141414] px-3 py-1.5',
        className
      )}
    >
      <span className="text-lg">{item.emoji}</span>
      <div className="flex flex-col text-left">
        <span className="text-xs font-black uppercase text-[#141414] tracking-tight leading-tight">
          {count.toLocaleString()} {item.unitName}
        </span>
        <span className="text-[10px] text-[#666666] font-medium leading-none">
          The Boomer Financial Index
        </span>
      </div>
    </div>
  );
};
