'use client';

import React, { useState } from 'react';
import Hero from '@/components/home/Hero';
import CategoryStrip from '@/components/home/CategoryStrip';
import CatalogSection from '@/components/home/CatalogSection';
import OffersSection from '@/components/home/OffersSection';
import EmiTradeInTools from '@/components/home/EmiTradeInTools';
import TrustSection from '@/components/home/TrustSection';
import VisitSection from '@/components/home/VisitSection';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategoryStrip
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <CatalogSection
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <OffersSection />
      <EmiTradeInTools />
      <TrustSection />
      <VisitSection />
    </div>
  );
}
