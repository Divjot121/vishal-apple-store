'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink } from '@/lib/utils';
import {
  MessageCircle,
  Scale,
  Menu,
  X,
  ShieldCheck,
  MapPin,
  Sparkles,
  Lock,
  Sun,
  Moon,
} from 'lucide-react';

export default function Header() {
  const { settings, compareList, theme, toggleTheme } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    'Hi Vishal Apple Store, I am exploring your premium Apple device catalog and would like to enquire.'
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      {/* Top micro-announcement banner */}
      <div className="bg-[#121214] text-xs py-1.5 px-4 text-center text-neutral-400 border-b border-white/[0.04] flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A24A] animate-pulse" />
        <span className="font-medium text-neutral-300">Same-Day Amritsar & Punjab Delivery</span>
        <span className="text-neutral-600">|</span>
        <span className="hidden sm:inline">Transparent 40-Point Diagnostics</span>
        <span className="text-neutral-600 hidden sm:inline">|</span>
        <span className="text-[#C9A24A]">Shop No. 14, Ranjit Avenue</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo Lockup */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#C9A24A]/40 rounded-lg p-1">
            <div className="relative h-10 w-44 sm:h-12 sm:w-56 overflow-hidden rounded-md bg-white p-1">
              <Image
                src="/brand/horizontal.jpeg"
                alt="Vishal Apple Store"
                fill
                priority
                sizes="(max-width: 640px) 176px, 224px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-neutral-300">
            <Link
              href="/#catalog"
              className="hover:text-white transition-colors duration-150 py-1"
            >
              Devices
            </Link>
            <Link
              href="/#offers"
              className="hover:text-white transition-colors duration-150 py-1 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24A]" />
              Offers
            </Link>
            <Link
              href="/#compare"
              className="hover:text-white transition-colors duration-150 py-1 relative"
            >
              Compare
              {compareList.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-[#C9A24A] text-black font-semibold rounded-full">
                  {compareList.length}
                </span>
              )}
            </Link>
            <Link
              href="/#tools"
              className="hover:text-white transition-colors duration-150 py-1"
            >
              EMI & Trade-In
            </Link>
            <Link
              href="/#reviews"
              className="hover:text-white transition-colors duration-150 py-1"
            >
              Reviews
            </Link>
            <Link
              href="/#visit"
              className="hover:text-white transition-colors duration-150 py-1 flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              Store
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Compare pill shortcut if active */}
            {compareList.length > 0 && (
              <a
                href="#compare"
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium bg-[#1F1F24] hover:bg-[#2A2A30] text-neutral-200 px-3 py-1.5 rounded-full border border-white/10 transition-colors"
              >
                <Scale className="w-3.5 h-3.5 text-[#C9A24A]" />
                <span>Compare ({compareList.length})</span>
              </a>
            )}

            {/* Direct WhatsApp CTA */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-[#1A1A1E] text-white hover:bg-[#26262B] border border-[#C9A24A]/40 hover:border-[#C9A24A] shadow-sm transition-all duration-200 group"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#C9A24A] group-hover:scale-110 transition-transform" />
              <span>WhatsApp Us</span>
            </a>

            {/* Theme Toggle Button (Light / Dark) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center p-2 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors border border-white/10"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>

            {/* Admin Link */}
            <Link
              href="/admin"
              className="inline-flex items-center justify-center p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors"
              title="Admin Panel"
              aria-label="Admin Panel"
            >
              <Lock className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D10] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <Link
              href="/#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900/60 text-sm font-medium text-neutral-200"
            >
              Explore Devices
            </Link>
            <Link
              href="/#offers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900/60 text-sm font-medium text-neutral-200"
            >
              <Sparkles className="w-4 h-4 text-[#C9A24A]" />
              Live Offers
            </Link>
            <Link
              href="/#compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900/60 text-sm font-medium text-neutral-200"
            >
              <Scale className="w-4 h-4 text-[#C9A24A]" />
              Compare Devices
            </Link>
            <Link
              href="/#tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900/60 text-sm font-medium text-neutral-200"
            >
              EMI & Trade-In
            </Link>
            <Link
              href="/#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900/60 text-sm font-medium text-neutral-200"
            >
              Customer Reviews
            </Link>
            <Link
              href="/#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900/60 text-sm font-medium text-neutral-200"
            >
              <MapPin className="w-4 h-4 text-neutral-400" />
              Visit Store
            </Link>
          </div>

          <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#C9A24A] text-black font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4 text-black" />
              WhatsApp Store Consultation
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-neutral-900 text-neutral-400 text-xs hover:text-white"
            >
              <Lock className="w-3.5 h-3.5" />
              Store Owner Portal (/admin)
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between py-2 px-4 rounded-xl bg-neutral-900 text-neutral-300 text-xs hover:text-white border border-white/5"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-400" />}
                <span>Theme Mode</span>
              </span>
              <span className="text-[11px] font-semibold text-[#C9A24A]">
                {theme === 'dark' ? 'Light Theme ☀️' : 'Dark Theme 🌙'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
