'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Star, ArrowUpRight } from 'lucide-react';

function Stars({ rating, size = 'h-4 w-4' }: { rating: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-ink" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={size} fill={i < rating ? 'currentColor' : 'none'} strokeWidth={1.5} aria-hidden />
      ))}
    </span>
  );
}

export default function ReviewsSection() {
  const { reviews, settings } = useStore();
  const approved = reviews.filter((r) => r.isApproved);
  if (approved.length === 0) return null;

  const avg = approved.reduce((s, r) => s + r.rating, 0) / approved.length;
  const [lead, ...rest] = approved;

  return (
    <section id="reviews" className="section" aria-labelledby="reviews-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">From customers</p>
          <h2 id="reviews-title" className="mt-3 text-title">
            What people say after they buy
          </h2>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-2">
            <Stars rating={Math.round(avg)} />
            <span>
              <span className="tabular font-semibold text-ink">{avg.toFixed(1)}</span> average from the {approved.length} most
              recent reviews
            </span>
          </p>
          <a
            href={settings.socials.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-[44px] items-center gap-1 text-small font-semibold text-ink underline underline-offset-4 hover:no-underline"
          >
            All reviews on Google
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>

          <figure className="reveal mt-8 border-l-2 border-gold pl-5 sm:pl-6">
            <blockquote className="text-subtitle font-normal leading-snug text-ink">
              &ldquo;{lead.comment}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-small">
              <span className="font-semibold text-ink">{lead.author}</span>
              <span className="text-ink-3">
                {' '}· {lead.city} · {lead.productPurchased}
              </span>
            </figcaption>
          </figure>
        </div>

        <ul className="divide-y divide-line border-y border-line lg:col-span-7 lg:self-start">
          {rest.map((r) => (
            <li key={r.id} className="reveal py-6">
              <div className="flex items-center justify-between gap-4">
                <Stars rating={r.rating} size="h-3.5 w-3.5" />
                <span className="text-caption text-ink-3">{r.date}</span>
              </div>
              <p className="mt-3 max-w-prose text-ink-2">{r.comment}</p>
              <p className="mt-3 text-small">
                <span className="font-semibold text-ink">{r.author}</span>
                <span className="text-ink-3">
                  {' '}· {r.city} · {r.productPurchased}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
