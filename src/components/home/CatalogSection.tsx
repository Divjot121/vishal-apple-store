'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/store/ProductCard';
import { buildWhatsAppLink, cn } from '@/lib/utils';
import { totalStock } from '@/lib/catalog';
import type { Category } from '@/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface CatalogSectionProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CATEGORIES: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'iPhone', label: 'iPhone' },
  { id: 'Mac', label: 'Mac' },
  { id: 'iPad', label: 'iPad' },
  { id: 'Watch', label: 'Watch' },
  { id: 'AirPods', label: 'AirPods' },
  { id: 'Accessories', label: 'Accessories' },
];

const INITIAL_COUNT = 8;
type Sort = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export default function CatalogSection({ selectedCategory, onSelectCategory }: CatalogSectionProps) {
  const { products, settings } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<Sort>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visible = useMemo(() => products.filter((p) => p.isVisible), [products]);

  const countFor = (cat: string) =>
    cat === 'all' ? visible.length : visible.filter((p) => p.category === cat).length;

  const extraFilters =
    (selectedCondition !== 'all' ? 1 : 0) + (selectedStorage !== 'all' ? 1 : 0) + (onlyInStock ? 1 : 0);
  const anyFilter = extraFilters > 0 || selectedCategory !== 'all' || searchQuery.trim() !== '';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCondition('all');
    setSelectedStorage('all');
    setOnlyInStock(false);
    setSortBy('featured');
    onSelectCategory('all');
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return visible
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedCondition !== 'all' && p.condition !== selectedCondition) return false;
        if (onlyInStock && (!p.inStock || totalStock(p) === 0)) return false;
        if (selectedStorage !== 'all' && !p.variants.some((v) => v.storage.toLowerCase().includes(selectedStorage.toLowerCase())))
          return false;
        if (q) {
          const hay = [p.name, p.category, p.specs.chip, p.tagline, ...p.variants.flatMap((v) => [v.storage, v.colour])]
            .join(' ')
            .toLowerCase();
          if (!q.split(/\s+/).every((word) => hay.includes(word))) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return Number(b.isFeatured) - Number(a.isFeatured);
      });
  }, [visible, selectedCategory, selectedCondition, selectedStorage, onlyInStock, searchQuery, sortBy]);

  const shown = showAll || anyFilter ? filteredProducts : filteredProducts.slice(0, INITIAL_COUNT);
  const hiddenCount = filteredProducts.length - shown.length;

  const askHref = buildWhatsAppLink(
    settings.whatsappRaw,
    `Hi, I couldn't find ${searchQuery.trim() ? `"${searchQuery.trim()}"` : 'what I need'} on your website. Do you have it or can you get it?`
  );

  return (
    <section id="catalog" className="section" aria-labelledby="catalog-title">
      <div className="wrap">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-prose">
            <p className="eyebrow">Stock list · prices include GST</p>
            <h2 id="catalog-title" className="mt-3 text-title">
              What&rsquo;s on the shelf
            </h2>
            <p className="mt-3 text-ink-2">
              Stock changes every day. If you don&rsquo;t see the model or colour you want, message us; we can
              usually get it in two or three days.
            </p>
          </div>
          <p className="shrink-0 whitespace-nowrap text-small text-ink-3" aria-live="polite">
            Showing {filteredProducts.length} of {visible.length}
          </p>
        </div>

        {/* Category tabs */}
        <div className="-mx-4 mt-8 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:px-0">
          <div role="group" aria-label="Category" className="flex w-max gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="chip"
                aria-pressed={selectedCategory === cat.id}
                onClick={() => onSelectCategory(cat.id)}
              >
                {cat.label}
                <span className="tabular text-caption opacity-60">{countFor(cat.id)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search + filters */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
          <div className="flex gap-2 md:flex-1">
            <div className="relative flex-1 md:max-w-sm">
              <label htmlFor="catalog-search" className="sr-only">
                Search the stock list
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" aria-hidden />
              <input
                id="catalog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search: 15 Pro, 256GB, Midnight…"
                className="field rounded-full pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-ink-3 hover:text-ink"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
              aria-controls="catalog-filters"
              className="chip shrink-0 md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              Filters{extraFilters > 0 && ` (${extraFilters})`}
            </button>
          </div>

          <div
            id="catalog-filters"
            className={cn(
              'grid grid-cols-2 gap-2 rounded-card border border-line bg-surface p-3 md:flex md:items-center md:border-0 md:bg-transparent md:p-0',
              !filtersOpen && 'hidden md:flex'
            )}
          >
            <div>
              <label htmlFor="f-condition" className="sr-only">Condition</label>
              <select id="f-condition" value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)} className="field rounded-full py-2 pr-8 text-small md:w-auto">
                <option value="all">Any condition</option>
                <option value="New">Sealed</option>
                <option value="Unboxed">Open box</option>
                <option value="Pre-owned">Pre-owned</option>
              </select>
            </div>
            <div>
              <label htmlFor="f-storage" className="sr-only">Storage</label>
              <select id="f-storage" value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)} className="field rounded-full py-2 pr-8 text-small md:w-auto">
                <option value="all">Any storage</option>
                {['64GB', '128GB', '256GB', '512GB', '1TB'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-sort" className="sr-only">Sort by</label>
              <select id="f-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value as Sort)} className="field rounded-full py-2 pr-8 text-small md:w-auto">
                <option value="featured">Shop picks first</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="newest">Newest in</option>
              </select>
            </div>
            <label className="chip cursor-pointer has-[:checked]:border-ink has-[:checked]:text-ink">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="h-4 w-4 accent-[rgb(var(--ink))]"
              />
              In stock only
            </label>
          </div>

          {anyFilter && (
            <button type="button" onClick={resetFilters} className="self-start text-small font-medium text-ink underline underline-offset-4 hover:no-underline md:self-center">
              Clear all
            </button>
          )}
        </div>

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-8 rounded-card border border-dashed border-line-strong px-6 py-14 text-center">
            <h3 className="text-subtitle">Nothing matches those filters</h3>
            <p className="mx-auto mt-2 max-w-prose text-ink-2">
              It may still be in the back or on its way. Ask us and we&rsquo;ll check.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={askHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Ask on WhatsApp
              </a>
              <button type="button" onClick={resetFilters} className="btn-quiet">
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {shown.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
            {hiddenCount > 0 && (
              <div className="mt-8 flex justify-center">
                <button type="button" onClick={() => setShowAll(true)} className="btn-quiet px-6">
                  Show all {filteredProducts.length} devices
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
