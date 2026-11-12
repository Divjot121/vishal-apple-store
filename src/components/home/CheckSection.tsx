'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ProductImage from '@/components/ui/ProductImage';
import { formatINR } from '@/lib/utils';
import { priceSummary } from '@/lib/catalog';

const STEPS = [
  {
    title: 'Serial and IMEI, in front of you',
    body: "We look up the serial on Apple's coverage page and the IMEI on the government CEIR portal while you watch. Nothing iCloud-locked, blacklisted or reported stolen goes on sale.",
  },
  {
    title: 'A 40-point test',
    body: 'Face ID or Touch ID, True Tone, every camera, speakers, microphones, charging, Wi-Fi, SIM and buttons. If one thing fails, the phone does not go on the shelf.',
  },
  {
    title: 'Battery measured, not guessed',
    body: 'Battery health and cycle count are read from the device and written on the tag.',
  },
  {
    title: 'Every mark written down',
    body: 'Scratches, scuffs and swirls are noted on the tag before it is priced, so you know what you are buying before you hold it.',
  },
  {
    title: 'Bill and a written warranty',
    body: 'GST bill and a 6-month store warranty card. If anything we tested stops working in that time, bring it back.',
  },
];

function formatDate(iso?: string) {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function CheckSection() {
  const { products } = useStore();
  const sample =
    products.find((p) => p.isVisible && p.condition === 'Pre-owned' && p.category === 'iPhone' && p.gradingReport) ??
    products.find((p) => p.condition === 'Pre-owned');
  const report = sample?.gradingReport;

  return (
    <section id="how-we-check" className="section bg-night text-night-ink-2" aria-labelledby="check-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-eyebrow uppercase text-night-ink-2">Pre-owned, done properly</p>
          <h2 id="check-title" className="mt-3 text-title text-night-ink">
            What happens to a used phone before we sell it
          </h2>
          <p className="mt-4 max-w-prose">
            Most of our pre-owned stock comes from customers in Amritsar exchanging for something newer. Each one
            goes through the same checks, and the results go on a tag you can read before you buy.
          </p>

          {sample && report && (
            <figure className="reveal mt-10 overflow-hidden rounded-card border border-night-line bg-night-2">
              <div className="grid grid-cols-[96px_1fr] items-center gap-4 border-b border-night-line p-4 sm:grid-cols-[120px_1fr]">
                <ProductImage product={sample} labelled={false} rounded="rounded-control" className="bg-night-line" sizes="120px" />
                <figcaption>
                  <p className="text-caption text-night-ink-2">Shelf tag, as printed</p>
                  <p className="mt-0.5 text-subtitle text-night-ink">{sample.name}</p>
                  <p className="mt-0.5 text-small text-night-ink-2">
                    {sample.variants[0]?.storage} · {sample.variants[0]?.colour}
                  </p>
                  <p className="tabular mt-0.5 text-small font-semibold text-night-ink">{formatINR(priceSummary(sample).price)}</p>
                </figcaption>
              </div>
              <dl className="tabular divide-y divide-night-line text-small">
                {[
                  ['Battery health', report.batteryHealth ? `${report.batteryHealth}%` : '—'],
                  ['Condition', report.cosmeticScore],
                  ['Parts', 'All original, never opened'],
                  ['Checked on', formatDate(report.inspectionDate)],
                  ['Warranty', '6 months from us'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 px-4 py-2.5">
                    <dt>{k}</dt>
                    <dd className="text-right font-medium text-night-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-night-line px-4 py-1">
                <Link href={`/product/${sample.slug}`} className="inline-flex min-h-[44px] items-center text-small font-semibold text-night-ink underline underline-offset-4 hover:no-underline">
                  See this phone
                </Link>
              </div>
            </figure>
          )}
        </div>

        <ol className="lg:col-span-7 lg:pt-2">
          {STEPS.map((step, i) => (
            <li key={step.title} className="reveal grid grid-cols-[3rem_1fr] gap-x-3 border-t border-night-line py-6 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr]">
              <span className="tabular text-subtitle font-medium text-gold" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-subtitle text-night-ink">{step.title}</h3>
                <p className="mt-1.5 max-w-prose">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
