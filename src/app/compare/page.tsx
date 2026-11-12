'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import CompareTable from '@/components/store/CompareTable';
import { ArrowLeft } from 'lucide-react';

export default function ComparePage() {
  const { compareList, clearCompare } = useStore();

  return (
    <div className="wrap pb-20 pt-8">
      <Link href="/#catalog" className="inline-flex min-h-[44px] items-center gap-1.5 text-small font-medium text-ink-2 hover:text-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to the stock list
      </Link>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-title">Compare side by side</h1>
          <p className="mt-2 text-ink-2">Up to three devices. Prices include GST.</p>
        </div>
        {compareList.length > 0 && (
          <button type="button" onClick={clearCompare} className="btn-quiet">
            Clear all ({compareList.length})
          </button>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="mx-auto mt-10 max-w-prose rounded-card border border-dashed border-line-strong px-6 py-14 text-center">
          <h2 className="text-subtitle">Nothing to compare yet</h2>
          <p className="mt-2 text-ink-2">Tap &ldquo;Compare&rdquo; on two or three devices in the stock list and they will show up here.</p>
          <Link href="/#catalog" className="btn-primary mt-6">
            Go to the stock list
          </Link>
        </div>
      ) : (
        <div className="mt-2 rounded-card border border-line bg-surface p-5 sm:p-7">
          <CompareTable />
        </div>
      )}
    </div>
  );
}
