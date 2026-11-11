'use client';

import React from 'react';
import { Category } from '@/types';
import {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  Cable,
  LayoutGrid,
} from 'lucide-react';

interface CategoryStripProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CATEGORIES: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}[] = [
  { id: 'all', label: 'All Devices', icon: LayoutGrid, tag: 'Full Catalog' },
  { id: 'iPhone', label: 'iPhone', icon: Smartphone, tag: '16 Pro & More' },
  { id: 'Mac', label: 'Mac', icon: Laptop, tag: 'M3 Pro & Air' },
  { id: 'iPad', label: 'iPad', icon: Tablet, tag: 'M4 Tandem OLED' },
  { id: 'AirPods', label: 'AirPods', icon: Headphones, tag: 'Pro 2 & Max' },
  { id: 'Watch', label: 'Watch', icon: Watch, tag: 'Ultra 2 & S10' },
  { id: 'Accessories', label: 'Accessories', icon: Cable, tag: 'MagSafe & Adapters' },
];

export default function CategoryStrip({
  selectedCategory,
  onSelectCategory,
}: CategoryStripProps) {
  return (
    <section className="w-full bg-[#0D0D10] border-y border-white/[0.08] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A24A]">
            Direct Catalog Navigation
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Browse by Hardware Line
          </h2>
        </div>

        {/* Horizontal scroll container on mobile, centered grid on desktop */}
        <div className="flex items-center justify-start lg:justify-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('catalog');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group shrink-0 flex flex-col items-center p-3.5 sm:p-4 rounded-2xl transition-all duration-200 border min-w-[100px] sm:min-w-[110px] ${
                  isSelected
                    ? 'bg-[#1C1C22] border-[#C9A24A] text-white shadow-gold-glow'
                    : 'bg-[#141417] border-white/[0.06] text-neutral-400 hover:text-white hover:bg-[#1A1A1F] hover:border-white/20'
                }`}
              >
                {/* Circular Icon Enclosure echoing brand asset style */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2.5 transition-colors ${
                    isSelected
                      ? 'bg-[#C9A24A] text-black shadow-md'
                      : 'bg-black text-white group-hover:text-[#C9A24A] border border-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <span className="text-xs sm:text-sm font-semibold tracking-tight text-white">
                  {cat.label}
                </span>
                <span className="text-[10px] text-neutral-400 mt-0.5">
                  {cat.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
