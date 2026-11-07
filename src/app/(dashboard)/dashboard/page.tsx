'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Coins,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useInstallment } from '@/context/InstallmentContext';
import { SummaryCard } from '@/components/ui/SummaryCard';
import { DonutChart } from '@/components/ui/DonutChart';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { AddClientModal } from '@/components/clients/AddClientModal';
import { AddPaymentModal } from '@/components/payments/AddPaymentModal';

export default function DashboardPage() {
  const { stats, payments, selectedDateRange } = useInstallment();
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);

  // Take the 5 most recent payments for the dashboard preview table
  const recentPayments = payments.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here&apos;s what&apos;s happening with your installment payments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Synchronized Date Range Badge (Single source of truth with Navbar) */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{selectedDateRange}</span>
          </div>

          {/* Quick Actions */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsAddClientOpen(true)}
            icon={<Plus className="w-3.5 h-3.5 text-blue-600" />}
          >
            Add Client
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddPaymentOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Payment
          </Button>
        </div>
      </div>

      {/* 4 Pastel Summary Cards (Derived Dynamically from Centralized State) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Clients */}
        <SummaryCard
          title="Total Clients"
          value={stats.totalClients}
          trendText="12% from last month"
          isTrendUp={true}
          trendPositive={true}
          theme="blue"
          icon={<Users className="w-5 h-5" />}
        />

        {/* Pending Payments */}
        <SummaryCard
          title="Pending Payments"
          value={stats.pendingPaymentsCount}
          trendText="5% from last month"
          isTrendUp={true}
          trendPositive={true}
          theme="green"
          icon={<Coins className="w-5 h-5" />}
        />

        {/* Overdue Payments */}
        <SummaryCard
          title="Overdue Payments"
          value={stats.overduePaymentsCount}
          trendText="3% from last month"
          isTrendUp={false}
          trendPositive={false}
          theme="rose"
          icon={<AlertCircle className="w-5 h-5" />}
        />

        {/* Recent Payments */}
        <SummaryCard
          title="Recent Payments"
          value={stats.recentPaymentsCount}
          trendText="8% from last month"
          isTrendUp={true}
          trendPositive={true}
          theme="purple"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
      </div>

      {/* Main Section: Payment Overview (Donut Chart) & Recent Payments Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Payment Overview (Donut Chart) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Payment Overview
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Installment clearance & verification status across all active records
            </p>
          </div>

          <div className="my-auto py-2">
            <DonutChart
              paid={stats.chart.paid}
              pending={stats.chart.pending}
              overdue={stats.chart.overdue}
              paidAmount={stats.chart.paidAmount}
              pendingAmount={stats.chart.pendingAmount}
              overdueAmount={stats.chart.overdueAmount}
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Overall Cleared Volume</span>
            <span className="font-bold text-emerald-600">
              {formatCurrency(stats.totalCollectedAmount)}
            </span>
          </div>
        </div>

        {/* Right: Recent Payments Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Recent Payments
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Latest client installments and verification vouchers
              </p>
            </div>

            <Link
              href="/payments"
              className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Client Name</th>
                  <th className="pb-3 px-4">Amount</th>
                  <th className="pb-3 px-4">Date</th>
                  <th className="pb-3 pl-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-slate-800">
                        {payment.clientName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {payment.property}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {formatDate(payment.paymentDate || payment.dueDate)}
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <Badge status={payment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-2">
            <span>Showing recent {recentPayments.length} transactions</span>
            <button
              onClick={() => setIsAddPaymentOpen(true)}
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              + Record new payment
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
      />
      <AddPaymentModal
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
      />
    </div>
  );
}
