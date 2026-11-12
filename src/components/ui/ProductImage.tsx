'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/types';
import DeviceArt, { deviceKindFor } from './DeviceArt';
import { officialPhoto } from '@/lib/product-photos';
import { cn } from '@/lib/utils';

/**
 * The one product image used everywhere (cards, detail page, hero, compare,
 * admin). Always a square tile on the neutral `tile` background, so nothing
 * stretches or shifts while loading.
 *
 * Source, in order:
 * 1. a photo the owner set in admin (any path outside the old /devices/ folder)
 * 2. the official product photo for this model and colour (src/lib/product-photos.ts)
 * 3. the drawn SVG illustration in the variant's finish colour
 * If a photo fails to load, the next source is used.
 */
function ownerPhoto(product: Pick<Product, 'images'>): string | null {
  const src = product.images?.[0]?.trim();
  if (!src || src.startsWith('/devices/')) return null;
  return src;
}

interface ProductImageProps {
  product: Pick<Product, 'name' | 'category' | 'images' | 'variants'> & { slug?: string };
  /** colour name of the selected variant; defaults to the first variant */
  colour?: string;
  /** finish hex used by the illustration fallback; defaults to the matching variant */
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
  colour,
  finish,
  priority = false,
  sizes = '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px',
  className,
  labelled = true,
  rounded = 'rounded-tile',
}: ProductImageProps) {
  const [failed, setFailed] = useState<Record<string, true>>({});
  const colourName = colour || product.variants?.[0]?.colour;
  const variant = product.variants?.find((v) => v.colour === colourName) || product.variants?.[0];
  const hex = finish || variant?.colorHex || undefined;

  const own = ownerPhoto(product);
  const official = officialPhoto(product.slug, colourName);
  const src = [own, official].find((s): s is string => !!s && !failed[s]);
  const alt = labelled ? `${product.name}${colourName && colourName !== 'Standard' ? `, ${colourName}` : ''}` : '';

  return (
    <div className={cn('relative aspect-square w-full overflow-hidden bg-tile text-ink', rounded, className)}>
      {src ? (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          // eager (not `priority`/fetchPriority=high): React would hoist a preload link that
          // browsers flag as unused when the responsive candidate differs
          loading={priority ? 'eager' : 'lazy'}
          // remote/data URLs aren't in next.config remotePatterns; serve them as-is
          unoptimized={/^(https?:|data:)/.test(src)}
          className={cn('object-contain', src === own ? 'p-[9%]' : 'p-[5%]')}
          onError={() => setFailed((f) => ({ ...f, [src]: true }))}
        />
      ) : (
        <DeviceArt
          kind={deviceKindFor(product)}
          finish={hex}
          label={labelled ? product.name : undefined}
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
