'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { settingsRepository } from '@/lib/repository';
import {
  Settings,
  Save,
  Check,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldAlert,
} from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function AdminSettings() {
  const { settings, refreshData } = useStore();
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State initialized with current settings
  const [storeName, setStoreName] = useState(settings.storeName);
  const [phone, setPhone] = useState(settings.phone);
  const [phoneRaw, setPhoneRaw] = useState(settings.phoneRaw);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [whatsappRaw, setWhatsappRaw] = useState(settings.whatsappRaw);
  const [email, setEmail] = useState(settings.email);

  // Address
  const [shopNo, setShopNo] = useState(settings.address.shopNo);
  const [building, setBuilding] = useState(settings.address.building);
  const [area, setArea] = useState(settings.address.area);
  const [city, setCity] = useState(settings.address.city);
  const [pincode, setPincode] = useState(settings.address.pincode);
  const [landmark, setLandmark] = useState(settings.address.landmark);

  // Timings
  const [weekdays, setWeekdays] = useState(settings.timings.weekdays);
  const [sunday, setSunday] = useState(settings.timings.sunday);
  const [timingNote, setTimingNote] = useState(settings.timings.note);

  // Socials
  const [instagramHandle, setInstagramHandle] = useState(settings.socials.instagramHandle);
  const [instagramUrl, setInstagramUrl] = useState(settings.socials.instagramUrl);
  const [googleMapsDirectionsUrl, setGoogleMapsDirectionsUrl] = useState(
    settings.socials.googleMapsDirectionsUrl
  );
  const [gstNumber, setGstNumber] = useState(settings.brand.gstNumber);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await settingsRepository.update({
        storeName,
        phone,
        phoneRaw,
        whatsapp,
        whatsappRaw,
        email,
        address: {
          shopNo,
          building,
          area,
          city,
          state: 'Punjab',
          pincode,
          landmark,
          fullFormatted: `${shopNo}, ${building}, ${area}, ${city} - ${pincode}`,
        },
        timings: {
          weekdays,
          sunday,
          note: timingNote,
        },
        socials: {
          ...settings.socials,
          instagramHandle,
          instagramUrl,
          googleMapsDirectionsUrl,
        },
        brand: {
          ...settings.brand,
          gstNumber,
        },
      });

      await refreshData();
      setFeedback('Store settings updated! Changes are live across storefront.');
      setTimeout(() => setFeedback(null), 3500);
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
            Store Profile & Configuration
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Store Contact & Address Details
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Update store contact numbers, Ranjit Avenue Amritsar shop address, operating hours, and social handles without editing source code.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Contact Channels */}
        <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Phone className="w-4 h-4 text-[#C9A24A]" />
            <h3 className="text-sm font-bold text-white">Direct Communication Channels</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Store Phone Display
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Dialable Phone Raw (with +91)
              </label>
              <input
                type="text"
                value={phoneRaw}
                onChange={(e) => setPhoneRaw(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                WhatsApp Chat Number (Digits with country code)
              </label>
              <input
                type="text"
                value={whatsappRaw}
                onChange={(e) => setWhatsappRaw(e.target.value)}
                placeholder="e.g. 919876543210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Official Support Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                GST Tax Registration Number
              </label>
              <input
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Storefront Address */}
        <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <MapPin className="w-4 h-4 text-[#C9A24A]" />
            <h3 className="text-sm font-bold text-white">Physical Location & Landmark</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Shop No / Floor
              </label>
              <input
                type="text"
                value={shopNo}
                onChange={(e) => setShopNo(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Building Name
              </label>
              <input
                type="text"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Area / Colony
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                City & State
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Pincode
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Nearby Landmark
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Operating Hours */}
        <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Clock className="w-4 h-4 text-[#C9A24A]" />
            <h3 className="text-sm font-bold text-white">Opening & Closing Hours</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Weekday Timings
              </label>
              <input
                type="text"
                value={weekdays}
                onChange={(e) => setWeekdays(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Sunday Timings
              </label>
              <input
                type="text"
                value={sunday}
                onChange={(e) => setSunday(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Store Walk-in Note
              </label>
              <input
                type="text"
                value={timingNote}
                onChange={(e) => setTimingNote(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Socials & Google Maps Link */}
        <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <InstagramIcon className="w-4 h-4 text-[#C9A24A]" />
            <h3 className="text-sm font-bold text-white">Socials & Navigation Links</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Instagram Handle
              </label>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Google Maps Navigation URL
              </label>
              <input
                type="text"
                value={googleMapsDirectionsUrl}
                onChange={(e) => setGoogleMapsDirectionsUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-bold text-sm transition-all shadow-xl flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
