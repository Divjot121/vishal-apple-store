'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatINR, buildWhatsAppLink } from '@/lib/utils';
import {
  ShieldCheck,
  Scale,
  MessageCircle,
  Check,
  ChevronRight,
  BatteryMedium,
  Zap,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { settings, isInCompare, addToCompare, removeFromCompare } = useStore();
  const compared = isInCompare(product.id);

  // Default to first variant or product base
  const activeVariant = product.variants[0];
  const price = activeVariant ? activeVariant.price : product.basePrice;
  const mrp = activeVariant ? activeVariant.mrp : product.mrp;
  const savings = mrp > price ? mrp - price : 0;

  // Total stock across variants
  const totalStock = product.variants.reduce((acc, v) => acc + (v.stock || 0), 0);
  const isOutOfStock = !product.inStock || totalStock === 0;

  // WhatsApp Enquiry Link
  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    `Hi Vishal Apple Store, I am inquiring about the ${product.name} (${product.condition}) priced at ${formatINR(price)}. Is it available in store today?`
  );

  return (
    <div className="group relative rounded-2xl bg-[#141417] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-black/60">
      {/* Top Media Area */}
      <div className="relative p-5 pb-3">
        {/* Badges Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Condition Badge */}
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                product.condition === 'New'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : product.condition === 'Unboxed'
                  ? 'bg-[#C9A24A]/15 text-[#C9A24A] border-[#C9A24A]/40'
                  : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
              }`}
            >
              {product.condition === 'New' ? 'Brand New' : product.condition}
            </span>

            {/* Verified 40-Point Badge */}
            {product.isVerified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-neutral-300 border border-white/10">
                <ShieldCheck className="w-3 h-3 text-[#C9A24A]" />
                <span>Verified</span>
              </span>
            )}
          </div>

          {/* Stock Status Pill */}
          <div>
            {isOutOfStock ? (
              <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded-full">
                Out of Stock
              </span>
            ) : totalStock <= 2 ? (
              <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full animate-pulse">
                Only {totalStock} Left
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                In Stock
              </span>
            )}
          </div>
        </div>

        {/* Device Image Box */}
        <Link
          href={`/product/${product.slug}`}
          className="block relative w-full h-52 bg-[#0D0D10] rounded-xl p-4 overflow-hidden focus:outline-none group-hover:scale-[1.01] transition-transform"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <Image
            src={product.images[0] || '/devices/iphone-16-pro-natural.png'}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
          />
        </Link>
      </div>

      {/* Details & Specs Area */}
      <div className="p-5 pt-0 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle / Model */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>{product.category}</span>
            {product.gradingReport?.batteryHealth && (
              <span className="inline-flex items-center gap-1 text-[#C9A24A] font-medium">
                <BatteryMedium className="w-3.5 h-3.5" />
                {product.gradingReport.batteryHealth}% Battery
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block focus:outline-none">
            <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#C9A24A] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
            {product.tagline}
          </p>

          {/* Hardware highlights snippet */}
          <div className="mt-3 py-2 px-2.5 rounded-lg bg-neutral-900/60 border border-white/[0.04] text-[11px] text-neutral-300 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Chip</span>
              <span className="font-medium text-white truncate max-w-[170px] text-right">
                {product.specs.chip}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Storage</span>
              <span className="font-medium text-neutral-200">
                {product.variants.map((v) => v.storage).join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-4 pt-3 border-t border-white/[0.08]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white tracking-tight">
                  {formatINR(price)}
                </span>
                {mrp > price && (
                  <span className="text-xs text-neutral-400 line-through">
                    {formatINR(mrp)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <span className="text-[10px] font-semibold text-emerald-400">
                  Save {formatINR(savings)} vs MRP
                </span>
              )}
            </div>

            {/* Compare Toggle Button */}
            <button
              type="button"
              onClick={() => {
                if (compared) {
                  removeFromCompare(product.id);
                } else {
                  addToCompare(product);
                }
              }}
              className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                compared
                  ? 'bg-[#C9A24A] text-black border-[#C9A24A]'
                  : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
              }`}
              title={compared ? 'Remove from compare' : 'Add to compare'}
              aria-label={compared ? 'Remove from compare' : 'Add to compare'}
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white font-medium text-xs text-center transition-colors flex items-center justify-center gap-1"
            >
              <span>View Specs</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#1D1D22] hover:bg-[#25252B] border border-[#C9A24A]/40 text-white font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1.5 group/btn"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#C9A24A] group-hover/btn:scale-110 transition-transform" />
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
