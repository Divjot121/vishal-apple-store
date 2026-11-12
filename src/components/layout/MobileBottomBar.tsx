'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink } from '@/lib/utils';
import { Phone, MessageCircle, Navigation } from 'lucide-react';

/**
 * Phone-only bar: Call, WhatsApp and Directions are always one tap away.
 * The spacer after it reserves the same height (plus the iOS safe area) at the
 * end of the page, so the bar never covers the footer.
 */
export default function MobileBottomBar() {
  const { settings } = useStore();
  const whatsappHref = buildWhatsAppLink(settings.whatsappRaw, 'Hi, I saw your website. I wanted to ask about a device.');

  const item =
    'flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-control text-caption font-semibold transition-colors';

  return (
    <>
      <nav
        aria-label="Contact the shop"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas px-3 pt-2 md:hidden"
        style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a href={`tel:${settings.phoneRaw}`} className={`${item} text-ink hover:bg-subtle`}>
            <Phone className="h-[18px] w-[18px]" aria-hidden />
            Call
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`${item} bg-ink text-canvas`}>
            <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
            WhatsApp
          </a>
          <a href={settings.socials.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className={`${item} text-ink hover:bg-subtle`}>
            <Navigation className="h-[18px] w-[18px]" aria-hidden />
            Directions
          </a>
        </div>
      </nav>
      <div aria-hidden className="bg-night md:hidden" style={{ height: 'calc(4.25rem + env(safe-area-inset-bottom))' }} />
    </>
  );
}
