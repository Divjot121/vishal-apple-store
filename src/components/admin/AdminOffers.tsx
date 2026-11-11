'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Offer } from '@/types';
import { offerRepository } from '@/lib/repository';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ToggleLeft,
  ToggleRight,
  Tag,
} from 'lucide-react';

export default function AdminOffers() {
  const { offers, refreshData } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [badge, setBadge] = useState('Bank Offer');
  const [discountText, setDiscountText] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [validTill, setValidTill] = useState('Valid till 30 Nov 2026');
  const [isActive, setIsActive] = useState(true);

  const openAddModal = () => {
    setEditingOffer(null);
    setTitle('');
    setBadge('Bank Offer');
    setDiscountText('Up to ₹5,000 Off');
    setCode('VAS5000');
    setDescription('Instant discount on select credit cards or exchange.');
    setValidTill('Valid till 30 Nov 2026');
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (offer: Offer) => {
    setEditingOffer(offer);
    setTitle(offer.title);
    setBadge(offer.badge);
    setDiscountText(offer.discountText);
    setCode(offer.code || '');
    setDescription(offer.description);
    setValidTill(offer.validTill);
    setIsActive(offer.isActive);
    setModalOpen(true);
  };

  const handleToggleOffer = async (offer: Offer) => {
    await offerRepository.update(offer.id, { isActive: !offer.isActive });
    await refreshData();
  };

  const handleDeleteOffer = async (id: string, offerTitle: string) => {
    if (confirm(`Delete offer "${offerTitle}"?`)) {
      await offerRepository.delete(id);
      await refreshData();
      setFeedback(`Deleted offer "${offerTitle}"`);
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !discountText.trim()) return;

    try {
      if (editingOffer) {
        await offerRepository.update(editingOffer.id, {
          title,
          badge,
          discountText,
          code: code.trim() || undefined,
          description,
          validTill,
          isActive,
        });
        setFeedback('Offer updated successfully!');
      } else {
        await offerRepository.create({
          title,
          badge,
          discountText,
          code: code.trim() || undefined,
          description,
          validTill,
          isActive,
        });
        setFeedback('New offer published on homepage!');
      }

      await refreshData();
      setModalOpen(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#141418] border border-white/[0.08]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24A]">
            Promotions & Campaigns
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Store Offers & Banners Manager
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Create limited-stock flash deals, bank cashback partnerships, or exchange bonus tags displayed on the storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-xs flex items-center gap-2 transition-colors shrink-0 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`p-6 rounded-2xl bg-[#141418] border transition-all flex flex-col justify-between ${
              offer.isActive
                ? 'border-white/[0.08] hover:border-white/20'
                : 'border-white/5 opacity-60 bg-neutral-900/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9A24A]/15 text-[#C9A24A] border border-[#C9A24A]/30">
                  {offer.badge}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleOffer(offer)}
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                    offer.isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-neutral-800 text-neutral-400 border-white/10'
                  }`}
                >
                  {offer.isActive ? 'Active on Store' : 'Draft / Paused'}
                </button>
              </div>

              <p className="text-xl font-bold text-white tracking-tight mb-1">
                {offer.discountText}
              </p>
              <h3 className="text-sm font-semibold text-neutral-200 mb-2 leading-snug">
                {offer.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {offer.description}
              </p>

              {offer.code && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black border border-white/10 text-xs font-mono font-bold text-[#C9A24A] mb-3">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{offer.code}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[11px] text-neutral-400">{offer.validTill}</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(offer)}
                  className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
                  title="Edit Offer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteOffer(offer.id, offer.title)}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                  title="Delete Offer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Offer Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-lg bg-[#141418] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <form onSubmit={handleSaveOffer} className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24A]">
                  {editingOffer ? 'Modify Promotion' : 'New Campaign Offer'}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {editingOffer ? 'Edit Store Offer' : 'Create Store Offer'}
                </h3>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Offer Headline *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Instant HDFC & ICICI Bank Card Cashback"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Badge Type
                  </label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                  >
                    <option value="Bank Offer">Bank Offer</option>
                    <option value="Exchange Bonus">Exchange Bonus</option>
                    <option value="Combo Deal">Combo Deal</option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Festive Drop">Festive Drop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Discount Highlight *
                  </label>
                  <input
                    type="text"
                    required
                    value={discountText}
                    onChange={(e) => setDiscountText(e.target.value)}
                    placeholder="e.g. Up to ₹6,000 Off"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. VASBANK6K"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Validity Text
                  </label>
                  <input
                    type="text"
                    value={validTill}
                    onChange={(e) => setValidTill(e.target.value)}
                    placeholder="e.g. Valid till 30 Nov 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Terms & Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details of eligible cards, models, and exchange terms..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300 pt-1">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-white/20 bg-neutral-900 text-[#C9A24A]"
                />
                <span>Active on Public Storefront immediately</span>
              </label>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-bold text-xs shadow-lg"
                >
                  {editingOffer ? 'Save Changes' : 'Publish Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
