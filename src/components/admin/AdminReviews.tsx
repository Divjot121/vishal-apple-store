'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Review } from '@/types';
import { reviewRepository } from '@/lib/repository';
import {
  Star,
  Plus,
  Trash2,
  Check,
  Eye,
  EyeOff,
  X,
  MessageSquare,
} from 'lucide-react';

export default function AdminReviews() {
  const { reviews, refreshData } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form state
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('Amritsar');
  const [rating, setRating] = useState(5);
  const [productPurchased, setProductPurchased] = useState('iPhone 16 Pro');
  const [comment, setComment] = useState('');

  const handleToggleApproval = async (id: string) => {
    await reviewRepository.toggleApproval(id);
    await refreshData();
    setFeedback('Review visibility status updated!');
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleDeleteReview = async (id: string) => {
    if (confirm('Delete this customer review?')) {
      await reviewRepository.delete(id);
      await refreshData();
      setFeedback('Review deleted');
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    try {
      await reviewRepository.create({
        author,
        city,
        rating,
        productPurchased,
        comment,
        verifiedPurchase: true,
        isApproved: true,
      });

      await refreshData();
      setModalOpen(false);
      setFeedback('New customer review added!');
      setAuthor('');
      setComment('');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#141418] border border-white/[0.08]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24A]">
            Social Proof & Trust
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Customer Reviews Manager
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Approve, feature, or add verified buyer ratings displayed on the public storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-xs flex items-center gap-2 transition-colors shrink-0 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer Review</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className={`p-6 rounded-2xl bg-[#141418] border transition-all flex flex-col justify-between ${
              rev.isApproved
                ? 'border-white/[0.08]'
                : 'border-rose-500/30 opacity-60 bg-neutral-900/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    rev.isApproved
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}
                >
                  {rev.isApproved ? 'Approved & Visible' : 'Hidden'}
                </span>
              </div>

              <p className="text-xs text-neutral-300 italic mb-4 leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{rev.author}</p>
                <p className="text-[10px] text-neutral-400">{rev.city} · {rev.productPurchased}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggleApproval(rev.id)}
                  className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
                  title={rev.isApproved ? 'Hide review' : 'Approve review'}
                >
                  {rev.isApproved ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteReview(rev.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                  title="Delete review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
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

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24A]">
                  New Customer Feedback
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Add Verified Review
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Ananya Sen"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Ranjit Avenue, Amritsar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Product Purchased
                  </label>
                  <input
                    type="text"
                    value={productPurchased}
                    onChange={(e) => setProductPurchased(e.target.value)}
                    placeholder="e.g. iPhone 16 Pro 256GB"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Customer Comment *
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Paste verified customer review text..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                />
              </div>

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
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
