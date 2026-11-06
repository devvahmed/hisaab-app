import React from 'react';
import { cn } from '@/lib/utils';
import { ClientStatus, PaymentStatus } from '@/types';

type BadgeStatus = ClientStatus | PaymentStatus | 'Verified' | 'Unverified';

interface BadgeProps {
  status: BadgeStatus | string;
  className?: string;
}

export function Badge({ status, className }: BadgeProps) {
  const normalized = status.toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';

  if (normalized === 'paid' || normalized === 'active' || normalized === 'verified') {
    styles = 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]';
  } else if (normalized === 'pending' || normalized === 'unverified') {
    styles = 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]';
  } else if (normalized === 'overdue' || normalized === 'defaulted') {
    styles = 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]';
  } else if (normalized === 'completed') {
    styles = 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border transition-colors',
        styles,
        className
      )}
    >
      {status}
    </span>
  );
}

