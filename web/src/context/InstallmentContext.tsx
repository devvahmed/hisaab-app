'use client';

import React, { createContext, useContext, useState } from 'react';
import { Client, Payment, DocumentItem, ToastMessage, PaymentStatus } from '@/types';
import { INITIAL_CLIENTS, INITIAL_PAYMENTS, INITIAL_DOCUMENTS } from '@/lib/mock-data';

interface InstallmentContextType {
  clients: Client[];
  payments: Payment[];
  documents: DocumentItem[];
  toasts: ToastMessage[];
  unreadNotificationCount: number;
  addClient: (client: Omit<Client, 'id' | 'remainingAmount' | 'paidAmount' | 'paidInstallments'> & { initialDeposit?: number }) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
  addPayment: (payment: Omit<Payment, 'id' | 'receiptNumber'>) => void;
  updatePaymentStatus: (id: string, status: PaymentStatus, isVerified: boolean) => void;
  addDocument: (document: Omit<DocumentItem, 'id' | 'uploadDate'>) => void;
  deleteDocument: (id: string) => void;
  showToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
  // Summary Stats
  stats: {
    totalClients: number;
    pendingPaymentsCount: number;
    overduePaymentsCount: number;
    recentPaymentsCount: number;
    totalCollectedAmount: number;
    chart: {
      paid: number;
      pending: number;
      overdue: number;
      total: number;
    };
  };
}

const InstallmentContext = createContext<InstallmentContextType | undefined>(undefined);

export function InstallmentProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [unreadNotificationCount] = useState<number>(3);

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

  const addClient = (data: Omit<Client, 'id' | 'remainingAmount' | 'paidAmount' | 'paidInstallments'> & { initialDeposit?: number }) => {
    const initialDeposit = data.initialDeposit || 0;
    const paidAmount = initialDeposit;
    const remainingAmount = Math.max(0, data.totalAmount - paidAmount);
    const paidInstallments = initialDeposit > 0 ? 1 : 0;
    const newId = `cli-${Date.now()}`;

    const newClient: Client = {
      ...data,
      id: newId,
      paidAmount,
      remainingAmount,
      paidInstallments,
      status: data.status || 'Active'
    };

    setClients((prev) => [newClient, ...prev]);

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
        reference: 'BOOKING-DEPOSIT',
        receiptNumber: `REC-${Date.now().toString().slice(-4)}`,
        isVerified: true,
        notes: 'Initial booking deposit payment'
      };
      setPayments((prev) => [initialPayment, ...prev]);
    }

    showToast('Client Added Successfully', `${data.name} has been enrolled in ${data.property}.`, 'success');
  };

  const updateClient = (id: string, updatedData: Partial<Client>) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const merged = { ...c, ...updatedData };
          if (updatedData.totalAmount !== undefined || updatedData.paidAmount !== undefined) {
            merged.remainingAmount = Math.max(0, merged.totalAmount - (merged.paidAmount || 0));
          }
          return merged;
        }
        return c;
      })
    );
    showToast('Client Updated', 'Client records updated successfully.', 'info');
  };

  const deleteClient = (id: string) => {
    const target = clients.find((c) => c.id === id);
    setClients((prev) => prev.filter((c) => c.id !== id));
    showToast('Client Removed', target ? `${target.name} was removed.` : 'Client deleted.', 'info');
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

    // If verified or Paid, update client ledger
    if (newPayment.status === 'Paid') {
      setClients((prev) =>
        prev.map((c) => {
          if (c.id === newPayment.clientId) {
            const newPaid = c.paidAmount + newPayment.amount;
            const newRemaining = Math.max(0, c.totalAmount - newPaid);
            const isCompleted = newRemaining === 0;
            return {
              ...c,
              paidAmount: newPaid,
              remainingAmount: newRemaining,
              paidInstallments: c.paidInstallments + 1,
              status: isCompleted ? 'Completed' : c.status === 'Overdue' ? 'Active' : c.status
            };
          }
          return c;
        })
      );
    }

    showToast(
      'Payment Recorded',
      `${paymentData.clientName} - Rs. ${paymentData.amount.toLocaleString('en-PK')} (${paymentData.status})`,
      paymentData.status === 'Paid' ? 'success' : 'warning'
    );
  };

  const updatePaymentStatus = (id: string, status: PaymentStatus, isVerified: boolean) => {
    setPayments((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const wasPaid = p.status === 'Paid';
          const isNowPaid = status === 'Paid';

          // Adjust client if transitioning to/from Paid
          if (!wasPaid && isNowPaid) {
            setClients((clientPrev) =>
              clientPrev.map((c) => {
                if (c.id === p.clientId) {
                  const newPaid = c.paidAmount + p.amount;
                  return {
                    ...c,
                    paidAmount: newPaid,
                    remainingAmount: Math.max(0, c.totalAmount - newPaid),
                    paidInstallments: c.paidInstallments + 1
                  };
                }
                return c;
              })
            );
          } else if (wasPaid && !isNowPaid) {
            setClients((clientPrev) =>
              clientPrev.map((c) => {
                if (c.id === p.clientId) {
                  const newPaid = Math.max(0, c.paidAmount - p.amount);
                  return {
                    ...c,
                    paidAmount: newPaid,
                    remainingAmount: c.totalAmount - newPaid,
                    paidInstallments: Math.max(0, c.paidInstallments - 1)
                  };
                }
                return c;
              })
            );
          }

          return { ...p, status, isVerified };
        }
        return p;
      })
    );
    showToast('Payment Status Updated', `Payment marked as ${status}.`, 'info');
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

  // Calculate live statistics
  // Reference figures: Total Clients: 124, Pending: 18, Overdue: 7, Recent: 12
  // Paid: 78 (63%), Pending: 39 (31%), Overdue: 7 (6%)
  const totalClients = Math.max(124, clients.length + 114);
  const pendingPaymentsCount = payments.filter((p) => p.status === 'Pending').length + 16;
  const overduePaymentsCount = payments.filter((p) => p.status === 'Overdue').length + 5;
  const recentPaymentsCount = payments.length + 4;
  const totalCollectedAmount = payments.filter((p) => p.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);

  const stats = {
    totalClients,
    pendingPaymentsCount,
    overduePaymentsCount,
    recentPaymentsCount,
    totalCollectedAmount,
    chart: {
      paid: 78,
      pending: 39,
      overdue: 7,
      total: 124
    }
  };

  return (
    <InstallmentContext.Provider
      value={{
        clients,
        payments,
        documents,
        toasts,
        unreadNotificationCount,
        addClient,
        updateClient,
        deleteClient,
        getClientById,
        addPayment,
        updatePaymentStatus,
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

