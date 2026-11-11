'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { formatINR, buildWhatsAppLink } from '@/lib/utils';
import {
  Package,
  CheckCircle2,
  Inbox,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (
    tab: 'dashboard' | 'quick-edit' | 'products' | 'offers' | 'enquiries' | 'reviews' | 'settings'
  ) => void;
}

export default function AdminDashboard({ onNavigateTab }: AdminDashboardProps) {
  const { products, enquiries, offers, settings } = useStore();

  // Metrics
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const activeOffersCount = offers.filter((o) => o.isActive).length;

  // Total Catalog Inventory Value
  const totalCatalogValue = products.reduce((total, p) => {
    const pValue = p.variants.reduce((sum, v) => sum + v.price * (v.stock || 1), 0);
    return total + pValue;
  }, 0);

  // Low or out-of-stock items
  const lowStockProducts = products.filter((p) => {
    const totalStock = p.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
    return !p.inStock || totalStock <= 1;
  });

  // Recent enquiries (latest 4)
  const recentEnquiries = enquiries.slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#18181D] via-[#141417] to-[#18181D] border border-white/[0.08]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24A]">
            Ranjit Avenue, Amritsar Flagship
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
            Store Operations Overview
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time synchronization active. Any edits made here reflect instantly on the public storefront.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigateTab('quick-edit')}
            className="px-4 py-2 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Quick Edit Prices</span>
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white font-medium text-xs hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Products */}
        <div
          onClick={() => onNavigateTab('products')}
          className="p-5 rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Catalog</span>
            <Package className="w-4 h-4 text-[#C9A24A] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {totalProducts}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Across 6 Hardware Lines
          </p>
        </div>

        {/* Metric 2: In-Stock */}
        <div
          onClick={() => onNavigateTab('quick-edit')}
          className="p-5 rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">In-Stock Ready</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
            {inStockCount}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            {totalProducts - inStockCount} Out of Stock
          </p>
        </div>

        {/* Metric 3: New Enquiries */}
        <div
          onClick={() => onNavigateTab('enquiries')}
          className="p-5 rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">New Enquiries</span>
            <Inbox className="w-4 h-4 text-[#C9A24A] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-baseline gap-2">
            <span>{newEnquiriesCount}</span>
            {newEnquiriesCount > 0 && (
              <span className="text-xs font-semibold text-[#C9A24A] bg-[#C9A24A]/10 px-2 py-0.5 rounded-full">
                Action Required
              </span>
            )}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            {enquiries.length} total logged submissions
          </p>
        </div>

        {/* Metric 4: Live Offers */}
        <div
          onClick={() => onNavigateTab('offers')}
          className="p-5 rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Deals</span>
            <Sparkles className="w-4 h-4 text-[#C9A24A] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {activeOffersCount}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Showing on storefront banner
          </p>
        </div>
      </div>

      {/* Main Grid: Low Stock Alert + Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Enquiries */}
        <div className="lg:col-span-7 rounded-2xl bg-[#141418] border border-white/[0.08] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#C9A24A]" />
              <h2 className="text-sm font-bold text-white tracking-tight">
                Recent In-Store & Online Enquiries
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs text-[#C9A24A] hover:underline flex items-center gap-1 font-medium"
            >
              <span>View All ({enquiries.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {recentEnquiries.map((enq) => {
              const waReplyLink = buildWhatsAppLink(
                enq.phone,
                `Hi ${enq.customerName}, thank you for contacting Vishal Apple Store regarding ${enq.productName || 'your device inquiry'}. We have checked our Amritsar store inventory and...`
              );

              return (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{enq.customerName}</span>
                      <span className="text-neutral-400">({enq.phone})</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          enq.status === 'New'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : enq.status === 'Contacted'
                            ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-neutral-300 line-clamp-1">{enq.message}</p>
                    <span className="text-[10px] text-neutral-400">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <a
                    href={waReplyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C9A24A] hover:bg-[#b8913d] text-black font-bold text-[11px] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Reply</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Low Stock / Out of Stock alerts */}
        <div className="lg:col-span-5 rounded-2xl bg-[#141418] border border-white/[0.08] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white tracking-tight">
                Inventory Alerts
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('quick-edit')}
              className="text-xs text-[#C9A24A] hover:underline font-medium"
            >
              Update Stock
            </button>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              All devices are adequately stocked in store.
            </div>
          ) : (
            <div className="space-y-2.5">
              {lowStockProducts.slice(0, 5).map((p) => {
                const totalStock = p.variants.reduce((sum, v) => sum + (v.stock || 0), 0);

                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-neutral-900/60 border border-white/[0.04] flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-white truncate max-w-[190px]">{p.name}</p>
                      <span className="text-[10px] text-neutral-400">{p.condition} · {formatINR(p.basePrice)}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        totalStock === 0
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {totalStock === 0 ? 'Out of Stock' : `${totalStock} Left`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
