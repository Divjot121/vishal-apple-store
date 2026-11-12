import type { Condition, Product } from '@/types';

/** Plain-language condition names used across the site */
export const CONDITION_LABEL: Record<Condition, string> = {
  New: 'Sealed',
  Unboxed: 'Open box',
  'Pre-owned': 'Pre-owned',
};

export const CONDITION_NOTE: Record<Condition, string> = {
  New: 'Sealed box, full Apple warranty',
  Unboxed: 'Opened, barely used, Apple warranty left',
  'Pre-owned': 'Checked and graded, 6-month store warranty',
};

export function totalStock(p: Product): number {
  return p.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
}

export function stockInfo(p: Product): { label: string; tone: 'ok' | 'warn' | 'bad' } {
  const n = totalStock(p);
  if (!p.inStock || n === 0) return { label: 'Sold out', tone: 'bad' };
  if (n <= 2) return { label: `Only ${n} left`, tone: 'warn' };
  return { label: 'In stock', tone: 'ok' };
}

/** Cheapest variant, and whether other variants cost more ("from" price) */
export function priceSummary(p: Product): { price: number; mrp: number; from: boolean } {
  if (!p.variants.length) return { price: p.basePrice, mrp: p.mrp, from: false };
  const cheapest = p.variants.reduce((a, b) => (b.price < a.price ? b : a));
  const from = p.variants.some((v) => v.price !== cheapest.price);
  return { price: cheapest.price, mrp: cheapest.mrp, from };
}

function unique<T>(xs: T[]): T[] {
  return Array.from(new Set(xs));
}

/** "128GB – 512GB · 3 colours", "18GB/512GB, 36GB/1TB · 2 colours", "46mm GPS · 2 colours" */
export function variantSummary(p: Product): string {
  const storages = unique(p.variants.map((v) => v.storage)).filter((s) => s && s !== 'Standard');
  const colours = unique(p.variants.map((v) => v.colour));
  const parts: string[] = [];
  const tidy = (s: string) => s.replace(/ Unified/g, '').replace(/ SSD/g, '').replace(/\s*\/\s*/g, '/');
  const simple = storages.every((s) => /^\d+(GB|TB)( \(.*\))?$/.test(s));
  if (storages.length === 1) {
    parts.push(tidy(storages[0]));
  } else if (storages.length > 1 && simple) {
    const toGB = (s: string) => parseFloat(s) * (s.includes('TB') ? 1024 : 1);
    const sorted = [...storages].sort((a, b) => toGB(a) - toGB(b));
    const bare = (s: string) => s.replace(/ \(.*\)/, '');
    parts.push(`${bare(sorted[0])} – ${bare(sorted[sorted.length - 1])}`);
  } else if (storages.length > 1) {
    parts.push(storages.map(tidy).join(', '));
  }
  parts.push(colours.length === 1 ? colours[0].split(' / ')[0] : `${colours.length} colours`);
  return parts.join(' · ');
}
