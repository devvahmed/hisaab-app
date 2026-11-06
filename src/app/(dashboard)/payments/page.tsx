'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  CreditCard,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  Trash2,
  Printer,
  X
} from 'lucide-react';
import { useInstallment } from '@/context/InstallmentContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Payment, PaymentStatus } from '@/types';
import { AddPaymentModal } from '@/components/payments/AddPaymentModal';

export default function PaymentsPage() {
  const { payments, updatePaymentStatus } = useInstallment();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [receiptPayment, setReceiptPayment] = useState<Payment | null>(null);

  // Filtering
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.reference && p.reference.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'All' || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / pageSize) || 1;
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPayments.slice(start, start + pageSize);
  }, [filteredPayments, currentPage, pageSize]);

  // Aggregate stats
  const totalPaid = payments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingCount = payments.filter((p) => p.status === 'Pending').length;
  const overdueCount = payments.filter((p) => p.status === 'Overdue').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Payments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track and manage client installment receipts, clearance, and pending deposits.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAddPaymentOpen(true)}
          icon={<Plus className="w-4 h-4" />}
          className="shadow-md shadow-blue-500/20"
        >
          Add Payment
        </Button>
      </div>

      {/* Summary Stat Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Paid Collection</span>
            <p className="text-xl font-bold text-emerald-600 mt-0.5">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Pending Verification</span>
            <p className="text-xl font-bold text-amber-600 mt-0.5">{pendingCount} Payments</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Overdue Installments</span>
            <p className="text-xl font-bold text-rose-600 mt-0.5">{overdueCount} Critical</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client or receipt #..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="w-1/2 md:w-40">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid (Green)</option>
              <option value="Pending">Pending (Amber)</option>
              <option value="Overdue">Overdue (Red)</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="w-1/2 md:w-44">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            >
              <option value="All">All Dates</option>
              <option value="CurrentMonth">April 2025</option>
              <option value="LastMonth">March 2025</option>
              <option value="Year">Year 2025</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">Client Name</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Payment Date</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedPayments.length > 0 ? (
                paginatedPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Client Name */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900">{payment.clientName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {payment.property} • <span className="font-mono text-blue-600">{payment.receiptNumber}</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap">
                      {formatCurrency(payment.amount)}
                    </td>

                    {/* Due Date */}
                    <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                      {formatDate(payment.dueDate)}
                    </td>

                    {/* Payment Date */}
                    <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                      {payment.paymentDate ? formatDate(payment.paymentDate) : '-'}
                    </td>

                    {/* Payment Method */}
                    <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                      <span className="font-medium">{payment.method}</span>
                      {payment.reference && (
                        <span className="block text-[10px] text-slate-400 font-mono">
                          {payment.reference}
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <Badge status={payment.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Verify button if pending */}
                        {payment.status === 'Pending' && (
                          <button
                            onClick={() => updatePaymentStatus(payment.id, 'Paid', true)}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                            title="Confirm & Verify Payment"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Verify</span>
                          </button>
                        )}

                        <button
                          onClick={() => setReceiptPayment(payment)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="View Receipt"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No payment records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-800">{filteredPayments.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
            <span className="font-bold text-slate-800">
              {Math.min(currentPage * pageSize, filteredPayments.length)}
            </span>{' '}
            of <span className="font-bold text-slate-800">{filteredPayments.length}</span> payments
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Payment Modal */}
      <AddPaymentModal
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
      />

      {/* Payment Receipt Modal */}
      {receiptPayment && (
        <Modal
          isOpen={!!receiptPayment}
          onClose={() => setReceiptPayment(null)}
          title="Installment Payment Receipt"
          description="Official electronic payment voucher & verification slip."
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">PropertyInstallment</h4>
                  <p className="text-[10px] text-slate-400">Official Dealer Receipt</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-blue-600">{receiptPayment.receiptNumber}</span>
                  <p className="text-[10px] text-slate-400">{formatDate(receiptPayment.paymentDate || receiptPayment.dueDate)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block">Client Name</span>
                  <span className="font-bold text-slate-800 text-sm">{receiptPayment.clientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Property Project</span>
                  <span className="font-semibold text-slate-800">{receiptPayment.property}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Payment Method</span>
                  <span className="font-medium text-slate-700">{receiptPayment.method}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Reference / Slip</span>
                  <span className="font-mono text-slate-700">{receiptPayment.reference || 'N/A'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block">Amount Paid</span>
                  <span className="text-xl font-extrabold text-slate-900">
                    {formatCurrency(receiptPayment.amount)}
                  </span>
                </div>
                <Badge status={receiptPayment.status} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => alert('Printing payment voucher...')}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setReceiptPayment(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

