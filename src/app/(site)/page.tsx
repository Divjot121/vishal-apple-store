'use client';

import React, { useState } from 'react';
import Hero from '@/components/home/Hero';
import CatalogSection from '@/components/home/CatalogSection';
import CheckSection from '@/components/home/CheckSection';
import OffersSection from '@/components/home/OffersSection';
import EmiTradeInTools from '@/components/home/EmiTradeInTools';
import ReviewsSection from '@/components/home/ReviewsSection';
import RepairSection from '@/components/home/RepairSection';
import VisitSection from '@/components/home/VisitSection';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <>
      <Hero />
      <CatalogSection selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <CheckSection />
      <OffersSection />
      <EmiTradeInTools />
      <ReviewsSection />
      <RepairSection />
      <VisitSection />
    </>
  );
}
