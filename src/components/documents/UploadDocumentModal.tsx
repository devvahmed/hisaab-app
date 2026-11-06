'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useInstallment } from '@/context/InstallmentContext';
import { DocumentType } from '@/types';
import { UploadCloud, File, CheckCircle2 } from 'lucide-react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClientId?: string;
}

export function UploadDocumentModal({ isOpen, onClose, defaultClientId }: UploadDocumentModalProps) {
  const { clients, addDocument } = useInstallment();

  const [selectedClientId, setSelectedClientId] = useState<string>(defaultClientId || '');
  const [docType, setDocType] = useState<DocumentType>('CNIC');
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('1.8 MB');

  useEffect(() => {
    if (defaultClientId) {
      setSelectedClientId(defaultClientId);
    } else if (clients.length > 0 && !selectedClientId) {
      setSelectedClientId(clients[0].id);
    }
  }, [defaultClientId, clients, selectedClientId]);

  const selectedClient = clients.find((c) => c.id === selectedClientId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeInMb} MB`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    const finalFileName = fileName.trim() || `${docType.replace(/\s+/g, '_')}_${selectedClient.name.replace(/\s+/g, '_')}.pdf`;

    addDocument({
      fileName: finalFileName,
      documentType: docType,
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      fileSize: fileSize || '1.5 MB'
    });

    onClose();
    setFileName('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Client Document"
      description="Store verified legal papers, CNIC scans, allotment letters, and receipts."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Select Client *
          </label>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none font-medium"
            required
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.property}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Document Type *
          </label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value as DocumentType)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
          >
            <option value="CNIC">CNIC Copy</option>
            <option value="Booking Form">Booking Form</option>
            <option value="Allotment Letter">Allotment Letter</option>
            <option value="Payment Receipt">Payment Receipt / Bank Slip</option>
            <option value="Other">Other Document / Legal Affidavit</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Custom Document Title (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Allotment_Letter_Phase6.pdf"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
          />
        </div>

        {/* Drag and Drop Box */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            File Upload *
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/60 hover:bg-slate-50 transition-colors relative cursor-pointer group">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>

              {fileName ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{fileName} ({fileSize})</span>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold text-slate-800">
                    Click to select file or drag and drop
                  </p>
                  <p className="text-[11px] text-slate-400">
                    PDF, JPG, PNG or DOCX (up to 10MB)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Upload Document
          </Button>
        </div>
      </form>
    </Modal>
  );
}

