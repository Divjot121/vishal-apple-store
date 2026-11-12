'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink } from '@/lib/utils';
import Logo from '@/components/ui/Logo';

const SHOP = ['iPhone', 'Mac', 'iPad', 'Apple Watch', 'AirPods', 'Chargers and accessories'];
const HELP: [string, string][] = [
  ['How we check pre-owned', '/#how-we-check'],
  ['Exchange your old phone', '/#tools'],
  ['EMI on cards', '/#tools'],
  ['Repairs', '/#repairs'],
  ['Reviews', '/#reviews'],
];

const linkCls = 'inline-flex min-h-[44px] items-center text-night-ink-2 transition-colors hover:text-night-ink sm:min-h-[36px]';

export default function Footer() {
  const { settings } = useStore();
  const a = settings.address;
  const whatsappHref = buildWhatsAppLink(settings.whatsappRaw, 'Hi, I have a question.');

  return (
    <footer className="bg-night text-small text-night-ink-2">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" aria-label="Vishal Apple Store, home" className="inline-block rounded-md">
            <Logo tone="reverse" width={176} />
          </Link>
          <p className="mt-5 max-w-sm">{settings.shortDescription}</p>
          <ul className="mt-4 space-y-0.5">
            <li>
              <a href={`tel:${settings.phoneRaw}`} className={`${linkCls} font-semibold text-night-ink`}>
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={linkCls}>
                WhatsApp
              </a>
            </li>
            <li>
              <a href={settings.socials.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                Instagram {settings.socials.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Shop" className="lg:col-span-2">
          <h2 className="text-eyebrow uppercase text-night-ink">Shop</h2>
          <ul className="mt-3">
            {SHOP.map((s) => (
              <li key={s}>
                <Link href="/#catalog" className={linkCls}>{s}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Help" className="lg:col-span-3">
          <h2 className="text-eyebrow uppercase text-night-ink">Help</h2>
          <ul className="mt-3">
            {HELP.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className={linkCls}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-eyebrow uppercase text-night-ink">The shop</h2>
          <address className="mt-4 not-italic leading-relaxed">
            {a.shopNo}, {a.building}
            <br />
            {a.area}, {a.city} {a.pincode}
          </address>
          <p className="mt-3 leading-relaxed">
            {settings.timings.weekdays}
            <br />
            {settings.timings.sunday}
          </p>
          <a href={settings.socials.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className={`${linkCls} mt-1 font-semibold text-night-ink underline underline-offset-4`}>
            Get directions
          </a>
        </div>
      </div>

      <div className="border-t border-night-line">
        <div className="wrap flex flex-col gap-4 py-6 text-caption lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <p className="max-w-3xl">{settings.brand.disclaimer}</p>
          <p className="shrink-0">
            © {new Date().getFullYear()} {settings.storeName} ·{' '}
            <Link href="/admin" className="underline underline-offset-4 hover:text-night-ink">
              Staff login
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
