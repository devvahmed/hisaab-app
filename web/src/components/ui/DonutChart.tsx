'use client';

import React, { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

interface DonutChartProps {
  paid: number;
  pending: number;
  overdue: number;
  paidAmount?: number;
  pendingAmount?: number;
  overdueAmount?: number;
}

export function DonutChart({
  paid,
  pending,
  overdue,
  paidAmount = 0,
  pendingAmount = 0,
  overdueAmount = 0
}: DonutChartProps) {
  const [activeSegment, setActiveSegment] = useState<'paid' | 'pending' | 'overdue' | null>(null);
  const [viewMode, setViewMode] = useState<'count' | 'amount'>('count');

  // Counts
  const totalCount = paid + pending + overdue || 1;
  const paidPctCount = totalCount > 0 ? Math.round((paid / totalCount) * 100) : 0;
  const pendingPctCount = totalCount > 0 ? Math.round((pending / totalCount) * 100) : 0;
  const overduePctCount = totalCount > 0 ? Math.max(0, 100 - paidPctCount - pendingPctCount) : 0;

  // Amounts
  const totalAmount = paidAmount + pendingAmount + overdueAmount || 1;
  const paidPctAmount = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0;
  const pendingPctAmount = totalAmount > 0 ? Math.round((pendingAmount / totalAmount) * 100) : 0;
  const overduePctAmount = totalAmount > 0 ? Math.max(0, 100 - paidPctAmount - pendingPctAmount) : 0;

  // Selected values according to viewMode
  const isCount = viewMode === 'count';
  const displayTotal = isCount ? totalCount : formatCurrency(totalAmount);
  const paidPct = isCount ? paidPctCount : paidPctAmount;
  const pendingPct = isCount ? pendingPctCount : pendingPctAmount;
  const overduePct = isCount ? overduePctCount : overduePctAmount;

  // SVG parameters
  const radius = 64;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius;

  // Use the percentage to calculate stroke lengths
  const paidLength = (paidPct / 100) * circumference;
  const pendingLength = (pendingPct / 100) * circumference;
  const overdueLength = (overduePct / 100) * circumference;

  const paidOffset = 0;
  const pendingOffset = -paidLength;
  const overdueOffset = -(paidLength + pendingLength);

  return (
    <div className="space-y-4">
      {/* Toggle View Mode */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">
          Metric: <strong className="text-slate-800">{isCount ? 'Transaction Records' : 'PKR Volume'}</strong>
        </span>
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setViewMode('count')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              isCount ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Count
          </button>
          <button
            type="button"
            onClick={() => setViewMode('amount')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              !isCount ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Volume (PKR)
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-1">
        {/* SVG Donut */}
        <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
            />

            {/* Paid Segment (Emerald #10B981) */}
            {paidPct > 0 && (
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="#10B981"
                strokeWidth={activeSegment === 'paid' ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${paidLength} ${circumference}`}
                strokeDashoffset={paidOffset}
                strokeLinecap="round"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveSegment('paid')}
                onMouseLeave={() => setActiveSegment(null)}
              />
            )}

            {/* Pending Segment (Amber #F59E0B) */}
            {pendingPct > 0 && (
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="#F59E0B"
                strokeWidth={activeSegment === 'pending' ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${pendingLength} ${circumference}`}
                strokeDashoffset={pendingOffset}
                strokeLinecap="round"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveSegment('pending')}
                onMouseLeave={() => setActiveSegment(null)}
              />
            )}

            {/* Overdue Segment (Red #EF4444) */}
            {overduePct > 0 && (
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="#EF4444"
                strokeWidth={activeSegment === 'overdue' ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${overdueLength} ${circumference}`}
                strokeDashoffset={overdueOffset}
                strokeLinecap="round"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveSegment('overdue')}
                onMouseLeave={() => setActiveSegment(null)}
              />
            )}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {isCount ? 'Total' : 'Total Volume'}
            </span>
            <span className={`font-extrabold text-slate-800 tracking-tight leading-tight ${isCount ? 'text-2xl sm:text-3xl' : 'text-sm sm:text-base'}`}>
              {displayTotal}
            </span>
            {activeSegment ? (
              <span className="text-[10px] font-bold text-blue-600 uppercase mt-0.5">
                {activeSegment}
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 mt-0.5">
                {isCount ? 'Installments' : 'Active Cycle'}
              </span>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 w-full sm:w-auto">
          {/* Paid */}
          <div
            onMouseEnter={() => setActiveSegment('paid')}
            onMouseLeave={() => setActiveSegment(null)}
            className={`flex items-center justify-between gap-6 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeSegment === 'paid' ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#10B981] shrink-0" />
              <span className="text-xs font-semibold text-slate-700">Paid</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900">
                {isCount ? paid : formatCurrency(paidAmount)}
              </span>
              <span className="text-[11px] text-slate-400 ml-1.5 font-medium">({paidPct}%)</span>
            </div>
          </div>

          {/* Pending */}
          <div
            onMouseEnter={() => setActiveSegment('pending')}
            onMouseLeave={() => setActiveSegment(null)}
            className={`flex items-center justify-between gap-6 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeSegment === 'pending' ? 'bg-amber-50 ring-1 ring-amber-200' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#F59E0B] shrink-0" />
              <span className="text-xs font-semibold text-slate-700">Pending</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900">
                {isCount ? pending : formatCurrency(pendingAmount)}
              </span>
              <span className="text-[11px] text-slate-400 ml-1.5 font-medium">({pendingPct}%)</span>
            </div>
          </div>

          {/* Overdue */}
          <div
            onMouseEnter={() => setActiveSegment('overdue')}
            onMouseLeave={() => setActiveSegment(null)}
            className={`flex items-center justify-between gap-6 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeSegment === 'overdue' ? 'bg-rose-50 ring-1 ring-rose-200' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#EF4444] shrink-0" />
              <span className="text-xs font-semibold text-slate-700">Overdue</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900">
                {isCount ? overdue : formatCurrency(overdueAmount)}
              </span>
              <span className="text-[11px] text-slate-400 ml-1.5 font-medium">({overduePct}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
