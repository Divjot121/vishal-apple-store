'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink, cn } from '@/lib/utils';
import { useStoreStatus } from '@/components/ui/useStoreStatus';
import Logo from '@/components/ui/Logo';
import { MessageCircle, Phone, Menu, X, Sun, Moon } from 'lucide-react';

const NAV = [
  { href: '/#catalog', label: 'In stock' },
  { href: '/#how-we-check', label: 'Pre-owned' },
  { href: '/#offers', label: 'Offers' },
  { href: '/#tools', label: 'Exchange & EMI' },
  { href: '/#repairs', label: 'Repairs' },
  { href: '/#visit', label: 'Visit' },
];

export default function Header() {
  const { settings, theme, toggleTheme } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const status = useStoreStatus();
  const pathname = usePathname();

  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    'Hi, I saw your website. I wanted to ask about a device.'
  );

  // Close the mobile menu on route change and on Escape
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-canvas">
      {/* Store line: status, address, phone */}
      <div className="border-b border-line">
        <div className="wrap flex h-9 items-center justify-between gap-4 text-caption text-ink-3">
          <p className="flex min-w-0 items-center gap-2">
            <span
              className={cn('h-1.5 w-1.5 shrink-0 rounded-full', status?.open ? 'bg-ok' : 'bg-ink-3')}
              aria-hidden
            />
            <span className="truncate">
              <span className="font-medium text-ink-2">{status ? status.label : 'Mon–Sat 10:30 am – 9 pm'}</span>
              <span className="hidden sm:inline"> · Shop 14, District Shopping Complex, Ranjit Avenue</span>
            </span>
          </p>
          <a
            href={`tel:${settings.phoneRaw}`}
            className="hidden h-9 shrink-0 items-center font-medium text-ink-2 hover:text-ink sm:inline-flex"
          >
            {settings.phone}
          </a>
        </div>
      </div>

      <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/" className="-ml-1 shrink-0 rounded-md p-1" aria-label="Vishal Apple Store, home">
          <Logo priority width={172} minWidth={136} />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center xl:gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full px-2.5 text-small font-medium text-ink-2 transition-colors hover:bg-subtle hover:text-ink xl:px-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a href={`tel:${settings.phoneRaw}`} className="btn-quiet hidden px-4 md:inline-flex lg:hidden xl:inline-flex">
            <Phone className="h-4 w-4" aria-hidden />
            Call
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden px-4 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-subtle hover:text-ink"
            aria-label={themeLabel}
            title={themeLabel}
          >
            {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" aria-hidden /> : <Moon className="h-[18px] w-[18px]" aria-hidden />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-6.25rem)] overflow-y-auto border-t border-line bg-canvas lg:hidden"
      >
        <nav aria-label="Mobile" className="wrap py-2">
          <ul className="divide-y divide-line">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[52px] items-center text-lead font-medium text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-3 border-t border-line py-4">
            <a href={`tel:${settings.phoneRaw}`} className="btn-quiet">
              <Phone className="h-4 w-4" aria-hidden />
              Call
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
