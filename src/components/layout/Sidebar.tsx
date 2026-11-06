'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Building2,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onCloseMobile?: () => void;
  className?: string;
}

export function Sidebar({ onCloseMobile, className }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      active: pathname === '/dashboard' || pathname === '/'
    },
    {
      name: 'Clients',
      href: '/clients',
      icon: Users,
      active: pathname.startsWith('/clients')
    },
    {
      name: 'Payments',
      href: '/payments',
      icon: CreditCard,
      active: pathname.startsWith('/payments')
    },
    {
      name: 'Documents',
      href: '/documents',
      icon: FileText,
      active: pathname.startsWith('/documents')
    }
  ];

  return (
    <aside
      className={cn(
        'w-64 bg-[#0F1B33] text-slate-300 flex flex-col justify-between h-screen shrink-0 select-none z-30 transition-all border-r border-slate-800/60',
        className
      )}
    >
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800/80">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight leading-tight">
                PropertyInstallment
              </h1>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Manage • Track • Grow
              </p>
            </div>
          </Link>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="px-4 py-6 space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  'flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150',
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Illustration & Brand Tagline */}
      <div className="p-4 mx-4 mb-6 rounded-2xl bg-[#16233F] border border-slate-800 text-center relative overflow-hidden">
        {/* City skyline silhouette */}
        <div className="py-2 flex items-center justify-center opacity-85">
          <svg
            className="w-28 h-14 text-blue-400/50"
            viewBox="0 0 120 60"
            fill="currentColor"
          >
            {/* Stars / Moon */}
            <circle cx="100" cy="12" r="3" fill="#93C5FD" />
            <circle cx="20" cy="18" r="1" fill="#93C5FD" />
            <circle cx="75" cy="8" r="1.5" fill="#93C5FD" />
            {/* Buildings */}
            <rect x="15" y="25" width="16" height="35" rx="1" fill="#3B82F6" opacity="0.4" />
            <rect x="35" y="15" width="22" height="45" rx="1.5" fill="#60A5FA" opacity="0.6" />
            <rect x="60" y="28" width="18" height="32" rx="1" fill="#2563EB" opacity="0.5" />
            <rect x="82" y="20" width="20" height="40" rx="1" fill="#93C5FD" opacity="0.4" />
            {/* Windows */}
            <rect x="39" y="20" width="3" height="4" fill="#FEF08A" />
            <rect x="46" y="20" width="3" height="4" fill="#FEF08A" />
            <rect x="39" y="28" width="3" height="4" fill="#FEF08A" />
            <rect x="46" y="28" width="3" height="4" fill="#FEF08A" />
            <rect x="86" y="26" width="3" height="4" fill="#FEF08A" />
            <rect x="94" y="26" width="3" height="4" fill="#FEF08A" />
          </svg>
        </div>

        <p className="text-xs font-semibold text-slate-200 mt-1">
          Better Management
        </p>
        <p className="text-[11px] text-slate-400">
          for a Brighter Future
        </p>
      </div>
    </aside>
  );
}

