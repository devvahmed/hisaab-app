'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useInstallment } from '@/context/InstallmentContext';
import { Client, ClientStatus } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface EditClientModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
}

function EditClientForm({ client, onClose }: { client: Client; onClose: () => void }) {
  const { updateClient } = useInstallment();

  const [formData, setFormData] = useState({
    name: client.name,
    phone: client.phone,
    email: client.email || '',
    cnic: client.cnic,
    property: client.property,
    plotNo: client.propertyDetails.plotNo,
    block: client.propertyDetails.block,
    size: client.propertyDetails.size,
    monthlyInstallment: client.monthlyInstallment,
    totalAmount: client.totalAmount,
    status: client.status,
    notes: client.notes || ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(formData.totalAmount) < client.paidAmount) {
      setError(`Total amount cannot be less than already confirmed paid amount (${formatCurrency(client.paidAmount)})`);
      return;
    }
    setError(null);
    updateClient(client.id, {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      cnic: formData.cnic,
      property: formData.property,
      propertyDetails: {
        ...client.propertyDetails,
        plotNo: formData.plotNo,
        block: formData.block,
        size: formData.size
      },
      monthlyInstallment: Number(formData.monthlyInstallment),
      totalAmount: Number(formData.totalAmount),
      status: formData.status,
      notes: formData.notes
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">CNIC Number</label>
          <input
            type="text"
            value={formData.cnic}
            onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ClientStatus })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Total Amount (PKR)</label>
          <input
            type="number"
            value={formData.totalAmount}
            onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none font-semibold"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Installment (PKR)</label>
          <input
            type="number"
            value={formData.monthlyInstallment}
            onChange={(e) => setFormData({ ...formData, monthlyInstallment: Number(e.target.value) })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none font-semibold"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Dealer Notes</label>
        <textarea
          rows={2}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
        />
      </div>

      {error && (
        <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export function EditClientModal({ client, isOpen, onClose }: EditClientModalProps) {
  if (!client) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Client - ${client.name}`}
      description="Update client contact, property specifications, or payment plan."
      maxWidth="xl"
    >
      <EditClientForm client={client} onClose={onClose} />
    </Modal>
  );
}
