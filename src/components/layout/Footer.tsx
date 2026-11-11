'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink } from '@/lib/utils';
import { Phone, MessageCircle, MapPin, Clock, ShieldAlert, ArrowUpRight } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  const { settings } = useStore();

  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    'Hi Vishal Apple Store, I am inquiring about store timings and device availability.'
  );

  return (
    <footer className="w-full bg-[#080809] border-t border-white/[0.08] text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Col 1 & 2: Brand Lockup & Bio */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block group focus:outline-none">
              <div className="relative h-14 w-60 overflow-hidden rounded-md bg-white p-1.5">
                <Image
                  src="/brand/horizontal.jpeg"
                  alt="Vishal Apple Store"
                  fill
                  sizes="240px"
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              {settings.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900 border border-white/10 text-xs font-medium text-neutral-200 hover:text-white hover:border-[#C9A24A]/50 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C9A24A]" />
                WhatsApp Direct
              </a>
              <a
                href={`tel:${settings.phoneRaw}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900 border border-white/10 text-xs font-medium text-neutral-200 hover:text-white hover:border-[#C9A24A]/50 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A24A]" />
                {settings.phone}
              </a>
              <a
                href={settings.socials.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900 border border-white/10 text-xs font-medium text-neutral-200 hover:text-white hover:border-[#C9A24A]/50 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#C9A24A]" />
                {settings.socials.instagramHandle}
              </a>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Curated Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#catalog" className="hover:text-white transition-colors">
                  iPhone (New & Pre-Owned)
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-white transition-colors">
                  MacBook Pro & Air
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-white transition-colors">
                  iPad Pro & Air
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-white transition-colors">
                  AirPods & Audio
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-white transition-colors">
                  Apple Watch & Ultra
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-white transition-colors">
                  Original Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Services */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Store Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#tools" className="hover:text-white transition-colors">
                  40-Point Diagnostic Check
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="hover:text-white transition-colors">
                  Device Trade-In Valuation
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="hover:text-white transition-colors">
                  Zero-Down EMI Schemes
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-white transition-colors">
                  Verified Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/#repair-form" className="hover:text-white transition-colors">
                  Diagnostics & Repair Request
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#C9A24A] transition-colors flex items-center gap-1">
                  Owner Admin Login <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Visit Us */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Amritsar Store
            </h3>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A24A] shrink-0 mt-0.5" />
                <span>
                  {settings.address.shopNo}, {settings.address.building}, {settings.address.area}, {settings.address.city} - {settings.address.pincode}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C9A24A] shrink-0 mt-0.5" />
                <div>
                  <p>{settings.timings.weekdays}</p>
                  <p className="mt-0.5">{settings.timings.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box (Strictly per guidelines: No Authorised Apple Reseller claim) */}
        <div className="mt-12 pt-8 border-t border-white/[0.08]">
          <div className="rounded-xl bg-[#121214] border border-white/[0.06] p-4 text-xs text-neutral-400 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-neutral-300">Independent Retailer Notice & Trademark Disclaimer</p>
              <p className="leading-relaxed">
                {settings.brand.disclaimer} All product names, logos, brands, and registered trademarks belong exclusively to Apple Inc. Vishal Apple Store is an independent retail and service entity providing inspected devices, store warranties, and retail assistance in Amritsar, Punjab. GST registered: {settings.brand.gstNumber}.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
            <p>© {new Date().getFullYear()} Vishal Apple Store. All rights reserved.</p>
            <p className="text-neutral-400">
              Crafted for refined device commerce with Next.js & TypeScript.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
