'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useInstallment } from '@/context/InstallmentContext';
import { PaymentMethod, PaymentStatus } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, Image as ImageIcon } from 'lucide-react';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClientId?: string;
}

export function AddPaymentModal({ isOpen, onClose, defaultClientId }: AddPaymentModalProps) {
  const { clients, addPayment } = useInstallment();

  const [selectedClientId, setSelectedClientId] = useState<string>(defaultClientId || '');
  const [amount, setAmount] = useState<number>(25000);
  const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [method, setMethod] = useState<PaymentMethod>('Bank Transfer');
  const [status, setStatus] = useState<PaymentStatus>('Paid');
  const [reference, setReference] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(true);

  // Update client when defaultClientId changes or when client is chosen
  useEffect(() => {
    if (defaultClientId) {
      setSelectedClientId(defaultClientId);
    } else if (clients.length > 0 && !selectedClientId) {
      setSelectedClientId(clients[0].id);
    }
  }, [defaultClientId, clients, selectedClientId]);

  // When client changes, auto-fill default installment amount
  useEffect(() => {
    const selectedClient = clients.find((c) => c.id === selectedClientId);
    if (selectedClient) {
      setAmount(selectedClient.monthlyInstallment);
    }
  }, [selectedClientId, clients]);

  const selectedClient = clients.find((c) => c.id === selectedClientId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || amount <= 0) return;

    addPayment({
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      property: selectedClient.property,
      amount: Number(amount),
      dueDate,
      paymentDate: status === 'Overdue' ? undefined : paymentDate,
      method,
      status,
      reference: reference || undefined,
      notes: notes || undefined,
      isVerified: status === 'Paid' && isVerified,
      screenshotName: uploadedFileName || undefined
    });

    onClose();
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record New Payment"
      description="Record an installment receipt with verification status and deposit proof."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Client */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Select Client *
          </label>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none font-medium"
            required
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.property} (Monthly: {formatCurrency(c.monthlyInstallment)})
              </option>
            ))}
          </select>

          {selectedClient && (
            <div className="mt-2 p-2.5 bg-blue-50/60 rounded-lg border border-blue-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Remaining Balance:</span>
              <span className="font-bold text-blue-700">
                {formatCurrency(selectedClient.remainingAmount)}
              </span>
            </div>
          )}
        </div>

        {/* Amount & Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Amount (PKR) *
            </label>
            <input
              type="number"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none font-bold text-slate-800"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              required
            />
          </div>
        </div>

        {/* Method & Payment Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as PaymentMethod)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
            >
              <option value="Bank Transfer">Bank Transfer (IBFT)</option>
              <option value="Cash">Cash at Agency</option>
              <option value="Raast">Raast Instant Payment</option>
              <option value="Cheque">Cheque</option>
              <option value="Pay Order">Pay Order / Demand Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Deposit Date
            </label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
            />
          </div>
        </div>

        {/* Verification Status Selector (Distinct Pending vs Confirmed) */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Verification & Audit State *
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setStatus('Paid');
                setIsVerified(true);
              }}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                status === 'Paid'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Paid & Verified</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setStatus('Pending');
                setIsVerified(false);
              }}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                status === 'Pending'
                  ? 'bg-amber-50 border-amber-500 text-amber-800 font-bold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Pending Audit</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setStatus('Overdue');
                setIsVerified(false);
              }}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                status === 'Overdue'
                  ? 'bg-red-50 border-red-500 text-red-800 font-bold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>Overdue Due</span>
              </div>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            {status === 'Pending' && 'Payment slip submitted by client but not yet cleared in dealer bank account.'}
            {status === 'Paid' && 'Payment verified in bank statement. Will credit client ledger.'}
            {status === 'Overdue' && 'Unpaid installment flag. Generates automatic collection alert.'}
          </p>
        </div>

        {/* Transaction Reference & Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Transaction / Cheque Ref No.
            </label>
            <input
              type="text"
              placeholder="e.g. HBL-TXN-884920"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Received via WhatsApp slip"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
            />
          </div>
        </div>

        {/* Screenshot Upload UI */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Deposit Slip / Screenshot Proof (Optional)
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors relative">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleSimulatedFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center justify-center gap-1">
              <UploadCloud className="w-5 h-5 text-blue-500" />
              {uploadedFileName ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{uploadedFileName}</span>
                </div>
              ) : (
                <>
                  <p className="text-xs font-medium text-slate-700">
                    Click to browse or drop bank deposit screenshot
                  </p>
                  <p className="text-[10px] text-slate-400">PNG, JPG, PDF up to 5MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Record Payment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

