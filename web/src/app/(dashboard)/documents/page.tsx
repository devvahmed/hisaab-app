'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  FileText,
  Download,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  FileSpreadsheet,
  FileCheck,
  FileImage,
  FolderOpen
} from 'lucide-react';
import { useInstallment } from '@/context/InstallmentContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { DocumentType } from '@/types';
import { UploadDocumentModal } from '@/components/documents/UploadDocumentModal';

export default function DocumentsPage() {
  const { documents, clients, deleteDocument } = useInstallment();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [clientFilter, setClientFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filtering
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.clientName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        typeFilter === 'All' || doc.documentType === typeFilter;

      const matchesClient =
        clientFilter === 'All' || doc.clientId === clientFilter;

      return matchesSearch && matchesType && matchesClient;
    });
  }, [documents, searchQuery, typeFilter, clientFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / pageSize) || 1;
  const paginatedDocuments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDocuments.slice(start, start + pageSize);
  }, [filteredDocuments, currentPage, pageSize]);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteDocument(id);
    }
  };

  const getDocTypeIcon = (type: DocumentType) => {
    switch (type) {
      case 'CNIC':
        return <FileImage className="w-4 h-4 text-purple-600" />;
      case 'Booking Form':
        return <FileSpreadsheet className="w-4 h-4 text-blue-600" />;
      case 'Allotment Letter':
        return <FileCheck className="w-4 h-4 text-emerald-600" />;
      case 'Payment Receipt':
        return <FileText className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage client documents, CNIC copies, booking forms, and legal paperwork.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsUploadModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
          className="shadow-md shadow-blue-500/20"
        >
          Upload Document
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents or clients..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Document Type Filter */}
          <div className="w-1/2 md:w-44">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            >
              <option value="All">All Types</option>
              <option value="CNIC">CNIC Copy</option>
              <option value="Booking Form">Booking Form</option>
              <option value="Allotment Letter">Allotment Letter</option>
              <option value="Payment Receipt">Payment Receipt</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Client Filter */}
          <div className="w-1/2 md:w-48">
            <select
              value={clientFilter}
              onChange={(e) => {
                setClientFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            >
              <option value="All">All Clients</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">File Name</th>
                <th className="py-3.5 px-4">Document Type</th>
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">File Size</th>
                <th className="py-3.5 px-4">Upload Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedDocuments.length > 0 ? (
                paginatedDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* File Name with Type Icon */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          {getDocTypeIcon(doc.documentType)}
                        </div>
                        <span className="font-bold text-slate-800">{doc.fileName}</span>
                      </div>
                    </td>

                    {/* Document Type Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {doc.documentType}
                      </span>
                    </td>

                    {/* Client Name */}
                    <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                      {doc.clientName}
                    </td>

                    {/* File Size */}
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      {doc.fileSize}
                    </td>

                    {/* Upload Date */}
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      {formatDate(doc.uploadDate)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => alert(`Viewing file: ${doc.fileName}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Preview Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`Downloading file: ${doc.fileName}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Download Document"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id, doc.fileName)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <FolderOpen className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1" />
                    <p className="font-semibold text-slate-700">No documents found</p>
                    <p className="text-xs text-slate-400 mt-1">Try refining your filter or upload a new file.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-800">{filteredDocuments.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
            <span className="font-bold text-slate-800">
              {Math.min(currentPage * pageSize, filteredDocuments.length)}
            </span>{' '}
            of <span className="font-bold text-slate-800">{filteredDocuments.length}</span> documents
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

      {/* Upload Modal */}
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}

