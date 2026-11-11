'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink } from '@/lib/utils';
import { Sparkles, Tag, Check, Copy, ArrowRight, MessageCircle } from 'lucide-react';

export default function OffersSection() {
  const { offers, settings } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeOffers = offers.filter((o) => o.isActive);

  if (activeOffers.length === 0) return null;

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  return (
    <section id="offers" className="w-full bg-[#0D0D10] py-16 sm:py-20 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A24A]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A24A]">
                Limited Privileges
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1.5">
              Live Store Offers & Bank Schemes
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-lg">
              Managed live by store management. Redeemable in-store at Connaught Place or for Delhi NCR doorstep dispatch.
            </p>
          </div>

          <span className="text-xs text-neutral-400">
            Updated today by Store Desk
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeOffers.map((offer) => {
            const waHref = buildWhatsAppLink(
              settings.whatsappRaw,
              `Hi Vishal Apple Store, I want to avail the offer "${offer.title}" (${offer.code || 'Code on website'}) for my device purchase.`
            );

            return (
              <div
                key={offer.id}
                className="relative rounded-2xl bg-[#141418] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-[#C9A24A]/40 transition-all duration-300 group hover:shadow-xl"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9A24A]/15 text-[#C9A24A] border border-[#C9A24A]/30">
                      {offer.badge}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      {offer.validTill}
                    </span>
                  </div>

                  {/* Headline & Discount Text */}
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                    {offer.discountText}
                  </p>
                  <h3 className="text-sm font-semibold text-neutral-200 leading-snug mb-3">
                    {offer.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {offer.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  {/* Promo Code Box if present */}
                  {offer.code && (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900 border border-white/10 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#C9A24A]" />
                        <span className="font-mono font-bold text-white tracking-wider">
                          {offer.code}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(offer.code!)}
                        className="text-[11px] font-semibold text-[#C9A24A] hover:underline flex items-center gap-1"
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Claim on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
