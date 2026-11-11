'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { formatINR, buildWhatsAppLink } from '@/lib/utils';
import { Scale, X, Check, MessageCircle, ChevronRight } from 'lucide-react';

export default function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare, settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Floating comparison badge pill (Bottom right on desktop, right above bottom bar on mobile) */}
      <div className="fixed bottom-20 md:bottom-8 right-4 z-40 animate-slide-up">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#18181C] text-white border border-[#C9A24A]/50 shadow-2xl hover:border-[#C9A24A] hover:bg-[#222228] transition-all group"
        >
          <div className="relative">
            <Scale className="w-5 h-5 text-[#C9A24A] group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#C9A24A] text-black text-[10px] font-bold flex items-center justify-center">
              {compareList.length}
            </span>
          </div>
          <span className="text-xs font-semibold tracking-wide">
            Compare Devices ({compareList.length}/3)
          </span>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Comparison Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-5xl bg-[#121215] border border-white/10 rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#16161A]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#C9A24A]/10 border border-[#C9A24A]/30">
                  <Scale className="w-5 h-5 text-[#C9A24A]" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Side-by-Side Spec Comparison
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Evaluating hardware specifications, condition rating, and store pricing.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={clearCompare}
                  className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-neutral-800 transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
                  aria-label="Close comparison"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comparison Table Grid */}
            <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6">
              <div className="min-w-[640px]">
                {/* Top Row: Device Card Header */}
                <div className="grid grid-cols-4 gap-4 pb-6 border-b border-white/[0.08]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 pt-4">
                    Device Summary
                  </div>

                  {compareList.map((product) => {
                    const waHref = buildWhatsAppLink(
                      settings.whatsappRaw,
                      `Hi Vishal Apple Store, I am comparing the ${product.name} (${product.condition}) priced at ${formatINR(product.basePrice)}. Is it available in store?`
                    );

                    return (
                      <div
                        key={product.id}
                        className="p-4 rounded-xl bg-neutral-900/60 border border-white/[0.06] flex flex-col justify-between relative group"
                      >
                        <button
                          type="button"
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
                          title="Remove from compare"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div>
                          <div className="relative w-full h-32 mb-3 bg-[#0D0D10] rounded-lg p-2 flex items-center justify-center">
                            <Image
                              src={product.images[0] || '/devices/iphone-16-pro.svg'}
                              alt={product.name}
                              width={120}
                              height={120}
                              className="max-h-28 object-contain"
                            />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800 text-[#C9A24A]">
                            {product.condition}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-1.5 leading-snug">
                            {product.name}
                          </h4>
                          <p className="text-base font-semibold text-white mt-1">
                            {formatINR(product.basePrice)}
                          </p>
                        </div>

                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-xs transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Enquire
                        </a>
                      </div>
                    );
                  })}

                  {/* Empty slots placeholders up to 3 */}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="p-4 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center text-neutral-500 py-12"
                    >
                      <Scale className="w-6 h-6 mb-2 text-neutral-600" />
                      <p className="text-xs font-medium">Add device to compare</p>
                      <p className="text-[10px] text-neutral-600 mt-1">
                        Select from catalog cards
                      </p>
                    </div>
                  ))}
                </div>

                {/* Spec Rows */}
                <div className="divide-y divide-white/[0.04] text-xs">
                  {/* Category & Condition */}
                  <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                    <span className="font-medium text-neutral-400">Condition Grade</span>
                    {compareList.map((p) => (
                      <span key={p.id} className="text-neutral-200">
                        {p.condition} {p.gradingReport?.cosmeticScore ? `(${p.gradingReport.cosmeticScore})` : ''}
                      </span>
                    ))}
                  </div>

                  {/* Battery Health */}
                  <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                    <span className="font-medium text-neutral-400">Battery Health</span>
                    {compareList.map((p) => (
                      <span key={p.id} className="text-[#C9A24A] font-semibold">
                        {p.gradingReport?.batteryHealth ? `${p.gradingReport.batteryHealth}% Max Capacity` : '100% Brand New'}
                      </span>
                    ))}
                  </div>

                  {/* Chip / Processor */}
                  <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                    <span className="font-medium text-neutral-400">Processor / Chip</span>
                    {compareList.map((p) => (
                      <span key={p.id} className="text-white font-medium">
                        {p.specs.chip}
                      </span>
                    ))}
                  </div>

                  {/* Display */}
                  <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                    <span className="font-medium text-neutral-400">Display</span>
                    {compareList.map((p) => (
                      <span key={p.id} className="text-neutral-300">
                        {p.specs.display}
                      </span>
                    ))}
                  </div>

                  {/* Camera */}
                  <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                    <span className="font-medium text-neutral-400">Camera System</span>
                    {compareList.map((p) => (
                      <span key={p.id} className="text-neutral-300">
                        {p.specs.camera || 'N/A'}
                      </span>
                    ))}
                  </div>

                  {/* Battery Life */}
                  <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                    <span className="font-medium text-neutral-400">Battery Endurance</span>
                    {compareList.map((p) => (
                      <span key={p.id} className="text-neutral-300">
                        {p.specs.battery}
                      </span>
                    ))}
                  </div>

                  {/* Biometrics */}
                  <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                    <span className="font-medium text-neutral-400">Biometrics / Security</span>
                    {compareList.map((p) => (
                      <span key={p.id} className="text-neutral-300">
                        {p.specs.biometrics}
                      </span>
                    ))}
                  </div>

                  {/* Ports */}
                  <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                    <span className="font-medium text-neutral-400">Ports & Connectivity</span>
                    {compareList.map((p) => (
                      <span key={p.id} className="text-neutral-300">
                        {p.specs.port}
                      </span>
                    ))}
                  </div>

                  {/* Warranty */}
                  <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                    <span className="font-medium text-neutral-400">Warranty Coverage</span>
                    {compareList.map((p) => (
                      <span key={p.id} className="text-emerald-400 font-medium">
                        {p.specs.warranty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
