'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import { formatINR } from '@/lib/utils';
import {
  Save,
  Check,
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function AdminQuickEdit() {
  const { products, quickUpdateProduct } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Local state for modified rows: { [variantId]: { price: number, stock: number, inStock: boolean } }
  const [edits, setEdits] = useState<
    Record<string, { price: number; stock: number; inStock: boolean }>
  >({});

  type Edit = { price: number; stock: number; inStock: boolean };
  type Variant = Product['variants'][number];

  // Unedited values come from the saved variant, so changing one field never
  // overwrites the others (previously an untouched price was saved as ₹0).
  const baseFor = (product: Product, variant: Variant): Edit =>
    edits[variant.id] || { price: variant.price, stock: variant.stock, inStock: product.inStock && variant.stock > 0 };

  const handlePriceChange = (product: Product, variant: Variant, newPrice: number) => {
    setEdits((prev) => ({ ...prev, [variant.id]: { ...baseFor(product, variant), price: newPrice } }));
  };

  const handleStockChange = (product: Product, variant: Variant, newStock: number) => {
    const stock = Math.max(0, Math.round(newStock) || 0);
    setEdits((prev) => ({ ...prev, [variant.id]: { ...baseFor(product, variant), stock, inStock: stock > 0 } }));
  };

  const handleToggleStock = (product: Product, variant: Variant) => {
    const base = baseFor(product, variant);
    const inStock = !base.inStock;
    setEdits((prev) => ({
      ...prev,
      [variant.id]: { ...base, inStock, stock: inStock ? (base.stock > 0 ? base.stock : 1) : 0 },
    }));
  };

  const handleSaveRow = async (product: Product, variantId: string) => {
    const edit = edits[variantId];
    if (!edit) return;

    setSavingId(variantId);
    try {
      await quickUpdateProduct(product.id, variantId, {
        price: edit.price,
        stock: edit.stock,
        inStock: edit.inStock,
      });

      setEdits((prev) => {
        const next = { ...prev };
        delete next[variantId];
        return next;
      });
      setSuccessMessage(`Saved ${product.name}. It's live on the storefront.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  // Filtered list
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.condition.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#141418] border border-white/[0.08]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24A]">
            Direct Storefront sync
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Quick Edit Prices & Inventory
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Instantly adjust retail selling price, unit quantity, or mark items out of stock. Changes take effect on the storefront immediately without a page reload.
          </p>
        </div>

        {successMessage && (
          <div role="status" className="fixed inset-x-4 bottom-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#10241a] border border-emerald-500/40 text-emerald-300 text-sm font-semibold shadow-2xl sm:static sm:inset-auto sm:z-auto sm:py-2 sm:bg-emerald-500/15 sm:text-emerald-400 sm:text-xs sm:shadow-none">
            <Check className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-xl bg-[#141418] border border-white/[0.08] flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search device name..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A24A]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'iPhone', 'Mac', 'iPad', 'AirPods', 'Watch', 'Accessories'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-black'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat === 'all' ? 'All Hardware' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Phones: one card per product, big controls per variant */}
      <ul className="space-y-3 md:hidden">
        {filteredProducts.map((product) => (
          <li key={product.id} className="rounded-2xl bg-[#141418] border border-white/[0.08] overflow-hidden">
            <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3 border-b border-white/[0.06]">
              <div className="min-w-0">
                <p className="text-base font-bold text-white leading-snug">{product.name}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{product.category} · {product.condition}</p>
              </div>
              <span className="shrink-0 text-xs text-neutral-400">{product.variants.length} {product.variants.length === 1 ? 'variant' : 'variants'}</span>
            </div>
            <div className="divide-y divide-white/[0.06]">
              {product.variants.map((variant) => {
                const edit = edits[variant.id];
                const cur = baseFor(product, variant);
                const saving = savingId === variant.id;
                const label = [variant.storage, variant.colour].filter((x) => x && x !== 'Standard').join(' · ') || 'Standard';
                return (
                  <div key={variant.id} className={`p-4 space-y-3 ${edit ? 'bg-[#C9A24A]/[0.06]' : ''}`}>
                    <p className="text-sm font-semibold text-neutral-100">{label}</p>
                    <div className="grid grid-cols-[1fr_6rem] gap-3">
                      <label className="block">
                        <span className="block text-xs text-neutral-400 mb-1">Price (₹)</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          step="100"
                          value={cur.price}
                          onChange={(e) => handlePriceChange(product, variant, Number(e.target.value))}
                          className="w-full min-h-[44px] px-3 rounded-lg bg-neutral-900 border border-white/15 text-white font-bold text-base focus:border-[#C9A24A] focus:outline-none"
                        />
                      </label>
                      <label className="block">
                        <span className="block text-xs text-neutral-400 mb-1">Stock</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          value={cur.stock}
                          onChange={(e) => handleStockChange(product, variant, Number(e.target.value))}
                          className="w-full min-h-[44px] px-3 rounded-lg bg-neutral-900 border border-white/15 text-white font-bold text-base focus:border-[#C9A24A] focus:outline-none"
                        />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={cur.inStock}
                        onClick={() => handleToggleStock(product, variant)}
                        className={`min-h-[44px] rounded-lg text-sm font-semibold border transition-colors ${
                          cur.inStock
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {cur.inStock ? 'In stock' : 'Out of stock'}
                      </button>
                      <button
                        type="button"
                        disabled={!edit || saving}
                        onClick={() => handleSaveRow(product, variant.id)}
                        className={`min-h-[44px] rounded-lg text-sm font-bold inline-flex items-center justify-center gap-1.5 transition-colors ${
                          edit ? 'bg-[#C9A24A] text-black' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        }`}
                      >
                        <Save className="w-4 h-4" aria-hidden />
                        {saving ? 'Saving…' : edit ? 'Save' : 'Saved'}
                      </button>
                    </div>
                    {edit && (
                      <p className="text-xs text-neutral-400">
                        Was {formatINR(variant.price)} · {variant.stock} in stock
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </li>
        ))}
        {filteredProducts.length === 0 && (
          <li className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-neutral-400">No devices match that search.</li>
        )}
      </ul>

      {/* Tablet and desktop: table */}
      <div className="hidden md:block rounded-2xl bg-[#141418] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#18181E] text-neutral-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Device & Line</th>
                <th className="py-3.5 px-4">Condition</th>
                <th className="py-3.5 px-4">Variant (Storage/Colour)</th>
                <th className="py-3.5 px-4">Store Price (₹)</th>
                <th className="py-3.5 px-4">Stock Qty</th>
                <th className="py-3.5 px-4">Store Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredProducts.map((product) => {
                return product.variants.map((variant, vIdx) => {
                  const currentEdit = edits[variant.id];
                  const activePrice = currentEdit ? currentEdit.price : variant.price;
                  const activeStock = currentEdit ? currentEdit.stock : variant.stock;
                  const activeInStock = currentEdit
                    ? currentEdit.inStock
                    : product.inStock && activeStock > 0;
                  const isModified = currentEdit !== undefined;

                  return (
                    <tr
                      key={variant.id}
                      className={`hover:bg-neutral-900/40 transition-colors ${
                        isModified ? 'bg-[#C9A24A]/5' : ''
                      }`}
                    >
                      {/* Product Name */}
                      <td className="py-3 px-4 font-bold text-white">
                        {vIdx === 0 ? (
                          <div>
                            <p className="text-sm font-bold text-white">{product.name}</p>
                            <span className="text-[10px] text-neutral-400 font-normal">
                              {product.category}
                            </span>
                          </div>
                        ) : (
                          <span className="text-neutral-500 pl-2">↳ Variant {vIdx + 1}</span>
                        )}
                      </td>

                      {/* Condition */}
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            product.condition === 'New'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : product.condition === 'Unboxed'
                              ? 'bg-[#C9A24A]/10 text-[#C9A24A] border-[#C9A24A]/30'
                              : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                          }`}
                        >
                          {product.condition}
                        </span>
                      </td>

                      {/* Variant Spec */}
                      <td className="py-3 px-4 text-neutral-200">
                        <span className="font-semibold text-white">{variant.storage}</span>
                        <span className="text-neutral-400 ml-1.5 font-normal">
                          · {variant.colour}
                        </span>
                      </td>

                      {/* Price Input */}
                      <td className="py-3 px-4">
                        <div className="relative w-32">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
                            ₹
                          </span>
                          <input
                            type="number"
                            step="100"
                            value={activePrice}
                            onChange={(e) => handlePriceChange(product, variant, Number(e.target.value))}
                            aria-label={`Price for ${product.name} ${variant.storage} ${variant.colour}`}
                            className="w-full pl-6 pr-2 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-white font-bold text-xs focus:border-[#C9A24A] focus:outline-none"
                          />
                        </div>
                      </td>

                      {/* Stock Quantity */}
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          value={activeStock}
                          onChange={(e) => handleStockChange(product, variant, Number(e.target.value))}
                          aria-label={`Stock for ${product.name} ${variant.storage} ${variant.colour}`}
                          className="w-20 px-2 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-white font-bold text-xs focus:border-[#C9A24A] focus:outline-none"
                        />
                      </td>

                      {/* In-Stock Status Toggle */}
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStock(product, variant)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            activeInStock
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {activeInStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>

                      {/* Save Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          disabled={!isModified || savingId === variant.id}
                          onClick={() => handleSaveRow(product, variant.id)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs inline-flex items-center gap-1.5 transition-all ${
                            isModified
                              ? 'bg-[#C9A24A] hover:bg-[#b8913d] text-black shadow-md cursor-pointer'
                              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-60'
                          }`}
                        >
                          {savingId === variant.id ? (
                            <span>Saving...</span>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              <span>Save</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
