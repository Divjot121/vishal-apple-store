'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { buildWhatsAppLink, isValidIndianMobile } from '@/lib/utils';
import { Check } from 'lucide-react';

const JOBS: [string, string][] = [
  ['iPhone battery', 'Same day, about 1 hour'],
  ['iPhone screen', 'Same day if the part is in stock'],
  ['Charging port, speaker, mic', 'Same day'],
  ['Water damage', 'Inspection first, then a quote'],
  ['MacBook and iPad', '1 to 3 days, depending on the part'],
];

const DEVICES = ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods'];

type Errors = Partial<Record<'name' | 'phone' | 'issue', string>>;

function validate(name: string, phone: string, issue: string): Errors {
  const e: Errors = {};
  if (!name.trim()) e.name = 'Please enter your name.';
  if (!phone.trim()) e.phone = 'We need a number to send you the quote.';
  else if (!isValidIndianMobile(phone)) e.phone = 'Enter a 10-digit mobile number, e.g. 98765 43210.';
  if (issue.trim().length < 8) e.issue = 'Tell us a little more, e.g. "battery drains by afternoon".';
  return e;
}

export default function RepairSection() {
  const { submitEnquiry, settings } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [device, setDevice] = useState('iPhone');
  const [model, setModel] = useState('');
  const [issue, setIssue] = useState('');
  const [mode, setMode] = useState<'store_visit' | 'pickup'>('store_visit');
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<null | { name: string; device: string }>(null);
  const [submitError, setSubmitError] = useState('');

  const recheck = (n = name, p = phone, i = issue) => touched && setErrors(validate(n, p, i));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(name, phone, issue);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`repair-${first}`)?.focus();
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    const deviceLabel = model.trim() ? `${device} (${model.trim()})` : device;
    try {
      await submitEnquiry({
        customerName: name.trim(),
        phone: phone.trim(),
        type: 'repair_request',
        productName: deviceLabel,
        message: `Repair request: ${issue.trim()} (${mode === 'store_visit' ? 'will bring it to the shop' : 'wants pickup'})`,
        status: 'New',
        details: { deviceModel: deviceLabel, issue: issue.trim(), serviceMode: mode },
      });
      setSent({ name: name.trim().split(' ')[0], device: deviceLabel });
      setName('');
      setPhone('');
      setModel('');
      setIssue('');
      setTouched(false);
    } catch {
      setSubmitError('That did not go through. Please try again, or message us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const errId = (k: keyof Errors) => (errors[k] ? `repair-${k}-error` : undefined);

  return (
    <section id="repairs" className="section border-t border-line bg-surface" aria-labelledby="repairs-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Repairs</p>
          <h2 id="repairs-title" className="mt-3 text-title">
            Batteries, screens and the rest
          </h2>
          <p className="mt-4 max-w-prose text-ink-2">
            We fix iPhones, Macs and iPads in the shop. You get the price before we open anything, and if it isn&rsquo;t
            worth fixing we&rsquo;ll say so.
          </p>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {JOBS.map(([job, time]) => (
              <div key={job} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:justify-between sm:gap-6">
                <dt className="font-medium text-ink">{job}</dt>
                <dd className="text-small text-ink-3 sm:text-right">{time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-card border border-line bg-canvas p-5 sm:p-8">
            {sent ? (
              <div role="status" className="py-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ok/10 text-ok">
                  <Check className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-subtitle">Thanks {sent.name}, we have your request</h3>
                <p className="mt-2 max-w-prose text-ink-2">
                  Someone from the shop will WhatsApp you a price and timing for your {sent.device}, usually within the
                  hour during opening times. If it&rsquo;s urgent, call us on{' '}
                  <a href={`tel:${settings.phoneRaw}`} className="font-semibold text-ink underline underline-offset-4">
                    {settings.phone}
                  </a>
                  .
                </p>
                <button type="button" onClick={() => setSent(null)} className="btn-quiet mt-6">
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <h3 className="text-subtitle">Get a repair quote</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="repair-name" className="field-label">Your name</label>
                    <input
                      id="repair-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); recheck(e.target.value); }}
                      aria-invalid={!!errors.name}
                      aria-describedby={errId('name')}
                      className="field"
                    />
                    {errors.name && <p id="repair-name-error" className="field-error">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="repair-phone" className="field-label">Mobile (WhatsApp)</label>
                    <input
                      id="repair-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); recheck(name, e.target.value); }}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errId('phone')}
                      className="field"
                    />
                    {errors.phone && <p id="repair-phone-error" className="field-error">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="repair-device" className="field-label">Device</label>
                    <select id="repair-device" value={device} onChange={(e) => setDevice(e.target.value)} className="field">
                      {DEVICES.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="repair-model" className="field-label">
                      Model <span className="font-normal text-ink-3">(if you know it)</span>
                    </label>
                    <input id="repair-model" type="text" placeholder="e.g. iPhone 13" value={model} onChange={(e) => setModel(e.target.value)} className="field" />
                  </div>
                </div>

                <div>
                  <label htmlFor="repair-issue" className="field-label">What&rsquo;s wrong with it?</label>
                  <textarea
                    id="repair-issue"
                    rows={3}
                    placeholder="e.g. Battery health 76%, phone dies by evening"
                    value={issue}
                    onChange={(e) => { setIssue(e.target.value); recheck(name, phone, e.target.value); }}
                    aria-invalid={!!errors.issue}
                    aria-describedby={errId('issue')}
                    className="field min-h-[96px]"
                  />
                  {errors.issue && <p id="repair-issue-error" className="field-error">{errors.issue}</p>}
                </div>

                <fieldset>
                  <legend className="field-label">How will you get it to us?</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        ['store_visit', 'I’ll bring it in'],
                        ['pickup', 'Pick it up (Amritsar)'],
                      ] as const
                    ).map(([key, label]) => (
                      <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)} className="chip w-full whitespace-normal text-center">
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {submitError && <p role="alert" className="field-error">{submitError}</p>}

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                  <button type="submit" disabled={submitting} className="btn-primary px-6">
                    {submitting ? 'Sending…' : 'Send for a quote'}
                  </button>
                  <a
                    href={buildWhatsAppLink(settings.whatsappRaw, 'Hi, I need a repair. ')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center text-small font-medium text-ink-2 underline underline-offset-4 hover:text-ink"
                  >
                    or send a photo on WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
