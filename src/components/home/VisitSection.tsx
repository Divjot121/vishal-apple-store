'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink, cn } from '@/lib/utils';
import { useStoreStatus } from '@/components/ui/useStoreStatus';
import { MapPin, Navigation, Phone, MessageCircle } from 'lucide-react';

const HOURS = [
  { days: 'Monday to Saturday', time: '10:30 am – 9 pm', idx: [1, 2, 3, 4, 5, 6] },
  { days: 'Sunday', time: '11:30 am – 8 pm', idx: [0] },
];

export default function VisitSection() {
  const { settings } = useStore();
  const status = useStoreStatus();
  const [showMap, setShowMap] = useState(false);
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    const wd = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short' }).format(new Date());
    setToday(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(wd));
  }, []);

  const a = settings.address;
  const whatsappHref = buildWhatsAppLink(settings.whatsappRaw, 'Hi, please send me your shop location on WhatsApp.');

  return (
    <section id="visit" className="section" aria-labelledby="visit-title">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Visit the shop</p>
          <h2 id="visit-title" className="mt-3 text-title">
            Come and see it in person
          </h2>
          <p className="mt-4 max-w-prose text-ink-2">
            Try the device, see the battery health yourself, and bring your old phone if you want an exchange price.
            There&rsquo;s parking inside the complex.
          </p>

          <address className="mt-8 not-italic">
            <p className="font-semibold text-ink">{a.shopNo}, {a.building}</p>
            <p className="mt-0.5 text-ink-2">
              {a.area}, {a.city}, {a.state} {a.pincode}
            </p>
            <p className="mt-0.5 text-small text-ink-3">{a.landmark}</p>
          </address>

          <div className="mt-6">
            <p className={cn('text-small font-semibold', status?.open ? 'text-ok' : 'text-ink-2')}>
              {status?.label ?? ' '}
            </p>
            <dl className="mt-2 divide-y divide-line border-y border-line text-small">
              {HOURS.map((h) => {
                const isToday = today !== null && h.idx.includes(today);
                return (
                  <div key={h.days} className="flex justify-between gap-4 py-2.5">
                    <dt className={cn(isToday ? 'font-semibold text-ink' : 'text-ink-2')}>
                      {h.days}
                      {isToday && <span className="sr-only"> (today)</span>}
                    </dt>
                    <dd className={cn('tabular', isToday ? 'font-semibold text-ink' : 'text-ink-2')}>{h.time}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <a href={settings.socials.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Navigation className="h-4 w-4" aria-hidden />
              Directions
            </a>
            <a href={`tel:${settings.phoneRaw}`} className="btn-quiet">
              <Phone className="h-4 w-4" aria-hidden />
              Call
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-quiet">
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Map: a quiet placeholder until asked for, so Google Maps (and its cookies) don't load with the page */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-tile lg:col-span-7 lg:aspect-auto lg:min-h-[460px]">
          {showMap ? (
            <iframe
              src={settings.socials.googleMapsEmbedUrl}
              title={`Map showing ${settings.storeName}, ${a.area}, ${a.city}`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              {/* simple street-grid sketch, decorative */}
              <svg className="absolute inset-0 h-full w-full text-ink" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 450">
                <g fill="none" stroke="currentColor" strokeOpacity="0.09" strokeWidth="14" strokeLinecap="round">
                  <path d="M-20 120 L620 170" />
                  <path d="M-20 330 L620 300" />
                  <path d="M180 -20 L230 470" />
                  <path d="M420 -20 L400 470" />
                </g>
                <g fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="6">
                  <path d="M-20 230 L620 236" />
                  <path d="M310 -20 L318 470" />
                  <path d="M60 -20 L90 470" />
                </g>
              </svg>
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-canvas shadow-card">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <p className="relative text-small text-ink-2">
                <span className="block font-semibold text-ink">{a.shopNo.replace(', Ground Floor', '')}, {a.building}</span>
                {a.area}, {a.city}
              </p>
              <div className="relative flex flex-wrap justify-center gap-2">
                <button type="button" onClick={() => setShowMap(true)} className="btn-quiet bg-surface">
                  Show map here
                </button>
                <a href={settings.socials.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-quiet bg-surface">
                  Open Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
