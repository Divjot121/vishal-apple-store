'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink } from '@/lib/utils';
import { Phone, MessageCircle, Send, X, Check } from 'lucide-react';

export default function MobileBottomBar() {
  const { settings, submitEnquiry } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deviceInterest, setDeviceInterest] = useState('');
  const [message, setMessage] = useState('');

  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    'Hi Vishal Apple Store, I am inquiring from your website about current device pricing and in-store availability.'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      await submitEnquiry({
        customerName: name,
        phone,
        type: 'general',
        productName: deviceInterest || 'General Inquiry',
        message: message || `Inquiring about ${deviceInterest || 'Apple devices'}`,
        status: 'New',
        details: { source: 'Mobile Quick Bar' },
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setModalOpen(false);
        setName('');
        setPhone('');
        setDeviceInterest('');
        setMessage('');
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Sticky Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0D0D10]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2.5 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* Call CTA */}
          <a
            href={`tel:${settings.phoneRaw}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-neutral-900 border border-white/[0.08] text-neutral-200 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-[#C9A24A] mb-0.5" />
            <span className="text-[11px] font-medium tracking-tight">Call Store</span>
          </a>

          {/* WhatsApp CTA */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-emerald-300 active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] mb-0.5" />
            <span className="text-[11px] font-semibold tracking-tight">WhatsApp</span>
          </a>

          {/* Enquire CTA */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#C9A24A] text-black font-semibold active:scale-95 transition-transform shadow-md"
          >
            <Send className="w-4 h-4 text-black mb-0.5" />
            <span className="text-[11px] tracking-tight">Enquire</span>
          </button>
        </div>
      </div>

      {/* Quick Enquire Modal (Accessible Native Dialog per modern-web-guidance) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-lg bg-[#141417] border border-white/10 rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800/60"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#C9A24A] bg-[#C9A24A]/10 rounded-full border border-[#C9A24A]/20 mb-2">
                Fast In-Store Response
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Quick Device Enquiry
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Drop your details and our Amritsar store specialist will WhatsApp or call you within 15 minutes.
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-white">Enquiry Received!</h4>
                <p className="text-xs text-neutral-400">
                  Our team is checking live store inventory. We will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:border-[#C9A24A] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-medium text-neutral-300 mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:border-[#C9A24A] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="modal-device" className="block text-xs font-medium text-neutral-300 mb-1">
                    Device You Are Interested In
                  </label>
                  <input
                    id="modal-device"
                    type="text"
                    value={deviceInterest}
                    onChange={(e) => setDeviceInterest(e.target.value)}
                    placeholder="e.g. iPhone 16 Pro Natural Titanium or Pre-owned Mac"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:border-[#C9A24A] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="modal-msg" className="block text-xs font-medium text-neutral-300 mb-1">
                    Optional Query or Trade-In details
                  </label>
                  <textarea
                    id="modal-msg"
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Looking for 256GB sealed pack / Want to exchange iPhone 13"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:border-[#C9A24A] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="w-1/3 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-sm font-medium hover:bg-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 py-2.5 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send to Store Specialist'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
