'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/context';
import { getBestSellers } from '@/lib/products';
import SectionHeading from '@/components/common/SectionHeading';
import ProductCard from '@/components/common/ProductCard';
import { ProductCategory } from '@/types';
import { ArrowRight } from 'lucide-react';

export default function BestSellersSection() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const allBestSellers = getBestSellers(12);

  const filteredProducts =
    selectedCategory === 'all'
      ? allBestSellers.slice(0, 4)
      : allBestSellers
          .filter((p) => p.category === (selectedCategory as ProductCategory))
          .slice(0, 4);

  const categories = [
    { id: 'all', label: 'All Silhouettes' },
    { id: 'sarees', label: 'Handloom Sarees' },
    { id: 'kurtis', label: 'Kurtis & Sets' },
    { id: 'indo-western', label: 'Indo-Western' },
    { id: 'lehengas', label: 'Bridal Lehengas' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-ivory-100/50 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Patron Favorites"
          title={t.home.bestSellersTitle}
          subtitle={t.home.bestSellersSubtitle}
        />

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-maroon-900 text-ivory-50 shadow-sm'
                  : 'bg-white text-charcoal-700 hover:bg-ivory-200 border border-ivory-300/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-maroon-900 hover:bg-maroon-800 text-ivory-50 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-card hover:shadow-card-hover"
          >
            <span>Explore All Pieces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
