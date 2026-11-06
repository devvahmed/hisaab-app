import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export type SummaryTheme = 'blue' | 'green' | 'rose' | 'purple';

interface SummaryCardProps {
  title: string;
  value: string | number;
  trendText?: string;
  isTrendUp?: boolean;
  trendPositive?: boolean;
  icon: React.ReactNode;
  theme: SummaryTheme;
  className?: string;
}

export function SummaryCard({
  title,
  value,
  trendText,
  isTrendUp = true,
  trendPositive = true,
  icon,
  theme,
  className
}: SummaryCardProps) {
  const themeStyles = {
    blue: {
      card: 'bg-[#EEF4FF] border-[#D8E6FD]',
      iconWrap: 'bg-[#DBEAFE] text-[#2563EB]',
      valueText: 'text-[#1E293B]',
      titleText: 'text-[#475569]'
    },
    green: {
      card: 'bg-[#ECFDF5] border-[#D1FAE5]',
      iconWrap: 'bg-[#D1FAE5] text-[#059669]',
      valueText: 'text-[#1E293B]',
      titleText: 'text-[#475569]'
    },
    rose: {
      card: 'bg-[#FEF2F2] border-[#FEE2E2]',
      iconWrap: 'bg-[#FEE2E2] text-[#DC2626]',
      valueText: 'text-[#1E293B]',
      titleText: 'text-[#475569]'
    },
    purple: {
      card: 'bg-[#F5F3FF] border-[#EDE9FE]',
      iconWrap: 'bg-[#EDE9FE] text-[#7C3AED]',
      valueText: 'text-[#1E293B]',
      titleText: 'text-[#475569]'
    }
  };

  const selected = themeStyles[theme];

  return (
    <div
      className={cn(
        'p-5 rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between min-h-[148px]',
        selected.card,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center font-bold', selected.iconWrap)}>
          {icon}
        </div>
      </div>

      <div className="mt-3">
        <p className={cn('text-xs font-medium tracking-wide', selected.titleText)}>
          {title}
        </p>
        <div className="flex items-baseline justify-between mt-1">
          <h3 className={cn('text-2xl sm:text-3xl font-bold tracking-tight', selected.valueText)}>
            {value}
          </h3>
        </div>
        {trendText && (
          <div className="flex items-center gap-1 mt-1 text-xs font-semibold">
            {isTrendUp ? (
              <ArrowUpRight className={cn('w-3.5 h-3.5', trendPositive ? 'text-emerald-600' : 'text-rose-600')} />
            ) : (
              <ArrowDownRight className={cn('w-3.5 h-3.5', trendPositive ? 'text-emerald-600' : 'text-rose-600')} />
            )}
            <span className={trendPositive ? 'text-emerald-600' : 'text-rose-600'}>
              {trendText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

