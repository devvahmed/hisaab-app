'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Calendar,
  ChevronDown,
  Menu,
  CheckCircle,
  AlertCircle,
  FileCheck,
  User,
  Settings,
  LogOut,
  Building
} from 'lucide-react';
import { useInstallment } from '@/context/InstallmentContext';

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const { unreadNotificationCount } = useInstallment();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Apr 1, 2025 - Apr 30, 2025');

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Payment Received',
      desc: 'Ali Raza submitted Rs. 25,000 via Bank Transfer',
      time: '15m ago',
      icon: CheckCircle,
      iconColor: 'text-emerald-500'
    },
    {
      id: 2,
      title: 'Installment Overdue',
      desc: 'Fatima Asif (Royal City) is 12 days overdue',
      time: '2h ago',
      icon: AlertCircle,
      iconColor: 'text-rose-500'
    },
    {
      id: 3,
      title: 'New Document Uploaded',
      desc: 'Allotment Letter added for Usman Tariq',
      time: '1d ago',
      icon: FileCheck,
      iconColor: 'text-blue-500'
    }
  ];

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients, payments, etc..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
          />
        </div>
      </div>

      {/* Right: Date Range, Notifications & Dealer Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Date Range Selector */}
        <div className="relative hidden md:block" ref={dateRef}>
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showDateDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs">
              {['Apr 1, 2025 - Apr 30, 2025', 'Mar 1, 2025 - Mar 31, 2025', 'This Quarter (Q2 2025)', 'Full Year 2025'].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setShowDateDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors ${
                    selectedRange === range ? 'text-[#2563EB] font-bold bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-4 pb-3 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-800">Notifications</h4>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                  {unreadNotificationCount} unread
                </span>
              </div>
              <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer"
                    >
                      <div className="mt-0.5 shrink-0">
                        <Icon className={`w-4 h-4 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">{item.desc}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Dealer Profile / Avatar */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-full bg-[#0F1B33] text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-100 shadow-xs">
              SA
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-slate-800 block leading-tight">
                Saad Ahmed
              </span>
              <span className="text-[11px] text-slate-500 block">
                Dealer
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-800">Saad Ahmed</p>
                <p className="text-[11px] text-slate-500">saad.dealer@sbortix.pk</p>
                <span className="mt-1.5 inline-block text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                  Verified Property Dealer
                </span>
              </div>

              <Link
                href="/dashboard"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <Building className="w-4 h-4 text-slate-400" />
                <span>Agency Dashboard</span>
              </Link>
              <button
                onClick={() => setShowUserMenu(false)}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-left"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Dealer Profile</span>
              </button>
              <button
                onClick={() => setShowUserMenu(false)}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-left"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Account Settings</span>
              </button>

              <div className="border-t border-slate-100 mt-1 pt-1">
                <Link
                  href="/login"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

