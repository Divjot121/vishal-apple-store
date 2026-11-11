'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { formatINR, buildWhatsAppLink, calculateMonthlyEMI } from '@/lib/utils';
import {
  Calculator,
  RefreshCw,
  AlertCircle,
  MessageCircle,
  CreditCard,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export default function EmiTradeInTools() {
  const { products, settings } = useStore();
  const [activeTab, setActiveTab] = useState<'emi' | 'tradein'>('emi');

  // EMI Calculator State
  const [selectedProductId, setSelectedProductId] = useState<string>(
    products[0]?.id || ''
  );
  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const devicePrice = selectedProduct ? selectedProduct.basePrice : 119900;

  const [downPayment, setDownPayment] = useState<number>(
    Math.round(devicePrice * 0.2)
  );
  const [tenure, setTenure] = useState<number>(12);
  const [isNoCost, setIsNoCost] = useState<boolean>(true);

  const interestRate = isNoCost ? 0 : 13.5;
  const principalLoan = Math.max(0, devicePrice - downPayment);
  const { monthlyEmi, totalInterest, totalPayable } = calculateMonthlyEMI(
    principalLoan,
    interestRate,
    tenure
  );

  // Trade-In Estimator State
  const [tradeModel, setTradeModel] = useState<string>('iPhone 13 (128GB)');
  const [tradeCondition, setTradeCondition] = useState<string>('good');
  const [targetUpgradeId, setTargetUpgradeId] = useState<string>(
    products[0]?.id || ''
  );

  const tradeInBaseRates: Record<string, number> = {
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

  const conditionMultipliers: Record<string, { mult: number; label: string; desc: string }> = {
    flawless: { mult: 1.0, label: 'Flawless', desc: 'No visible marks, 90%+ battery, all parts OEM' },
    good: { mult: 0.9, label: 'Good', desc: 'Minor micro hairline marks, 85%+ battery' },
    average: { mult: 0.75, label: 'Average', desc: 'Normal pocket wear, battery service needed' },
    scratches: { mult: 0.6, label: 'Dents / Scuffs', desc: 'Corner scuffs or back glass micro abrasions' },
  };

  const baseRate = tradeInBaseRates[tradeModel] || 20000;
  const multiplier = conditionMultipliers[tradeCondition]?.mult || 0.9;
  const estimatedTradeInValue = Math.round(baseRate * multiplier);
  const exchangeBonus = 4000; // Festive exchange bonus
  const totalTradeInCredit = estimatedTradeInValue + exchangeBonus;

  const targetUpgrade = products.find((p) => p.id === targetUpgradeId) || products[0];
  const netUpgradeCost = targetUpgrade ? Math.max(0, targetUpgrade.basePrice - totalTradeInCredit) : 0;

  // WhatsApp Links
  const emiWhatsAppHref = buildWhatsAppLink(
    settings.whatsappRaw,
    `Hi Vishal Apple Store, I calculated an EMI estimate for ${selectedProduct?.name} (${formatINR(devicePrice)}). Down payment: ${formatINR(downPayment)}, Tenure: ${tenure} months. Can you check my HDFC/ICICI No-Cost card eligibility?`
  );

  const tradeInWhatsAppHref = buildWhatsAppLink(
    settings.whatsappRaw,
    `Hi Vishal Apple Store, I evaluated a trade-in for my ${tradeModel} in ${conditionMultipliers[tradeCondition]?.label} condition (Estimated Credit ~${formatINR(totalTradeInCredit)}). I want to upgrade to ${targetUpgrade?.name}. Can I bring it for in-store physical valuation?`
  );

  return (
    <section id="tools" className="w-full bg-[#0A0A0A] py-16 sm:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A24A]">
            Financial Clarity & Exchange Tools
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1.5">
            Transparent EMI & Trade-In
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Calculate your monthly ownership installments or estimate your existing device credit before stepping into our Ranjit Avenue, Amritsar store.
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#141418] border border-white/10 mt-6">
            <button
              type="button"
              onClick={() => setActiveTab('emi')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'emi'
                  ? 'bg-white text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>EMI Calculator</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tradein')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'tradein'
                  ? 'bg-[#C9A24A] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Trade-In Estimator</span>
            </button>
          </div>
        </div>

        {/* Tab 1: EMI Calculator */}
        {activeTab === 'emi' && (
          <div className="max-w-4xl mx-auto bg-[#121215] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* Device Selector */}
                <div>
                  <label htmlFor="emi-device-select" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                    Select Device for EMI
                  </label>
                  <select
                    id="emi-device-select"
                    value={selectedProductId}
                    onChange={(e) => {
                      setSelectedProductId(e.target.value);
                      const p = products.find((item) => item.id === e.target.value);
                      if (p) setDownPayment(Math.round(p.basePrice * 0.2));
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24A]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.condition}) - {formatINR(p.basePrice)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Down Payment Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-neutral-300">Down Payment</span>
                    <span className="font-bold text-[#C9A24A] text-sm">
                      {formatINR(downPayment)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={devicePrice}
                    step={2000}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full accent-[#C9A24A] bg-neutral-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                    <span>₹0 (Zero Down)</span>
                    <span>50%</span>
                    <span>Full Price</span>
                  </div>
                </div>

                {/* Tenure Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                    Tenure Period
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[3, 6, 9, 12, 18, 24].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTenure(m)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                          tenure === m
                            ? 'bg-white text-black border-white'
                            : 'bg-neutral-900 text-neutral-300 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {m} Mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* No-Cost Scheme Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-white/[0.06]">
                  <div>
                    <p className="text-xs font-semibold text-white">No-Cost EMI Scheme</p>
                    <p className="text-[11px] text-neutral-400">Available on HDFC & ICICI Bank Cards</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsNoCost(!isNoCost)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isNoCost ? 'bg-[#C9A24A]' : 'bg-neutral-800'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                        isNoCost ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Output Summary Card */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#18181E] to-[#121215] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A24A] mb-1">
                    Monthly Estimate
                  </p>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {formatINR(monthlyEmi)}
                    <span className="text-xs font-normal text-neutral-400 ml-1.5">/ month</span>
                  </div>

                  <div className="mt-6 space-y-2.5 text-xs text-neutral-300 border-t border-white/[0.08] pt-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Principal Loan</span>
                      <span className="font-semibold text-white">{formatINR(principalLoan)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Interest ({interestRate}%)</span>
                      <span className="font-semibold text-emerald-400">{isNoCost ? '₹0 (Subsidized)' : formatINR(totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Tenure Duration</span>
                      <span className="font-semibold text-white">{tenure} Months</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-[11px] text-neutral-400 leading-snug bg-neutral-900/60 p-2.5 rounded-lg border border-white/[0.04]">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      Estimates for illustrative purposes. Actual card & NBFC schemes (HDFC, ICICI, Bajaj Finserv) verified at store checkout.
                    </span>
                  </div>

                  <a
                    href={emiWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Check Bank Offers on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Trade-In Estimator */}
        {activeTab === 'tradein' && (
          <div className="max-w-4xl mx-auto bg-[#121215] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                {/* Current Device Model */}
                <div>
                  <label htmlFor="trade-current-device" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                    Current Device You Want to Exchange
                  </label>
                  <select
                    id="trade-current-device"
                    value={tradeModel}
                    onChange={(e) => setTradeModel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24A]"
                  >
                    {Object.keys(tradeInBaseRates).map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition Evaluation */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                    Physical & Battery Condition
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {Object.entries(conditionMultipliers).map(([key, item]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTradeCondition(key)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          tradeCondition === key
                            ? 'bg-[#C9A24A]/15 border-[#C9A24A] text-white'
                            : 'bg-neutral-900 border-white/5 text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        <p className="text-xs font-bold text-white flex items-center justify-between">
                          <span>{item.label}</span>
                          {tradeCondition === key && <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24A]" />}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                          {item.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Upgrade Device */}
                <div>
                  <label htmlFor="trade-target-device" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                    Upgrading To
                  </label>
                  <select
                    id="trade-target-device"
                    value={targetUpgradeId}
                    onChange={(e) => setTargetUpgradeId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24A]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.condition}) - {formatINR(p.basePrice)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Trade-in Result Card */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#18181E] to-[#121215] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A24A] mb-1">
                    Total Estimated Trade Credit
                  </p>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {formatINR(totalTradeInCredit)}
                  </div>

                  <div className="mt-6 space-y-2.5 text-xs text-neutral-300 border-t border-white/[0.08] pt-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Device Valuation</span>
                      <span className="font-semibold text-white">{formatINR(estimatedTradeInValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Festive Exchange Bonus</span>
                      <span className="font-semibold text-emerald-400">+{formatINR(exchangeBonus)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/[0.04]">
                      <span className="text-neutral-400">Net Upgrade Price</span>
                      <span className="font-bold text-[#C9A24A] text-sm">{formatINR(netUpgradeCost)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-[11px] text-neutral-400 leading-snug bg-neutral-900/60 p-2.5 rounded-lg border border-white/[0.04]">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      Final valuation determined after 10-minute physical inspection in our store. Instant UPI payout or direct invoice adjustment.
                    </span>
                  </div>

                  <a
                    href={tradeInWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Get Exact Trade-In Quote via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
