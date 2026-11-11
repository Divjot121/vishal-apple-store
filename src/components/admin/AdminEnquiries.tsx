'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Enquiry, EnquiryStatus } from '@/types';
import { enquiryRepository } from '@/lib/repository';
import { formatINR, buildWhatsAppLink } from '@/lib/utils';
import {
  Inbox,
  MessageCircle,
  Phone,
  Calendar,
  Wrench,
  Calculator,
  RefreshCw,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function AdminEnquiries() {
  const { enquiries, refreshData } = useStore();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    await enquiryRepository.updateStatus(id, newStatus);
    await refreshData();
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (confirm('Delete this customer enquiry record?')) {
      await enquiryRepository.delete(id);
      await refreshData();
    }
  };

  const filtered = enquiries.filter((e) => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (typeFilter !== 'all' && e.type !== typeFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        e.customerName.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.message.toLowerCase().includes(q) ||
        (e.productName && e.productName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product_reserve':
        return <Calendar className="w-3.5 h-3.5 text-purple-400" />;
      case 'emi_quote':
        return <Calculator className="w-3.5 h-3.5 text-sky-400" />;
      case 'trade_in':
        return <RefreshCw className="w-3.5 h-3.5 text-[#C9A24A]" />;
      case 'repair_request':
        return <Wrench className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Inbox className="w-3.5 h-3.5 text-neutral-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'product_reserve':
        return 'Store Reserve';
      case 'emi_quote':
        return 'EMI Calculation';
      case 'trade_in':
        return 'Device Trade-In';
      case 'repair_request':
        return 'Repair / Service';
      default:
        return 'General Query';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#141418] border border-white/[0.08]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24A]">
            Lead Management
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Customer Enquiries Inbox
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Incoming device reservations, EMI calculations, trade-in valuations, and repair requests from the storefront.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-300">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold">
            {enquiries.filter((e) => e.status === 'New').length} New
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold">
            {enquiries.filter((e) => e.status === 'Contacted').length} Contacted
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
            {enquiries.filter((e) => e.status === 'Closed').length} Closed
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#141418] border border-white/[0.08] flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, device..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A24A]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-200 text-xs font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="New">Status: New</option>
            <option value="Contacted">Status: Contacted</option>
            <option value="Closed">Status: Closed</option>
          </select>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-200 text-xs font-semibold"
          >
            <option value="all">All Channels</option>
            <option value="product_reserve">Store Reserves</option>
            <option value="trade_in">Trade-In Valuations</option>
            <option value="emi_quote">EMI Inquiries</option>
            <option value="repair_request">Repair Requests</option>
            <option value="general">General Messages</option>
          </select>
        </div>
      </div>

      {/* Enquiry Cards Stream */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#141418] border border-white/[0.08] text-xs text-neutral-400 space-y-2">
            <Inbox className="w-8 h-8 text-neutral-600 mx-auto" />
            <p className="font-semibold text-white">No enquiries match this filter</p>
          </div>
        ) : (
          filtered.map((enq) => {
            const waHref = buildWhatsAppLink(
              enq.phone,
              `Hi ${enq.customerName}, thank you for reaching out to Vishal Apple Store regarding ${enq.productName || 'your enquiry'}. We have reviewed your request and...`
            );

            return (
              <div
                key={enq.id}
                className="p-5 rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {enq.customerName}
                    </span>
                    <a
                      href={`tel:${enq.phone}`}
                      className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-[#C9A24A]" />
                      <span>{enq.phone}</span>
                    </a>

                    {/* Type Badge */}
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-900 border border-white/10 text-neutral-300">
                      {getTypeIcon(enq.type)}
                      <span>{getTypeLabel(enq.type)}</span>
                    </span>

                    {/* Timestamp */}
                    <span className="text-[10px] text-neutral-400">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {enq.productName && (
                    <div className="text-xs">
                      <span className="text-neutral-400">Target Device: </span>
                      <span className="font-bold text-white">{enq.productName}</span>
                      {enq.variantDetails && (
                        <span className="text-neutral-400"> ({enq.variantDetails})</span>
                      )}
                      {enq.quotedPrice && (
                        <span className="text-[#C9A24A] font-semibold ml-1.5">
                          · {formatINR(enq.quotedPrice)}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/50 p-2.5 rounded-xl border border-white/[0.04]">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                </div>

                {/* Right Actions & Status Switcher */}
                <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
                  {/* Status Dropdown */}
                  <select
                    value={enq.status}
                    onChange={(e) =>
                      handleStatusChange(enq.id, e.target.value as EnquiryStatus)
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none ${
                      enq.status === 'New'
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        : enq.status === 'Contacted'
                        ? 'bg-sky-500/15 text-sky-400 border-sky-500/30'
                        : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    <option value="New">Status: New</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Closed">Status: Closed</option>
                  </select>

                  {/* Click-to-WhatsApp Reply */}
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-bold text-xs transition-colors shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDeleteEnquiry(enq.id)}
                    className="p-2 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
