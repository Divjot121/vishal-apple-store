'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  ShieldCheck,
  FileCheck2,
  Headphones,
  Wrench,
  Star,
  CheckCircle2,
  Send,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function TrustSection() {
  const { reviews, submitEnquiry } = useStore();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Repair Request Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deviceModel, setDeviceModel] = useState('iPhone');
  const [issue, setIssue] = useState('');
  const [serviceMode, setServiceMode] = useState<'store_visit' | 'pickup'>('store_visit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const approvedReviews = reviews.filter((r) => r.isApproved);

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % approvedReviews.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + approvedReviews.length) % approvedReviews.length);
  };

  const handleRepairSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !issue.trim()) return;

    setIsSubmitting(true);
    try {
      await submitEnquiry({
        customerName,
        phone,
        type: 'repair_request',
        productName: deviceModel,
        message: `Repair/Service Request: ${issue} (${serviceMode === 'store_visit' ? 'In-Store Inspection' : 'Delhi NCR Doorstep Pickup'})`,
        status: 'New',
        details: { deviceModel, issue, serviceMode },
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setCustomerName('');
        setPhone('');
        setIssue('');
      }, 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="w-full bg-[#0D0D10] py-16 sm:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Why Buy From Us Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A24A]">
              The Vishal Standard
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1.5">
              Why Discerning Buyers Choose Us
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              We operate with uncompromising transparency in grading, serial verification, and after-purchase protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">100% Genuine Provenance</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every unit features an original Apple serial verifiable on the official coverage portal. Zero unbranded replacement screens or counterfeit housings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#C9A24A]/10 text-[#C9A24A] flex items-center justify-center border border-[#C9A24A]/20 mb-4">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">GST Invoice & Warranty</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Formal commercial GST tax invoice issued with every device. Brand new units carry manufacturer warranty; pre-owned include our signed 6-month store warranty.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20 mb-4">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">40-Point Diagnostics</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Display True Tone, Face ID, optical zoom autofocus, battery cycle life, speaker clarity, and motherboard integrity tested by dedicated technicians.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Free Data Migration</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Sit back at our Connaught Place store while our technicians seamlessly transfer WhatsApp chats, photos, and system files from your old Android or iPhone.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="border-t border-white/[0.08] pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-white ml-2">4.9 / 5.0 Rating</span>
                <span className="text-xs text-neutral-400">(850+ Verified Local Buyers)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Customer Testimonials
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevReview}
                className="p-2.5 rounded-full bg-[#18181D] hover:bg-neutral-800 text-white border border-white/10"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextReview}
                className="p-2.5 rounded-full bg-[#18181D] hover:bg-neutral-800 text-white border border-white/10"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl bg-[#141418] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-neutral-400">{rev.date}</span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed italic mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{rev.author}</h4>
                      <p className="text-[11px] text-neutral-400">{rev.city}</p>
                    </div>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#C9A24A] font-medium mt-1 truncate">
                    Purchased: {rev.productPurchased}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Repair & Service Request Form */}
        <div id="repair-form" className="border-t border-white/[0.08] pt-16">
          <div className="max-w-3xl mx-auto rounded-3xl bg-[#121215] border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#C9A24A] bg-[#C9A24A]/10 border border-[#C9A24A]/30 mb-2">
                <Wrench className="w-3.5 h-3.5" />
                Store Workshop
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Device Repair & Diagnostics Desk
              </h2>
              <p className="text-xs text-neutral-400 mt-1.5">
                Battery replacements, display repair, liquid recovery, or logic board diagnostics. Submit a request and receive a fast quotation.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">Repair Request Registered</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Our head hardware technician will review your device issue and WhatsApp you an estimate and turnaround timeline within 30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRepairSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="repair-cust-name" className="block text-xs font-medium text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="repair-cust-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Aman Verma"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="repair-cust-phone" className="block text-xs font-medium text-neutral-300 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="repair-cust-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="repair-device-type" className="block text-xs font-medium text-neutral-300 mb-1">
                      Device Type *
                    </label>
                    <select
                      id="repair-device-type"
                      value={deviceModel}
                      onChange={(e) => setDeviceModel(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24A]"
                    >
                      <option value="iPhone (13/14/15/16 Series)">iPhone (13 / 14 / 15 / 16)</option>
                      <option value="MacBook Pro / Air (Apple Silicon)">MacBook Pro / Air (M1/M2/M3)</option>
                      <option value="iPad (Pro / Air / mini)">iPad (Pro / Air / 10th Gen)</option>
                      <option value="Apple Watch (Ultra / Series / SE)">Apple Watch</option>
                      <option value="AirPods (Pro / Max)">AirPods (Pro / Max)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Service Preference
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setServiceMode('store_visit')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                          serviceMode === 'store_visit'
                            ? 'bg-white text-black border-white'
                            : 'bg-neutral-900 text-neutral-400 border-white/10'
                        }`}
                      >
                        Store Walk-in
                      </button>
                      <button
                        type="button"
                        onClick={() => setServiceMode('pickup')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                          serviceMode === 'pickup'
                            ? 'bg-[#C9A24A] text-black border-[#C9A24A]'
                            : 'bg-neutral-900 text-neutral-400 border-white/10'
                        }`}
                      >
                        NCR Pickup
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="repair-issue-desc" className="block text-xs font-medium text-neutral-300 mb-1">
                    Describe the Fault or Issue *
                  </label>
                  <textarea
                    id="repair-issue-desc"
                    required
                    rows={3}
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="e.g. Battery health below 78%, rapid discharge / Screen flickering after fall..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering...' : 'Submit Diagnostic Request'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
