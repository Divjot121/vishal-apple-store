'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink, formatINR } from '@/lib/utils';
import { CONDITION_LABEL, priceSummary, stockInfo, totalStock } from '@/lib/catalog';
import ProductImage from '@/components/ui/ProductImage';
import { ArrowRight, MessageCircle } from 'lucide-react';

const FACTS = [
  { term: 'Sealed & open box', detail: 'Apple warranty, activated with you' },
  { term: 'Pre-owned', detail: '6-month warranty from us, in writing' },
  { term: 'Exchange', detail: 'Old phone priced in about 10 minutes' },
];

export default function Hero() {
  const { settings, products } = useStore();

  const featured =
    products.find((p) => p.isVisible && p.isFeatured && totalStock(p) > 0) ?? products[0];
  const { price, mrp, from } = priceSummary(featured);
  const stock = stockInfo(featured);
  const variant = featured.variants[0];

  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    "Hi, I'd like to know today's price and stock for an iPhone."
  );

  return (
    <section className="border-b border-line" aria-labelledby="hero-title">
      <div className="wrap grid items-center gap-10 pb-14 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="eyebrow">
            <span className="hidden sm:inline">Independent Apple shop · </span>Ranjit Avenue, Amritsar
          </p>
          <h1 id="hero-title" className="mt-4 max-w-[14ch] text-hero text-ink">
            Apple devices, checked in front of you.
          </h1>
          <p className="mt-5 max-w-prose text-lead text-ink-2">
            New sealed stock, open-box units and pre-owned phones we have tested ourselves. Every
            sale comes with a GST bill, and anything pre-owned carries our own 6-month warranty.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#catalog" className="btn-primary px-6">
              See what&rsquo;s in stock
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-quiet px-6">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Ask for a price on WhatsApp
            </a>
          </div>

          <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.term}>
                <dt className="text-small font-semibold text-ink">{f.term}</dt>
                <dd className="mt-0.5 text-small text-ink-3">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* One product, as it would sit on the counter */}
        <div className="lg:col-span-5">
          <Link
            href={`/product/${featured.slug}`}
            className="group grid grid-cols-[112px_1fr] items-center gap-4 rounded-card border border-line bg-surface p-3 shadow-card transition-colors hover:border-line-strong sm:grid-cols-[160px_1fr] lg:block lg:p-4"
          >
            <ProductImage
              product={featured}
              priority
              labelled={false}
              sizes="(max-width: 640px) 112px, (max-width: 1024px) 160px, 440px"
            />
            <div className="lg:px-2 lg:pb-2 lg:pt-5">
              <p className="flex items-center gap-2 text-caption font-medium text-ink-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                On the shelf today
              </p>
              <p className="mt-1 text-subtitle text-ink">{featured.name}</p>
              <p className="mt-0.5 text-small text-ink-3">
                {CONDITION_LABEL[featured.condition]}
                {variant && ` · ${variant.storage} · ${variant.colour}`}
              </p>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="tabular text-subtitle text-ink">
                  {from && <span className="text-small font-normal text-ink-3">from </span>}
                  {formatINR(price)}
                  {mrp > price && (
                    <span className="ml-2 text-small font-normal text-ink-3 line-through">{formatINR(mrp)}</span>
                  )}
                </p>
                <p className={`text-small font-medium ${stock.tone === 'ok' ? 'text-ok' : stock.tone === 'warn' ? 'text-warn' : 'text-bad'}`}>
                  {stock.label}
                </p>
              </div>
              <p className="mt-3 hidden items-center gap-1 text-small font-semibold text-ink group-hover:underline lg:inline-flex">
                See details <ArrowRight className="h-4 w-4" aria-hidden />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
