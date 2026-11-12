'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { formatINR, buildWhatsAppLink } from '@/lib/utils';
import { CONDITION_LABEL, priceSummary } from '@/lib/catalog';
import ProductImage from '@/components/ui/ProductImage';
import { X } from 'lucide-react';
import type { Product } from '@/types';

const ROWS: { label: string; get: (p: Product) => string }[] = [
  { label: 'Condition', get: (p) => `${CONDITION_LABEL[p.condition]}${p.gradingReport?.cosmeticScore ? `, ${p.gradingReport.cosmeticScore}` : ''}` },
  { label: 'Battery health', get: (p) => (p.condition === 'Pre-owned' && p.gradingReport?.batteryHealth ? `${p.gradingReport.batteryHealth}%` : 'New battery') },
  { label: 'Chip', get: (p) => p.specs.chip },
  { label: 'Display', get: (p) => p.specs.display },
  { label: 'Camera', get: (p) => p.specs.camera || '—' },
  { label: 'Battery life', get: (p) => p.specs.battery },
  { label: 'Unlock', get: (p) => p.specs.biometrics },
  { label: 'Port', get: (p) => p.specs.port },
  { label: 'Warranty', get: (p) => p.specs.warranty },
];

/** Side-by-side spec table for the devices in the compare list (drawer and /compare page). */
export default function CompareTable() {
  const { compareList, removeFromCompare, settings } = useStore();
  const cols = compareList.length;

  return (
    <div className="-mx-5 mt-6 overflow-x-auto px-5 sm:-mx-7 sm:px-7">
          <table className="w-full min-w-[560px] border-collapse text-left text-small">
            <colgroup>
              <col className="w-32" />
              {compareList.map((p) => <col key={p.id} style={{ width: `${100 / cols}%` }} />)}
            </colgroup>
            <thead>
              <tr>
                <td />
                {compareList.map((p) => {
                  const { price } = priceSummary(p);
                  const waHref = buildWhatsAppLink(settings.whatsappRaw, `Hi, is the ${p.name} (${CONDITION_LABEL[p.condition].toLowerCase()}, ${formatINR(price)}) available?`);
                  return (
                    <th key={p.id} scope="col" className="relative px-2 pb-4 align-top font-normal">
                      <button
                        type="button"
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute right-0 top-0 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 text-ink-3 hover:text-ink"
                        aria-label={`Remove ${p.name} from comparison`}
                      >
                        <X className="h-4 w-4" aria-hidden />
                      </button>
                      <ProductImage product={p} labelled={false} sizes="200px" className="max-w-[180px]" />
                      <p className="mt-3 font-semibold text-ink">{p.name}</p>
                      <p className="tabular mt-0.5 text-ink">{formatINR(price)}</p>
                      <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-[44px] items-center font-semibold text-ink underline underline-offset-4 hover:no-underline">
                        Ask about this one
                      </a>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-line border-t border-line">
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="py-3 pr-3 align-top font-medium text-ink-3">{row.label}</th>
                  {compareList.map((p) => (
                    <td key={p.id} className="px-2 py-3 align-top text-ink-2">{row.get(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
}
