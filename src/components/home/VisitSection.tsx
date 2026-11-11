'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink } from '@/lib/utils';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  MessageCircle,
  Train,
  Car,
  CheckCircle,
} from 'lucide-react';

export default function VisitSection() {
  const { settings } = useStore();

  // Determine if currently open (Delhi store hours 10:30 AM to 9:00 PM)
  const isStoreOpen = () => {
    try {
      const now = new Date();
      const hour = now.getHours();
      const min = now.getMinutes();
      const currentTime = hour + min / 60;
      return currentTime >= 10.5 && currentTime <= 21.0;
    } catch {
      return true;
    }
  };

  const openNow = isStoreOpen();

  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    'Hi Vishal Apple Store, please share your exact store location and parking directions for Connaught Place.'
  );

  return (
    <section id="visit" className="w-full bg-[#0A0A0A] py-16 sm:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161619] border border-[#C9A24A]/30 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#C9A24A]" />
            <span className="text-xs font-semibold text-neutral-200">
              Connaught Place, New Delhi
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Visit the Retail Gallery
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Experience devices hands-on, test hardware diagnostics in person, and consult with our device specialists over espresso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Store Details & Timings */}
          <div className="lg:col-span-5 bg-[#121215] border border-white/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Live Status Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      openNow ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'
                    }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      openNow ? 'text-emerald-400' : 'text-neutral-400'
                    }`}
                  >
                    {openNow ? 'Store Open Now · Closes 9:00 PM' : 'Store Closed · Opens 10:30 AM'}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400">Walk-ins Welcome</span>
              </div>

              {/* Address Box */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A24A]" />
                  <span>Store Address</span>
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-medium">
                  {settings.address.shopNo}, {settings.address.building}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed mt-0.5">
                  {settings.address.landmark}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {settings.address.area}, {settings.address.city} - {settings.address.pincode}
                </p>
              </div>

              {/* Hours Box */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C9A24A]" />
                  <span>Operating Timings</span>
                </h3>
                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Monday – Saturday</span>
                    <span className="font-semibold text-white">10:30 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-neutral-400">Sunday</span>
                    <span className="font-semibold text-white">11:30 AM – 8:00 PM</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-400 mt-2">
                  {settings.timings.note}
                </p>
              </div>

              {/* Transit & Parking perks */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/[0.04]">
                  <Train className="w-4 h-4 text-[#C9A24A] mb-1.5" />
                  <p className="font-semibold text-white">Metro Access</p>
                  <p className="text-[11px] text-neutral-400">2 Mins from Rajiv Chowk (Gate 2)</p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/[0.04]">
                  <Car className="w-4 h-4 text-[#C9A24A] mb-1.5" />
                  <p className="font-semibold text-white">Dedicated Parking</p>
                  <p className="text-[11px] text-neutral-400">Outer Circle Regal parking lot</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3">
              <a
                href={settings.socials.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-xs transition-colors shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${settings.phoneRaw}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white font-semibold text-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C9A24A]" />
                <span>Call Store</span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white flex items-center justify-center"
                title="WhatsApp Location"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A24A]" />
              </a>
            </div>
          </div>

          {/* Right Column: Styled Embedded Map Visual */}
          <div className="lg:col-span-7 bg-[#121215] border border-white/[0.08] rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[460px] relative flex flex-col">
            {/* Embedded Google Maps iframe with dark styling */}
            <iframe
              src={settings.socials.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vishal Apple Store Connaught Place Location"
              className="flex-1 w-full"
            />

            {/* Bottom Floating Card inside Map */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#0E0E12]/95 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl flex items-center justify-between shadow-2xl">
              <div>
                <p className="text-xs font-bold text-white">Vishal Apple Store</p>
                <p className="text-[11px] text-neutral-400">Shop No. 14, Regal Building, CP, New Delhi</p>
              </div>

              <a
                href={settings.socials.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
