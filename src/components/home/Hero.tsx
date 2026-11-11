'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink } from '@/lib/utils';
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function Hero() {
  const { settings } = useStore();

  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    'Hi Vishal Apple Store, I am exploring your device catalog and want to know current stock and best store pricing.'
  );

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden pt-6 pb-16">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-b from-[#C9A24A]/12 via-[#C9A24A]/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Confident Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left pt-4 lg:pt-0">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161619] border border-[#C9A24A]/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C9A24A] animate-ping" />
              <span className="text-xs font-semibold tracking-wide text-neutral-200">
                Independent Apple Specialist · Ranjit Avenue, Amritsar
              </span>
            </div>

            {/* Massive Confident Headline with original copy (no Apple slogans) */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Pure Performance.{' '}
              <span className="text-gradient-gold block sm:inline">
                Unrivalled Craft.
              </span>{' '}
              Curated in Amritsar.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Amritsar and Punjab’s premier independent destination for Brand New sealed packs, pristine unboxed units, and 40-point certified pre-owned Apple devices. Backed by verified serial diagnostics, GST tax invoice, and genuine store warranty.
            </p>

            {/* Two Main CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 active:scale-95 transition-all duration-150 shadow-xl"
              >
                <span>Explore devices</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#18181C] text-white font-semibold text-sm hover:bg-[#24242A] border border-[#C9A24A]/50 hover:border-[#C9A24A] active:scale-95 transition-all duration-150 shadow-lg group"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A24A] group-hover:scale-110 transition-transform" />
                <span>WhatsApp us</span>
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 sm:pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">10,000+</p>
                <p className="text-xs text-neutral-400 mt-0.5">Devices Delivered</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#C9A24A] tracking-tight">40-Point</p>
                <p className="text-xs text-neutral-400 mt-0.5">Diagnostics Passed</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">Same-Day</p>
                <p className="text-xs text-neutral-400 mt-0.5">Amritsar & Punjab Courier</p>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Device Visual (Clean CSS/SVG vector render) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient circular frame with gold halo */}
            <div className="relative w-full max-w-[380px] sm:max-w-[460px] aspect-[4/5] flex items-center justify-center">
              {/* Outer decorative ring */}
              <div className="absolute inset-4 rounded-[48px] border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
              
              {/* Device illustration */}
              <div className="relative w-[85%] h-[90%] transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/devices/iphone-16-pro-natural.png"
                  alt="Curated Apple Devices - Vishal Apple Store"
                  fill
                  priority
                  sizes="(max-width: 768px) 340px, 460px"
                  className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Floating diagnostic badge top-right */}
              <div className="absolute -top-3 sm:top-2 right-2 sm:right-0 bg-[#161619]/90 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-2xl flex items-center gap-2.5 animate-slide-up">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white">100% Genuine Serial</p>
                  <p className="text-[10px] text-neutral-400">Apple Coverage Verifiable</p>
                </div>
              </div>

              {/* Floating trade-in pill bottom-left */}
              <div className="absolute -bottom-3 sm:bottom-4 left-2 sm:-left-4 bg-[#161619]/90 backdrop-blur-md border border-[#C9A24A]/40 rounded-2xl p-3 shadow-2xl flex items-center gap-2.5 animate-slide-up">
                <div className="w-8 h-8 rounded-full bg-[#C9A24A]/20 text-[#C9A24A] flex items-center justify-center border border-[#C9A24A]/40">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white">Up to ₹6,000 Off</p>
                  <p className="text-[10px] text-neutral-400">Card & Exchange Bonus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
