'use client';

import React from 'react';
import { InstallmentProvider } from '@/context/InstallmentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InstallmentProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </InstallmentProvider>
  );
}

