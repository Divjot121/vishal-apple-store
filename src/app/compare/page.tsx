'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { formatINR, buildWhatsAppLink } from '@/lib/utils';
import { Scale, X, MessageCircle, ArrowLeft, Plus } from 'lucide-react';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, products, addToCompare, settings } = useStore();
  const [selectorOpenIndex, setSelectorOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#C9A24A]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A24A]">
                Hardware Decision Suite
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Side-by-Side Device Comparison
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Compare processor performance, battery endurance, display specs, grading condition, and live retail pricing.
            </p>
          </div>

          {compareList.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              Clear Comparison ({compareList.length})
            </button>
          )}
        </div>

        {/* Empty State */}
        {compareList.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-[#121215] border border-white/[0.08] space-y-4 max-w-xl mx-auto">
            <Scale className="w-12 h-12 text-neutral-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No devices selected for comparison</h3>
            <p className="text-xs text-neutral-400">
              Browse our catalog and tap the scale icon on any 2 or 3 devices to compare their hardware specifications side-by-side.
            </p>
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9A24A] text-black font-semibold text-xs"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="rounded-3xl bg-[#121215] border border-white/[0.08] p-6 sm:p-8 overflow-x-auto shadow-2xl">
            <div className="min-w-[680px]">
              {/* Product Cards Row */}
              <div className="grid grid-cols-4 gap-4 pb-8 border-b border-white/[0.08]">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 pt-6">
                  Selected Hardware
                </div>

                {compareList.map((product) => {
                  const waHref = buildWhatsAppLink(
                    settings.whatsappRaw,
                    `Hi Vishal Apple Store, I am inquiring about ${product.name} (${product.condition}) priced at ${formatINR(product.basePrice)}.`
                  );

                  return (
                    <div
                      key={product.id}
                      className="p-5 rounded-2xl bg-neutral-900/60 border border-white/[0.06] flex flex-col justify-between relative group"
                    >
                      <button
                        type="button"
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        <div className="relative w-full h-36 mb-4 bg-black/40 rounded-xl p-3 flex items-center justify-center">
                          <Image
                            src={product.images[0] || '/devices/iphone-16-pro.svg'}
                            alt={product.name}
                            fill
                            sizes="180px"
                            className="object-contain p-2"
                          />
                        </div>

                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            product.condition === 'New'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : product.condition === 'Unboxed'
                              ? 'bg-[#C9A24A]/10 text-[#C9A24A]'
                              : 'bg-sky-500/10 text-sky-400'
                          }`}
                        >
                          {product.condition}
                        </span>

                        <h3 className="text-sm font-bold text-white mt-2 leading-snug line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-lg font-extrabold text-white mt-1">
                          {formatINR(product.basePrice)}
                        </p>
                      </div>

                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-bold text-xs transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Enquire on WhatsApp</span>
                      </a>
                    </div>
                  );
                })}

                {/* Empty Add Slot */}
                {compareList.length < 3 && (
                  <div className="p-5 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center text-neutral-500">
                    <Scale className="w-8 h-8 text-neutral-600 mb-2" />
                    <p className="text-xs font-semibold text-neutral-400">Add Another Device</p>
                    <p className="text-[10px] text-neutral-600 mt-1 mb-4">
                      Compare up to 3 units simultaneously
                    </p>
                    <Link
                      href="/#catalog"
                      className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs font-semibold hover:bg-neutral-800"
                    >
                      Select Device
                    </Link>
                  </div>
                )}
              </div>

              {/* Specs Rows */}
              <div className="divide-y divide-white/[0.04] text-xs">
                <div className="grid grid-cols-4 gap-4 py-4 items-center">
                  <span className="font-semibold text-neutral-400">Condition Grade</span>
                  {compareList.map((p) => (
                    <span key={p.id} className="text-neutral-200">
                      {p.condition} {p.gradingReport?.cosmeticScore ? `(${p.gradingReport.cosmeticScore})` : ''}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 py-4 items-center">
                  <span className="font-semibold text-neutral-400">Battery Diagnostics</span>
                  {compareList.map((p) => (
                    <span key={p.id} className="text-[#C9A24A] font-bold">
                      {p.gradingReport?.batteryHealth ? `${p.gradingReport.batteryHealth}% Maximum Capacity` : '100% Brand New'}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 py-4 items-center">
                  <span className="font-semibold text-neutral-400">Processor / Chip</span>
                  {compareList.map((p) => (
                    <span key={p.id} className="text-white font-medium">
                      {p.specs.chip}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 py-4 items-center">
                  <span className="font-semibold text-neutral-400">Display Architecture</span>
                  {compareList.map((p) => (
                    <span key={p.id} className="text-neutral-300">
                      {p.specs.display}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 py-4 items-center">
                  <span className="font-semibold text-neutral-400">Camera System</span>
                  {compareList.map((p) => (
                    <span key={p.id} className="text-neutral-300">
                      {p.specs.camera || 'N/A'}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 py-4 items-center">
                  <span className="font-semibold text-neutral-400">Battery Longevity</span>
                  {compareList.map((p) => (
                    <span key={p.id} className="text-neutral-300">
                      {p.specs.battery}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 py-4 items-center">
                  <span className="font-semibold text-neutral-400">Biometric Security</span>
                  {compareList.map((p) => (
                    <span key={p.id} className="text-neutral-300">
                      {p.specs.biometrics}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 py-4 items-center">
                  <span className="font-semibold text-neutral-400">Warranty Protection</span>
                  {compareList.map((p) => (
                    <span key={p.id} className="text-emerald-400 font-semibold">
                      {p.specs.warranty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
