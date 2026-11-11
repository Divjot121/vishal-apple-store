'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/store/ProductCard';
import { Condition } from '@/types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';

interface CatalogSectionProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function CatalogSection({
  selectedCategory,
  onSelectCategory,
}: CatalogSectionProps) {
  const { products } = useStore();

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(350000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available storages
  const storageOptions = ['128GB', '256GB', '512GB', '1TB'];

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCondition('all');
    setSelectedStorage('all');
    setOnlyInStock(false);
    setMaxPrice(350000);
    setSortBy('featured');
    onSelectCategory('all');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.isVisible)
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Condition filter
        if (selectedCondition !== 'all' && p.condition !== selectedCondition) {
          return false;
        }

        // Stock filter
        if (onlyInStock) {
          const totalStock = p.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
          if (!p.inStock || totalStock === 0) return false;
        }

        // Storage filter
        if (selectedStorage !== 'all') {
          const hasStorage = p.variants.some((v) =>
            v.storage.toLowerCase().includes(selectedStorage.toLowerCase())
          );
          if (!hasStorage) return false;
        }

        // Price filter
        if (p.basePrice > maxPrice) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchChip = p.specs.chip.toLowerCase().includes(query);
          const matchTagline = p.tagline.toLowerCase().includes(query);
          const matchDesc = p.description.toLowerCase().includes(query);
          const matchVariants = p.variants.some(
            (v) =>
              v.storage.toLowerCase().includes(query) ||
              v.colour.toLowerCase().includes(query)
          );
          if (!matchName && !matchChip && !matchTagline && !matchDesc && !matchVariants) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // featured default
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [
    products,
    selectedCategory,
    selectedCondition,
    selectedStorage,
    onlyInStock,
    maxPrice,
    searchQuery,
    sortBy,
  ]);

  return (
    <section id="catalog" className="w-full bg-[#0A0A0A] py-16 sm:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A24A]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A24A]">
                The Hardware Inventory
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1.5">
              Curated Apple Catalog
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
              Every unit is physically inspected, diagnostic-screened, and guaranteed authentic with transparent grading.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 bg-neutral-900 border border-white/10 px-3 py-1.5 rounded-full">
              Showing <span className="text-white font-semibold">{filteredProducts.length}</span> devices
            </span>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181C] text-xs font-medium text-white border border-white/10"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A24A]" />
              Filters
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#121215] border border-white/[0.08] rounded-2xl p-4 sm:p-5 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search iPhone, M3 Max, 256GB, Titanium..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-[#C9A24A]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Condition Filters */}
            <div className="md:col-span-4 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Conditions' },
                { id: 'New', label: 'New (Sealed)' },
                { id: 'Unboxed', label: 'Unboxed' },
                { id: 'Pre-owned', label: 'Pre-Owned' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCondition(c.id)}
                  className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                    selectedCondition === c.id
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-neutral-900 text-neutral-400 border-white/5 hover:text-white hover:border-white/15'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3 flex items-center justify-end gap-2">
              <label htmlFor="catalog-sort" className="sr-only">Sort by</label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/10 text-neutral-200 text-xs font-medium focus:outline-none focus:border-[#C9A24A]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Recently Added</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter Pills (Expandable or always visible on desktop) */}
          <div className="pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-neutral-400 font-medium">Quick Storage:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedStorage('all')}
                  className={`px-2.5 py-1 rounded-lg border ${
                    selectedStorage === 'all'
                      ? 'bg-[#C9A24A]/20 border-[#C9A24A] text-[#C9A24A] font-semibold'
                      : 'bg-neutral-900 border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                {storageOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedStorage(opt)}
                    className={`px-2.5 py-1 rounded-lg border ${
                      selectedStorage === opt
                        ? 'bg-[#C9A24A]/20 border-[#C9A24A] text-[#C9A24A] font-semibold'
                        : 'bg-neutral-900 border-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* In Stock toggle */}
              <label className="flex items-center gap-2 cursor-pointer ml-2 text-neutral-300">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-white/20 bg-neutral-900 text-[#C9A24A] focus:ring-0"
                />
                <span>In-Stock Only</span>
              </label>
            </div>

            {/* Reset button if active filters */}
            {(selectedCondition !== 'all' ||
              selectedStorage !== 'all' ||
              selectedCategory !== 'all' ||
              onlyInStock ||
              searchQuery) && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#C9A24A]" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#121215] border border-white/[0.08] p-8 space-y-4">
            <SlidersHorizontal className="w-8 h-8 text-neutral-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No devices match your selected filters</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              We frequently update our inventory lot. Try resetting your filters or message us directly on WhatsApp to check unlisted incoming stock.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A24A] text-black font-semibold text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
