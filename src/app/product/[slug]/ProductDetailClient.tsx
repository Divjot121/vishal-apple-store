'use client';

import React, { useState, useMemo, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { formatINR, buildWhatsAppLink } from '@/lib/utils';
import {
  ShieldCheck,
  BatteryMedium,
  Check,
  Scale,
  MessageCircle,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Sparkles,
  ChevronRight,
  X,
  FileCheck2,
} from 'lucide-react';
import ProductCard from '@/components/store/ProductCard';

export default function ProductDetailClient({ slug }: { slug: string }) {
  const { products, settings, isInCompare, addToCompare, removeFromCompare, submitEnquiry } = useStore();

  // Find product by slug
  const product = useMemo(() => {
    return products.find((p) => p.slug.toLowerCase() === slug?.toLowerCase());
  }, [products, slug]);

  // Variant Selection State
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [selectedColour, setSelectedColour] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Reservation Modal State
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('4:00 PM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState<string | null>(null);

  // Initialize selected variant
  const initialVariant = product?.variants[0];
  const currentStorage = selectedStorage || initialVariant?.storage || '';
  const currentColour = selectedColour || initialVariant?.colour || '';

  // Find exact matching variant
  const currentVariant = useMemo(() => {
    if (!product) return null;
    return (
      product.variants.find(
        (v) => v.storage === currentStorage && v.colour === currentColour
      ) ||
      product.variants.find((v) => v.storage === currentStorage) ||
      product.variants[0]
    );
  }, [product, currentStorage, currentColour]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Device Not Found</h2>
        <p className="text-sm text-neutral-400">
          The requested device lot may have been sold or moved in inventory.
        </p>
        <Link
          href="/#catalog"
          className="px-6 py-2.5 rounded-full bg-[#C9A24A] text-black font-semibold text-xs"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const price = currentVariant ? currentVariant.price : product.basePrice;
  const mrp = currentVariant ? currentVariant.mrp : product.mrp;
  const savings = mrp > price ? mrp - price : 0;
  const inStock = (currentVariant?.stock || 0) > 0 && product.inStock;
  const compared = isInCompare(product.id);

  // Distinct storages and colours for selectors
  const uniqueStorages = Array.from(new Set(product.variants.map((v) => v.storage)));
  const uniqueColours = Array.from(new Set(product.variants.map((v) => v.colour)));

  // WhatsApp Pre-filled message per requirements:
  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    `Hi Vishal Apple Store, I am interested in purchasing ${product.name} (${currentVariant?.storage || 'Standard'}, ${currentVariant?.colour || 'Standard'}) listed for ${formatINR(price)} in ${product.condition} condition. Is it available in store today?`
  );

  // Handle Reservation
  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    setIsSubmitting(true);
    const code = `RES-${Math.floor(100000 + Math.random() * 900000)}`;
    try {
      await submitEnquiry({
        customerName,
        phone: customerPhone,
        type: 'product_reserve',
        productId: product.id,
        productName: product.name,
        variantDetails: `${currentVariant?.storage} - ${currentVariant?.colour}`,
        quotedPrice: price,
        message: `Customer reserved ${product.name} (${currentVariant?.storage}, ${currentVariant?.colour}) for store visit on ${visitDate || 'Today'} at ${visitTime}. Hold reference: ${code}.`,
        status: 'New',
        details: { reservationCode: code, visitDate, visitTime },
      });
      setReservationSuccess(code);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Related devices in same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-6 pb-24">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
          <span>/</span>
          <Link href="/#catalog" className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-neutral-200 truncate font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery & Previews */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Visual Stage */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#121215] border border-white/[0.08] rounded-3xl p-8 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#C9A24A]/5 via-transparent to-black/60 pointer-events-none" />

              {/* Badges on stage */}
              <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    product.condition === 'New'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : product.condition === 'Unboxed'
                      ? 'bg-[#C9A24A]/15 text-[#C9A24A] border-[#C9A24A]/40'
                      : 'bg-sky-500/15 text-sky-400 border-sky-500/30'
                  }`}
                >
                  {product.condition === 'New' ? 'Brand New Sealed' : product.condition}
                </span>

                {product.isVerified && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24A]" />
                    <span>40-Point Screened</span>
                  </span>
                )}
              </div>

              {/* Main Device Vector Image */}
              <div className="relative w-full h-full max-h-[420px] transition-transform duration-500 group-hover:scale-[1.03]">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                />
              </div>
            </div>

            {/* Condition & Diagnostic Inspection Report Accordion */}
            {product.gradingReport && (
              <div className="rounded-2xl bg-[#141418] border border-white/[0.08] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#C9A24A]" />
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Vishal Store Grading & Diagnostics Report
                    </h3>
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    Inspected: {product.gradingReport.inspectionDate || 'Recent lot'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/[0.04]">
                    <span className="text-neutral-400 block text-[11px]">Battery Capacity</span>
                    <span className="text-sm font-bold text-[#C9A24A] mt-0.5 block">
                      {product.gradingReport.batteryHealth}% Max Health
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/[0.04]">
                    <span className="text-neutral-400 block text-[11px]">Cosmetic Rating</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">
                      {product.gradingReport.cosmeticScore}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/[0.04] col-span-2 sm:col-span-1">
                    <span className="text-neutral-400 block text-[11px]">Store Warranty</span>
                    <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
                      {product.specs.warranty}
                    </span>
                  </div>
                </div>

                {product.gradingReport.accessoriesIncluded && (
                  <div className="text-xs text-neutral-300 pt-1">
                    <span className="text-neutral-400 font-medium block mb-1">
                      Box & Accessories Included:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.gradingReport.accessoriesIncluded.map((acc, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-200 border border-white/[0.06] text-[11px]"
                        >
                          ✓ {acc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Configuration, Pricing & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Tagline */}
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A24A] mb-1">
                {product.deviceModel}
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-[#141418] border border-white/[0.08] space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {formatINR(price)}
                </span>
                {mrp > price && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatINR(mrp)}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                {savings > 0 ? (
                  <span className="font-semibold text-emerald-400">
                    Net Savings: {formatINR(savings)} off retail MRP
                  </span>
                ) : (
                  <span className="text-neutral-400">Inclusive of all applicable GST</span>
                )}

                <span
                  className={`font-semibold ${
                    inStock ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {inStock ? `● In Stock (${currentVariant?.stock} units available)` : '● Currently Reserved'}
                </span>
              </div>
            </div>

            {/* Variant 1: Storage Selector */}
            {uniqueStorages.length > 0 && uniqueStorages[0] !== 'Standard' && (
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Select Storage Capacity
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {uniqueStorages.map((storage) => {
                    const isSelected = currentStorage === storage;
                    const matchVar = product.variants.find((v) => v.storage === storage);

                    return (
                      <button
                        key={storage}
                        type="button"
                        onClick={() => setSelectedStorage(storage)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-lg'
                            : 'bg-[#141417] text-neutral-300 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <p className="text-xs font-bold">{storage}</p>
                        {matchVar && (
                          <p
                            className={`text-[10px] mt-0.5 ${
                              isSelected ? 'text-neutral-700' : 'text-neutral-400'
                            }`}
                          >
                            {formatINR(matchVar.price)}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Variant 2: Colour Selector */}
            {uniqueColours.length > 0 && uniqueColours[0] !== 'Standard' && (
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Select Finish / Colour:{' '}
                  <span className="text-[#C9A24A] font-bold ml-1">{currentColour}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {uniqueColours.map((colour) => {
                    const isSelected = currentColour === colour;
                    const variantObj = product.variants.find((v) => v.colour === colour);
                    const hex = variantObj?.colorHex || '#555';

                    return (
                      <button
                        key={colour}
                        type="button"
                        onClick={() => setSelectedColour(colour)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#1C1C22] border-[#C9A24A] text-white shadow-sm'
                            : 'bg-[#141417] border-white/10 text-neutral-300 hover:border-white/25'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                          style={{ backgroundColor: hex }}
                        />
                        <span>{colour}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* WhatsApp Enquire CTA (Pre-filled with device details) */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-bold text-sm transition-all duration-200 shadow-xl active:scale-95 group"
              >
                <MessageCircle className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                <span>Enquire on WhatsApp</span>
              </a>

              {/* Reserve / Visit Store Modal Trigger */}
              <button
                type="button"
                onClick={() => setReserveModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#16161A] hover:bg-[#202026] text-white font-semibold text-xs border border-white/10 hover:border-white/20 transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#C9A24A]" />
                <span>Reserve for Store Inspection</span>
              </button>

              {/* Compare Button */}
              <button
                type="button"
                onClick={() => {
                  if (compared) {
                    removeFromCompare(product.id);
                  } else {
                    addToCompare(product);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-transparent hover:bg-neutral-900 text-neutral-400 hover:text-white text-xs border border-white/5 transition-colors"
              >
                <Scale className="w-3.5 h-3.5 text-[#C9A24A]" />
                <span>{compared ? 'Remove from Comparison Dock' : 'Add to Device Comparison'}</span>
              </button>
            </div>

            {/* Tech Specs Detailed Table */}
            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                Hardware Specifications
              </h3>
              <div className="divide-y divide-white/[0.04] text-xs">
                <div className="py-2 flex justify-between">
                  <span className="text-neutral-400">Processor</span>
                  <span className="font-medium text-white">{product.specs.chip}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-neutral-400">Display</span>
                  <span className="font-medium text-white text-right max-w-[240px]">
                    {product.specs.display}
                  </span>
                </div>
                {product.specs.camera && (
                  <div className="py-2 flex justify-between">
                    <span className="text-neutral-400">Camera</span>
                    <span className="font-medium text-white text-right max-w-[240px]">
                      {product.specs.camera}
                    </span>
                  </div>
                )}
                <div className="py-2 flex justify-between">
                  <span className="text-neutral-400">Battery Endurance</span>
                  <span className="font-medium text-white">{product.specs.battery}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-neutral-400">Ports</span>
                  <span className="font-medium text-white">{product.specs.port}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-neutral-400">Biometrics</span>
                  <span className="font-medium text-white">{product.specs.biometrics}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-neutral-400">Weight</span>
                  <span className="font-medium text-white">{product.specs.weight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/[0.08]">
            <h2 className="text-2xl font-bold text-white mb-6">
              Alternative {product.category} Models
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reservation Modal (Native accessible overlay) */}
      {reserveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-md bg-[#141418] border border-white/10 rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setReserveModalOpen(false);
                setReservationSuccess(null);
              }}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {reservationSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Unit Held Successfully!</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Your reservation reference is{' '}
                  <span className="font-mono font-bold text-[#C9A24A]">
                    {reservationSuccess}
                  </span>
                  . We will hold this {product.name} ({currentVariant?.storage}) at our Connaught Place store until {visitDate || 'tomorrow'}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReserveModalOpen(false);
                    setReservationSuccess(null);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#C9A24A] text-black font-semibold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24A] block mb-1">
                    Store Hold Request
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Reserve {product.name}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Selected: {currentVariant?.storage} · {currentVariant?.colour} ({formatINR(price)})
                  </p>
                </div>

                <div>
                  <label htmlFor="res-name" className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24A]"
                  />
                </div>

                <div>
                  <label htmlFor="res-phone" className="block text-xs font-medium text-neutral-300 mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="res-date" className="block text-xs font-medium text-neutral-300 mb-1">
                      Preferred Date
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A24A]"
                    />
                  </div>
                  <div>
                    <label htmlFor="res-time" className="block text-xs font-medium text-neutral-300 mb-1">
                      Preferred Time
                    </label>
                    <input
                      id="res-time"
                      type="text"
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      placeholder="e.g. 4:00 PM"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A24A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-sm transition-colors mt-2"
                >
                  {isSubmitting ? 'Confirming...' : 'Hold Device for Me'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
