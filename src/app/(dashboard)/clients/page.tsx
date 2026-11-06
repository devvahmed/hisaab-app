'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Building,
  CreditCard,
  UserX
} from 'lucide-react';
import { useInstallment } from '@/context/InstallmentContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { Client, ClientStatus } from '@/types';
import { AddClientModal } from '@/components/clients/AddClientModal';
import { EditClientModal } from '@/components/clients/EditClientModal';

export default function ClientsPage() {
  const router = useRouter();
  const { clients, deleteClient } = useInstallment();

  const [searchQuery, setSearchQuery] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Extract unique properties for filter
  const uniqueProperties = useMemo(() => {
    const set = new Set(clients.map((c) => c.property));
    return ['All', ...Array.from(set)];
  }, [clients]);

  // Filtering
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.includes(searchQuery) ||
        client.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.cnic.includes(searchQuery);

      const matchesProperty =
        propertyFilter === 'All' || client.property === propertyFilter;

      const matchesStatus =
        statusFilter === 'All' || client.status === statusFilter;

      return matchesSearch && matchesProperty && matchesStatus;
    });
  }, [clients, searchQuery, propertyFilter, statusFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredClients.length / pageSize) || 1;
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredClients.slice(start, start + pageSize);
  }, [filteredClients, currentPage, pageSize]);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete client record for ${name}?`)) {
      deleteClient(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Clients
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your property clients, bookings, and installment schedules.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
          className="shadow-md shadow-blue-500/20"
        >
          Add Client
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Property Filter */}
          <div className="w-1/2 md:w-44">
            <select
              value={propertyFilter}
              onChange={(e) => {
                setPropertyFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            >
              <option value="All">All Projects</option>
              {uniqueProperties.filter((p) => p !== 'All').map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-1/2 md:w-36">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Management Table */}
      {/* STRICT REQUIREMENT: Column Order:
          Name → Phone → Property → Monthly Installment → Total Amount → Remaining Amount → Status → Actions
          Monthly Installment BEFORE Total Amount.
          Remaining Amount AFTER Total Amount.
      */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">Name</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-4">Monthly Installment</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Remaining Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedClients.length > 0 ? (
                paginatedClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => router.push(`/clients/${client.id}`)}
                  >
                    {/* 1. Name */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {client.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        CNIC: {client.cnic}
                      </div>
                    </td>

                    {/* 2. Phone */}
                    <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">
                      {client.phone}
                    </td>

                    {/* 3. Property */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">
                        {client.property}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {client.propertyDetails.plotNo}, {client.propertyDetails.size}
                      </div>
                    </td>

                    {/* 4. Monthly Installment (BEFORE Total Amount) */}
                    <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                      {formatCurrency(client.monthlyInstallment)}
                    </td>

                    {/* 5. Total Amount */}
                    <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                      {formatCurrency(client.totalAmount)}
                    </td>

                    {/* 6. Remaining Amount (AFTER Total Amount) */}
                    <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap">
                      {formatCurrency(client.remainingAmount)}
                    </td>

                    {/* 7. Status */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <Badge status={client.status} />
                    </td>

                    {/* 8. Actions */}
                    <td
                      className="py-4 px-5 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/clients/${client.id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setEditingClient(client)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          title="Edit Client"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id, client.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Client"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <UserX className="w-10 h-10 mb-2 stroke-1 text-slate-300" />
                      <p className="text-sm font-semibold text-slate-700">No clients found</p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm">
                        No clients matched your search &quot;{searchQuery}&quot; or filter criteria. Try clearing filters or add a new client.
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery('');
                          setPropertyFilter('All');
                          setStatusFilter('All');
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-800">{filteredClients.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
            <span className="font-bold text-slate-800">
              {Math.min(currentPage * pageSize, filteredClients.length)}
            </span>{' '}
            of <span className="font-bold text-slate-800">{filteredClients.length}</span> clients
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditClientModal
        client={editingClient}
        isOpen={!!editingClient}
        onClose={() => setEditingClient(null)}
      />
    </div>
  );
}

