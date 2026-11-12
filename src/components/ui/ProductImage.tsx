'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/types';
import DeviceArt, { deviceKindFor } from './DeviceArt';
import { cn } from '@/lib/utils';

/**
 * The one product image used everywhere (cards, detail page, hero, compare,
 * admin). Always a square tile on the neutral `tile` background, so nothing
 * stretches or shifts while loading.
 *
 * - If the owner has uploaded a real photo (any path outside the old bundled
 *   /devices/ renders), it is shown with object-contain and padding, lazy by
 *   default, and falls back to the illustration if it fails to load.
 * - Otherwise the SVG illustration is drawn in the selected finish colour.
 */
function customPhoto(product: Pick<Product, 'images'>): string | null {
  const src = product.images?.[0]?.trim();
  if (!src || src.startsWith('/devices/')) return null;
  return src;
}

interface ProductImageProps {
  product: Pick<Product, 'name' | 'category' | 'images' | 'variants'>;
  /** finish colour to draw; defaults to the first variant's colour */
  finish?: string;
  /** above the fold: load eagerly with high priority */
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** set false when a nearby heading already names the product */
  labelled?: boolean;
  rounded?: string;
}

export default function ProductImage({
  product,
  finish,
  priority = false,
  sizes = '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px',
  className,
  labelled = true,
  rounded = 'rounded-tile',
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const photo = customPhoto(product);
  const colour = finish || product.variants?.[0]?.colorHex || undefined;
  const alt = labelled ? product.name : '';

  return (
    <div className={cn('relative aspect-square w-full overflow-hidden bg-tile text-ink', rounded, className)}>
      {photo && !failed ? (
        <Image
          src={photo}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          // remote/data URLs aren't in next.config remotePatterns; serve them as-is
          unoptimized={/^(https?:|data:)/.test(photo)}
          className="object-contain p-[9%]"
          onError={() => setFailed(true)}
        />
      ) : (
        <DeviceArt
          kind={deviceKindFor(product)}
          finish={colour}
          label={labelled ? product.name : undefined}
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
