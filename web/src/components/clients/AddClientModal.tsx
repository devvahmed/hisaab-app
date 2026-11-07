'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useInstallment } from '@/context/InstallmentContext';
import { formatCurrency } from '@/lib/utils';
import { Calculator, AlertCircle } from 'lucide-react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddClientModal({ isOpen, onClose }: AddClientModalProps) {
  const { addClient } = useInstallment();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cnic: '',
    property: 'Green Valley',
    plotNo: '',
    block: '',
    size: '5 Marla',
    type: 'Residential Plot' as const,
    totalAmount: 1200000,
    monthlyInstallment: 25000,
    initialDeposit: 200000,
    bookingDate: new Date().toISOString().split('T')[0],
    installmentStartDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dynamic remaining calculation
  const calculatedRemaining = Math.max(0, formData.totalAmount - formData.initialDeposit);
  const calculatedInstallments = formData.monthlyInstallment > 0
    ? Math.ceil(calculatedRemaining / formData.monthlyInstallment)
    : 0;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.cnic.trim()) newErrors.cnic = 'CNIC is required';
    if (!formData.property.trim()) newErrors.property = 'Property name is required';
    if (!formData.plotNo.trim()) newErrors.plotNo = 'Plot or Unit number is required';
    if (formData.totalAmount <= 0) newErrors.totalAmount = 'Total amount must be greater than 0';
    if (formData.monthlyInstallment <= 0) newErrors.monthlyInstallment = 'Monthly installment must be greater than 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addClient({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      cnic: formData.cnic,
      property: formData.property,
      propertyDetails: {
        plotNo: formData.plotNo,
        block: formData.block || 'Main Block',
        size: formData.size,
        type: formData.type
      },
      monthlyInstallment: Number(formData.monthlyInstallment),
      totalAmount: Number(formData.totalAmount),
      initialDeposit: Number(formData.initialDeposit),
      status: 'Active',
      bookingDate: formData.bookingDate,
      installmentStartDate: formData.installmentStartDate,
      nextDueDate: formData.installmentStartDate,
      totalInstallments: calculatedInstallments + (formData.initialDeposit > 0 ? 1 : 0),
      notes: formData.notes
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Client"
      description="Register a new client, property booking, and customized installment plan."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Client Personal Information */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Client Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Tariq Mehmood"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
              {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                placeholder="e.g. 0300-1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
              {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CNIC Number *
              </label>
              <input
                type="text"
                placeholder="e.g. 35201-1234567-1"
                value={formData.cnic}
                onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
              {errors.cnic && <p className="text-[11px] text-red-500 mt-1">{errors.cnic}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="e.g. tariq@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Property Information */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Property Specifications
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Property / Project *
              </label>
              <select
                value={formData.property}
                onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              >
                <option value="Green Valley">Green Valley</option>
                <option value="Bahria Town">Bahria Town</option>
                <option value="DHA Lahore">DHA Lahore</option>
                <option value="Royal City">Royal City</option>
                <option value="Lake City">Lake City</option>
                <option value="Gulberg Greens">Gulberg Greens</option>
                <option value="Park View City">Park View City</option>
                <option value="New Lahore City">New Lahore City</option>
                <option value="Central Park Housing">Central Park Housing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Plot / Unit No *
              </label>
              <input
                type="text"
                placeholder="e.g. Plot 142"
                value={formData.plotNo}
                onChange={(e) => setFormData({ ...formData, plotNo: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
              {errors.plotNo && <p className="text-[11px] text-red-500 mt-1">{errors.plotNo}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Block / Sector
              </label>
              <input
                type="text"
                placeholder="e.g. Sector C / Block B"
                value={formData.block}
                onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Size
              </label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              >
                <option value="3 Marla">3 Marla</option>
                <option value="5 Marla">5 Marla</option>
                <option value="7 Marla">7 Marla</option>
                <option value="10 Marla">10 Marla</option>
                <option value="1 Kanal">1 Kanal</option>
                <option value="2 Kanal">2 Kanal</option>
                <option value="4 Marla Commercial">4 Marla Commercial</option>
                <option value="2 Bed Apartment">2 Bed Apartment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Booking Date
              </label>
              <input
                type="date"
                value={formData.bookingDate}
                onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Installment Start Date
              </label>
              <input
                type="date"
                value={formData.installmentStartDate}
                onChange={(e) => setFormData({ ...formData, installmentStartDate: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Installment Calculation */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Pricing & Installment Schedule
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Total Amount (PKR) *
              </label>
              <input
                type="number"
                step="50000"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none font-semibold text-slate-800"
              />
              {errors.totalAmount && <p className="text-[11px] text-red-500 mt-1">{errors.totalAmount}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Monthly Installment (PKR) *
              </label>
              <input
                type="number"
                step="5000"
                value={formData.monthlyInstallment}
                onChange={(e) => setFormData({ ...formData, monthlyInstallment: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none font-semibold text-slate-800"
              />
              {errors.monthlyInstallment && <p className="text-[11px] text-red-500 mt-1">{errors.monthlyInstallment}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Initial Booking Deposit
              </label>
              <input
                type="number"
                step="25000"
                value={formData.initialDeposit}
                onChange={(e) => setFormData({ ...formData, initialDeposit: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none font-semibold text-slate-800"
              />
            </div>
          </div>

          {/* Dynamic Summary pill */}
          <div className="mt-3.5 p-3 bg-white rounded-lg border border-blue-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Remaining Balance:</span>
              <span className="text-base font-bold text-blue-700">
                {formatCurrency(calculatedRemaining)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Estimated Tenor:</span>
              <span className="font-semibold text-slate-800">
                {calculatedInstallments} Monthly Installments
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Deposit Status:</span>
              <span className="font-semibold text-emerald-600">
                {formData.initialDeposit > 0 ? `${formatCurrency(formData.initialDeposit)} Paid` : 'No Deposit'}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Additional Dealer Notes
          </label>
          <textarea
            rows={2}
            placeholder="Special clauses, payment reminders, dealer references..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Client & Schedule
          </Button>
        </div>
      </form>
    </Modal>
  );
}

