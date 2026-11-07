'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Client, Payment, DocumentItem, ToastMessage, PaymentStatus, ClientStatus } from '@/types';
import { INITIAL_CLIENTS, INITIAL_PAYMENTS, INITIAL_DOCUMENTS } from '@/lib/mock-data';

interface DonutChartData {
  paid: number;
  pending: number;
  overdue: number;
  total: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  totalAmount: number;
}

interface InstallmentContextType {
  clients: Client[];
  payments: Payment[];
  documents: DocumentItem[];
  toasts: ToastMessage[];
  unreadNotificationCount: number;
  selectedDateRange: string;
  setSelectedDateRange: (range: string) => void;
  addClient: (clientData: Omit<Client, 'id' | 'remainingAmount' | 'paidAmount' | 'paidInstallments'> & { initialDeposit?: number }) => void;
  updateClient: (id: string, clientData: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
  addPayment: (paymentData: Omit<Payment, 'id' | 'receiptNumber'>) => void;
  updatePaymentStatus: (id: string, status: PaymentStatus, isVerified: boolean) => void;
  deletePayment: (id: string) => void;
  addDocument: (documentData: Omit<DocumentItem, 'id' | 'uploadDate'>) => void;
  deleteDocument: (id: string) => void;
  showToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
  // Dynamic Real-Time Statistics
  stats: {
    totalClients: number;
    pendingPaymentsCount: number;
    overduePaymentsCount: number;
    recentPaymentsCount: number;
    totalCollectedAmount: number;
    totalPendingAmount: number;
    totalOverdueAmount: number;
    chart: DonutChartData;
  };
}

const InstallmentContext = createContext<InstallmentContextType | undefined>(undefined);

export function InstallmentProvider({ children }: { children: React.ReactNode }) {
  const [rawClients, setRawClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [unreadNotificationCount] = useState<number>(3);
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Apr 1, 2025 - Apr 30, 2025');

  const showToast = (title: string, message?: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Compute live financial balances for all clients based strictly on confirmed payments
  const clients: Client[] = useMemo(() => {
    return rawClients.map((client) => {
      // Confirmed Paid payments ONLY
      const confirmedPaid = payments
        .filter((p) => p.clientId === client.id && p.status === 'Paid' && p.isVerified)
        .reduce((sum, p) => sum + p.amount, 0);

      // Remaining Amount must equal Total Amount minus confirmed payments
      // Math.max(0, ...) strictly prevents negative balance
      const remaining = Math.max(0, client.totalAmount - confirmedPaid);

      // Count of confirmed installments
      const confirmedInstallments = payments.filter(
        (p) => p.clientId === client.id && p.status === 'Paid' && p.isVerified
      ).length;

      // Status check
      const hasOverdue = payments.some(
        (p) => p.clientId === client.id && p.status === 'Overdue'
      );
      const hasPending = payments.some(
        (p) => p.clientId === client.id && p.status === 'Pending'
      );

      let status: ClientStatus = client.status;
      if (remaining === 0 && client.totalAmount > 0) {
        status = 'Completed';
      } else if (hasOverdue) {
        status = 'Overdue';
      } else if (hasPending && status !== 'Overdue') {
        status = 'Pending';
      } else if (status !== 'Completed') {
        status = 'Active';
      }

      return {
        ...client,
        paidAmount: confirmedPaid,
        remainingAmount: remaining,
        paidInstallments: Math.max(client.paidInstallments, confirmedInstallments),
        status
      };
    });
  }, [rawClients, payments]);

  const addClient = (data: Omit<Client, 'id' | 'remainingAmount' | 'paidAmount' | 'paidInstallments'> & { initialDeposit?: number }) => {
    const newId = `cli-${Date.now()}`;
    const initialDeposit = data.initialDeposit || 0;
    const paidAmount = initialDeposit > 0 ? initialDeposit : 0;
    const remainingAmount = Math.max(0, data.totalAmount - paidAmount);

    const newClient: Client = {
      ...data,
      id: newId,
      paidAmount,
      remainingAmount,
      paidInstallments: initialDeposit > 0 ? 1 : 0,
      status: data.status || 'Active'
    };

    setRawClients((prev) => [newClient, ...prev]);

    // If an initial deposit was entered, record it as a confirmed payment immediately
    if (initialDeposit > 0) {
      const initialPayment: Payment = {
        id: `pay-${Date.now()}`,
        clientId: newId,
        clientName: data.name,
        property: data.property,
        amount: initialDeposit,
        dueDate: data.bookingDate,
        paymentDate: data.bookingDate,
        method: 'Bank Transfer',
        status: 'Paid',
        reference: 'INITIAL-BOOKING-DEP',
        receiptNumber: `REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        isVerified: true,
        notes: 'Initial booking deposit payment'
      };
      setPayments((prev) => [initialPayment, ...prev]);
    }

    showToast('Client Registered', `${data.name} was added to ${data.property}.`, 'success');
  };

  const updateClient = (id: string, updatedData: Partial<Client>) => {
    setRawClients((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const merged = { ...c, ...updatedData };
          if (updatedData.totalAmount !== undefined) {
            merged.remainingAmount = Math.max(0, merged.totalAmount - merged.paidAmount);
          }
          return merged;
        }
        return c;
      })
    );
    showToast('Client Updated', 'Client records were updated successfully.', 'info');
  };

  const deleteClient = (id: string) => {
    const target = rawClients.find((c) => c.id === id);
    setRawClients((prev) => prev.filter((c) => c.id !== id));
    // Also remove associated payments and documents for consistent data integrity
    setPayments((prev) => prev.filter((p) => p.clientId !== id));
    setDocuments((prev) => prev.filter((d) => d.clientId !== id));
    showToast('Client Removed', target ? `${target.name} and associated records deleted.` : 'Client removed.', 'info');
  };

  const getClientById = (id: string) => {
    return clients.find((c) => c.id === id);
  };

  const addPayment = (paymentData: Omit<Payment, 'id' | 'receiptNumber'>) => {
    const newId = `pay-${Date.now()}`;
    const receiptNumber = `REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newPayment: Payment = {
      ...paymentData,
      id: newId,
      receiptNumber
    };

    setPayments((prev) => [newPayment, ...prev]);

    showToast(
      newPayment.status === 'Paid' && newPayment.isVerified ? 'Payment Confirmed' : 'Payment Recorded (Pending Audit)',
      `${paymentData.clientName} - Rs. ${paymentData.amount.toLocaleString('en-PK')} (${paymentData.status})`,
      newPayment.status === 'Paid' ? 'success' : 'warning'
    );
  };

  const updatePaymentStatus = (id: string, status: PaymentStatus, isVerified: boolean) => {
    setPayments((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status,
            isVerified,
            paymentDate: status === 'Paid' && !p.paymentDate ? new Date().toISOString().split('T')[0] : p.paymentDate
          };
        }
        return p;
      })
    );
    showToast('Verification Updated', `Payment status changed to ${status}.`, 'info');
  };

  const deletePayment = (id: string) => {
    const target = payments.find((p) => p.id === id);
    setPayments((prev) => prev.filter((p) => p.id !== id));
    showToast('Payment Deleted', target ? `Receipt ${target.receiptNumber} removed.` : 'Payment record deleted.', 'info');
  };

  const addDocument = (documentData: Omit<DocumentItem, 'id' | 'uploadDate'>) => {
    const newDoc: DocumentItem = {
      ...documentData,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setDocuments((prev) => [newDoc, ...prev]);
    showToast('Document Uploaded', `${documentData.fileName} uploaded for ${documentData.clientName}.`, 'success');
  };

  const deleteDocument = (id: string) => {
    const target = documents.find((d) => d.id === id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    showToast('Document Deleted', target ? `${target.fileName} removed.` : 'Document removed.', 'info');
  };

  // DYNAMIC STATISTICS: 100% computed from the actual centralized state!
  const stats = useMemo(() => {
    const totalClientsCount = clients.length;

    const paidPayments = payments.filter((p) => p.status === 'Paid');
    const pendingPayments = payments.filter((p) => p.status === 'Pending');
    const overduePayments = payments.filter((p) => p.status === 'Overdue');

    const paidCount = paidPayments.length;
    const pendingCount = pendingPayments.length;
    const overdueCount = overduePayments.length;
    const totalPaymentsCount = paidCount + pendingCount + overdueCount;

    const totalCollectedAmount = paidPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalPendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalOverdueAmount = overduePayments.reduce((sum, p) => sum + p.amount, 0);
    const totalVolumeAmount = totalCollectedAmount + totalPendingAmount + totalOverdueAmount;

    return {
      totalClients: totalClientsCount,
      pendingPaymentsCount: pendingCount,
      overduePaymentsCount: overdueCount,
      recentPaymentsCount: paidCount,
      totalCollectedAmount,
      totalPendingAmount,
      totalOverdueAmount,
      chart: {
        paid: paidCount,
        pending: pendingCount,
        overdue: overdueCount,
        total: totalPaymentsCount,
        paidAmount: totalCollectedAmount,
        pendingAmount: totalPendingAmount,
        overdueAmount: totalOverdueAmount,
        totalAmount: totalVolumeAmount
      }
    };
  }, [clients, payments]);

  return (
    <InstallmentContext.Provider
      value={{
        clients,
        payments,
        documents,
        toasts,
        unreadNotificationCount,
        selectedDateRange,
        setSelectedDateRange,
        addClient,
        updateClient,
        deleteClient,
        getClientById,
        addPayment,
        updatePaymentStatus,
        deletePayment,
        addDocument,
        deleteDocument,
        showToast,
        dismissToast,
        stats
      }}
    >
      {children}
    </InstallmentContext.Provider>
  );
}

export function useInstallment() {
  const context = useContext(InstallmentContext);
  if (!context) {
    throw new Error('useInstallment must be used within an InstallmentProvider');
  }
  return context;
}
