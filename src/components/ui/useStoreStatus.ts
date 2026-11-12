'use client';

import { useEffect, useState } from 'react';
import { getStoreStatus } from '@/lib/utils';

/** Client-only (null during SSR) so server and browser clocks never cause a hydration mismatch. */
export function useStoreStatus() {
  const [status, setStatus] = useState<ReturnType<typeof getStoreStatus> | null>(null);
  useEffect(() => {
    const update = () => setStatus(getStoreStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
