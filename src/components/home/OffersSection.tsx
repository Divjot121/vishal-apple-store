'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink } from '@/lib/utils';
import type { Offer } from '@/types';
import { Check, Copy, MessageCircle } from 'lucide-react';

function CodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard blocked: the code is still visible to read out */
        }
      }}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-dashed border-line-strong px-4 font-mono text-small font-semibold tracking-wide text-ink transition-colors hover:border-ink"
      aria-label={copied ? `Code ${code} copied` : `Copy code ${code}`}
    >
      {code}
      {copied ? <Check className="h-4 w-4 text-ok" aria-hidden /> : <Copy className="h-4 w-4 text-ink-3" aria-hidden />}
    </button>
  );
}

export default function OffersSection() {
  const { offers, settings } = useStore();
  const active = offers.filter((o) => o.isActive);
  if (active.length === 0) return null;

  const [lead, ...rest] = active;
  const wa = (o: Offer) =>
    buildWhatsAppLink(settings.whatsappRaw, `Hi, I'd like to use the offer "${o.title}"${o.code ? ` (code ${o.code})` : ''}.`);

  return (
    <section id="offers" className="section" aria-labelledby="offers-title">
      <div className="wrap">
        <div className="max-w-prose">
          <p className="eyebrow">This month</p>
          <h2 id="offers-title" className="mt-3 text-title">
            Offers at the counter
          </h2>
          <p className="mt-3 text-ink-2">
            Show the code in the shop or mention it on WhatsApp. Offers can&rsquo;t be combined unless we say so.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Lead offer */}
          <article className="reveal flex flex-col rounded-card border border-line bg-surface p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 text-caption text-ink-3">
              <span className="font-semibold uppercase tracking-[0.08em]">{lead.badge}</span>
              <span>{lead.validTill}</span>
            </div>
            <p className="mt-6 text-hero text-ink">{lead.discountText}</p>
            <h3 className="mt-3 text-subtitle">{lead.title}</h3>
            <p className="mt-2 max-w-prose text-ink-2">{lead.description}</p>
            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
              <a href={wa(lead)} target="_blank" rel="noopener noreferrer" className="btn-gold px-6">
                <MessageCircle className="h-4 w-4" aria-hidden />
                {lead.ctaText || 'Ask on WhatsApp'}
              </a>
              {lead.code && <CodeButton code={lead.code} />}
            </div>
          </article>

          {/* The rest, stacked */}
          <div className="grid gap-4 lg:col-span-5 lg:gap-5">
            {rest.map((offer) => (
              <article key={offer.id} className="reveal flex flex-col rounded-card border border-line p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 text-caption text-ink-3">
                  <span className="font-semibold uppercase tracking-[0.08em]">{offer.badge}</span>
                  <span>{offer.validTill}</span>
                </div>
                <h3 className="mt-3 text-subtitle">{offer.discountText}</h3>
                <p className="mt-2 text-small text-ink-2">{offer.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
                  <a
                    href={wa(offer)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-small font-semibold text-ink underline underline-offset-4 hover:no-underline"
                  >
                    {offer.ctaText || 'Ask on WhatsApp'}
                  </a>
                  {offer.code && <CodeButton code={offer.code} />}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
