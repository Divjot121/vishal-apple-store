'use client';

import React, { useId, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { formatINR, buildWhatsAppLink, calculateMonthlyEMI, cn } from '@/lib/utils';
import { CONDITION_LABEL } from '@/lib/catalog';
import { MessageCircle } from 'lucide-react';

const TRADE_IN_RATES: Record<string, number> = {
  'iPhone 15 Pro Max (256GB)': 58000,
  'iPhone 15 Pro (128GB)': 48000,
  'iPhone 15 (128GB)': 36000,
  'iPhone 14 Pro Max (128GB)': 44000,
  'iPhone 14 Pro (128GB)': 38000,
  'iPhone 14 (128GB)': 28000,
  'iPhone 13 Pro (128GB)': 31000,
  'iPhone 13 (128GB)': 23500,
  'iPhone 12 (128GB)': 17000,
  'iPhone 11 (128GB)': 12500,
  'MacBook Air M1 (256GB)': 32000,
  'iPad Pro 11" M1': 27000,
};

const CONDITIONS: Record<string, { mult: number; label: string; desc: string }> = {
  flawless: { mult: 1.0, label: 'Like new', desc: 'No marks, battery 90% or more' },
  good: { mult: 0.9, label: 'Good', desc: 'Light hairlines, battery 85% or more' },
  average: { mult: 0.75, label: 'Used', desc: 'Normal wear, battery needs service' },
  scratches: { mult: 0.6, label: 'Rough', desc: 'Dents, scuffs or a cracked back' },
};

const EXCHANGE_BONUS = 4000;
const TENURES = [3, 6, 9, 12, 18, 24];

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={cn('flex justify-between gap-4 py-2', strong && 'border-t border-line pt-3')}>
      <dt className="text-ink-3">{label}</dt>
      <dd className={cn('tabular text-right font-medium text-ink', strong && 'font-semibold')}>{value}</dd>
    </div>
  );
}

export default function EmiTradeInTools() {
  const { products, settings } = useStore();
  const [tab, setTab] = useState<'emi' | 'tradein'>('emi');
  const ids = useId();

  // Only things people actually take on EMI
  const emiProducts = products.filter((p) => p.isVisible && p.basePrice >= 15000);

  // EMI
  const [productId, setProductId] = useState<string>(emiProducts[0]?.id || '');
  const selected = emiProducts.find((p) => p.id === productId) || emiProducts[0];
  const devicePrice = selected ? selected.basePrice : 0;
  const [downPayment, setDownPayment] = useState<number>(Math.round((emiProducts[0]?.basePrice || 0) * 0.2));
  const [tenure, setTenure] = useState<number>(12);
  const [noCost, setNoCost] = useState<boolean>(true);
  const rate = noCost ? 0 : 13.5;
  const principal = Math.max(0, devicePrice - downPayment);
  const { monthlyEmi, totalInterest } = calculateMonthlyEMI(principal, rate, tenure);

  // Trade-in
  const [tradeModel, setTradeModel] = useState<string>('iPhone 13 (128GB)');
  const [tradeCondition, setTradeCondition] = useState<string>('good');
  const [targetId, setTargetId] = useState<string>(emiProducts[0]?.id || '');
  const tradeValue = Math.round((TRADE_IN_RATES[tradeModel] || 20000) * (CONDITIONS[tradeCondition]?.mult || 0.9));
  const credit = tradeValue + EXCHANGE_BONUS;
  const target = emiProducts.find((p) => p.id === targetId) || emiProducts[0];
  const netCost = target ? Math.max(0, target.basePrice - credit) : 0;

  const emiHref = buildWhatsAppLink(
    settings.whatsappRaw,
    `Hi, I'd like EMI on the ${selected?.name} (${formatINR(devicePrice)}): ${formatINR(downPayment)} down, ${tenure} months. Which cards work for no-cost EMI?`
  );
  const tradeHref = buildWhatsAppLink(
    settings.whatsappRaw,
    `Hi, I want to exchange my ${tradeModel} (${CONDITIONS[tradeCondition]?.label.toLowerCase()} condition) for the ${target?.name}. The website estimate was about ${formatINR(credit)}. When can I bring it in?`
  );

  const option = (p: (typeof emiProducts)[number]) => (
    <option key={p.id} value={p.id}>
      {p.name} · {CONDITION_LABEL[p.condition]} · {formatINR(p.basePrice)}
    </option>
  );

  return (
    <section id="tools" className="section border-y border-line bg-surface" aria-labelledby="tools-title">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow">Before you visit</p>
          <h2 id="tools-title" className="mt-3 text-title">
            Work out the EMI, or what your old phone is worth
          </h2>
          <p className="mt-4 max-w-prose text-ink-2">
            Rough numbers to plan with. The final exchange price is set after we check the phone in the shop,
            which takes about ten minutes, and card EMI depends on your bank.
          </p>

          <div role="tablist" aria-label="Calculator" className="mt-8 inline-flex rounded-full border border-line bg-canvas p-1">
            {(
              [
                ['emi', 'EMI'],
                ['tradein', 'Exchange value'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                id={`${ids}-tab-${key}`}
                role="tab"
                type="button"
                aria-selected={tab === key}
                aria-controls={`${ids}-panel-${key}`}
                onClick={() => setTab(key)}
                className={cn(
                  'min-h-[44px] rounded-full px-5 text-small font-semibold transition-colors',
                  tab === key ? 'bg-ink text-canvas' : 'text-ink-2 hover:text-ink'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          {tab === 'emi' ? (
            <div
              id={`${ids}-panel-emi`}
              role="tabpanel"
              aria-labelledby={`${ids}-tab-emi`}
              className="grid gap-6 rounded-card border border-line bg-canvas p-5 sm:p-7 md:grid-cols-[1fr_18rem]"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor={`${ids}-emi-device`} className="field-label">Device</label>
                  <select
                    id={`${ids}-emi-device`}
                    value={selected?.id}
                    onChange={(e) => {
                      setProductId(e.target.value);
                      const p = emiProducts.find((x) => x.id === e.target.value);
                      if (p) setDownPayment(Math.round(p.basePrice * 0.2));
                    }}
                    className="field"
                  >
                    {emiProducts.map(option)}
                  </select>
                </div>

                <div>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor={`${ids}-down`} className="field-label">Down payment</label>
                    <span className="tabular text-small font-semibold text-ink">{formatINR(downPayment)}</span>
                  </div>
                  <input
                    id={`${ids}-down`}
                    type="range"
                    min={0}
                    max={devicePrice}
                    step={1000}
                    value={Math.min(downPayment, devicePrice)}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    aria-valuetext={formatINR(downPayment)}
                    className="h-11 w-full cursor-pointer accent-[rgb(var(--ink))]"
                  />
                  <div className="flex justify-between text-caption text-ink-3">
                    <span>₹0</span>
                    <span className="tabular">{formatINR(devicePrice)}</span>
                  </div>
                </div>

                <fieldset>
                  <legend className="field-label">Months</legend>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {TENURES.map((m) => (
                      <button
                        key={m}
                        type="button"
                        aria-pressed={tenure === m}
                        onClick={() => setTenure(m)}
                        className="chip px-2"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="flex items-center justify-between gap-4 rounded-control border border-line bg-surface p-3.5">
                  <div>
                    <p id={`${ids}-nocost`} className="text-small font-semibold text-ink">No-cost EMI</p>
                    <p className="text-caption text-ink-3">On HDFC and ICICI credit cards</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={noCost}
                    aria-labelledby={`${ids}-nocost`}
                    onClick={() => setNoCost((v) => !v)}
                    className="relative inline-flex h-11 w-14 shrink-0 items-center"
                  >
                    <span className={cn('absolute inset-x-0 h-7 rounded-full transition-colors', noCost ? 'bg-ink' : 'bg-line-strong')} />
                    <span
                      className={cn(
                        'absolute h-5 w-5 rounded-full bg-canvas shadow transition-transform',
                        noCost ? 'translate-x-8' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col rounded-control bg-subtle p-5" aria-live="polite">
                <p className="text-small text-ink-3">Every month</p>
                <p className="tabular mt-1 text-title text-ink">{formatINR(monthlyEmi)}</p>
                <dl className="mt-4 text-small">
                  <Row label="Loan amount" value={formatINR(principal)} />
                  <Row label={noCost ? 'Interest (no-cost)' : `Interest at ${rate}%`} value={formatINR(totalInterest)} />
                  <Row label="Months" value={String(tenure)} />
                </dl>
                <a href={emiHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Check my card
                </a>
              </div>
            </div>
          ) : (
            <div
              id={`${ids}-panel-tradein`}
              role="tabpanel"
              aria-labelledby={`${ids}-tab-tradein`}
              className="grid gap-6 rounded-card border border-line bg-canvas p-5 sm:p-7 md:grid-cols-[1fr_18rem]"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor={`${ids}-trade-model`} className="field-label">Your current device</label>
                  <select id={`${ids}-trade-model`} value={tradeModel} onChange={(e) => setTradeModel(e.target.value)} className="field">
                    {Object.keys(TRADE_IN_RATES).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className="field-label">Its condition</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {Object.entries(CONDITIONS).map(([key, c]) => (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={tradeCondition === key}
                        onClick={() => setTradeCondition(key)}
                        className={cn(
                          'min-h-[44px] rounded-control border p-3 text-left transition-colors',
                          tradeCondition === key ? 'border-ink bg-surface' : 'border-line hover:border-line-strong'
                        )}
                      >
                        <span className="block text-small font-semibold text-ink">{c.label}</span>
                        <span className="mt-0.5 block text-caption text-ink-3">{c.desc}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor={`${ids}-trade-target`} className="field-label">Buying</label>
                  <select id={`${ids}-trade-target`} value={target?.id} onChange={(e) => setTargetId(e.target.value)} className="field">
                    {emiProducts.map(option)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col rounded-control bg-subtle p-5" aria-live="polite">
                <p className="text-small text-ink-3">Estimated credit</p>
                <p className="tabular mt-1 text-title text-ink">{formatINR(credit)}</p>
                <dl className="mt-4 text-small">
                  <Row label="Your device" value={formatINR(tradeValue)} />
                  <Row label="Exchange bonus" value={`+ ${formatINR(EXCHANGE_BONUS)}`} />
                  <Row label="You pay" value={formatINR(netCost)} strong />
                </dl>
                <a href={tradeHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Book a price check
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
