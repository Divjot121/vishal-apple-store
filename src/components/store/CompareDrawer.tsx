'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import Modal from '@/components/ui/Modal';
import CompareTable from './CompareTable';

export default function CompareDrawer() {
  const { compareList, clearCompare } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (compareList.length === 0) return null;


  return (
    <>
      <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-30 md:bottom-6">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-ink px-5 text-small font-semibold text-canvas shadow-pop transition-colors hover:bg-ink/85"
        >
          Compare
          <span className="tabular inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-canvas px-1.5 text-caption text-ink">
            {compareList.length}
          </span>
        </button>
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Compare devices" size="xl">
        <div className="flex flex-wrap items-end justify-between gap-3 pr-10">
          <div>
            <h2 className="text-subtitle">Compare side by side</h2>
            <p className="mt-1 text-small text-ink-3">Up to three devices. Prices include GST.</p>
          </div>
          <button type="button" onClick={() => { clearCompare(); setIsOpen(false); }} className="text-small font-medium text-ink-2 underline underline-offset-4 hover:text-ink">
            Clear all
          </button>
        </div>

        <CompareTable />
      </Modal>
    </>
  );
}
