'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { formatINR, buildWhatsAppLink, cn, isValidIndianMobile } from '@/lib/utils';
import { CONDITION_LABEL, CONDITION_NOTE } from '@/lib/catalog';
import ProductCard from '@/components/store/ProductCard';
import ProductImage from '@/components/ui/ProductImage';
import Modal from '@/components/ui/Modal';
import { MessageCircle, Check, Plus, ChevronRight } from 'lucide-react';

function formatDate(iso?: string) {
  if (!iso) return undefined;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ProductDetailClient({ slug }: { slug: string }) {
  const { products, settings, isInCompare, addToCompare, removeFromCompare, submitEnquiry } = useStore();

  const product = useMemo(
    () => products.find((p) => p.slug.toLowerCase() === slug?.toLowerCase()),
    [products, slug]
  );

  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [selectedColour, setSelectedColour] = useState<string>('');

  // Reserve form
  const [reserveOpen, setReserveOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('Evening (5–8 pm)');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationCode, setReservationCode] = useState<string | null>(null);

  const first = product?.variants[0];
  const currentStorage = selectedStorage || first?.storage || '';
  const currentColour = selectedColour || first?.colour || '';

  const currentVariant = useMemo(() => {
    if (!product) return null;
    return (
      product.variants.find((v) => v.storage === currentStorage && v.colour === currentColour) ||
      product.variants.find((v) => v.storage === currentStorage) ||
      product.variants[0]
    );
  }, [product, currentStorage, currentColour]);

  if (!product) {
    return (
      <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="text-title">This device isn&rsquo;t listed any more</h1>
        <p className="mt-3 max-w-prose text-ink-2">It has probably been sold. Have a look at what&rsquo;s in stock, or ask us if we can get another.</p>
        <Link href="/#catalog" className="btn-primary mt-6">
          See what&rsquo;s in stock
        </Link>
      </div>
    );
  }

  const price = currentVariant ? currentVariant.price : product.basePrice;
  const mrp = currentVariant ? currentVariant.mrp : product.mrp;
  const savings = mrp > price ? mrp - price : 0;
  const unitStock = currentVariant?.stock || 0;
  const inStock = unitStock > 0 && product.inStock;
  const compared = isInCompare(product.id);
  const storages = Array.from(new Set(product.variants.map((v) => v.storage)));
  const colours = Array.from(new Set(product.variants.map((v) => v.colour)));
  const report = product.gradingReport;
  const isPreOwned = product.condition === 'Pre-owned';

  const whatsappHref = buildWhatsAppLink(
    settings.whatsappRaw,
    `Hi, is the ${product.name} (${[currentVariant?.storage, currentVariant?.colour].filter((x) => x && x !== 'Standard').join(', ')}, ${CONDITION_LABEL[product.condition].toLowerCase()}) at ${formatINR(price)} available today?`
  );

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!customerName.trim()) errs.name = 'Please enter your name.';
    if (!isValidIndianMobile(customerPhone)) errs.phone = 'Enter a 10-digit mobile number, e.g. 98765 43210.';
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(errs.name ? 'res-name' : 'res-phone')?.focus();
      return;
    }
    setIsSubmitting(true);
    const code = `VAS-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      await submitEnquiry({
        customerName: customerName.trim(),
        phone: customerPhone.trim(),
        type: 'product_reserve',
        productId: product.id,
        productName: product.name,
        variantDetails: `${currentVariant?.storage} - ${currentVariant?.colour}`,
        quotedPrice: price,
        message: `Hold ${product.name} (${currentVariant?.storage}, ${currentVariant?.colour}) for a visit on ${visitDate || 'today'}, ${visitTime}. Ref ${code}.`,
        status: 'New',
        details: { reservationCode: code, visitDate, visitTime },
      });
      setReservationCode(code);
    } finally {
      setIsSubmitting(false);
    }
  };

  const related = products
    .filter((p) => p.isVisible && p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const specs: [string, string | undefined][] = [
    ['Chip', product.specs.chip],
    ['Display', product.specs.display],
    ['Camera', product.specs.camera],
    ['Battery life', product.specs.battery],
    ['Port', product.specs.port],
    ['Unlock', product.specs.biometrics],
    ['Weight', product.specs.weight],
    ['Warranty', product.specs.warranty],
  ];

  return (
    <div className="pb-20 pt-6">
      <nav aria-label="Breadcrumb" className="wrap">
        <ol className="flex flex-wrap items-center gap-1 text-small text-ink-3">
          <li>
            <Link href="/" className="inline-flex min-h-[44px] items-center hover:text-ink">Home</Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4" aria-hidden />
            <Link href="/#catalog" className="inline-flex min-h-[44px] items-center hover:text-ink">{product.category}</Link>
          </li>
          <li aria-current="page" className="flex min-w-0 items-center gap-1 font-medium text-ink-2">
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="wrap mt-4 grid gap-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-6">
        {/* Image */}
        <div className="lg:col-span-7">
          <div className="relative">
            <ProductImage
              product={product}
              finish={currentVariant?.colorHex}
              priority
              rounded="rounded-card"
              sizes="(max-width: 1024px) 92vw, 640px"
            />
            <span className="absolute left-4 top-4 rounded-full bg-surface px-3 py-1.5 text-small font-medium text-ink-2 shadow-sm">
              {CONDITION_LABEL[product.condition]}
            </span>
          </div>
        </div>

        {/* Buy box: second on phones, right-hand column on desktop */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">{CONDITION_NOTE[product.condition]}</p>
            <h1 className="mt-3 text-title">{product.name}</h1>
            <p className="mt-3 max-w-prose text-ink-2">{product.description}</p>

            <div className="mt-6 border-y border-line py-5">
              <p className="tabular flex flex-wrap items-baseline gap-x-3 text-ink">
                <span className="text-title">{formatINR(price)}</span>
                {mrp > price && <span className="text-ink-3 line-through">{formatINR(mrp)}</span>}
              </p>
              <p className="mt-1 text-small text-ink-3">
                {savings > 0 ? `${formatINR(savings)} under MRP · ` : ''}GST included
              </p>
              <p className={cn('mt-2 text-small font-semibold', inStock ? (unitStock <= 2 ? 'text-warn' : 'text-ok') : 'text-bad')}>
                {inStock ? (unitStock <= 2 ? `Only ${unitStock} left in this option` : 'In stock in the shop') : 'Sold out in this option, ask us for the next one'}
              </p>
            </div>

            {storages.length > 1 || (storages[0] && storages[0] !== 'Standard') ? (
              <fieldset className="mt-6">
                <legend className="field-label">Storage</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {storages.map((s) => {
                    const v = product.variants.find((x) => x.storage === s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={currentStorage === s}
                        onClick={() => setSelectedStorage(s)}
                        className={cn(
                          'min-h-[52px] rounded-control border px-3 py-2 text-left transition-colors',
                          currentStorage === s ? 'border-ink bg-surface ring-1 ring-ink' : 'border-line hover:border-line-strong'
                        )}
                      >
                        <span className="block text-small font-semibold text-ink">{s}</span>
                        {v && <span className="tabular block text-caption text-ink-3">{formatINR(v.price)}</span>}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            {colours.length > 0 && colours[0] !== 'Standard' && (
              <fieldset className="mt-6">
                <legend className="field-label">
                  Colour: <span className="font-normal text-ink-2">{currentColour}</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {colours.map((c) => {
                    const hex = product.variants.find((v) => v.colour === c)?.colorHex || '#999';
                    return (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={currentColour === c}
                        onClick={() => setSelectedColour(c)}
                        className="chip"
                      >
                        <span className="h-4 w-4 shrink-0 rounded-full border border-line-strong" style={{ backgroundColor: hex }} aria-hidden />
                        {c}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <div className="mt-8 grid gap-3">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-[52px] text-base">
                <MessageCircle className="h-5 w-5" aria-hidden />
                Ask on WhatsApp
              </a>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setReserveOpen(true)} className="btn-quiet">
                  Hold it for my visit
                </button>
                <button
                  type="button"
                  aria-pressed={compared}
                  onClick={() => (compared ? removeFromCompare(product.id) : addToCompare(product))}
                  className="btn-quiet"
                >
                  {compared ? <Check className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
                  Compare
                </button>
              </div>
              <p className="text-caption text-ink-3">
                Or call <a href={`tel:${settings.phoneRaw}`} className="font-medium text-ink underline underline-offset-2">{settings.phone}</a>. Open Mon–Sat 10:30 am – 9 pm, Sun 11:30 am – 8 pm.
              </p>
            </div>

            <section aria-labelledby="specs-title" className="mt-10">
              <h2 id="specs-title" className="eyebrow">Specifications</h2>
              <dl className="mt-3 divide-y divide-line border-y border-line text-small">
                {specs
                  .filter(([, v]) => v && v !== 'N/A')
                  .map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 py-2.5">
                      <dt className="text-ink-3">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
              </dl>
            </section>
          </div>
        </div>

        {/* Grading report */}
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2">
          {report && (
            <section aria-labelledby="report-title" className="rounded-card border border-line bg-surface">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-4">
                <h2 id="report-title" className="text-subtitle">
                  {isPreOwned ? 'Our check on this unit' : 'What’s in the box'}
                </h2>
                {report.inspectionDate && <p className="text-caption text-ink-3">Checked {formatDate(report.inspectionDate)}</p>}
              </div>
              <dl className="tabular divide-y divide-line text-small">
                {isPreOwned && report.batteryHealth && (
                  <div className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3">
                    <dt className="text-ink-3">Battery health</dt>
                    <dd className="text-right font-medium text-ink">{report.batteryHealth}%</dd>
                  </div>
                )}
                <div className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3">
                  <dt className="text-ink-3">Condition</dt>
                  <dd className="text-right font-medium text-ink">{report.cosmeticScore}</dd>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3">
                  <dt className="text-ink-3">Warranty</dt>
                  <dd className="text-right font-medium text-ink">{product.specs.warranty}</dd>
                </div>
                {report.accessoriesIncluded?.length > 0 && (
                  <div className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3">
                    <dt className="text-ink-3">In the box</dt>
                    <dd className="text-right text-ink">{report.accessoriesIncluded.join(', ')}</dd>
                  </div>
                )}
              </dl>
              {report.technicianNotes && (
                <p className="border-t border-line px-5 py-4 text-small text-ink-2">
                  <span className="font-medium text-ink">Note from the bench: </span>
                  {report.technicianNotes}
                </p>
              )}
            </section>
          )}
        </div>

      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="wrap mt-20 border-t border-line pt-12">
          <h2 id="related-title" className="text-subtitle">Other {product.category === 'Accessories' ? 'accessories' : `${product.category} models`} in the shop</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {related.map((rel) => (
              <li key={rel.id}>
                <ProductCard product={rel} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Modal
        open={reserveOpen}
        onClose={() => {
          setReserveOpen(false);
          setReservationCode(null);
        }}
        title={`Hold ${product.name}`}
      >
        {reservationCode ? (
          <div role="status">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ok/10 text-ok">
              <Check className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-subtitle">We&rsquo;ll keep it aside</h2>
            <p className="mt-2 text-ink-2">
              Your reference is <span className="font-mono font-semibold text-ink">{reservationCode}</span>. We&rsquo;ll hold the{' '}
              {product.name} ({currentVariant?.storage}) until closing time on {visitDate ? formatDate(visitDate) : 'the day you come'}, and send a
              WhatsApp to confirm.
            </p>
            <button
              type="button"
              onClick={() => {
                setReserveOpen(false);
                setReservationCode(null);
              }}
              className="btn-primary mt-6 w-full"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleReserve} noValidate className="space-y-5">
            <div className="pr-10">
              <h2 className="text-subtitle">Hold it for your visit</h2>
              <p className="mt-1 text-small text-ink-3">
                {product.name} · {[currentVariant?.storage, currentVariant?.colour].filter((x) => x && x !== 'Standard').join(' · ')} · {formatINR(price)}
              </p>
            </div>
            <div>
              <label htmlFor="res-name" className="field-label">Your name</label>
              <input id="res-name" type="text" autoComplete="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'res-name-error' : undefined} className="field" />
              {errors.name && <p id="res-name-error" className="field-error">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="res-phone" className="field-label">Mobile (WhatsApp)</label>
              <input id="res-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'res-phone-error' : undefined} className="field" />
              {errors.phone && <p id="res-phone-error" className="field-error">{errors.phone}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="res-date" className="field-label">Day</label>
                <input id="res-date" type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} className="field" />
              </div>
              <div>
                <label htmlFor="res-time" className="field-label">Time</label>
                <select id="res-time" value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="field">
                  <option>Morning (10:30 am–1 pm)</option>
                  <option>Afternoon (1–5 pm)</option>
                  <option>Evening (5–8 pm)</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Sending…' : 'Hold it for me'}
            </button>
            <p className="text-caption text-ink-3">No payment needed. We hold it until closing time that day.</p>
          </form>
        )}
      </Modal>
    </div>
  );
}
