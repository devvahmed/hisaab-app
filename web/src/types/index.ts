export type ClientStatus = 'Active' | 'Pending' | 'Overdue' | 'Completed';

export interface PropertyDetails {
  plotNo: string;
  block: string;
  size: string;
  type: 'Residential Plot' | 'Commercial Plot' | 'Apartment' | 'Villa' | 'Shop';
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  cnic: string;
  property: string;
  propertyDetails: PropertyDetails;
  monthlyInstallment: number;
  totalAmount: number;
  remainingAmount: number;
  paidAmount: number;
  status: ClientStatus;
  bookingDate: string;
  installmentStartDate: string;
  nextDueDate: string;
  totalInstallments: number;
  paidInstallments: number;
  notes?: string;
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Overdue';
export type PaymentMethod = 'Bank Transfer' | 'Cash' | 'Cheque' | 'Pay Order' | 'Raast';

export interface Payment {
  id: string;
  clientId: string;
  clientName: string;
  property: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  method: PaymentMethod;
  status: PaymentStatus;
  reference?: string;
  notes?: string;
  receiptNumber: string;
  isVerified: boolean;
  screenshotName?: string;
}

export type DocumentType = 'CNIC' | 'Booking Form' | 'Allotment Letter' | 'Payment Receipt' | 'Other';

export interface DocumentItem {
  id: string;
  fileName: string;
  documentType: DocumentType;
  clientId: string;
  clientName: string;
  uploadDate: string;
  fileSize: string;
  fileUrl?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

