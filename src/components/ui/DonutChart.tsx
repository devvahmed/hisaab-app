'use client';

import React, { useState } from 'react';

interface DonutChartProps {
  paid: number;
  pending: number;
  overdue: number;
  total?: number;
}

export function DonutChart({ paid, pending, overdue, total: customTotal }: DonutChartProps) {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  const total = customTotal || (paid + pending + overdue) || 1;
  const paidPct = Math.round((paid / total) * 100);
  const pendingPct = Math.round((pending / total) * 100);
  const overduePct = Math.max(0, 100 - paidPct - pendingPct);

  // SVG parameters
  const radius = 64;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  // Segment strokeDasharray & offsets
  const paidLength = (paidPct / 100) * circumference;
  const pendingLength = (pendingPct / 100) * circumference;
  const overdueLength = (overduePct / 100) * circumference;

  const paidOffset = 0;
  const pendingOffset = -paidLength;
  const overdueOffset = -(paidLength + pendingLength);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
      {/* SVG Donut */}
      <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />

          {/* Paid Segment (Emerald #10B981) */}
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

          {/* Pending Segment (Amber #F59E0B) */}
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

          {/* Overdue Segment (Red #EF4444) */}
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
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs font-medium text-slate-400">Total</span>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">
            {total}
          </span>
          {activeSegment && (
            <span className="text-[10px] font-semibold text-slate-500 capitalize">
              {activeSegment}
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3.5 w-full sm:w-auto">
        {/* Paid */}
        <div
          onMouseEnter={() => setActiveSegment('paid')}
          onMouseLeave={() => setActiveSegment(null)}
          className={`flex items-center justify-between gap-6 p-2 rounded-xl transition-all cursor-pointer ${
            activeSegment === 'paid' ? 'bg-emerald-50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#10B981] shrink-0" />
            <span className="text-sm font-medium text-slate-700">Paid</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-slate-800">{paid}</span>
            <span className="text-xs text-slate-400 ml-1.5 font-medium">({paidPct}%)</span>
          </div>
        </div>

        {/* Pending */}
        <div
          onMouseEnter={() => setActiveSegment('pending')}
          onMouseLeave={() => setActiveSegment(null)}
          className={`flex items-center justify-between gap-6 p-2 rounded-xl transition-all cursor-pointer ${
            activeSegment === 'pending' ? 'bg-amber-50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#F59E0B] shrink-0" />
            <span className="text-sm font-medium text-slate-700">Pending</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-slate-800">{pending}</span>
            <span className="text-xs text-slate-400 ml-1.5 font-medium">({pendingPct}%)</span>
          </div>
        </div>

        {/* Overdue */}
        <div
          onMouseEnter={() => setActiveSegment('overdue')}
          onMouseLeave={() => setActiveSegment(null)}
          className={`flex items-center justify-between gap-6 p-2 rounded-xl transition-all cursor-pointer ${
            activeSegment === 'overdue' ? 'bg-red-50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#EF4444] shrink-0" />
            <span className="text-sm font-medium text-slate-700">Overdue</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-slate-800">{overdue}</span>
            <span className="text-xs text-slate-400 ml-1.5 font-medium">({overduePct}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

