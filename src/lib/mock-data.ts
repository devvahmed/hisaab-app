import { Client, Payment, DocumentItem } from '@/types';

// Centralized initial payments dataset
// All amounts and client IDs are strictly synchronized with INITIAL_CLIENTS
export const INITIAL_PAYMENTS: Payment[] = [
  // Ali Raza (cli-1) - Total: 1,250,000 | Monthly: 25,000
  {
    id: 'pay-1',
    clientId: 'cli-1',
    clientName: 'Ali Raza',
    property: 'Green Valley',
    amount: 250000,
    dueDate: '2024-01-15',
    paymentDate: '2024-01-15',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'HBL-DEP-00192',
    receiptNumber: 'REC-2024-001',
    isVerified: true,
    notes: 'Initial booking deposit (20%)'
  },
  {
    id: 'pay-2',
    clientId: 'cli-1',
    clientName: 'Ali Raza',
    property: 'Green Valley',
    amount: 500000,
    dueDate: '2024-02-01',
    paymentDate: '2025-03-28',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'HBL-ADV-7741',
    receiptNumber: 'REC-2025-014',
    isVerified: true,
    notes: 'Installments cleared up to March 2025 (20 installments @ 25k)'
  },
  {
    id: 'pay-3',
    clientId: 'cli-1',
    clientName: 'Ali Raza',
    property: 'Green Valley',
    amount: 25000,
    dueDate: '2025-04-28',
    paymentDate: '2025-04-28',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'HBL-TXN-984321',
    receiptNumber: 'REC-2025-028',
    isVerified: true,
    notes: 'April 2025 installment via mobile app'
  },

  // Sana Khan (cli-2) - Total: 800,000 | Monthly: 50,000
  {
    id: 'pay-4',
    clientId: 'cli-2',
    clientName: 'Sana Khan',
    property: 'Bahria Town',
    amount: 150000,
    dueDate: '2024-03-10',
    paymentDate: '2024-03-10',
    method: 'Raast',
    status: 'Paid',
    reference: 'RAAST-8839201',
    receiptNumber: 'REC-2024-042',
    isVerified: true,
    notes: 'Initial booking down payment'
  },
  {
    id: 'pay-5',
    clientId: 'cli-2',
    clientName: 'Sana Khan',
    property: 'Bahria Town',
    amount: 250000,
    dueDate: '2024-04-01',
    paymentDate: '2025-03-15',
    method: 'Raast',
    status: 'Paid',
    reference: 'RAAST-99120',
    receiptNumber: 'REC-2025-022',
    isVerified: true,
    notes: '5 installments cleared through March 2025'
  },
  {
    id: 'pay-6',
    clientId: 'cli-2',
    clientName: 'Sana Khan',
    property: 'Bahria Town',
    amount: 50000,
    dueDate: '2025-04-27',
    paymentDate: '2025-04-27',
    method: 'Raast',
    status: 'Paid',
    reference: 'RAAST-104921',
    receiptNumber: 'REC-2025-029',
    isVerified: true,
    notes: 'April 2025 installment'
  },

  // Usman Tariq (cli-3) - Total: 1,800,000 | Monthly: 30,000
  {
    id: 'pay-7',
    clientId: 'cli-3',
    clientName: 'Usman Tariq',
    property: 'DHA Lahore',
    amount: 360000,
    dueDate: '2023-11-20',
    paymentDate: '2023-11-20',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'MCB-DP-3312',
    receiptNumber: 'REC-2023-088',
    isVerified: true,
    notes: '20% Down Payment Commercial Plot'
  },
  {
    id: 'pay-8',
    clientId: 'cli-3',
    clientName: 'Usman Tariq',
    property: 'DHA Lahore',
    amount: 720000,
    dueDate: '2023-12-01',
    paymentDate: '2025-03-20',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'MCB-BLK-9981',
    receiptNumber: 'REC-2025-019',
    isVerified: true,
    notes: '24 regular installments credited'
  },
  {
    id: 'pay-9',
    clientId: 'cli-3',
    clientName: 'Usman Tariq',
    property: 'DHA Lahore',
    amount: 30000,
    dueDate: '2025-04-26',
    paymentDate: '2025-04-26',
    method: 'Bank Transfer',
    status: 'Pending',
    reference: 'MCB-SLIP-7732',
    receiptNumber: 'REC-2025-030',
    isVerified: false,
    screenshotName: 'mcb_slip_usman_apr2025.jpg',
    notes: 'Online deposit slip uploaded by client, awaiting dealer bank verification'
  },

  // Fatima Asif (cli-4) - Total: 960,000 | Monthly: 40,000
  {
    id: 'pay-10',
    clientId: 'cli-4',
    clientName: 'Fatima Asif',
    property: 'Royal City',
    amount: 200000,
    dueDate: '2024-02-05',
    paymentDate: '2024-02-05',
    method: 'Cash',
    status: 'Paid',
    reference: 'CASH-REC-01',
    receiptNumber: 'REC-2024-019',
    isVerified: true,
    notes: 'Booking advance payment in cash'
  },
  {
    id: 'pay-11',
    clientId: 'cli-4',
    clientName: 'Fatima Asif',
    property: 'Royal City',
    amount: 400000,
    dueDate: '2024-03-01',
    paymentDate: '2025-03-05',
    method: 'Cash',
    status: 'Paid',
    reference: 'CASH-REC-10',
    receiptNumber: 'REC-2025-011',
    isVerified: true,
    notes: '10 monthly installments paid in office'
  },
  {
    id: 'pay-12',
    clientId: 'cli-4',
    clientName: 'Fatima Asif',
    property: 'Royal City',
    amount: 40000,
    dueDate: '2025-04-25',
    method: 'Cash',
    status: 'Overdue',
    receiptNumber: 'REC-2025-031',
    isVerified: false,
    notes: 'April 2025 installment overdue by 12 days'
  },

  // Ahmed Shah (cli-5) - Total: 1,200,000 | Monthly: 20,000
  {
    id: 'pay-13',
    clientId: 'cli-5',
    clientName: 'Ahmed Shah',
    property: 'Lake City',
    amount: 240000,
    dueDate: '2023-08-15',
    paymentDate: '2023-08-15',
    method: 'Cash',
    status: 'Paid',
    reference: 'CASH-LC-01',
    receiptNumber: 'REC-2023-055',
    isVerified: true,
    notes: 'Booking confirmation deposit'
  },
  {
    id: 'pay-14',
    clientId: 'cli-5',
    clientName: 'Ahmed Shah',
    property: 'Lake City',
    amount: 340000,
    dueDate: '2023-09-01',
    paymentDate: '2025-03-10',
    method: 'Cash',
    status: 'Paid',
    reference: 'CASH-LC-17',
    receiptNumber: 'REC-2025-018',
    isVerified: true,
    notes: '17 installments paid'
  },
  {
    id: 'pay-15',
    clientId: 'cli-5',
    clientName: 'Ahmed Shah',
    property: 'Lake City',
    amount: 20000,
    dueDate: '2025-04-24',
    paymentDate: '2025-04-24',
    method: 'Cash',
    status: 'Paid',
    reference: 'CASH-REC-112',
    receiptNumber: 'REC-2025-032',
    isVerified: true,
    notes: 'Received in office by accountant'
  },

  // Bilal Hussain (cli-6) - Total: 2,600,000 | Monthly: 65,000
  {
    id: 'pay-16',
    clientId: 'cli-6',
    clientName: 'Bilal Hussain',
    property: 'Gulberg Greens',
    amount: 520000,
    dueDate: '2023-06-10',
    paymentDate: '2023-06-10',
    method: 'Pay Order',
    status: 'Paid',
    reference: 'UBL-PO-44392',
    receiptNumber: 'REC-2023-041',
    isVerified: true,
    notes: 'Pay order 20% down payment'
  },
  {
    id: 'pay-17',
    clientId: 'cli-6',
    clientName: 'Bilal Hussain',
    property: 'Gulberg Greens',
    amount: 715000,
    dueDate: '2023-07-01',
    paymentDate: '2025-03-12',
    method: 'Pay Order',
    status: 'Paid',
    reference: 'UBL-PO-8812',
    receiptNumber: 'REC-2025-015',
    isVerified: true,
    notes: '11 installments cleared'
  },
  {
    id: 'pay-18',
    clientId: 'cli-6',
    clientName: 'Bilal Hussain',
    property: 'Gulberg Greens',
    amount: 65000,
    dueDate: '2025-04-15',
    paymentDate: '2025-04-14',
    method: 'Pay Order',
    status: 'Paid',
    reference: 'UBL-PO-9941',
    receiptNumber: 'REC-2025-025',
    isVerified: true,
    notes: 'April 2025 pay order cleared'
  },

  // Zainab Bibi (cli-7) - Total: 1,400,000 | Monthly: 35,000
  {
    id: 'pay-19',
    clientId: 'cli-7',
    clientName: 'Zainab Bibi',
    property: 'Park View City',
    amount: 280000,
    dueDate: '2023-09-01',
    paymentDate: '2023-09-01',
    method: 'Raast',
    status: 'Paid',
    reference: 'RAAST-11029',
    receiptNumber: 'REC-2023-066',
    isVerified: true,
    notes: 'Down payment via Raast'
  },
  {
    id: 'pay-20',
    clientId: 'cli-7',
    clientName: 'Zainab Bibi',
    property: 'Park View City',
    amount: 665000,
    dueDate: '2023-10-01',
    paymentDate: '2025-03-08',
    method: 'Raast',
    status: 'Paid',
    reference: 'RAAST-33019',
    receiptNumber: 'REC-2025-016',
    isVerified: true,
    notes: '19 installments cleared'
  },
  {
    id: 'pay-21',
    clientId: 'cli-7',
    clientName: 'Zainab Bibi',
    property: 'Park View City',
    amount: 35000,
    dueDate: '2025-04-08',
    paymentDate: '2025-04-08',
    method: 'Raast',
    status: 'Paid',
    reference: 'RAAST-44119',
    receiptNumber: 'REC-2025-026',
    isVerified: true,
    notes: 'April 2025 installment'
  },

  // Muhammad Tariq (cli-8) - Total: 1,120,000 | Monthly: 28,000
  {
    id: 'pay-22',
    clientId: 'cli-8',
    clientName: 'Muhammad Tariq',
    property: 'New Lahore City',
    amount: 280000,
    dueDate: '2023-10-15',
    paymentDate: '2023-10-15',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'HBL-NL-019',
    receiptNumber: 'REC-2023-074',
    isVerified: true,
    notes: 'Booking token and down payment'
  },
  {
    id: 'pay-23',
    clientId: 'cli-8',
    clientName: 'Muhammad Tariq',
    property: 'New Lahore City',
    amount: 560000,
    dueDate: '2023-11-01',
    paymentDate: '2025-03-14',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'HBL-NL-884',
    receiptNumber: 'REC-2025-017',
    isVerified: true,
    notes: '20 regular installments'
  },

  // Ayesha Malik (cli-9) - Total: 880,000 | Monthly: 22,000 (Fully Cleared)
  {
    id: 'pay-24',
    clientId: 'cli-9',
    clientName: 'Ayesha Malik',
    property: 'Al-Kabir Town',
    amount: 220000,
    dueDate: '2022-04-01',
    paymentDate: '2022-04-01',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'AK-DP-110',
    receiptNumber: 'REC-2022-011',
    isVerified: true,
    notes: '25% Booking Deposit'
  },
  {
    id: 'pay-25',
    clientId: 'cli-9',
    clientName: 'Ayesha Malik',
    property: 'Al-Kabir Town',
    amount: 660000,
    dueDate: '2022-05-01',
    paymentDate: '2025-01-10',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'AK-FINAL-99',
    receiptNumber: 'REC-2025-002',
    isVerified: true,
    notes: 'Remaining 30 installments completed in full'
  },

  // Hamza Farooq (cli-10) - Total: 1,800,000 | Monthly: 45,000
  {
    id: 'pay-26',
    clientId: 'cli-10',
    clientName: 'Hamza Farooq',
    property: 'Central Park Housing',
    amount: 360000,
    dueDate: '2023-12-01',
    paymentDate: '2023-12-01',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'CP-DP-551',
    receiptNumber: 'REC-2023-085',
    isVerified: true,
    notes: 'Down payment plot 312'
  },
  {
    id: 'pay-27',
    clientId: 'cli-10',
    clientName: 'Hamza Farooq',
    property: 'Central Park Housing',
    amount: 540000,
    dueDate: '2024-01-01',
    paymentDate: '2025-02-15',
    method: 'Bank Transfer',
    status: 'Paid',
    reference: 'CP-INST-12',
    receiptNumber: 'REC-2025-009',
    isVerified: true,
    notes: '12 installments cleared'
  },
  {
    id: 'pay-28',
    clientId: 'cli-10',
    clientName: 'Hamza Farooq',
    property: 'Central Park Housing',
    amount: 45000,
    dueDate: '2025-04-15',
    method: 'Cheque',
    status: 'Overdue',
    reference: 'CHQ-778912',
    receiptNumber: 'REC-2025-033',
    isVerified: false,
    notes: 'Cheque returned for signature mismatch. Awaiting reissuance.'
  },

  // Extra pending payment for dealer verification testing
  {
    id: 'pay-29',
    clientId: 'cli-8',
    clientName: 'Muhammad Tariq',
    property: 'New Lahore City',
    amount: 28000,
    dueDate: '2025-04-20',
    paymentDate: '2025-04-20',
    method: 'Bank Transfer',
    status: 'Pending',
    reference: 'HBL-SLIP-4412',
    receiptNumber: 'REC-2025-034',
    isVerified: false,
    screenshotName: 'hbl_transfer_tariq.png',
    notes: 'Screenshot uploaded from mobile banking, needs verification'
  }
];

// Initial raw client registry. Their live paidAmount and remainingAmount
// will be calculated dynamically from verified payments!
export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    name: 'Ali Raza',
    phone: '0300-7984587',
    email: 'ali.raza@example.com',
    cnic: '35201-7984587-1',
    property: 'Green Valley',
    propertyDetails: {
      plotNo: 'Plot 42',
      block: 'Block B',
      size: '5 Marla',
      type: 'Residential Plot'
    },
    monthlyInstallment: 25000,
    totalAmount: 1250000,
    remainingAmount: 475000, // 1,250,000 - 775,000 confirmed
    paidAmount: 775000,
    status: 'Active',
    bookingDate: '2024-01-15',
    installmentStartDate: '2024-02-01',
    nextDueDate: '2025-05-28',
    totalInstallments: 50,
    paidInstallments: 31,
    notes: 'Preferred payment method is Online Bank Transfer. Regular payer.'
  },
  {
    id: 'cli-2',
    name: 'Sana Khan',
    phone: '0321-9456789',
    email: 'sana.khan@example.com',
    cnic: '35202-9456789-2',
    property: 'Bahria Town',
    propertyDetails: {
      plotNo: 'Villa 14',
      block: 'Sector C',
      size: '10 Marla',
      type: 'Villa'
    },
    monthlyInstallment: 50000,
    totalAmount: 800000,
    remainingAmount: 350000, // 800,000 - 450,000 confirmed
    paidAmount: 450000,
    status: 'Active',
    bookingDate: '2024-03-10',
    installmentStartDate: '2024-04-01',
    nextDueDate: '2025-05-27',
    totalInstallments: 16,
    paidInstallments: 9,
    notes: 'Prompt payer. Sends Raast confirmation slips regularly.'
  },
  {
    id: 'cli-3',
    name: 'Usman Tariq',
    phone: '0312-8876543',
    email: 'usman.tariq@example.com',
    cnic: '35201-8876543-3',
    property: 'DHA Lahore',
    propertyDetails: {
      plotNo: 'Shop 18',
      block: 'Phase 6 Commercial',
      size: '4 Marla Commercial',
      type: 'Commercial Plot'
    },
    monthlyInstallment: 30000,
    totalAmount: 1800000,
    remainingAmount: 720000, // 1,800,000 - 1,080,000 confirmed. Pending 30k does NOT reduce balance yet!
    paidAmount: 1080000,
    status: 'Pending',
    bookingDate: '2023-11-20',
    installmentStartDate: '2023-12-01',
    nextDueDate: '2025-04-26',
    totalInstallments: 60,
    paidInstallments: 36,
    notes: 'Installment for April 2025 is awaiting dealer audit/verification.'
  },
  {
    id: 'cli-4',
    name: 'Fatima Asif',
    phone: '0300-8876543',
    email: 'fatima.asif@example.com',
    cnic: '35202-8876543-4',
    property: 'Royal City',
    propertyDetails: {
      plotNo: 'Plot 105',
      block: 'Executive Block',
      size: '7 Marla',
      type: 'Residential Plot'
    },
    monthlyInstallment: 40000,
    totalAmount: 960000,
    remainingAmount: 360000, // 960,000 - 600,000 confirmed
    paidAmount: 600000,
    status: 'Overdue',
    bookingDate: '2024-02-05',
    installmentStartDate: '2024-03-01',
    nextDueDate: '2025-04-25',
    totalInstallments: 24,
    paidInstallments: 15,
    notes: 'Sent overdue reminder on Apr 26. Committed to pay by next Monday.'
  },
  {
    id: 'cli-5',
    name: 'Ahmed Shah',
    phone: '0333-2223344',
    email: 'ahmed.shah@example.com',
    cnic: '35201-2223344-5',
    property: 'Lake City',
    propertyDetails: {
      plotNo: 'Plot 88',
      block: 'Bella Vista M-7',
      size: '10 Marla',
      type: 'Residential Plot'
    },
    monthlyInstallment: 20000,
    totalAmount: 1200000,
    remainingAmount: 600000, // 1,200,000 - 600,000 confirmed
    paidAmount: 600000,
    status: 'Active',
    bookingDate: '2023-08-15',
    installmentStartDate: '2023-09-01',
    nextDueDate: '2025-05-24',
    totalInstallments: 60,
    paidInstallments: 30,
    notes: 'All dues clear up to date. Excellent payment history.'
  },
  {
    id: 'cli-6',
    name: 'Bilal Hussain',
    phone: '0345-6677889',
    email: 'bilal.h@example.com',
    cnic: '37405-6677889-7',
    property: 'Gulberg Greens',
    propertyDetails: {
      plotNo: 'Farmhouse 12',
      block: 'Executive Block',
      size: '4 Kanal',
      type: 'Residential Plot'
    },
    monthlyInstallment: 65000,
    totalAmount: 2600000,
    remainingAmount: 1300000, // 2,600,000 - 1,300,000 confirmed
    paidAmount: 1300000,
    status: 'Active',
    bookingDate: '2023-06-10',
    installmentStartDate: '2023-07-01',
    nextDueDate: '2025-05-15',
    totalInstallments: 40,
    paidInstallments: 20,
    notes: 'High-value client. Pay orders submitted regularly.'
  },
  {
    id: 'cli-7',
    name: 'Zainab Bibi',
    phone: '0315-4433221',
    email: 'zainab.bibi@example.com',
    cnic: '35201-4433221-8',
    property: 'Park View City',
    propertyDetails: {
      plotNo: 'Plot 210',
      block: 'Tulip Block',
      size: '5 Marla',
      type: 'Residential Plot'
    },
    monthlyInstallment: 35000,
    totalAmount: 1400000,
    remainingAmount: 420000, // 1,400,000 - 980,000 confirmed
    paidAmount: 980000,
    status: 'Active',
    bookingDate: '2023-09-01',
    installmentStartDate: '2023-10-01',
    nextDueDate: '2025-05-08',
    totalInstallments: 40,
    paidInstallments: 28,
    notes: 'Automatic Raast payments enabled. No delayed payments.'
  },
  {
    id: 'cli-8',
    name: 'Muhammad Tariq',
    phone: '0301-5566778',
    email: 'm.tariq@example.com',
    cnic: '35202-5566778-9',
    property: 'New Lahore City',
    propertyDetails: {
      plotNo: 'Plot 55',
      block: 'Phase 2',
      size: '5 Marla',
      type: 'Residential Plot'
    },
    monthlyInstallment: 28000,
    totalAmount: 1120000,
    remainingAmount: 280000, // 1,120,000 - 840,000 confirmed
    paidAmount: 840000,
    status: 'Pending',
    bookingDate: '2023-10-15',
    installmentStartDate: '2023-11-01',
    nextDueDate: '2025-04-20',
    totalInstallments: 40,
    paidInstallments: 30,
    notes: 'Recent installment submitted via Habib Bank is pending verification.'
  },
  {
    id: 'cli-9',
    name: 'Ayesha Malik',
    phone: '0322-1122334',
    email: 'ayesha.m@example.com',
    cnic: '35201-1122334-6',
    property: 'Al-Kabir Town',
    propertyDetails: {
      plotNo: 'Apartment 4B',
      block: 'Tower 1',
      size: '2 Bed Apartment',
      type: 'Apartment'
    },
    monthlyInstallment: 22000,
    totalAmount: 880000,
    remainingAmount: 0, // 880,000 - 880,000 confirmed
    paidAmount: 880000,
    status: 'Completed',
    bookingDate: '2022-04-01',
    installmentStartDate: '2022-05-01',
    nextDueDate: 'Plan Completed',
    totalInstallments: 40,
    paidInstallments: 40,
    notes: 'Installment plan fully cleared! Allotment transfer and NDC processed.'
  },
  {
    id: 'cli-10',
    name: 'Hamza Farooq',
    phone: '0334-9988776',
    email: 'hamza.f@example.com',
    cnic: '35202-9988776-3',
    property: 'Central Park Housing',
    propertyDetails: {
      plotNo: 'Plot 312',
      block: 'Block E',
      size: '10 Marla',
      type: 'Residential Plot'
    },
    monthlyInstallment: 45000,
    totalAmount: 1800000,
    remainingAmount: 900000, // 1,800,000 - 900,000 confirmed
    paidAmount: 900000,
    status: 'Overdue',
    bookingDate: '2023-12-01',
    installmentStartDate: '2024-01-01',
    nextDueDate: '2025-04-15',
    totalInstallments: 40,
    paidInstallments: 20,
    notes: 'April 2025 cheque bounced. Second reminder dispatched.'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    fileName: 'CNIC_Ali_Raza.pdf',
    documentType: 'CNIC',
    clientId: 'cli-1',
    clientName: 'Ali Raza',
    uploadDate: '2025-04-20',
    fileSize: '1.2 MB'
  },
  {
    id: 'doc-2',
    fileName: 'BookingForm_Sana.pdf',
    documentType: 'Booking Form',
    clientId: 'cli-2',
    clientName: 'Sana Khan',
    uploadDate: '2025-04-18',
    fileSize: '2.4 MB'
  },
  {
    id: 'doc-3',
    fileName: 'AllotmentLetter_Usman.pdf',
    documentType: 'Allotment Letter',
    clientId: 'cli-3',
    clientName: 'Usman Tariq',
    uploadDate: '2025-04-15',
    fileSize: '3.1 MB'
  },
  {
    id: 'doc-4',
    fileName: 'CNIC_Fatima_Asif.pdf',
    documentType: 'CNIC',
    clientId: 'cli-4',
    clientName: 'Fatima Asif',
    uploadDate: '2025-04-12',
    fileSize: '1.5 MB'
  },
  {
    id: 'doc-5',
    fileName: 'BookingForm_Ahmed.pdf',
    documentType: 'Booking Form',
    clientId: 'cli-5',
    clientName: 'Ahmed Shah',
    uploadDate: '2025-04-10',
    fileSize: '2.8 MB'
  },
  {
    id: 'doc-6',
    fileName: 'PaymentReceipt_Ali_Apr2025.pdf',
    documentType: 'Payment Receipt',
    clientId: 'cli-1',
    clientName: 'Ali Raza',
    uploadDate: '2025-04-28',
    fileSize: '450 KB'
  },
  {
    id: 'doc-7',
    fileName: 'SitePossession_Bilal.pdf',
    documentType: 'Other',
    clientId: 'cli-6',
    clientName: 'Bilal Hussain',
    uploadDate: '2025-03-22',
    fileSize: '4.2 MB'
  }
];
