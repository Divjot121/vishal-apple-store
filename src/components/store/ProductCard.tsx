'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatINR, buildWhatsAppLink, cn } from '@/lib/utils';
import { CONDITION_LABEL, priceSummary, stockInfo, variantSummary } from '@/lib/catalog';
import ProductImage from '@/components/ui/ProductImage';
import { MessageCircle, Check, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  /** above-the-fold cards can load eagerly */
  priority?: boolean;
}

const TONE = { ok: 'text-ok', warn: 'text-warn', bad: 'text-bad' } as const;

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { settings, isInCompare, addToCompare, removeFromCompare, compareList } = useStore();
  const compared = isInCompare(product.id);
  const compareFull = !compared && compareList.length >= 3;

  const { price, mrp, from } = priceSummary(product);
  const stock = stockInfo(product);
  const battery = product.condition === 'Pre-owned' ? product.gradingReport?.batteryHealth : undefined;

  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    `Hi, is the ${product.name} (${CONDITION_LABEL[product.condition].toLowerCase()}, ${formatINR(price)}) available today?`
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors duration-150 hover:border-line-strong">
      <div className="relative">
        <ProductImage
          product={product}
          priority={priority}
          labelled={false}
          rounded="rounded-none"
          sizes="(max-width: 767px) 46vw, (max-width: 1023px) 31vw, 280px"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-surface px-2.5 py-1 text-caption font-medium text-ink-2 shadow-sm">
          {CONDITION_LABEL[product.condition]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 text-[0.9375rem] font-semibold leading-[1.3] text-ink sm:text-base">
          {/* stretched link: the whole card opens the product */}
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[rgb(var(--focus))]">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-caption text-ink-3">{variantSummary(product)}</p>

        <div className="mt-auto pt-3">
          <p className="tabular flex flex-wrap items-baseline gap-x-1.5 text-ink">
            {from && <span className="text-caption text-ink-3">from</span>}
            <span className="text-[1.0625rem] font-semibold sm:text-lg">{formatINR(price)}</span>
            {mrp > price && <span className="text-caption text-ink-3 line-through">{formatINR(mrp)}</span>}
          </p>
          <p className="mt-0.5 text-caption">
            <span className={cn('font-medium', TONE[stock.tone])}>{stock.label}</span>
            {battery ? <span className="text-ink-3"> · Battery {battery}%</span> : null}
          </p>

          <div className="relative z-10 mt-3 flex items-center gap-1.5 border-t border-line pt-3 sm:gap-2">
            <button
              type="button"
              onClick={() => (compared ? removeFromCompare(product.id) : addToCompare(product))}
              disabled={compareFull}
              aria-pressed={compared}
              title={compareFull ? 'You can compare up to 3 devices' : undefined}
              className={cn(
                'inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border px-2 text-caption font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                compared ? 'border-ink bg-ink text-canvas' : 'border-line text-ink-2 hover:border-line-strong hover:text-ink'
              )}
            >
              {compared ? <Check className="hidden h-3.5 w-3.5 shrink-0 sm:block" aria-hidden /> : <Plus className="hidden h-3.5 w-3.5 shrink-0 sm:block" aria-hidden />}
              Compare
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink-2 transition-colors hover:border-ink hover:text-ink"
              aria-label={`Ask about ${product.name} on WhatsApp`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
