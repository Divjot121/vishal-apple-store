'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Native <dialog> wrapper: focus is trapped by the browser, Escape closes,
 * the page behind is inert, and focus returns to the trigger on close.
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  className,
  size = 'md',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'md' | 'lg' | 'xl';
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      document.documentElement.style.overflow = 'hidden';
    } else if (!open && dlg.open) {
      dlg.close();
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={() => {
        document.documentElement.style.overflow = '';
        onClose();
      }}
      onClick={(e) => {
        // click on the backdrop (outside the panel) closes
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        'm-0 mt-auto w-full max-w-none rounded-t-card bg-surface p-0 text-ink-2 shadow-pop sm:m-auto sm:rounded-card',
        size === 'md' && 'sm:max-w-md',
        size === 'lg' && 'sm:max-w-2xl',
        size === 'xl' && 'sm:max-w-5xl',
        'max-h-[92dvh]',
        className
      )}
    >
      {open && (
        <div className="relative flex max-h-[92dvh] flex-col">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-3 transition-colors hover:bg-subtle hover:text-ink"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <div className="overflow-y-auto p-5 sm:p-7">{children}</div>
        </div>
      )}
    </dialog>
  );
}
