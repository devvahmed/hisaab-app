'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  FileText,
  Plus,
  Download,
  Eye,
  Edit2,
  ShieldCheck
} from 'lucide-react';
import { useInstallment } from '@/context/InstallmentContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { AddPaymentModal } from '@/components/payments/AddPaymentModal';
import { UploadDocumentModal } from '@/components/documents/UploadDocumentModal';
import { EditClientModal } from '@/components/clients/EditClientModal';

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const clientId = resolvedParams.id;

  const { clients, payments, documents, showToast } = useInstallment();
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'documents'>('overview');

  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const client = clients.find((c) => c.id === clientId);

  if (!client) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Client Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">The requested client record does not exist or has been removed.</p>
        <Link href="/clients" className="inline-block mt-4">
          <Button variant="primary">Return to Clients List</Button>
        </Link>
      </div>
    );
  }

  // Filter client's specific payments and documents
  const clientPayments = payments.filter((p) => p.clientId === client.id);
  const clientDocuments = documents.filter((d) => d.clientId === client.id);

  // Percentage calculations
  const percentPaid = client.totalAmount > 0
    ? Math.min(100, Math.round((client.paidAmount / client.totalAmount) * 100))
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/clients"
            className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {client.name}
              </h1>
              <Badge status={client.status} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              CNIC: {client.cnic} • Member since {formatDate(client.bookingDate)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            icon={<Edit2 className="w-3.5 h-3.5" />}
          >
            Edit Profile
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsUploadDocOpen(true)}
            icon={<FileText className="w-3.5 h-3.5 text-blue-600" />}
          >
            Upload Doc
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

      {/* Key Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-400 block">Total Amount</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">
            {formatCurrency(client.totalAmount)}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-400 block">Monthly Installment</span>
          <span className="text-lg font-bold text-blue-600 mt-1 block">
            {formatCurrency(client.monthlyInstallment)}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-400 block">Paid Amount</span>
          <span className="text-lg font-bold text-emerald-600 mt-1 block">
            {formatCurrency(client.paidAmount)}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-400 block">Remaining Amount</span>
          <span className="text-lg font-bold text-slate-800 mt-1 block">
            {formatCurrency(client.remainingAmount)}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs col-span-2 lg:col-span-1">
          <span className="text-[11px] font-medium text-slate-400 block">Next Due Date</span>
          <span className="text-lg font-bold text-amber-600 mt-1 block">
            {formatDate(client.nextDueDate)}
          </span>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">Installment Completion Progress</span>
          <span className="font-bold text-blue-600">{percentPaid}% Paid</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${percentPaid}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
          <span>{client.paidInstallments} Installments Cleared</span>
          <span>{Math.max(0, client.totalInstallments - client.paidInstallments)} Remaining</span>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'overview'
              ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-1.5 ${
            activeTab === 'payments'
              ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Payments Ledger</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {clientPayments.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-1.5 ${
            activeTab === 'documents'
              ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Documents</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {clientDocuments.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Specifications Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">Property Details</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Project / Society</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{client.property}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Property Type</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{client.propertyDetails.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Plot / Unit Number</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{client.propertyDetails.plotNo}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Block / Sector</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{client.propertyDetails.block}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Size</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{client.propertyDetails.size}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Booking Date</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{formatDate(client.bookingDate)}</span>
              </div>
            </div>
          </div>

          {/* Contact & Agreement Notes */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-800">Contact & Agreement Notes</h3>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">{client.phone}</span>
                </div>
                {client.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-700">{client.email}</span>
                  </div>
                )}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mt-3">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Dealer Log Notes:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {client.notes || 'No specific notes recorded for this client.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Installment Tenor: {client.totalInstallments} months</span>
              <span className="font-semibold text-blue-600">
                {formatCurrency(client.monthlyInstallment)} / Month
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Payments Ledger */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Installment Ledger</h3>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddPaymentOpen(true)}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Payment
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Receipt #</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Payment Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clientPayments.length > 0 ? (
                  clientPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">
                        {p.receiptNumber}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{formatDate(p.dueDate)}</td>
                      <td className="py-3 px-4 text-slate-600">{formatDate(p.paymentDate)}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">{formatCurrency(p.amount)}</td>
                      <td className="py-3 px-4 text-slate-600">{p.method}</td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{p.reference || '-'}</td>
                      <td className="py-3 px-4 text-right">
                        <Badge status={p.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No payments recorded yet for this client.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Documents */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Client Documents & Files</h3>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsUploadDocOpen(true)}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Upload Document
            </Button>
          </div>

          <div className="divide-y divide-slate-100">
            {clientDocuments.length > 0 ? (
              clientDocuments.map((doc) => (
                <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{doc.fileName}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {doc.documentType} • {doc.fileSize} • Uploaded {formatDate(doc.uploadDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => showToast('Previewing Document', `Opening ${doc.fileName}...`, 'info')}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showToast('Download Started', `Downloading ${doc.fileName}...`, 'success')}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-slate-400 text-xs">
                No legal documents uploaded yet for this client.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <AddPaymentModal
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
        defaultClientId={client.id}
      />
      <UploadDocumentModal
        isOpen={isUploadDocOpen}
        onClose={() => setIsUploadDocOpen(false)}
        defaultClientId={client.id}
      />
      <EditClientModal
        client={client}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}

